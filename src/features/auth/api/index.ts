/**
 * @file features/auth/api/index.ts
 * @description Auth API calls aligned with POST /auth/login → { accessToken, refreshToken, user }.
 * The axios interceptor unwraps the ApiResponse envelope, so callers receive
 * the inner data types directly.
 */

import { api } from "@/services/axios";
import { LoginCredentials, LoginData, RegisterCredentials, User } from "../types";

const BASE = "/auth";

export const authApi = {
  /**
   * Login user.
   * POST /auth/login → LoginData { accessToken, refreshToken, user }
   */
  login: (credentials: LoginCredentials): Promise<LoginData> =>
    api.post<LoginData>(`${BASE}/login`, credentials),

  /**
   * Register a new student account.
   * POST /auth/register → LoginData { accessToken, refreshToken, user }
   */
  register: (credentials: RegisterCredentials): Promise<LoginData> =>
    api.post<LoginData>(`${BASE}/register`, credentials),

  /**
   * Get the currently authenticated user.
   * GET /auth/me → User
   */
  getCurrentUser: (): Promise<User> => api.get<User>(`${BASE}/me`),

  /**
   * Logout the current session.
   * POST /auth/logout (invalidates the refresh token server-side)
   */
  logout: (): Promise<void> => api.post<void>(`${BASE}/logout`),
};
