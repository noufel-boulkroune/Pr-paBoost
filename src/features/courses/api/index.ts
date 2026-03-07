import { api } from "@/services/axios";
import {
  Course,
  CoursesResponse,
  CourseFilters,
  Lesson,
  CreateCourseInput,
  UpdateCourseInput,
  CreateLessonInput,
  UpdateLessonInput,
  LessonProgress,
  UpdateProgressInput,
  Category,
} from "../types";

/**
 * Courses API - Matches NestJS Backend
 * Base: /api/v1/courses
 */

const COURSES_BASE = "/courses";

export const coursesApi = {
  // ============================================================================
  // COURSES
  // ============================================================================

  /**
   * Get all courses with filters
   * GET /api/v1/courses
   */
  getCourses: (filters?: CourseFilters): Promise<CoursesResponse> =>
    api.get(COURSES_BASE, { params: filters }),

  /**
   * Get all published courses (public)
   * GET /api/v1/courses/published
   */
  getPublishedCourses: (): Promise<Course[]> =>
    api.get(`${COURSES_BASE}/published`),

  /**
   * Get featured courses (backwards compatibility)
   * GET /api/v1/courses/featured
   */
  getFeaturedCourses: (limit?: number): Promise<Course[]> =>
    api.get(`${COURSES_BASE}/featured`, { params: { limit } }),

  /**
   * Get courses by module
   * GET /api/v1/courses/module/:moduleId
   */
  getCoursesByModule: (moduleId: string): Promise<Course[]> =>
    api.get(`${COURSES_BASE}/module/${moduleId}`),

  /**
   * Get single course by ID
   * GET /api/v1/courses/:id
   */
  getCourse: (id: string): Promise<Course> =>
    api.get(`${COURSES_BASE}/${id}`),

  /**
   * Get course by slug
   * GET /api/v1/courses/slug/:slug
   */
  getCourseBySlug: (slug: string): Promise<Course> =>
    api.get(`${COURSES_BASE}/slug/${slug}`),

  /**
   * Create course (teacher/admin only)
   * POST /api/v1/courses
   */
  createCourse: (data: CreateCourseInput): Promise<Course> =>
    api.post(COURSES_BASE, data),

  /**
   * Update course
   * PUT /api/v1/courses/:id
   */
  updateCourse: (id: string, data: UpdateCourseInput): Promise<Course> =>
    api.patch(`${COURSES_BASE}/${id}`, data),

  /**
   * Delete course
   * DELETE /api/v1/courses/:id
   */
  deleteCourse: (id: string): Promise<void> =>
    api.delete(`${COURSES_BASE}/${id}`),

  /**
   * Upload course thumbnail
   * POST /api/v1/courses/:id/thumbnail
   */
  uploadThumbnail: (courseId: string, file: File): Promise<{ thumbnailUrl: string }> => {
    const formData = new FormData();
    formData.append("thumbnail", file);
    return api.post(`${COURSES_BASE}/${courseId}/thumbnail`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // ============================================================================
  // LESSONS
  // ============================================================================

  /**
   * Get lessons for a course
   * GET /api/v1/courses/:courseId/lessons
   */
  getLessons: (courseId: string): Promise<Lesson[]> =>
    api.get(`${COURSES_BASE}/${courseId}/lessons`),

  /**
   * Create lesson
   * POST /api/v1/courses/:courseId/lessons
   */
  createLesson: (courseId: string, data: CreateLessonInput): Promise<Lesson> =>
    api.post(`${COURSES_BASE}/${courseId}/lessons`, data),

  /**
   * Update lesson
   * PUT /api/v1/courses/:courseId/lessons/:lessonId
   */
  updateLesson: (courseId: string, lessonId: string, data: UpdateLessonInput): Promise<Lesson> =>
    api.put(`${COURSES_BASE}/${courseId}/lessons/${lessonId}`, data),

  /**
   * Delete lesson
   * DELETE /api/v1/courses/:courseId/lessons/:lessonId
   */
  deleteLesson: (courseId: string, lessonId: string): Promise<void> =>
    api.delete(`${COURSES_BASE}/${courseId}/lessons/${lessonId}`),

  /**
   * Upload lesson video
   * POST /api/v1/courses/:courseId/lessons/:lessonId/video
   */
  uploadLessonVideo: (courseId: string, lessonId: string, file: File): Promise<{ videoUrl: string }> => {
    const formData = new FormData();
    formData.append("video", file);
    return api.post(`${COURSES_BASE}/${courseId}/lessons/${lessonId}/video`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /**
   * Upload lesson PDF
   * POST /api/v1/courses/:courseId/lessons/:lessonId/pdf
   */
  uploadLessonPdf: (courseId: string, lessonId: string, file: File): Promise<{ pdfUrl: string }> => {
    const formData = new FormData();
    formData.append("pdf", file);
    return api.post(`${COURSES_BASE}/${courseId}/lessons/${lessonId}/pdf`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // ============================================================================
  // PROGRESS
  // ============================================================================

  /**
   * Get lesson progress for current user
   * GET /api/v1/courses/:courseId/lessons/:lessonId/progress
   */
  getLessonProgress: (courseId: string, lessonId: string): Promise<LessonProgress> =>
    api.get(`${COURSES_BASE}/${courseId}/lessons/${lessonId}/progress`),

  /**
   * Update lesson progress
   * POST /api/v1/courses/:courseId/lessons/:lessonId/progress
   */
  updateProgress: (courseId: string, lessonId: string, data: UpdateProgressInput): Promise<LessonProgress> =>
    api.post(`${COURSES_BASE}/${courseId}/lessons/${lessonId}/progress`, data),

  /**
   * Get course progress for current user
   * GET /api/v1/courses/:courseId/progress
   */
  getCourseProgress: (courseId: string): Promise<{
    totalLessons: number;
    completedLessons: number;
    progressPercent: number;
  }> =>
    api.get(`${COURSES_BASE}/${courseId}/progress`),

  // ============================================================================
  // CATEGORIES (Backwards compatibility)
  // ============================================================================

  /**
   * Get categories (redirects to categories feature)
   * GET /api/v1/categories
   */
  getCategories: (): Promise<Category[]> =>
    api.get("/categories"),

  getCategoryBySlug: (slug: string): Promise<Category> =>
    api.get(`/categories/${slug}`),
};
