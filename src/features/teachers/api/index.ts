/**
 * @file features/teachers/api/index.ts
 * @description Teachers API — GET /teachers for the landing page ranked list.
 * The axios interceptor unwraps the ApiResponse envelope automatically.
 */

import { api } from "@/services/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * TeacherCard — shape returned by GET /teachers.
 * Ordered by rank asc, nulls last.
 */
export interface TeacherCard {
  id: string;
  rank: number | null;
  bio: string | null;
  specialty: string | null;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatarKey: string | null;
    role: "SUPER_ADMIN" | "SUB_ADMIN";
  };
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const teachersApi = {
  /**
   * Fetch all ranked teachers.
   * GET /teachers — ordered by rank asc, unranked last
   */
  getTeachers: (): Promise<TeacherCard[]> =>
    api.get<TeacherCard[]>("/teachers"),
};
