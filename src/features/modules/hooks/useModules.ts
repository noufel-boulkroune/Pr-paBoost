"use client";

import { useState, useEffect, useCallback } from "react";
import { modulesApi } from "../api";
import { Module, ModuleFilters, CreateModuleInput, UpdateModuleInput } from "../types";

/**
 * Hook for fetching modules
 */
export const useModules = (filters?: ModuleFilters) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchModules = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await modulesApi.getModules(filters);
      setModules(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des modules");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return {
    modules,
    isLoading,
    error,
    meta,
    refetch: fetchModules,
  };
};

/**
 * Hook for fetching active modules (public)
 */
export const useActiveModules = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setIsLoading(true);
        const data = await modulesApi.getActiveModules();
        setModules(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des modules");
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, []);

  return { modules, isLoading, error };
};

/**
 * Hook for fetching modules by category
 */
export const useModulesByCategory = (categoryId: string) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) {
      setIsLoading(false);
      return;
    }

    const fetchModules = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await modulesApi.getModulesByCategory(categoryId);
        setModules(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des modules");
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, [categoryId]);

  return { modules, isLoading, error };
};

/**
 * Hook for fetching a single module
 */
export const useModule = (idOrSlug: string, bySlug = false) => {
  const [module, setModule] = useState<Module | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idOrSlug) {
      setIsLoading(false);
      return;
    }

    const fetchModule = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = bySlug
          ? await modulesApi.getModuleBySlug(idOrSlug)
          : await modulesApi.getModule(idOrSlug);
        setModule(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement du module");
      } finally {
        setIsLoading(false);
      }
    };

    fetchModule();
  }, [idOrSlug, bySlug]);

  return { module, isLoading, error };
};

/**
 * Hook for module mutations (create, update, delete)
 */
export const useModuleMutations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createModule = useCallback(async (data: CreateModuleInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await modulesApi.createModule(data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateModule = useCallback(async (id: string, data: UpdateModuleInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await modulesApi.updateModule(id, data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteModule = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await modulesApi.deleteModule(id);
      return { success: true };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la suppression");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createModule,
    updateModule,
    deleteModule,
    isLoading,
    error,
  };
};
