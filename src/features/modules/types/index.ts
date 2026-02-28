import { BaseEntity, PaginatedResponse, PaginationParams } from "@/types";
import { Category } from "@/features/categories/types";

/**
 * Module - Mid level content grouping (e.g., "Anatomie", "Biochimie")
 * Maps to NestJS Module entity
 * A module belongs to a Category and contains Courses and Exams
 */
export interface Module extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  categoryId: string;
  category: Category;
  imageUrl?: string;
  order: number;
  isActive: boolean;
  courseCount?: number;
  examCount?: number;
}

export interface ModuleFilters extends PaginationParams {
  categoryId?: string;
  search?: string;
  isActive?: boolean;
}

export type ModulesResponse = PaginatedResponse<Module>;

export interface CreateModuleInput {
  name: string;
  slug: string;
  description?: string;
  categoryId: string;
  imageUrl?: string;
  order?: number;
}

export interface UpdateModuleInput extends Partial<CreateModuleInput> {
  isActive?: boolean;
}
