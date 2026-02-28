import { BaseEntity, PaginatedResponse, PaginationParams } from "@/types";
import { User } from "@/features/auth/types";

/**
 * StudySession - Focus timer sessions (study-with-me)
 * Maps to NestJS StudySession entity
 */
export interface StudySession extends BaseEntity {
  userId: string;
  user: User;
  startedAt: string;
  endedAt?: string;
  duration: number; // in minutes (planned)
  actualDuration?: number; // in minutes (actual)
  subject?: string;
  notes?: string;
  isCompleted: boolean;
}

export interface StudySessionFilters extends PaginationParams {
  fromDate?: string;
  toDate?: string;
}

export type StudySessionsResponse = PaginatedResponse<StudySession>;

export interface CreateStudySessionInput {
  duration: number; // in minutes
  subject?: string;
  notes?: string;
}

export interface UpdateStudySessionInput {
  notes?: string;
}

export interface StudyStats {
  totalSessions: number;
  totalMinutes: number;
  thisWeekSessions: number;
  thisWeekMinutes: number;
  averageSessionDuration: number;
  longestSession: number;
  currentStreak: number;
  longestStreak: number;
}
