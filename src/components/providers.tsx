/**
 * @file providers.tsx
 * @description Root client-side providers tree.
 * Next.js App Router requires a "use client" boundary for any context
 * that relies on browser APIs (QueryClient, Toaster, etc.).
 * Wrap the children of the root layout with this component.
 *
 * @example
 *   // src/app/layout.tsx
 *   <Providers>
 *     {children}
 *   </Providers>
 */

"use client";

import { ReactNode, useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { QueryClient } from "@tanstack/react-query";
import { STALE_NORMAL } from "@/lib/query-client";
import { useAuthStore, getRefreshToken, storeRefreshToken, REFRESH_TOKEN_KEY } from "@/store/authStore";
import { claimRefreshLock, releaseRefreshLock } from "@/services/axios";
import axios from "axios";

/** Props for the Providers wrapper */
interface ProvidersProps {
  /** Application subtree to wrap */
  children: ReactNode;
}

/**
 * Providers
 *
 * Wraps the entire application with:
 * - QueryClientProvider (TanStack Query v5) for server-state caching
 * - Sonner Toaster for global toast notifications
 * - ReactQueryDevtools (dev only) for cache inspection
 *
 * A new QueryClient is created per-request to prevent cross-request
 * state pollution in SSR scenarios (recommended by TanStack docs).
 */
/** Hydrates access token from refresh token on app startup */
function AuthHydrator() {
  const { setAccessToken, logout, setLoading } = useAuthStore();

  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      setLoading(false);
      return;
    }
    // rememberMe = token was in localStorage (not sessionStorage)
    const rememberMe = !!localStorage.getItem(REFRESH_TOKEN_KEY);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

    // Claim the shared refresh lock BEFORE the request so the axios interceptor
    // queues any 401s from dashboard API calls instead of initiating a second
    // concurrent refresh (which would break token rotation).
    claimRefreshLock();

    axios.post(`${apiUrl}/auth/refresh`, { refreshToken })
      .then((res) => {
        const body = res.data;
        const tokens = (body?.data ?? body) as { accessToken: string; refreshToken: string };
        setAccessToken(tokens.accessToken);
        storeRefreshToken(tokens.refreshToken, rememberMe);
        releaseRefreshLock(null, tokens.accessToken); // resume queued requests
        // Re-set cookies in case they were cleared
        const { user } = useAuthStore.getState();
        if (user) {
          const maxAge = rememberMe ? "; max-age=604800" : "";
          document.cookie = `isAuthenticated=true; path=/; SameSite=Lax${maxAge}`;
          document.cookie = `userRole=${user.role}; path=/; SameSite=Lax${maxAge}`;
        }
      })
      .catch((error) => {
        releaseRefreshLock(error, null); // fail queued requests
        // Only force logout when the server explicitly rejects the token.
        // Network errors (backend down) should keep the persisted UI state.
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          logout();
        }
      })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export function Providers({ children }: ProvidersProps) {
  // Stable QueryClient instance across re-renders (but fresh per-mount)
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
            staleTime: STALE_NORMAL,
            refetchOnWindowFocus: false,
          },
          mutations: { retry: 0 },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      <AuthHydrator />
      {children}

      {/* ── Sonner toast container ──────────────────────────────────────
          position: bottom-right on desktop, bottom-center on mobile
          richColors: uses semantic colors (success=green, error=red)
          expand: shows full message instead of truncating
      ─────────────────────────────────────────────────────────────── */}
      <Toaster
        position="bottom-right"
        richColors
        expand={false}
        duration={4000}
        closeButton
        toastOptions={{
          classNames: {
            toast: "font-sans text-body-sm",
          },
        }}
      />

      {/* ── TanStack Query DevTools — stripped from production build ─── */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
