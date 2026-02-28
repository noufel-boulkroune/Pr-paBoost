import { api } from "@/services/axios";
import {
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthTokens,
  PasswordResetRequest,
  PasswordResetConfirm,
} from "../types";

/**
 * Auth API - Matches NestJS Backend Endpoints
 * Base: /api/v1/auth
 */

const AUTH_BASE = "/auth";

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RefreshResponse {
  tokens: AuthTokens;
}

export const authApi = {
  /**
   * Login user
   * POST /api/v1/auth/login
   */
  login: (credentials: LoginCredentials): Promise<LoginResponse> =>
    api.post(`${AUTH_BASE}/login`, credentials),

  /**
   * Register new user
   * POST /api/v1/auth/register
   */
  register: (credentials: RegisterCredentials): Promise<LoginResponse> =>
    api.post(`${AUTH_BASE}/register`, credentials),

  /**
   * Logout user
   * POST /api/v1/auth/logout
   */
  logout: (): Promise<void> => api.post(`${AUTH_BASE}/logout`),

  /**
   * Get current user
   * GET /api/v1/auth/me
   */
  getCurrentUser: (): Promise<User> => api.get(`${AUTH_BASE}/me`),

  /**
   * Refresh access token
   * POST /api/v1/auth/refresh
   */
  refreshToken: (): Promise<RefreshResponse> => api.post(`${AUTH_BASE}/refresh`),

  /**
   * Request password reset
   * POST /api/v1/auth/password-reset-request
   */
  requestPasswordReset: (data: PasswordResetRequest): Promise<void> =>
    api.post(`${AUTH_BASE}/password-reset-request`, data),

  /**
   * Confirm password reset
   * POST /api/v1/auth/password-reset
   */
  confirmPasswordReset: (data: PasswordResetConfirm): Promise<void> =>
    api.post(`${AUTH_BASE}/password-reset`, data),
};
