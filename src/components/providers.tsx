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

import { ReactNode, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { QueryClient } from "@tanstack/react-query";
import { STALE_NORMAL } from "@/lib/query-client";

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
