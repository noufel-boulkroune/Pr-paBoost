import { api } from "@/services/axios";
import {
  LiveSession,
  LiveSessionsResponse,
  LiveSessionFilters,
  LiveSessionAttendee,
  CreateLiveSessionInput,
  UpdateLiveSessionInput,
} from "../types";

/**
 * Live Sessions API - Matches NestJS Backend
 * Base: /api/v1/live-sessions
 */

const LIVE_SESSIONS_BASE = "/live-sessions";

export const liveSessionsApi = {
  // ============================================================================
  // PUBLIC ENDPOINTS
  // ============================================================================

  /**
   * Get all live sessions with filters
   * GET /api/v1/live-sessions
   */
  getLiveSessions: (filters?: LiveSessionFilters): Promise<LiveSessionsResponse> =>
    api.get(LIVE_SESSIONS_BASE, { params: filters }),

  /**
   * Get upcoming live sessions
   * GET /api/v1/live-sessions/upcoming
   */
  getUpcomingSessions: (limit?: number): Promise<LiveSession[]> =>
    api.get(`${LIVE_SESSIONS_BASE}/upcoming`, { params: { limit } }),

  /**
   * Get live sessions by module
   * GET /api/v1/live-sessions/module/:moduleId
   */
  getSessionsByModule: (moduleId: string): Promise<LiveSession[]> =>
    api.get(`${LIVE_SESSIONS_BASE}/module/${moduleId}`),

  /**
   * Get single live session by ID
   * GET /api/v1/live-sessions/:id
   */
  getLiveSession: (id: string): Promise<LiveSession> =>
    api.get(`${LIVE_SESSIONS_BASE}/${id}`),

  /**
   * Register for a live session
   * POST /api/v1/live-sessions/:id/register
   */
  registerForSession: (sessionId: string): Promise<LiveSessionAttendee> =>
    api.post(`${LIVE_SESSIONS_BASE}/${sessionId}/register`),

  /**
   * Get my registered sessions
   * GET /api/v1/live-sessions/me/registrations
   */
  getMyRegistrations: (): Promise<LiveSession[]> =>
    api.get(`${LIVE_SESSIONS_BASE}/me/registrations`),

  // ============================================================================
  // TEACHER/ADMIN ENDPOINTS
  // ============================================================================

  /**
   * Create live session (teacher/admin only)
   * POST /api/v1/live-sessions
   */
  createLiveSession: (data: CreateLiveSessionInput): Promise<LiveSession> =>
    api.post(LIVE_SESSIONS_BASE, data),

  /**
   * Update live session
   * PUT /api/v1/live-sessions/:id
   */
  updateLiveSession: (id: string, data: UpdateLiveSessionInput): Promise<LiveSession> =>
    api.put(`${LIVE_SESSIONS_BASE}/${id}`, data),

  /**
   * Delete live session
   * DELETE /api/v1/live-sessions/:id
   */
  deleteLiveSession: (id: string): Promise<void> =>
    api.delete(`${LIVE_SESSIONS_BASE}/${id}`),

  /**
   * Get attendees for a session (teacher/admin only)
   * GET /api/v1/live-sessions/:id/attendees
   */
  getSessionAttendees: (sessionId: string): Promise<LiveSessionAttendee[]> =>
    api.get(`${LIVE_SESSIONS_BASE}/${sessionId}/attendees`),

  /**
   * Mark session as live (teacher/admin only)
   * POST /api/v1/live-sessions/:id/go-live
   */
  goLive: (sessionId: string): Promise<LiveSession> =>
    api.post(`${LIVE_SESSIONS_BASE}/${sessionId}/go-live`),

  /**
   * End live session (teacher/admin only)
   * POST /api/v1/live-sessions/:id/end
   */
  endSession: (sessionId: string): Promise<LiveSession> =>
    api.post(`${LIVE_SESSIONS_BASE}/${sessionId}/end`),

  /**
   * Upload recording (teacher/admin only)
   * POST /api/v1/live-sessions/:id/recording
   */
  uploadRecording: (sessionId: string, recordingUrl: string): Promise<LiveSession> =>
    api.post(`${LIVE_SESSIONS_BASE}/${sessionId}/recording`, { recordingUrl }),
};
