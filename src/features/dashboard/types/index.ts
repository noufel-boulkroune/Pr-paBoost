import { BaseEntity } from "@/types";
import { User } from "@/features/auth/types";
import { LessonProgress } from "@/features/courses/types";
import { ExamProgress } from "@/features/exams/types";
import { PracticeAttempt } from "@/features/practice-qcm/types";
import { LiveSession } from "@/features/live-sessions/types";
import { Subscription } from "@/features/subscriptions/types";
import { Course } from "@/features/courses/types";

/**
 * Student Stats - Dashboard data for students
 * Maps to NestJS Dashboard endpoint
 */
export interface StudentStats {
  // Progress
  totalLessonsCompleted: number;
  totalLessonsAvailable: number;
  totalExamsViewed: number;
  totalExamsAvailable: number;
  totalQCMsCompleted: number;
  totalQCMsAvailable: number;
  overallProgressPercent: number;

  // Study time
  totalStudyTimeMinutes: number;
  studySessionsCount: number;
  thisWeekStudyTimeMinutes: number;

  // Subscriptions
  currentSubscription?: Subscription;
  subscriptionExpiresAt?: string;

  // Recent activity
  recentLessons: LessonProgress[];
  recentQCMs: PracticeAttempt[];
  upcomingLiveSessions: LiveSession[];

  // Achievements
  streakDays: number;
  longestStreakDays: number;

  // Backwards compatibility fields
  enrolledCourses?: number;
  completedCourses?: number;
  inProgressCourses?: number;
  certificatesEarned?: number;
  averageScore?: number;
  studyStreak?: number;
  lastActive?: string;
}

/**
 * Admin Stats - Dashboard data for admins
 * Maps to NestJS Dashboard endpoint
 */
export interface AdminStats {
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalLessons: number;
  totalExams: number;
  activeSubscriptions: number;
  revenueThisMonth: number;
  recentSignups: User[];

  // Backwards compatibility for instructor stats
  totalRevenue?: number;
  averageRating?: number;
  totalStudentsCount?: number;
}

/**
 * Activity item for activity feed
 */
export interface ActivityItem {
  id: string;
  type: "lesson_completed" | "exam_viewed" | "qcm_completed" | "session_joined" | "study_session";
  title: string;
  description?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

/**
 * Progress by module
 */
export interface ModuleProgress {
  moduleId: string;
  moduleName: string;
  categoryName: string;
  lessonsCompleted: number;
  lessonsTotal: number;
  examsViewed: number;
  examsTotal: number;
  qcmsCompleted: number;
  qcmsTotal: number;
  progressPercent: number;

  // Backwards compatibility
  courses?: Course[];
  completedLessons?: number;
  totalLessons?: number;
  completedExams?: number;
  totalExams?: number;
  completedQCMs?: number;
  totalQCMs?: number;
}
