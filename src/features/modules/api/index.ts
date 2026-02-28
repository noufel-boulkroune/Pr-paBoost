import { api } from "@/services/axios";
import {
  Module,
  ModulesResponse,
  ModuleFilters,
  CreateModuleInput,
  UpdateModuleInput,
} from "../types";

/**
 * Modules API - Matches NestJS Backend
 * Base: /api/v1/modules (or /api/v1/content-modules)
 * Note: Using 'modules' endpoint - adjust if backend uses different path
 */

const MODULES_BASE = "/modules";

export const modulesApi = {
  /**
   * Get all modules with filters
   * GET /api/v1/modules
   */
  getModules: (filters?: ModuleFilters): Promise<ModulesResponse> =>
    api.get(MODULES_BASE, { params: filters }),

  /**
   * Get all active modules (for public display)
   * GET /api/v1/modules/active
   */
  getActiveModules: (): Promise<Module[]> =>
    api.get(`${MODULES_BASE}/active`),

  /**
   * Get modules by category
   * GET /api/v1/modules/category/:categoryId
   */
  getModulesByCategory: (categoryId: string): Promise<Module[]> =>
    api.get(`${MODULES_BASE}/category/${categoryId}`),

  /**
   * Get single module by ID
   * GET /api/v1/modules/:id
   */
  getModule: (id: string): Promise<Module> =>
    api.get(`${MODULES_BASE}/${id}`),

  /**
   * Get module by slug
   * GET /api/v1/modules/slug/:slug
   */
  getModuleBySlug: (slug: string): Promise<Module> =>
    api.get(`${MODULES_BASE}/slug/${slug}`),

  /**
   * Create module (admin only)
   * POST /api/v1/modules
   */
  createModule: (data: CreateModuleInput): Promise<Module> =>
    api.post(MODULES_BASE, data),

  /**
   * Update module (admin only)
   * PUT /api/v1/modules/:id
   */
  updateModule: (id: string, data: UpdateModuleInput): Promise<Module> =>
    api.put(`${MODULES_BASE}/${id}`, data),

  /**
   * Delete module (admin only)
   * DELETE /api/v1/modules/:id
   */
  deleteModule: (id: string): Promise<void> =>
    api.delete(`${MODULES_BASE}/${id}`),
};
