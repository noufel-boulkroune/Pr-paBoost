import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

// API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Create axios instance
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    // API URL now includes /api/v1 prefix for NestJS backend
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Important for cookies (JWT tokens)
  });

  // Request interceptor - attach token from cookies if available
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Token is automatically sent via HTTP-only cookies set by NestJS backend
      // No need to manually attach it for most cases
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - handle errors and token refresh
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      if (!originalRequest) {
        return Promise.reject(error);
      }

      // Handle 401 Unauthorized - Token expired
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Try to refresh the token
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1"}/auth/refresh`,
            {},
            { withCredentials: true }
          );
          
          // Retry the original request
          return instance(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          if (typeof window !== "undefined") {
            window.location.href = "/auth/login?redirect=" + encodeURIComponent(window.location.pathname);
          }
        }
      }

      // Handle 403 Forbidden - Insufficient permissions
      if (error.response?.status === 403) {
        console.error("Access forbidden - insufficient permissions");
      }

      // Transform error to ApiError
      const apiError = transformError(error);
      return Promise.reject(apiError);
    }
  );

  return instance;
};

// Transform axios error to ApiError
const transformError = (error: AxiosError): ApiError => {
  const response = error.response;
  
  if (response) {
    const data = response.data as {
      message?: string;
      error?: string;
      code?: string;
      details?: Record<string, string[]>;
    };

    return new ApiError(
      data?.message || data?.error || error.message || "Une erreur est survenue",
      data?.code || "UNKNOWN_ERROR",
      response.status,
      data?.details
    );
  }

  if (error.request) {
    return new ApiError(
      "Erreur réseau. Vérifiez votre connexion.",
      "NETWORK_ERROR",
      0
    );
  }

  return new ApiError(
    error.message || "Une erreur inattendue est survenue",
    "UNKNOWN_ERROR",
    500
  );
};

// Create singleton instance
let axiosInstance: AxiosInstance | null = null;

export const getAxiosInstance = (): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = createAxiosInstance();
  }
  return axiosInstance;
};

// Export typed HTTP methods
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    getAxiosInstance().get(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    getAxiosInstance().post(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    getAxiosInstance().put(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    getAxiosInstance().patch(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    getAxiosInstance().delete(url, config).then((res) => res.data),
};

export default getAxiosInstance;
