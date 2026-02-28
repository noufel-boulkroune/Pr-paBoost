import { BaseEntity, PaginatedResponse, PaginationParams } from "@/types";
import { Module } from "@/features/modules/types";
import { User } from "@/features/auth/types";

/**
 * Plan - Subscription tier
 * Maps to NestJS Plan entity
 */
export interface Plan extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  price: number;
  currency: string;
  durationDays: number;
  features: string[];
  isActive: boolean;
  permissions: PlanPermission[];
}

/**
 * PlanPermission - Which modules a plan grants access to
 * Maps to NestJS PlanPermission entity
 */
export interface PlanPermission {
  id: string;
  planId: string;
  moduleId: string;
  module: Module;
}

/**
 * Subscription - User's active subscription
 * Maps to NestJS Subscription entity
 */
export interface Subscription extends BaseEntity {
  userId: string;
  user: User;
  planId: string;
  plan: Plan;
  status: "active" | "cancelled" | "expired" | "pending";
  startsAt: string;
  expiresAt: string;
  cancelledAt?: string;
}

export interface PlanFilters extends PaginationParams {
  isActive?: boolean;
}

export type PlansResponse = PaginatedResponse<Plan>;

export interface CreatePlanInput {
  name: string;
  slug: string;
  description?: string;
  price: number;
  currency: string;
  durationDays: number;
  features: string[];
  moduleIds: string[]; // Modules this plan grants access to
}

export interface UpdatePlanInput extends Partial<CreatePlanInput> {
  isActive?: boolean;
}

export interface CreateSubscriptionInput {
  planId: string;
  paymentMethodId?: string;
}

export interface SubscriptionCheckoutResponse {
  checkoutUrl: string;
  sessionId: string;
}
