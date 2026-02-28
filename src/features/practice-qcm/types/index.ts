import { BaseEntity, PaginatedResponse, PaginationParams } from "@/types";
import { Module } from "@/features/modules/types";
import { User } from "@/features/auth/types";

/**
 * PracticeQCM - Interactive multiple choice quiz set
 * Maps to NestJS PracticeQCM entity
 */
export interface PracticeQCM extends BaseEntity {
  title: string;
  description?: string;
  moduleId: string;
  module: Module;
  timeLimit?: number; // in minutes
  passingScore: number;
  questions: PracticeQuestion[];
  questionCount: number;
  isPublished: boolean;
}

/**
 * PracticeQuestion - Individual question in a quiz
 * Maps to NestJS PracticeQuestion entity
 */
export interface PracticeQuestion extends BaseEntity {
  qcmId: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
  order: number;
}

/**
 * PracticeAttempt - Student's answers & score for a quiz
 * Maps to NestJS PracticeAttempt entity
 */
export interface PracticeAttempt extends BaseEntity {
  userId: string;
  user: User;
  qcmId: string;
  qcm: PracticeQCM;
  answers: number[]; // index of selected options
  score: number;
  maxScore: number;
  percentage: number;
  isPassed: boolean;
  timeSpent: number; // in seconds
  startedAt: string;
  completedAt?: string;
}

export interface QCMFilters extends PaginationParams {
  moduleId?: string;
  search?: string;
  isPublished?: boolean;
}

export type QCMsResponse = PaginatedResponse<PracticeQCM>;

export interface CreateQCMInput {
  title: string;
  description?: string;
  moduleId: string;
  timeLimit?: number;
  passingScore: number;
}

export interface UpdateQCMInput extends Partial<CreateQCMInput> {
  isPublished?: boolean;
}

export interface CreateQuestionInput {
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
  order?: number;
}

export interface UpdateQuestionInput extends Partial<CreateQuestionInput> {}

export interface StartAttemptResponse {
  attemptId: string;
  qcm: PracticeQCM;
  startedAt: string;
}

export interface SubmitAttemptInput {
  answers: number[];
  timeSpent: number;
}

export interface SubmitAttemptResponse {
  attempt: PracticeAttempt;
  correctAnswers: number[];
  explanations: string[];
}
