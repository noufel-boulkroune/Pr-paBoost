import { BaseEntity, PaginatedResponse, PaginationParams } from "@/types";
import { Module } from "@/features/modules/types";

/**
 * Exam - Past papers (Annales)
 * Maps to NestJS Exam entity
 */
export interface Exam extends BaseEntity {
  title: string;
  description?: string;
  year: number;
  subject: string; // Subject/topic of the exam
  pdfUrl: string;
  correctionPdfUrl?: string;
  moduleId: string;
  module: Module;
  duration?: number; // suggested duration in minutes
  difficulty?: "easy" | "medium" | "hard";
  isPublished: boolean;
}

/**
 * Exam Progress - Student progress on an exam
 * Maps to NestJS ExamProgress entity
 */
export interface ExamProgress extends BaseEntity {
  userId: string;
  examId: string;
  exam: Exam;
  isCompleted: boolean;
  completedAt?: string;
}

export interface ExamFilters extends PaginationParams {
  moduleId?: string;
  year?: number;
  subject?: string;
  difficulty?: string;
  search?: string;
  isPublished?: boolean;
}

export type ExamsResponse = PaginatedResponse<Exam>;

export interface CreateExamInput {
  title: string;
  description?: string;
  year: number;
  subject: string;
  moduleId: string;
  duration?: number;
  difficulty?: "easy" | "medium" | "hard";
}

export interface UpdateExamInput extends Partial<CreateExamInput> {
  isPublished?: boolean;
}
