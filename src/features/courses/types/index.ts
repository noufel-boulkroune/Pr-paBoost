import { BaseEntity, PaginatedResponse, PaginationParams } from "@/types";
import { Module } from "@/features/modules/types";
import { TeacherProfile, User } from "@/types/api";

/**
 * Course - Inside a module (e.g., "Anatomie du cœur")
 * Maps to NestJS Course entity
 */
export interface Course extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  moduleId: string;
  module: Module;
  teachers: CourseTeacher[];
  lessons: Lesson[];
  totalLessons: number;
  totalDuration: number; // in seconds
  isPublished: boolean;
  order: number;
  
  // Backwards compatibility fields (for existing UI components)
  instructor?: Instructor; // Computed from teachers[0]
  price?: number;
  currency?: string;
  compareAtPrice?: number;
  level?: "beginner" | "intermediate" | "advanced" | "all-levels";
  language?: string;
  rating?: number;
  reviewCount?: number;
  enrollmentCount?: number;
  isFeatured?: boolean;
  categories?: Category[];
  sections?: Section[];
  trailerUrl?: string;
  learningOutcomes?: string[];
  requirements?: string[];
  targetAudience?: string[];
  tags?: string[];
}

export interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  totalStudents?: number;
  totalCourses?: number;
  rating?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  courseCount?: number;
}

export interface CourseTeacher {
  courseId: string;
  teacherId: string;
  teacher: TeacherProfile;
  assignedAt: string;
}

/**
 * Section - Group of lessons within a course
 * Backwards compatibility for existing UI
 */
export interface Section {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

/**
 * Lesson - Individual video/PDF lesson
 * Maps to NestJS Lesson entity
 */
export interface Lesson extends BaseEntity {
  title: string;
  description?: string;
  videoUrl?: string;
  pdfUrl?: string;
  duration: number; // in seconds
  order: number;
  courseId: string;
  course: Course;
  isPublished: boolean;
  isPreview?: boolean;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: "pdf" | "video" | "link" | "file";
  url: string;
  size?: number;
}

/**
 * Lesson Progress - Student progress on a lesson
 * Maps to NestJS LessonProgress entity
 */
export interface LessonProgress extends BaseEntity {
  userId: string;
  lessonId: string;
  lesson: Lesson;
  isCompleted: boolean;
  progressPercent: number;
  lastPosition: number; // seconds for video
  completedAt?: string;
}

/**
 * Course Progress - Overall progress in a course
 * Backwards compatibility
 */
export interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  totalLessons: number;
  progressPercentage: number;
  lastAccessedAt: string;
}

export interface CourseFilters extends PaginationParams {
  moduleId?: string;
  categoryId?: string; // Backwards compatibility
  category?: string; // Backwards compatibility
  search?: string;
  isPublished?: boolean;
  level?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  instructor?: string;
  language?: string;
}

export type CoursesResponse = PaginatedResponse<Course>;

export interface CreateCourseInput {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  moduleId: string;
  thumbnail?: string;
  order?: number;
  price?: number;
  level?: Course["level"];
  language?: string;
  categoryIds?: string[];
  learningOutcomes?: string[];
  requirements?: string[];
  targetAudience?: string[];
  tags?: string[];
}

export interface UpdateCourseInput extends Partial<CreateCourseInput> {
  isPublished?: boolean;
}

export interface CreateLessonInput {
  title: string;
  description?: string;
  videoUrl?: string;
  pdfUrl?: string;
  duration?: number;
  order?: number;
  isPreview?: boolean;
}

export interface UpdateLessonInput extends Partial<CreateLessonInput> {
  isPublished?: boolean;
}

export interface UpdateProgressInput {
  isCompleted?: boolean;
  progressPercent?: number;
  lastPosition?: number;
}
