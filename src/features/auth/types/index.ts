/**
 * @file features/auth/types/index.ts
 * @description Auth-related TypeScript types aligned with the NestJS backend.
 */

import { BaseEntity } from "@/types";

// ─── Role ─────────────────────────────────────────────────────────────────────

/**
 * User roles matching the NestJS backend.
 *  SUPER_ADMIN — Full platform control (categories, users, subscriptions)
 *  SUB_ADMIN   — Teacher / instructor role
 *  STUDENT     — Learner role (content access gated by subscription)
 */
export type UserRole = "SUPER_ADMIN" | "SUB_ADMIN" | "STUDENT";

// ─── User ─────────────────────────────────────────────────────────────────────

/** Full user object returned by GET /auth/me and POST /auth/login */
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  /** S3 key (not URL) — pass through getS3Url() before rendering */
  avatarKey: string | null;
  role: UserRole;
  isActive: boolean;
}

// ─── Auth payloads ────────────────────────────────────────────────────────────

/** POST /auth/login request body */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** POST /auth/register request body */
export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * The inner `data` object returned by POST /auth/login and POST /auth/register.
 * The ApiResponse envelope is stripped by the axios interceptor.
 */
export interface LoginData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/**
 * The inner `data` object returned by POST /auth/refresh.
 */
export interface RefreshData {
  accessToken: string;
  refreshToken: string;
}

// ─── Role redirect map ────────────────────────────────────────────────────────

/**
 * Where to redirect each role after a successful login.
 * Used by the useAuth hook.
 */
export const ROLE_REDIRECT: Record<UserRole, string> = {
  STUDENT: "/dashboard/dashboard",
  SUB_ADMIN: "/dashboard/admin/courses",
  SUPER_ADMIN: "/dashboard/admin/courses",
};

// ─── Role helpers ─────────────────────────────────────────────────────────────

export const isAdmin = (role?: UserRole): boolean => role === "SUPER_ADMIN";
export const isTeacher = (role?: UserRole): boolean => role === "SUB_ADMIN";
export const isStudent = (role?: UserRole): boolean => role === "STUDENT";
export const isStaff = (role?: UserRole): boolean =>
  role === "SUPER_ADMIN" || role === "SUB_ADMIN";
