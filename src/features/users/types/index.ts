import { BaseEntity, PaginatedResponse } from "@/types";
import { Course, CourseProgress } from "@/features/courses/types";
import { User, UserRole } from "@/features/auth/types";
import { StudentStats as DashboardStudentStats, AdminStats } from "@/features/dashboard/types";

// Re-export stats from dashboard for backwards compatibility
export type StudentStats = DashboardStudentStats;
export type InstructorStats = AdminStats;

export interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: string;
  location?: string; // Backwards compatibility
  website?: string; // Backwards compatibility
}

export interface UpdateProfileInput extends ProfileUpdateData {}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Enrollment {
  id: string;
  course: Course;
  enrolledAt: string;
  progress: CourseProgress | number; // Can be number for backwards compatibility
}

export interface UserStats {
  totalEnrollments: number;
  completedCourses: number;
  totalStudyTime: number;
  certificatesEarned: number;
}

export interface TeacherApplication {
  bio: string;
  expertise: string[];
  experience: string;
}

export interface Certificate {
  id: string;
  course: Course;
  issuedAt: string;
  certificateUrl: string;
}

export type EnrollmentsResponse = PaginatedResponse<Enrollment>;

// Extended user profile
export interface UserProfile extends User {
  enrollments?: Enrollment[];
  stats?: UserStats;
  location?: string;
  website?: string;
}

// Backwards compatibility exports
export type { User, UserRole };
