import { BaseEntity, PaginatedResponse, PaginationParams } from "@/types";
import { Module } from "@/features/modules/types";
import { TeacherProfile, User } from "@/types/api";

/**
 * LiveSession - Scheduled Zoom/Meet class
 * Maps to NestJS LiveSession entity
 */
export interface LiveSession extends BaseEntity {
  title: string;
  description?: string;
  moduleId: string;
  module: Module;
  teacherId: string;
  teacher: TeacherProfile;
  meetingUrl: string;
  meetingPlatform: "zoom" | "meet" | "teams";
  startsAt: string;
  endsAt: string;
  maxAttendees?: number;
  isRecorded: boolean;
  recordingUrl?: string;
  attendees: LiveSessionAttendee[];
  attendeeCount: number;
  status: "scheduled" | "live" | "ended" | "cancelled";
}

/**
 * LiveSessionAttendee - Which students attend which session
 * Maps to NestJS LiveSessionAttendee entity
 */
export interface LiveSessionAttendee extends BaseEntity {
  sessionId: string;
  userId: string;
  user: User;
  joinedAt?: string;
  leftAt?: string;
  duration?: number; // in seconds
}

export interface LiveSessionFilters extends PaginationParams {
  moduleId?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

export type LiveSessionsResponse = PaginatedResponse<LiveSession>;

export interface CreateLiveSessionInput {
  title: string;
  description?: string;
  moduleId: string;
  meetingUrl: string;
  meetingPlatform: "zoom" | "meet" | "teams";
  startsAt: string;
  endsAt: string;
  maxAttendees?: number;
  isRecorded?: boolean;
}

export interface UpdateLiveSessionInput extends Partial<CreateLiveSessionInput> {
  status?: "scheduled" | "live" | "ended" | "cancelled";
  recordingUrl?: string;
}

export interface RegisterForSessionInput {
  sessionId: string;
}
