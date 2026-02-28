"use client";

import { useState, useEffect, useCallback } from "react";
import { dashboardApi } from "../api";
import { StudentStats, AdminStats, ActivityItem, ModuleProgress } from "../types";

/**
 * Hook for student dashboard stats
 */
export const useStudentStats = () => {
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await dashboardApi.getStudentStats();
      setStats(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des statistiques");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  };
};

/**
 * Hook for student activity feed
 */
export const useStudentActivity = (limit?: number) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setIsLoading(true);
        const data = await dashboardApi.getStudentActivity(limit);
        setActivities(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement de l'activité");
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();
  }, [limit]);

  return { activities, isLoading, error };
};

/**
 * Hook for module progress
 */
export const useModuleProgress = () => {
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setIsLoading(true);
        const data = await dashboardApi.getModuleProgress();
        setProgress(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement de la progression");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, []);

  return { progress, isLoading, error };
};

/**
 * Hook for admin dashboard stats
 */
export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await dashboardApi.getAdminStats();
      setStats(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des statistiques");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  };
};

/**
 * Hook for admin revenue data
 */
export const useRevenueData = (period: "week" | "month" | "year" = "month") => {
  const [data, setData] = useState<{ labels: string[]; data: number[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await dashboardApi.getRevenueData(period);
        setData(result);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [period]);

  return { data, isLoading, error };
};

/**
 * Hook for admin user growth data
 */
export const useUserGrowthData = (period: "week" | "month" | "year" = "month") => {
  const [data, setData] = useState<{ labels: string[]; data: number[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await dashboardApi.getUserGrowthData(period);
        setData(result);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [period]);

  return { data, isLoading, error };
};
