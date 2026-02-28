import { api } from "@/services/axios";
import {
  StudySession,
  StudySessionsResponse,
  StudySessionFilters,
  StudyStats,
  CreateStudySessionInput,
  UpdateStudySessionInput,
} from "../types";

/**
 * Study Sessions API - Matches NestJS Backend
 * Base: /api/v1/study-sessions
 */

const STUDY_SESSIONS_BASE = "/study-sessions";

export const studySessionsApi = {
  // ============================================================================
  // STUDY SESSIONS
  // ============================================================================

  /**
   * Get my study sessions
   * GET /api/v1/study-sessions
   */
  getMySessions: (filters?: StudySessionFilters): Promise<StudySessionsResponse> =>
    api.get(STUDY_SESSIONS_BASE, { params: filters }),

  /**
   * Get my study stats
   * GET /api/v1/study-sessions/stats
   */
  getMyStats: (): Promise<StudyStats> =>
    api.get(`${STUDY_SESSIONS_BASE}/stats`),

  /**
   * Get active study session (if any)
   * GET /api/v1/study-sessions/active
   */
  getActiveSession: (): Promise<StudySession | null> =>
    api.get(`${STUDY_SESSIONS_BASE}/active`),

  /**
   * Start a new study session
   * POST /api/v1/study-sessions
   */
  startSession: (data: CreateStudySessionInput): Promise<StudySession> =>
    api.post(STUDY_SESSIONS_BASE, data),

  /**
   * End a study session
   * POST /api/v1/study-sessions/:id/end
   */
  endSession: (sessionId: string, actualDuration: number): Promise<StudySession> =>
    api.post(`${STUDY_SESSIONS_BASE}/${sessionId}/end`, { actualDuration }),

  /**
   * Update study session notes
   * PUT /api/v1/study-sessions/:id
   */
  updateSession: (sessionId: string, data: UpdateStudySessionInput): Promise<StudySession> =>
    api.put(`${STUDY_SESSIONS_BASE}/${sessionId}`, data),

  /**
   * Delete a study session
   * DELETE /api/v1/study-sessions/:id
   */
  deleteSession: (sessionId: string): Promise<void> =>
    api.delete(`${STUDY_SESSIONS_BASE}/${sessionId}`),
};
