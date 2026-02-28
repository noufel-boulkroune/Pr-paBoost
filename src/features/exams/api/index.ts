import { api } from "@/services/axios";
import {
  Exam,
  ExamsResponse,
  ExamFilters,
  ExamProgress,
  CreateExamInput,
  UpdateExamInput,
} from "../types";

/**
 * Exams API - Matches NestJS Backend
 * Base: /api/v1/exams
 */

const EXAMS_BASE = "/exams";

export const examsApi = {
  // ============================================================================
  // EXAMS
  // ============================================================================

  /**
   * Get all exams with filters
   * GET /api/v1/exams
   */
  getExams: (filters?: ExamFilters): Promise<ExamsResponse> =>
    api.get(EXAMS_BASE, { params: filters }),

  /**
   * Get all published exams (public)
   * GET /api/v1/exams/published
   */
  getPublishedExams: (): Promise<Exam[]> =>
    api.get(`${EXAMS_BASE}/published`),

  /**
   * Get exams by module
   * GET /api/v1/exams/module/:moduleId
   */
  getExamsByModule: (moduleId: string): Promise<Exam[]> =>
    api.get(`${EXAMS_BASE}/module/${moduleId}`),

  /**
   * Get available years for filtering
   * GET /api/v1/exams/years
   */
  getAvailableYears: (): Promise<number[]> =>
    api.get(`${EXAMS_BASE}/years`),

  /**
   * Get available subjects for filtering
   * GET /api/v1/exams/subjects
   */
  getAvailableSubjects: (): Promise<string[]> =>
    api.get(`${EXAMS_BASE}/subjects`),

  /**
   * Get single exam by ID
   * GET /api/v1/exams/:id
   */
  getExam: (id: string): Promise<Exam> =>
    api.get(`${EXAMS_BASE}/${id}`),

  /**
   * Create exam (admin only)
   * POST /api/v1/exams
   */
  createExam: (data: CreateExamInput): Promise<Exam> =>
    api.post(EXAMS_BASE, data),

  /**
   * Update exam (admin only)
   * PUT /api/v1/exams/:id
   */
  updateExam: (id: string, data: UpdateExamInput): Promise<Exam> =>
    api.put(`${EXAMS_BASE}/${id}`, data),

  /**
   * Delete exam (admin only)
   * DELETE /api/v1/exams/:id
   */
  deleteExam: (id: string): Promise<void> =>
    api.delete(`${EXAMS_BASE}/${id}`),

  /**
   * Upload exam PDF
   * POST /api/v1/exams/:id/pdf
   */
  uploadPdf: (examId: string, file: File): Promise<{ pdfUrl: string }> => {
    const formData = new FormData();
    formData.append("pdf", file);
    return api.post(`${EXAMS_BASE}/${examId}/pdf`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /**
   * Upload correction PDF
   * POST /api/v1/exams/:id/correction
   */
  uploadCorrection: (examId: string, file: File): Promise<{ correctionPdfUrl: string }> => {
    const formData = new FormData();
    formData.append("correction", file);
    return api.post(`${EXAMS_BASE}/${examId}/correction`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // ============================================================================
  // PROGRESS
  // ============================================================================

  /**
   * Mark exam as viewed/completed
   * POST /api/v1/exams/:id/progress
   */
  markAsCompleted: (examId: string): Promise<ExamProgress> =>
    api.post(`${EXAMS_BASE}/${examId}/progress`, { isCompleted: true }),

  /**
   * Get exam progress for current user
   * GET /api/v1/exams/:id/progress
   */
  getExamProgress: (examId: string): Promise<ExamProgress> =>
    api.get(`${EXAMS_BASE}/${examId}/progress`),

  /**
   * Get all exam progress for current user
   * GET /api/v1/exams/progress/all
   */
  getAllExamProgress: (): Promise<ExamProgress[]> =>
    api.get(`${EXAMS_BASE}/progress/all`),
};
