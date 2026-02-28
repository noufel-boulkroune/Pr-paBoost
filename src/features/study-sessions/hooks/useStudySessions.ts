"use client";

import { useState, useEffect, useCallback } from "react";
import { studySessionsApi } from "../api";
import { StudySession, StudySessionFilters, StudyStats, CreateStudySessionInput, UpdateStudySessionInput } from "../types";

/**
 * Hook for study sessions
 */
export const useStudySessions = (filters?: StudySessionFilters) => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchSessions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await studySessionsApi.getMySessions(filters);
      setSessions(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des sessions");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return {
    sessions,
    isLoading,
    error,
    meta,
    refetch: fetchSessions,
  };
};

/**
 * Hook for study stats
 */
export const useStudyStats = () => {
  const [stats, setStats] = useState<StudyStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await studySessionsApi.getMyStats();
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
 * Hook for active study session
 */
export const useActiveStudySession = () => {
  const [session, setSession] = useState<StudySession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveSession = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await studySessionsApi.getActiveSession();
      setSession(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveSession();
  }, [fetchActiveSession]);

  return {
    session,
    isLoading,
    error,
    hasActiveSession: !!session && !session.endedAt,
    refetch: fetchActiveSession,
  };
};

/**
 * Hook for study session mutations
 */
export const useStudySessionMutations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startSession = useCallback(async (data: CreateStudySessionInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await studySessionsApi.startSession(data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors du démarrage");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const endSession = useCallback(async (sessionId: string, actualDuration: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await studySessionsApi.endSession(sessionId, actualDuration);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la fin de session");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSession = useCallback(async (sessionId: string, data: UpdateStudySessionInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await studySessionsApi.updateSession(sessionId, data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteSession = useCallback(async (sessionId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await studySessionsApi.deleteSession(sessionId);
      return { success: true };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la suppression");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    startSession,
    endSession,
    updateSession,
    deleteSession,
    isLoading,
    error,
  };
};

/**
 * Hook for study timer (active session management)
 */
export const useStudyTimer = () => {
  const [activeSession, setActiveSession] = useState<StudySession | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { startSession, endSession } = useStudySessionMutations();

  const start = useCallback(async (duration: number, subject?: string) => {
    const result = await startSession({ duration, subject });
    if (result.success && result.data) {
      setActiveSession(result.data);
      setElapsedSeconds(0);
      setIsRunning(true);
    }
    return result;
  }, [startSession]);

  const stop = useCallback(async () => {
    if (!activeSession) return { success: false, error: "No active session" };

    const actualDuration = Math.floor(elapsedSeconds / 60);
    const result = await endSession(activeSession.id, actualDuration);
    if (result.success) {
      setActiveSession(null);
      setElapsedSeconds(0);
      setIsRunning(false);
    }
    return result;
  }, [activeSession, elapsedSeconds, endSession]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setIsRunning(true);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const remainingSeconds = elapsedSeconds % 60;

  return {
    activeSession,
    isRunning,
    elapsedSeconds,
    elapsedMinutes,
    remainingSeconds,
    formattedTime: `${elapsedMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`,
    start,
    stop,
    pause,
    resume,
  };
};
