import { api } from "@/services/axios";
import {
  Plan,
  PlansResponse,
  PlanFilters,
  Subscription,
  CreatePlanInput,
  UpdatePlanInput,
  CreateSubscriptionInput,
  SubscriptionCheckoutResponse,
} from "../types";

/**
 * Subscriptions API - Matches NestJS Backend
 * Base: /api/v1/subscriptions and /api/v1/plans
 */

const PLANS_BASE = "/plans";
const SUBSCRIPTIONS_BASE = "/subscriptions";

export const plansApi = {
  // ============================================================================
  // PLANS
  // ============================================================================

  /**
   * Get all plans
   * GET /api/v1/plans
   */
  getPlans: (filters?: PlanFilters): Promise<PlansResponse> =>
    api.get(PLANS_BASE, { params: filters }),

  /**
   * Get all active plans (public)
   * GET /api/v1/plans/active
   */
  getActivePlans: (): Promise<Plan[]> =>
    api.get(`${PLANS_BASE}/active`),

  /**
   * Get single plan by ID
   * GET /api/v1/plans/:id
   */
  getPlan: (id: string): Promise<Plan> =>
    api.get(`${PLANS_BASE}/${id}`),

  /**
   * Get plan by slug
   * GET /api/v1/plans/slug/:slug
   */
  getPlanBySlug: (slug: string): Promise<Plan> =>
    api.get(`${PLANS_BASE}/slug/${slug}`),

  /**
   * Create plan (admin only)
   * POST /api/v1/plans
   */
  createPlan: (data: CreatePlanInput): Promise<Plan> =>
    api.post(PLANS_BASE, data),

  /**
   * Update plan (admin only)
   * PUT /api/v1/plans/:id
   */
  updatePlan: (id: string, data: UpdatePlanInput): Promise<Plan> =>
    api.put(`${PLANS_BASE}/${id}`, data),

  /**
   * Delete plan (admin only)
   * DELETE /api/v1/plans/:id
   */
  deletePlan: (id: string): Promise<void> =>
    api.delete(`${PLANS_BASE}/${id}`),
};

export const subscriptionsApi = {
  // ============================================================================
  // SUBSCRIPTIONS
  // ============================================================================

  /**
   * Get current user's subscription
   * GET /api/v1/subscriptions/me
   */
  getMySubscription: (): Promise<Subscription | null> =>
    api.get(`${SUBSCRIPTIONS_BASE}/me`),

  /**
   * Get current user's subscription history
   * GET /api/v1/subscriptions/me/history
   */
  getMySubscriptionHistory: (): Promise<Subscription[]> =>
    api.get(`${SUBSCRIPTIONS_BASE}/me/history`),

  /**
   * Create checkout session for subscription
   * POST /api/v1/subscriptions/checkout
   */
  createCheckoutSession: (data: CreateSubscriptionInput): Promise<SubscriptionCheckoutResponse> =>
    api.post(`${SUBSCRIPTIONS_BASE}/checkout`, data),

  /**
   * Cancel current subscription
   * POST /api/v1/subscriptions/me/cancel
   */
  cancelSubscription: (): Promise<Subscription> =>
    api.post(`${SUBSCRIPTIONS_BASE}/me/cancel`),

  /**
   * Check if user has access to a module
   * GET /api/v1/subscriptions/me/access/:moduleId
   */
  checkModuleAccess: (moduleId: string): Promise<{ hasAccess: boolean }> =>
    api.get(`${SUBSCRIPTIONS_BASE}/me/access/${moduleId}`),

  // ============================================================================
  // ADMIN ONLY
  // ============================================================================

  /**
   * Get all subscriptions (admin only)
   * GET /api/v1/subscriptions
   */
  getAllSubscriptions: (filters?: { userId?: string; status?: string }): Promise<Subscription[]> =>
    api.get(SUBSCRIPTIONS_BASE, { params: filters }),

  /**
   * Get subscription by ID (admin only)
   * GET /api/v1/subscriptions/:id
   */
  getSubscription: (id: string): Promise<Subscription> =>
    api.get(`${SUBSCRIPTIONS_BASE}/${id}`),
};
