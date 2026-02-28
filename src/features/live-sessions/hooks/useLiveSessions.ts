"use client";

import { useState, useEffect, useCallback } from "react";
import { liveSessionsApi } from "../api";
import { LiveSession, LiveSessionFilters, LiveSessionAttendee, CreateLiveSessionInput, UpdateLiveSessionInput } from "../types";

/**
 * Hook for fetching live sessions
 */
export const useLiveSessions = (filters?: LiveSessionFilters) => {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
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
      const response = await liveSessionsApi.getLiveSessions(filters);
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
 * Hook for fetching upcoming sessions
 */
export const useUpcomingSessions = (limit?: number) => {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        const data = await liveSessionsApi.getUpcomingSessions(limit);
        setSessions(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des sessions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, [limit]);

  return { sessions, isLoading, error };
};

/**
 * Hook for fetching sessions by module
 */
export const useSessionsByModule = (moduleId: string) => {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!moduleId) {
      setIsLoading(false);
      return;
    }

    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await liveSessionsApi.getSessionsByModule(moduleId);
        setSessions(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des sessions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, [moduleId]);

  return { sessions, isLoading, error };
};

/**
 * Hook for fetching a single live session
 */
export const useLiveSession = (id: string) => {
  const [session, setSession] = useState<LiveSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchSession = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await liveSessionsApi.getLiveSession(id);
        setSession(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement de la session");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  return { session, isLoading, error };
};

/**
 * Hook for my registered sessions
 */
export const useMyRegistrations = () => {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await liveSessionsApi.getMyRegistrations();
      setSessions(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des inscriptions");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  return {
    sessions,
    isLoading,
    error,
    refetch: fetchRegistrations,
  };
};

/**
 * Hook for session registration
 */
export const useSessionRegistration = (sessionId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await liveSessionsApi.registerForSession(sessionId);
      return { success: true, data };
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  return { register, isLoading, error };
};

/**
 * Hook for live session mutations (create, update, delete)
 */
export const useLiveSessionMutations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSession = useCallback(async (data: CreateLiveSessionInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await liveSessionsApi.createLiveSession(data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSession = useCallback(async (id: string, data: UpdateLiveSessionInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await liveSessionsApi.updateLiveSession(id, data);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteSession = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await liveSessionsApi.deleteLiveSession(id);
      return { success: true };
    } catch (err: any) {
      setError(err.message || "Erreur lors de la suppression");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const goLive = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await liveSessionsApi.goLive(id);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const endSession = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await liveSessionsApi.endSession(id);
      return { success: true, data: result };
    } catch (err: any) {
      setError(err.message || "Erreur");
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createSession,
    updateSession,
    deleteSession,
    goLive,
    endSession,
    isLoading,
    error,
  };
};

/**
 * Hook for session attendees (teacher/admin)
 */
export const useSessionAttendees = (sessionId: string) => {
  const [attendees, setAttendees] = useState<LiveSessionAttendee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setIsLoading(false);
      return;
    }

    const fetchAttendees = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await liveSessionsApi.getSessionAttendees(sessionId);
        setAttendees(data);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des participants");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendees();
  }, [sessionId]);

  return { attendees, isLoading, error };
};
