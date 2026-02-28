"use client";

import { useState, useEffect, useCallback } from "react";
import { categoriesApi } from "../api";
import { Category, CategoryFilters, CreateCategoryInput, UpdateCategoryInput } from "../types";

/**
 * Hook for fetching categories
 */
export const useCategories = (filters?: CategoryFilters) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await categoriesApi.getCategories(filters);
      setCategories(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des catégories");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    meta,
    refetch: fetchCategories,
  };
};

/**
 * Hook for fetching active categories (public)
 */
export const useActiveCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await categoriesApi.getActiveCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des catégories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
};

/**
 * Hook for fetching a single category
 */
export const useCategory = (idOrSlug: string, bySlug = false) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idOrSlug) {
      setIsLoading(false);
      return;
    }

    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = bySlug
          ? await categoriesApi.getCategoryBySlug(idOrSlug)
          : await categoriesApi.getCategory(idOrSlug);
        setCategory(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement de la catégorie");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [idOrSlug, bySlug]);

  return { category, isLoading, error };
};

/**
 * Hook for category mutations (create, update, delete)
 */
export const useCategoryMutations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCategory = useCallback(async (data: CreateCategoryInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await categoriesApi.createCategory(data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCategory = useCallback(async (id: string, data: UpdateCategoryInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await categoriesApi.updateCategory(id, data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteCategory = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await categoriesApi.deleteCategory(id);
      return { success: true };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la suppression");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    isLoading,
    error,
  };
};
