import { BaseEntity, PaginatedResponse, PaginationParams } from "@/types";

/**
 * Category - Top level content grouping (e.g., "Médecine", "Droit")
 * Maps to NestJS Category entity
 */
export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
  moduleCount?: number;
}

export interface CategoryFilters extends PaginationParams {
  search?: string;
  isActive?: boolean;
}

export type CategoriesResponse = PaginatedResponse<Category>;

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  order?: number;
}

export interface UpdateCategoryInput extends Partial<CreateCategoryInput> {
  isActive?: boolean;
}
