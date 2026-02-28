"use client";

import { useState, useEffect, useCallback } from "react";
import { examsApi } from "../api";
import { Exam, ExamFilters, ExamProgress, CreateExamInput, UpdateExamInput } from "../types";

/**
 * Hook for fetching exams
 */
export const useExams = (filters?: ExamFilters) => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchExams = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await examsApi.getExams(filters);
      setExams(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des annales");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  return {
    exams,
    isLoading,
    error,
    meta,
    refetch: fetchExams,
  };
};

/**
 * Hook for fetching published exams (public)
 */
export const usePublishedExams = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setIsLoading(true);
        const data = await examsApi.getPublishedExams();
        setExams(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des annales");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExams();
  }, []);

  return { exams, isLoading, error };
};

/**
 * Hook for fetching exams by module
 */
export const useExamsByModule = (moduleId: string) => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!moduleId) {
      setIsLoading(false);
      return;
    }

    const fetchExams = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await examsApi.getExamsByModule(moduleId);
        setExams(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des annales");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExams();
  }, [moduleId]);

  return { exams, isLoading, error };
};

/**
 * Hook for fetching a single exam
 */
export const useExam = (id: string) => {
  const [exam, setExam] = useState<Exam | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchExam = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await examsApi.getExam(id);
        setExam(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement de l'annale");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExam();
  }, [id]);

  return { exam, isLoading, error };
};

/**
 * Hook for exam filters (years, subjects)
 */
export const useExamFilters = () => {
  const [years, setYears] = useState<number[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setIsLoading(true);
        const [yearsData, subjectsData] = await Promise.all([
          examsApi.getAvailableYears(),
          examsApi.getAvailableSubjects(),
        ]);
        setYears(yearsData);
        setSubjects(subjectsData);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des filtres");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilters();
  }, []);

  return { years, subjects, isLoading, error };
};

/**
 * Hook for exam mutations (create, update, delete)
 */
export const useExamMutations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createExam = useCallback(async (data: CreateExamInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await examsApi.createExam(data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateExam = useCallback(async (id: string, data: UpdateExamInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await examsApi.updateExam(id, data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteExam = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await examsApi.deleteExam(id);
      return { success: true };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la suppression");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createExam,
    updateExam,
    deleteExam,
    isLoading,
    error,
  };
};

/**
 * Hook for exam progress
 */
export const useExamProgress = (examId: string) => {
  const [progress, setProgress] = useState<ExamProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!examId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await examsApi.getExamProgress(examId);
      setProgress(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement de la progression");
    } finally {
      setIsLoading(false);
    }
  }, [examId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const markAsCompleted = useCallback(async () => {
    if (!examId) return;

    try {
      setIsLoading(true);
      const data = await examsApi.markAsCompleted(examId);
      setProgress(data);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [examId]);

  return {
    progress,
    isLoading,
    error,
    refetch: fetchProgress,
    markAsCompleted,
  };
};
