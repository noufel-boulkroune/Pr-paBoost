"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "../api";
import { LoginCredentials, RegisterCredentials, UserRole } from "../types";
import { useRouter } from "next/navigation";

/**
 * Auth Hook - Handles authentication with NestJS backend
 * Manages JWT tokens (access + refresh) and user state
 */
export const useAuth = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, setAuth, clearAuth, setLoading } = useAuthStore();

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        // Try to get current user - will fail if no valid token
        const user = await authApi.getCurrentUser();
        setAuth(user);
      } catch {
        // Not authenticated or token expired
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    if (!isAuthenticated && !user) {
      initAuth();
    }
  }, [setAuth, clearAuth, setLoading, isAuthenticated, user]);

  /**
   * Login user
   */
  const login = useCallback(
    async (credentials: LoginCredentials, redirectUrl: string = "/dashboard/dashboard") => {
      try {
        setLoading(true);
        const { user, tokens } = await authApi.login(credentials);
        
        // Store tokens in cookies for middleware access
        document.cookie = `accessToken=${tokens.accessToken}; path=/; max-age=900`; // 15 min
        document.cookie = `refreshToken=${tokens.refreshToken}; path=/; max-age=604800`; // 7 days
        document.cookie = `userRole=${user.role}; path=/; max-age=900`;
        
        setAuth(user);
        router.push(redirectUrl);
        return { success: true };
      } catch (error: any) {
        return { 
          success: false, 
          error: error.message || "Identifiants incorrects" 
        };
      } finally {
        setLoading(false);
      }
    },
    [router, setAuth, setLoading]
  );

  /**
   * Register new user
   */
  const register = useCallback(
    async (credentials: RegisterCredentials, redirectUrl: string = "/dashboard/dashboard") => {
      try {
        setLoading(true);
        const { user, tokens } = await authApi.register(credentials);
        
        // Store tokens in cookies
        document.cookie = `accessToken=${tokens.accessToken}; path=/; max-age=900`;
        document.cookie = `refreshToken=${tokens.refreshToken}; path=/; max-age=604800`;
        document.cookie = `userRole=${user.role}; path=/; max-age=900`;
        
        setAuth(user);
        router.push(redirectUrl);
        return { success: true };
      } catch (error: any) {
        return { 
          success: false, 
          error: error.message || "Erreur lors de l'inscription" 
        };
      } finally {
        setLoading(false);
      }
    },
    [router, setAuth, setLoading]
  );

  /**
   * Logout user
   */
  const logout = useCallback(
    async (redirectUrl: string = "/auth/login") => {
      try {
        await authApi.logout();
      } finally {
        // Clear cookies
        document.cookie = "accessToken=; path=/; max-age=0";
        document.cookie = "refreshToken=; path=/; max-age=0";
        document.cookie = "userRole=; path=/; max-age=0";
        
        clearAuth();
        router.push(redirectUrl);
      }
    },
    [router, clearAuth]
  );

  /**
   * Role checks
   */
  const isAdmin = user?.role === "SUPER_ADMIN";
  const isTeacher = user?.role === "SUB_ADMIN";
  const isStudent = user?.role === "STUDENT";
  const isStaff = isAdmin || isTeacher;

  /**
   * Check if user has required role
   */
  const hasRole = useCallback(
    (roles: UserRole[]) => {
      if (!user) return false;
      return roles.includes(user.role);
    },
    [user]
  );

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    
    // Actions
    login,
    register,
    logout,
    
    // Role checks
    isAdmin,
    isTeacher,
    isStudent,
    isStaff,
    hasRole,
    role: user?.role,
  };
};

/**
 * Hook for checking auth status (lightweight)
 */
export const useAuthStatus = () => {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  
  return {
    isAuthenticated,
    isLoading,
    isAdmin: user?.role === "SUPER_ADMIN",
    isTeacher: user?.role === "SUB_ADMIN",
    isStudent: user?.role === "STUDENT",
    role: user?.role,
  };
};
