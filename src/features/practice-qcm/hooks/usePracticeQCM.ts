"use client";

import { useState, useEffect, useCallback } from "react";
import { practiceQCMApi } from "../api";
import {
  PracticeQCM,
  QCMFilters,
  PracticeQuestion,
  PracticeAttempt,
  CreateQCMInput,
  UpdateQCMInput,
  CreateQuestionInput,
  UpdateQuestionInput,
  SubmitAttemptInput,
} from "../types";

/**
 * Hook for fetching QCMs
 */
export const useQCMs = (filters?: QCMFilters) => {
  const [qcms, setQcms] = useState<PracticeQCM[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchQCMs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await practiceQCMApi.getQCMs(filters);
      setQcms(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des QCMs");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchQCMs();
  }, [fetchQCMs]);

  return {
    qcms,
    isLoading,
    error,
    meta,
    refetch: fetchQCMs,
  };
};

/**
 * Hook for fetching published QCMs (public)
 */
export const usePublishedQCMs = () => {
  const [qcms, setQcms] = useState<PracticeQCM[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQCMs = async () => {
      try {
        setIsLoading(true);
        const data = await practiceQCMApi.getPublishedQCMs();
        setQcms(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des QCMs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQCMs();
  }, []);

  return { qcms, isLoading, error };
};

/**
 * Hook for fetching QCMs by module
 */
export const useQCMsByModule = (moduleId: string) => {
  const [qcms, setQcms] = useState<PracticeQCM[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!moduleId) {
      setIsLoading(false);
      return;
    }

    const fetchQCMs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await practiceQCMApi.getQCMsByModule(moduleId);
        setQcms(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des QCMs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQCMs();
  }, [moduleId]);

  return { qcms, isLoading, error };
};

/**
 * Hook for fetching a single QCM
 */
export const useQCM = (id: string) => {
  const [qcm, setQcm] = useState<PracticeQCM | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchQCM = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await practiceQCMApi.getQCM(id);
        setQcm(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement du QCM");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQCM();
  }, [id]);

  return { qcm, isLoading, error };
};

/**
 * Hook for QCM mutations (create, update, delete)
 */
export const useQCMMutations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createQCM = useCallback(async (data: CreateQCMInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await practiceQCMApi.createQCM(data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateQCM = useCallback(async (id: string, data: UpdateQCMInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await practiceQCMApi.updateQCM(id, data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteQCM = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await practiceQCMApi.deleteQCM(id);
      return { success: true };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la suppression");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createQCM,
    updateQCM,
    deleteQCM,
    isLoading,
    error,
  };
};

/**
 * Hook for questions
 */
export const useQuestions = (qcmId: string) => {
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    if (!qcmId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await practiceQCMApi.getQuestions(qcmId);
      setQuestions(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des questions");
    } finally {
      setIsLoading(false);
    }
  }, [qcmId]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const createQuestion = useCallback(async (data: CreateQuestionInput) => {
    if (!qcmId) return { success: false, error: "QCM ID required" };

    try {
      setIsLoading(true);
      setError(null);
      const result = await practiceQCMApi.createQuestion(qcmId, data);
      setQuestions((prev) => [...prev, result]);
      return { success: true, data: result };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [qcmId]);

  const updateQuestion = useCallback(async (questionId: string, data: UpdateQuestionInput) => {
    if (!qcmId) return { success: false, error: "QCM ID required" };

    try {
      setIsLoading(true);
      const result = await practiceQCMApi.updateQuestion(qcmId, questionId, data);
      setQuestions((prev) => prev.map((q) => (q.id === questionId ? result : q)));
      return { success: true, data: result };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [qcmId]);

  const deleteQuestion = useCallback(async (questionId: string) => {
    if (!qcmId) return { success: false, error: "QCM ID required" };

    try {
      setIsLoading(true);
      await practiceQCMApi.deleteQuestion(qcmId, questionId);
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [qcmId]);

  return {
    questions,
    isLoading,
    error,
    refetch: fetchQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };
};

/**
 * Hook for QCM attempts
 */
export const useQCMAttempts = (qcmId: string) => {
  const [attempts, setAttempts] = useState<PracticeAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttempts = useCallback(async () => {
    if (!qcmId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await practiceQCMApi.getMyAttempts(qcmId);
      setAttempts(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des tentatives");
    } finally {
      setIsLoading(false);
    }
  }, [qcmId]);

  useEffect(() => {
    fetchAttempts();
  }, [fetchAttempts]);

  return {
    attempts,
    isLoading,
    error,
    refetch: fetchAttempts,
  };
};

/**
 * Hook for all my attempts
 */
export const useAllMyAttempts = () => {
  const [attempts, setAttempts] = useState<PracticeAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        setIsLoading(true);
        const data = await practiceQCMApi.getAllMyAttempts();
        setAttempts(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des tentatives");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  return { attempts, isLoading, error };
};

/**
 * Hook for active QCM attempt
 */
export const useActiveAttempt = () => {
  const [currentAttempt, setCurrentAttempt] = useState<{
    attemptId: string;
    qcm: PracticeQCM;
    startedAt: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startAttempt = useCallback(async (qcmId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await practiceQCMApi.startAttempt(qcmId);
      setCurrentAttempt(data);
      return { success: true, data };
    } catch (err: any) {
      setError(err.message || "Erreur lors du démarrage");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitAttempt = useCallback(async (attemptId: string, data: SubmitAttemptInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await practiceQCMApi.submitAttempt(attemptId, data);
      setCurrentAttempt(null);
      return { success: true, data: result };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    currentAttempt,
    isLoading,
    error,
    startAttempt,
    submitAttempt,
    clearAttempt: () => setCurrentAttempt(null),
  };
};
