"use client";

/**
 * @file features/auth/hooks/useAuth.ts
 * @description Primary auth hook. Coordinates API calls, token storage,
 * toast feedback, and role-aware navigation.
 */

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "../api";
import { LoginCredentials, RegisterCredentials, ROLE_REDIRECT, UserRole } from "../types";

/** useAuth — central authentication hook */
export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    setAuth,
    logout: storeLogout,
    updateUser,
    hasRole,
  } = useAuthStore();

  /**
   * Login with email + password.
   * On success: stores tokens, shows success toast, redirects by role.
   * On failure: shows error toast and rethrows for the form to handle.
   */
  const login = useCallback(
    async (credentials: LoginCredentials, redirectTo?: string) => {
      const toastId = toast.loading("Connexion en cours...");
      try {
        const { accessToken: token, refreshToken, user: authUser } =
          await authApi.login(credentials);
        setAuth(authUser, token, refreshToken);
        toast.success(`Bienvenue, ${authUser.firstName}!`, { id: toastId });
        const destination = redirectTo ?? ROLE_REDIRECT[authUser.role];
        router.push(destination);
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Identifiants incorrects";
        toast.error(msg, { id: toastId });
        throw error;
      }
    },
    [setAuth, router]
  );

  /**
   * Register a new student account.
   * On success: stores tokens, shows toast, redirects to /dashboard.
   */
  const register = useCallback(
    async (credentials: RegisterCredentials, redirectTo: string = "/dashboard") => {
      const toastId = toast.loading("Création du compte...");
      try {
        const { accessToken: token, refreshToken, user: authUser } =
          await authApi.register(credentials);
        setAuth(authUser, token, refreshToken);
        toast.success("Compte créé avec succès!", { id: toastId });
        router.push(redirectTo);
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Erreur lors de l'inscription";
        toast.error(msg, { id: toastId });
        throw error;
      }
    },
    [setAuth, router]
  );

  /**
   * Log out: invalidate server-side, clear local state, redirect to login.
   */
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Clear state even if the server call fails
    } finally {
      storeLogout();
      toast.success("Vous êtes déconnecté(e)");
      router.push("/auth/login");
    }
  }, [storeLogout, router]);

  const isAdmin = user?.role === "SUPER_ADMIN";
  const isTeacher = user?.role === "SUB_ADMIN";
  const isStudent = user?.role === "STUDENT";

  const checkRole = useCallback((roles: UserRole[]) => hasRole(roles), [hasRole]);

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    role: user?.role,
    login,
    register,
    logout,
    updateUser,
    isAdmin,
    isTeacher,
    isStudent,
    isStaff: isAdmin || isTeacher,
    hasRole: checkRole,
  };
};

/** Lightweight hook for components that only need auth status */
export const useAuthStatus = () => {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  return {
    isAuthenticated,
    isLoading,
    isAdmin: user?.role === "SUPER_ADMIN",
    isTeacher: user?.role === "SUB_ADMIN",
    isStudent: user?.role === "STUDENT",
    role: user?.role,
    user,
  };
};
