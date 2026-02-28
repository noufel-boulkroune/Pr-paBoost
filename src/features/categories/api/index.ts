import { api } from "@/services/axios";
import {
  Category,
  CategoriesResponse,
  CategoryFilters,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../types";

/**
 * Categories API - Matches NestJS Backend
 * Base: /api/v1/categories
 */

const CATEGORIES_BASE = "/categories";

export const categoriesApi = {
  /**
   * Get all categories with filters
   * GET /api/v1/categories
   */
  getCategories: (filters?: CategoryFilters): Promise<CategoriesResponse> =>
    api.get(CATEGORIES_BASE, { params: filters }),

  /**
   * Get all active categories (for public display)
   * GET /api/v1/categories/active
   */
  getActiveCategories: (): Promise<Category[]> =>
    api.get(`${CATEGORIES_BASE}/active`),

  /**
   * Get single category by ID
   * GET /api/v1/categories/:id
   */
  getCategory: (id: string): Promise<Category> =>
    api.get(`${CATEGORIES_BASE}/${id}`),

  /**
   * Get category by slug
   * GET /api/v1/categories/slug/:slug
   */
  getCategoryBySlug: (slug: string): Promise<Category> =>
    api.get(`${CATEGORIES_BASE}/slug/${slug}`),

  /**
   * Create category (admin only)
   * POST /api/v1/categories
   */
  createCategory: (data: CreateCategoryInput): Promise<Category> =>
    api.post(CATEGORIES_BASE, data),

  /**
   * Update category (admin only)
   * PUT /api/v1/categories/:id
   */
  updateCategory: (id: string, data: UpdateCategoryInput): Promise<Category> =>
    api.put(`${CATEGORIES_BASE}/${id}`, data),

  /**
   * Delete category (admin only)
   * DELETE /api/v1/categories/:id
   */
  deleteCategory: (id: string): Promise<void> =>
    api.delete(`${CATEGORIES_BASE}/${id}`),
};
