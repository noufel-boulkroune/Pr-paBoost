/**
 * @file authStore.ts
 * @description Zustand auth store.
 *
 * Security model:
 *  - accessToken lives in JavaScript memory ONLY (this store, never persisted).
 *    This prevents XSS from reading the token out of localStorage / cookies.
 *  - refreshToken is stored in localStorage under `prep_refresh_token`.
 *    It survives page reloads and is used by the axios interceptor.
 *  - user object is persisted to localStorage so the UI can render immediately
 *    on reload without waiting for an extra network round-trip.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, UserRole } from "@/features/auth/types";

// ─── Constants ───────────────────────────────────────────────────────────────

/** localStorage key for the long-lived refresh token */
export const REFRESH_TOKEN_KEY = "prep_refresh_token";

/** Read refresh token from whichever storage it was saved to */
export const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY);
};

/** Save refresh token — localStorage when rememberMe, sessionStorage otherwise */
export const storeRefreshToken = (token: string, rememberMe: boolean): void => {
  if (typeof window === "undefined") return;
  if (rememberMe) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  } else {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

/** Remove refresh token from both storages */
export const clearRefreshToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};

// ─── State shape ─────────────────────────────────────────────────────────────

interface AuthState {
  /** Authenticated user — persisted for fast re-render on reload */
  user: User | null;

  /**
   * JWT access token — MEMORY ONLY, never persisted to localStorage.
   * Lost on page reload; silently refreshed by the axios interceptor.
   */
  accessToken: string | null;

  /** Derived: true when user + accessToken are both present */
  isAuthenticated: boolean;

  /** True while the initial /auth/me hydration is in-flight */
  isLoading: boolean;

  /**
   * Store auth state after a successful login / register / token refresh.
   * Saves refreshToken to localStorage (rememberMe=true) or sessionStorage (rememberMe=false).
   */
  setAuth: (user: User, accessToken: string, refreshToken: string, rememberMe?: boolean) => void;

  /**
   * Update only the access token after a silent refresh.
   * Does NOT touch the user object or refresh token.
   */
  setAccessToken: (accessToken: string) => void;

  /**
   * Clear all auth state and remove the refresh token from localStorage.
   * Caller is responsible for navigating to /login.
   */
  logout: () => void;

  /** Set loading flag (used during initial hydration) */
  setLoading: (loading: boolean) => void;

  /** Patch user fields after a profile update */
  updateUser: (updates: Partial<User>) => void;

  /** Check if the current user has one of the required roles */
  hasRole: (roles: UserRole[]) => boolean;
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      // accessToken is NOT in the persisted keys — intentional
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (user, accessToken, refreshToken, rememberMe = true) => {
        if (typeof window !== "undefined") {
          storeRefreshToken(refreshToken, rememberMe);
          // Lightweight cookies so Next.js middleware can check auth/role
          const maxAge = rememberMe ? 604800 : undefined; // 7 days or session
          const maxAgeStr = maxAge ? `; max-age=${maxAge}` : "";
          document.cookie = `isAuthenticated=true; path=/; SameSite=Lax${maxAgeStr}`;
          document.cookie = `userRole=${user.role}; path=/; SameSite=Lax${maxAgeStr}`;
        }
        set({ user, accessToken, isAuthenticated: true, isLoading: false });
      },

      setAccessToken: (accessToken) => set({ accessToken }),

      logout: () => {
        if (typeof window !== "undefined") {
          clearRefreshToken();
          document.cookie = `isAuthenticated=; path=/; max-age=0`;
          document.cookie = `userRole=; path=/; max-age=0`;
        }
        set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
      },

      setLoading: (loading) => set({ isLoading: loading }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      hasRole: (roles) => {
        const { user } = get();
        if (!user) return false;
        return roles.includes(user.role);
      },
    }),
    {
      name: "prepmed-auth",
      storage: createJSONStorage(() => localStorage),
      // Only persist user + isAuthenticated — never the access token
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
