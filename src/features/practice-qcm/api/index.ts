import { api } from "@/services/axios";
import {
  PracticeQCM,
  QCMsResponse,
  QCMFilters,
  PracticeQuestion,
  PracticeAttempt,
  CreateQCMInput,
  UpdateQCMInput,
  CreateQuestionInput,
  UpdateQuestionInput,
  StartAttemptResponse,
  SubmitAttemptInput,
  SubmitAttemptResponse,
} from "../types";

/**
 * Practice QCM API - Matches NestJS Backend
 * Base: /api/v1/practice-qcm
 */

const QCM_BASE = "/practice-qcm";

export const practiceQCMApi = {
  // ============================================================================
  // QCMs
  // ============================================================================

  /**
   * Get all QCMs with filters
   * GET /api/v1/practice-qcm
   */
  getQCMs: (filters?: QCMFilters): Promise<QCMsResponse> =>
    api.get(QCM_BASE, { params: filters }),

  /**
   * Get all published QCMs (public)
   * GET /api/v1/practice-qcm/published
   */
  getPublishedQCMs: (): Promise<PracticeQCM[]> =>
    api.get(`${QCM_BASE}/published`),

  /**
   * Get QCMs by module
   * GET /api/v1/practice-qcm/module/:moduleId
   */
  getQCMsByModule: (moduleId: string): Promise<PracticeQCM[]> =>
    api.get(`${QCM_BASE}/module/${moduleId}`),

  /**
   * Get single QCM by ID
   * GET /api/v1/practice-qcm/:id
   */
  getQCM: (id: string): Promise<PracticeQCM> =>
    api.get(`${QCM_BASE}/${id}`),

  /**
   * Create QCM (teacher/admin only)
   * POST /api/v1/practice-qcm
   */
  createQCM: (data: CreateQCMInput): Promise<PracticeQCM> =>
    api.post(QCM_BASE, data),

  /**
   * Update QCM
   * PUT /api/v1/practice-qcm/:id
   */
  updateQCM: (id: string, data: UpdateQCMInput): Promise<PracticeQCM> =>
    api.put(`${QCM_BASE}/${id}`, data),

  /**
   * Delete QCM
   * DELETE /api/v1/practice-qcm/:id
   */
  deleteQCM: (id: string): Promise<void> =>
    api.delete(`${QCM_BASE}/${id}`),

  // ============================================================================
  // QUESTIONS
  // ============================================================================

  /**
   * Get questions for a QCM
   * GET /api/v1/practice-qcm/:qcmId/questions
   */
  getQuestions: (qcmId: string): Promise<PracticeQuestion[]> =>
    api.get(`${QCM_BASE}/${qcmId}/questions`),

  /**
   * Create question (teacher/admin only)
   * POST /api/v1/practice-qcm/:qcmId/questions
   */
  createQuestion: (qcmId: string, data: CreateQuestionInput): Promise<PracticeQuestion> =>
    api.post(`${QCM_BASE}/${qcmId}/questions`, data),

  /**
   * Update question
   * PUT /api/v1/practice-qcm/:qcmId/questions/:questionId
   */
  updateQuestion: (qcmId: string, questionId: string, data: UpdateQuestionInput): Promise<PracticeQuestion> =>
    api.put(`${QCM_BASE}/${qcmId}/questions/${questionId}`, data),

  /**
   * Delete question
   * DELETE /api/v1/practice-qcm/:qcmId/questions/:questionId
   */
  deleteQuestion: (qcmId: string, questionId: string): Promise<void> =>
    api.delete(`${QCM_BASE}/${qcmId}/questions/${questionId}`),

  /**
   * Reorder questions
   * POST /api/v1/practice-qcm/:qcmId/questions/reorder
   */
  reorderQuestions: (qcmId: string, questionIds: string[]): Promise<void> =>
    api.post(`${QCM_BASE}/${qcmId}/questions/reorder`, { questionIds }),

  // ============================================================================
  // ATTEMPTS
  // ============================================================================

  /**
   * Start a new attempt
   * POST /api/v1/practice-qcm/:id/attempts
   */
  startAttempt: (qcmId: string): Promise<StartAttemptResponse> =>
    api.post(`${QCM_BASE}/${qcmId}/attempts`),

  /**
   * Submit attempt answers
   * POST /api/v1/practice-qcm/attempts/:attemptId/submit
   */
  submitAttempt: (attemptId: string, data: SubmitAttemptInput): Promise<SubmitAttemptResponse> =>
    api.post(`${QCM_BASE}/attempts/${attemptId}/submit`, data),

  /**
   * Get my attempts for a QCM
   * GET /api/v1/practice-qcm/:id/my-attempts
   */
  getMyAttempts: (qcmId: string): Promise<PracticeAttempt[]> =>
    api.get(`${QCM_BASE}/${qcmId}/my-attempts`),

  /**
   * Get all my attempts
   * GET /api/v1/practice-qcm/attempts/my
   */
  getAllMyAttempts: (): Promise<PracticeAttempt[]> =>
    api.get(`${QCM_BASE}/attempts/my`),

  /**
   * Get attempt details
   * GET /api/v1/practice-qcm/attempts/:id
   */
  getAttempt: (attemptId: string): Promise<PracticeAttempt> =>
    api.get(`${QCM_BASE}/attempts/${attemptId}`),
};
