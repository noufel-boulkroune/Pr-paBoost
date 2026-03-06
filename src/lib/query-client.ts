/**
 * @file query-client.ts
 * @description TanStack Query v5 global client configuration.
 * Centralises stale-time constants and default error/retry behaviour.
 * Import `queryClient` wherever you need programmatic cache access
 * (e.g. invalidation after mutations, prefetch on hover).
 */

import { QueryClient } from "@tanstack/react-query";

// ─── Stale-time constants (ms) ───────────────────────────────────────────────

/** Categories, plans, teachers — rarely change, safe to cache 5 min */
export const STALE_STATIC = 5 * 60 * 1000;

/** Courses, exams — change occasionally */
export const STALE_NORMAL = 2 * 60 * 1000;

/** Notifications, dashboard — change frequently */
export const STALE_REALTIME = 30 * 1000;

/** User profile — only refetch after a mutation */
export const STALE_NEVER = Infinity;

// ─── Singleton QueryClient ───────────────────────────────────────────────────

/**
 * The global QueryClient instance.
 * Shared between the React provider and any imperative cache operations.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry once before surfacing an error; avoids hammering a down server
      retry: 1,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
      // Keep data fresh for 2 minutes by default
      staleTime: STALE_NORMAL,
      // Don't refetch while the window is in the background
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Do not retry mutations — idempotency is not guaranteed
      retry: 0,
    },
  },
});
