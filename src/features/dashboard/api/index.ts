import { api } from "@/services/axios";
import { StudentStats, AdminStats, ActivityItem, ModuleProgress } from "../types";

/**
 * Dashboard API - Matches NestJS Backend
 * Base: /api/v1/dashboard
 */

const DASHBOARD_BASE = "/dashboard";

export const dashboardApi = {
  // ============================================================================
  // STUDENT ENDPOINTS
  // ============================================================================

  /**
   * Get student stats
   * GET /api/v1/dashboard/student/stats
   */
  getStudentStats: (): Promise<StudentStats> =>
    api.get(`${DASHBOARD_BASE}/student/stats`),

  /**
   * Get student activity feed
   * GET /api/v1/dashboard/student/activity
   */
  getStudentActivity: (limit?: number): Promise<ActivityItem[]> =>
    api.get(`${DASHBOARD_BASE}/student/activity`, { params: { limit } }),

  /**
   * Get progress by module
   * GET /api/v1/dashboard/student/module-progress
   */
  getModuleProgress: (): Promise<ModuleProgress[]> =>
    api.get(`${DASHBOARD_BASE}/student/module-progress`),

  // ============================================================================
  // ADMIN ENDPOINTS
  // ============================================================================

  /**
   * Get admin stats
   * GET /api/v1/dashboard/admin/stats
   */
  getAdminStats: (): Promise<AdminStats> =>
    api.get(`${DASHBOARD_BASE}/admin/stats`),

  /**
   * Get revenue data for charts
   * GET /api/v1/dashboard/admin/revenue
   */
  getRevenueData: (period: "week" | "month" | "year" = "month"): Promise<{
    labels: string[];
    data: number[];
  }> =>
    api.get(`${DASHBOARD_BASE}/admin/revenue`, { params: { period } }),

  /**
   * Get user growth data for charts
   * GET /api/v1/dashboard/admin/user-growth
   */
  getUserGrowthData: (period: "week" | "month" | "year" = "month"): Promise<{
    labels: string[];
    data: number[];
  }> =>
    api.get(`${DASHBOARD_BASE}/admin/user-growth`, { params: { period } }),
};
