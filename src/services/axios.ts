/**
 * @file axios.ts
 * @description Singleton Axios instance for all backend communication.
 *
 * Features:
 *  1. REQUEST interceptor — injects Authorization: Bearer <accessToken>
 *     by reading from the Zustand store (in-memory, not localStorage).
 *  2. RESPONSE interceptor — handles 401 with a silent token refresh:
 *       - First 401: pauses all concurrent requests in a failedQueue
 *       - Calls POST /auth/refresh with the localStorage refresh token
 *       - On success: updates the store + retries all queued requests
 *       - On failure: calls store.logout() + redirects to /login
 *  3. Unwraps the NestJS ApiResponse envelope { data, statusCode, timestamp }
 *     so callers receive the inner data directly.
 */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { REFRESH_TOKEN_KEY, getRefreshToken, storeRefreshToken } from "@/store/authStore";

// ─── Typed API error ─────────────────────────────────────────────────────────

/** Typed error surfaced by all failed API calls */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number,
    public readonly details?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ─── Failed-queue for concurrent 401s ────────────────────────────────────────

interface QueueEntry {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: QueueEntry[] = [];

/**
 * Drain the failed queue after a refresh attempt.
 * Resolves all queued promises with the new token on success,
 * or rejects them all on failure.
 */
const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((entry) => {
    if (error) {
      entry.reject(error);
    } else {
      entry.resolve(token as string);
    }
  });
  failedQueue = [];
};

/**
 * Claim the refresh lock from outside (e.g. AuthHydrator on page load).
 * While held, any 401 from the interceptor will queue instead of
 * initiating a concurrent refresh — preventing token rotation conflicts.
 */
export const claimRefreshLock = (): void => {
  isRefreshing = true;
};

/**
 * Release the refresh lock and drain the queue.
 * Call with (null, newToken) on success, or (error, null) on failure.
 */
export const releaseRefreshLock = (error: unknown, token: string | null): void => {
  processQueue(error, token);
  isRefreshing = false;
};

// ─── Axios factory ───────────────────────────────────────────────────────────

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
    timeout: 30_000,
    headers: { "Content-Type": "application/json" },
  });

  // ── REQUEST: inject Bearer token from in-memory Zustand store ─────────
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useAuthStore } = require("@/store/authStore");
      const token: string | null = useAuthStore.getState().accessToken;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // ── RESPONSE: unwrap ApiResponse envelope + handle 401 ────────────────
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Unwrap NestJS envelope { data, statusCode, timestamp }
      const body = response.data;
      if (
        body !== null &&
        typeof body === "object" &&
        "data" in body &&
        "statusCode" in body
      ) {
        return { ...response, data: body.data };
      }
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

      if (!originalRequest) return Promise.reject(transformError(error));

      // ── Silent token refresh on 401 ──────────────────────────────────
      // Never intercept 401s from auth endpoints — those are legitimate failures
      // (wrong password, expired invite, etc.) and should propagate to the caller.
      const isAuthEndpoint = ["/auth/login", "/auth/register"].some(
        (path) => originalRequest.url?.includes(path)
      );

      if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
        originalRequest._retry = true;

        if (isRefreshing) {
          // Queue this request until the ongoing refresh completes
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                (originalRequest.headers as Record<string, string>).Authorization =
                  `Bearer ${token}`;
              }
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          const refreshToken = getRefreshToken();

          if (!refreshToken) throw new Error("No refresh token");

          // Remember which storage held the token so rotation goes to same storage
          const rememberMe =
            typeof window !== "undefined" && !!localStorage.getItem(REFRESH_TOKEN_KEY);

          // Call refresh — this bypasses our instance to avoid a loop
          const refreshResponse = await axios.post(
            `${
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1"
            }/auth/refresh`,
            { refreshToken }
          );

          // Handle both wrapped and unwrapped responses
          const tokens = refreshResponse.data?.data ?? refreshResponse.data;
          const newAccessToken: string = tokens.accessToken;
          const newRefreshToken: string = tokens.refreshToken;

          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const { useAuthStore } = require("@/store/authStore");
          useAuthStore.getState().setAccessToken(newAccessToken);

          storeRefreshToken(newRefreshToken, rememberMe);

          if (originalRequest.headers) {
            (originalRequest.headers as Record<string, string>).Authorization =
              `Bearer ${newAccessToken}`;
          }

          processQueue(null, newAccessToken);
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);

          // eslint-disable-next-line @typescript-eslint/no-require-imports
          const { useAuthStore } = require("@/store/authStore");
          useAuthStore.getState().logout();

          if (typeof window !== "undefined") {
            window.location.replace("/auth/login");
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(transformError(error));
    }
  );

  return instance;
};

// ─── Error transformer ───────────────────────────────────────────────────────

const transformError = (error: AxiosError): ApiError => {
  const response = error.response;

  if (response) {
    const body = response.data as {
      message?: string | string[];
      error?: string;
      code?: string;
      details?: Record<string, string[]>;
    };

    const message = Array.isArray(body?.message)
      ? body.message.join(", ")
      : body?.message || body?.error || error.message || "Une erreur est survenue";

    return new ApiError(message, body?.code || "UNKNOWN_ERROR", response.status, body?.details);
  }

  if (error.request) {
    return new ApiError("Erreur réseau. Vérifiez votre connexion.", "NETWORK_ERROR", 0);
  }

  return new ApiError(
    error.message || "Une erreur inattendue est survenue",
    "UNKNOWN_ERROR",
    500
  );
};

// ─── Singleton ───────────────────────────────────────────────────────────────

let axiosInstance: AxiosInstance | null = null;

export const getAxiosInstance = (): AxiosInstance => {
  if (!axiosInstance) axiosInstance = createAxiosInstance();
  return axiosInstance;
};

// ─── Typed convenience methods ────────────────────────────────────────────────

/**
 * Pre-bound HTTP methods. All return the unwrapped inner data.
 *
 * @example
 *   const user = await api.get<User>('/auth/me');
 *   const result = await api.post<LoginData>('/auth/login', creds);
 */
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    getAxiosInstance()
      .get<T>(url, config)
      .then((res) => res.data as T),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    getAxiosInstance()
      .post<T>(url, data, config)
      .then((res) => res.data as T),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    getAxiosInstance()
      .put<T>(url, data, config)
      .then((res) => res.data as T),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    getAxiosInstance()
      .patch<T>(url, data, config)
      .then((res) => res.data as T),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    getAxiosInstance()
      .delete<T>(url, config)
      .then((res) => res.data as T),
};

export default getAxiosInstance;
