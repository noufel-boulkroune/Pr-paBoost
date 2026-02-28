"use client";

import { useState, useEffect, useCallback } from "react";
import { usersApi } from "../api";
import { UserProfile, StudentStats, InstructorStats, Enrollment, UpdateProfileInput } from "../types";

export const useUser = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await usersApi.getProfile();
      setUser(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const updateProfile = useCallback(async (data: UpdateProfileInput) => {
    const updated = await usersApi.updateProfile(data);
    setUser(updated);
    return updated;
  }, []);

  return { user, isLoading, error, updateProfile, refetch: fetchUser };
};

export const useStudentStats = () => {
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await usersApi.getStudentStats();
        setStats(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading };
};

export const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await usersApi.getEnrollments();
        setEnrollments(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  return { enrollments, isLoading };
};

export const useInstructorStats = () => {
  const [stats, setStats] = useState<InstructorStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await usersApi.getInstructorStats();
        setStats(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading };
};
