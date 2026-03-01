import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole } from "@/features/auth/types";

// Simplified role names used in UI components
export type SimplifiedRole = "student" | "instructor" | "admin";

// Helper function to map simplified role to UserRole
const mapSimplifiedRole = (role: UserRole | SimplifiedRole): UserRole => {
  switch (role) {
    case "student":
      return "STUDENT";
    case "instructor":
      return "SUB_ADMIN";
    case "admin":
      return "SUPER_ADMIN";
    default:
      return role;
  }
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setAuth: (user: User) => void;
  clearAuth: () => void;
  logout: () => void; // Alias for clearAuth
  setLoading: (loading: boolean) => void;
  updateUser: (updates: Partial<User>) => void;
  hasRole: (roles: (UserRole | SimplifiedRole)[] | UserRole | SimplifiedRole) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (user) =>
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        }),

      clearAuth: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      logout: () => {
        get().clearAuth();
      },

      setLoading: (loading) =>
        set({
          isLoading: loading,
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      hasRole: (roles: (UserRole | SimplifiedRole)[] | UserRole | SimplifiedRole) => {
        const { user } = get();
        if (!user) return false;
        const roleArray = Array.isArray(roles) ? roles : [roles];
        const mappedRoles = roleArray.map(mapSimplifiedRole);
        return mappedRoles.includes(user.role);
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
