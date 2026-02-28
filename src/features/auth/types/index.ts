import { BaseEntity } from "@/types";

/**
 * User Roles matching NestJS backend
 * SUPER_ADMIN: Full system access
 * SUB_ADMIN: Teacher/Instructor role
 * STUDENT: Student role
 */
export type UserRole = "SUPER_ADMIN" | "SUB_ADMIN" | "STUDENT";

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  isEmailVerified: boolean;
  lastLoginAt?: string;
  bio?: string; // Backwards compatibility
}

/**
 * JWT tokens from NestJS backend
 * Access token: 15 min expiry
 * Refresh token: Long-lived
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword?: string; // UI validation only
  role?: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout?: () => void; // Backwards compatibility
  hasRole?: (roles: UserRole[]) => boolean; // Backwards compatibility
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword?: string; // UI validation only
}

/**
 * Role helpers
 */
export const isAdmin = (role?: UserRole): boolean => role === "SUPER_ADMIN";
export const isTeacher = (role?: UserRole): boolean => role === "SUB_ADMIN";
export const isStudent = (role?: UserRole): boolean => role === "STUDENT";

/**
 * Check if user has admin or teacher access
 */
export const isStaff = (role?: UserRole): boolean => 
  role === "SUPER_ADMIN" || role === "SUB_ADMIN";
