/**
 * API Types for French Exam Prep Platform (NestJS Backend)
 * Base URL: /api/v1
 */

// ============================================================================
// BASE TYPES
// ============================================================================

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ============================================================================
// USER & AUTH
// ============================================================================

export type UserRole = "SUPER_ADMIN" | "SUB_ADMIN" | "STUDENT";

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  isEmailVerified: boolean;
  lastLoginAt?: string;
}

export interface TeacherProfile extends BaseEntity {
  userId: string;
  user: User;
  bio: string;
  specialty: string;
  courses: Course[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ============================================================================
// CONTENT HIERARCHY
// ============================================================================

// Category: Top level (e.g., "Médecine", "Droit")
export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
  moduleCount?: number;
}

// Module: Mid level (e.g., "Anatomie", "Biochimie")
export interface Module extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  categoryId: string;
  category: Category;
  imageUrl?: string;
  order: number;
  isActive: boolean;
  courseCount?: number;
  examCount?: number;
}

// Course: Inside a module (e.g., "Anatomie du cœur")
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
}

export interface CourseTeacher {
  courseId: string;
  teacherId: string;
  teacher: TeacherProfile;
  assignedAt: string;
}

// Lesson: Individual video/PDF
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
}

// ============================================================================
// PROGRESS TRACKING
// ============================================================================

export interface LessonProgress extends BaseEntity {
  userId: string;
  lessonId: string;
  lesson: Lesson;
  isCompleted: boolean;
  progressPercent: number;
  lastPosition: number; // seconds for video
  completedAt?: string;
}

export interface ExamProgress extends BaseEntity {
  userId: string;
  examId: string;
  exam: Exam;
  isCompleted: boolean;
  completedAt?: string;
}

// ============================================================================
// EXAMS (Annales)
// ============================================================================

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

// ============================================================================
// SUBSCRIPTIONS
// ============================================================================

export interface Plan extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  price: number;
  currency: string;
  durationDays: number;
  features: string[];
  isActive: boolean;
  permissions: PlanPermission[];
}

export interface PlanPermission {
  id: string;
  planId: string;
  moduleId: string;
  module: Module;
}

export interface Subscription extends BaseEntity {
  userId: string;
  user: User;
  planId: string;
  plan: Plan;
  status: "active" | "cancelled" | "expired" | "pending";
  startsAt: string;
  expiresAt: string;
  cancelledAt?: string;
}

// ============================================================================
// LIVE SESSIONS
// ============================================================================

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

export interface LiveSessionAttendee extends BaseEntity {
  sessionId: string;
  userId: string;
  user: User;
  joinedAt?: string;
  leftAt?: string;
  duration?: number; // in seconds
}

// ============================================================================
// STUDY SESSIONS (Focus Timer)
// ============================================================================

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

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export interface Notification extends BaseEntity {
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  link?: string;
  readAt?: string;
}

// ============================================================================
// PRACTICE QCM
// ============================================================================

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

export interface PracticeQuestion extends BaseEntity {
  qcmId: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
  order: number;
}

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

// ============================================================================
// DASHBOARD STATS
// ============================================================================

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
}

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
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  details?: Record<string, string[]>;
}

export interface ApiSuccessResponse<T> {
  data: T;
  message?: string;
}
