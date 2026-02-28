"use client";

import { useState, useEffect, useCallback } from "react";
import { plansApi, subscriptionsApi } from "../api";
import { Plan, PlanFilters, Subscription, CreatePlanInput, UpdatePlanInput, CreateSubscriptionInput } from "../types";

/**
 * Hook for fetching plans
 */
export const usePlans = (filters?: PlanFilters) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchPlans = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await plansApi.getPlans(filters);
      setPlans(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des forfaits");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return {
    plans,
    isLoading,
    error,
    meta,
    refetch: fetchPlans,
  };
};

/**
 * Hook for fetching active plans (public)
 */
export const useActivePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        const data = await plansApi.getActivePlans();
        setPlans(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des forfaits");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, isLoading, error };
};

/**
 * Hook for fetching a single plan
 */
export const usePlan = (idOrSlug: string, bySlug = false) => {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idOrSlug) {
      setIsLoading(false);
      return;
    }

    const fetchPlan = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = bySlug
          ? await plansApi.getPlanBySlug(idOrSlug)
          : await plansApi.getPlan(idOrSlug);
        setPlan(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement du forfait");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlan();
  }, [idOrSlug, bySlug]);

  return { plan, isLoading, error };
};

/**
 * Hook for plan mutations (create, update, delete)
 */
export const usePlanMutations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPlan = useCallback(async (data: CreatePlanInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await plansApi.createPlan(data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePlan = useCallback(async (id: string, data: UpdatePlanInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await plansApi.updatePlan(id, data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deletePlan = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await plansApi.deletePlan(id);
      return { success: true };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la suppression");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createPlan,
    updatePlan,
    deletePlan,
    isLoading,
    error,
  };
};

/**
 * Hook for current user's subscription
 */
export const useMySubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await subscriptionsApi.getMySubscription();
      setSubscription(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement de l'abonnement");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const cancelSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await subscriptionsApi.cancelSubscription();
      setSubscription(data);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    subscription,
    isLoading,
    error,
    refetch: fetchSubscription,
    cancelSubscription,
    isActive: subscription?.status === "active",
    expiresAt: subscription?.expiresAt,
  };
};

/**
 * Hook for subscription history
 */
export const useSubscriptionHistory = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const data = await subscriptionsApi.getMySubscriptionHistory();
        setSubscriptions(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement de l'historique");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return { subscriptions, isLoading, error };
};

/**
 * Hook for subscription checkout
 */
export const useSubscriptionCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckout = useCallback(async (data: CreateSubscriptionInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await subscriptionsApi.createCheckoutSession(data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création de la session");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createCheckout,
    isLoading,
    error,
  };
};

/**
 * Hook for checking module access
 */
export const useModuleAccess = (moduleId: string) => {
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!moduleId) {
      setIsLoading(false);
      return;
    }

    const checkAccess = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await subscriptionsApi.checkModuleAccess(moduleId);
        setHasAccess(result.hasAccess);
      } catch (err: any) {
        setError(err.message || "Erreur lors de la vérification d'accès");
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [moduleId]);

  return { hasAccess, isLoading, error };
};
