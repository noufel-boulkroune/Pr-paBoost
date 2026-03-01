/**
 * Feature Exports
 * 
 * This file exports all features for easy importing.
 * Example: import { useAuth, useCourses } from '@/features';
 */

// Auth
export * from "./auth/types";
export * from "./auth/api";
export { useAuth, useAuthStatus } from "./auth/hooks/useAuth";

// Categories - export separately to avoid naming conflicts
export type { 
  Category as ContentCategory,
  CategoryFilters,
  CategoriesResponse,
  CreateCategoryInput,
  UpdateCategoryInput
} from "./categories/types";
export { categoriesApi } from "./categories/api";
export { 
  useCategories, 
  useActiveCategories, 
  useCategory, 
  useCategoryMutations 
} from "./categories/hooks/useCategories";

// Modules
export * from "./modules/types";
export * from "./modules/api";
export { 
  useModules, 
  useActiveModules, 
  useModulesByCategory, 
  useModule, 
  useModuleMutations 
} from "./modules/hooks/useModules";

// Courses
export * from "./courses/types";
export * from "./courses/api";
export { useCourses, useCourse, useFeaturedCourses, useCategories as useCourseCategories } from "./courses/hooks/useCourses";

// Exams (Annales)
export * from "./exams/types";
export * from "./exams/api";
export { 
  useExams, 
  usePublishedExams, 
  useExamsByModule, 
  useExam, 
  useExamFilters, 
  useExamMutations,
  useExamProgress 
} from "./exams/hooks/useExams";

// Subscriptions
export * from "./subscriptions/types";
export { plansApi, subscriptionsApi } from "./subscriptions/api";
export { 
  usePlans, 
  useActivePlans, 
  usePlan, 
  usePlanMutations,
  useMySubscription,
  useSubscriptionHistory,
  useSubscriptionCheckout,
  useModuleAccess
} from "./subscriptions/hooks/useSubscriptions";

// Live Sessions
export * from "./live-sessions/types";
export * from "./live-sessions/api";
export { 
  useLiveSessions, 
  useUpcomingSessions, 
  useSessionsByModule, 
  useLiveSession,
  useMyRegistrations,
  useSessionRegistration,
  useLiveSessionMutations,
  useSessionAttendees
} from "./live-sessions/hooks/useLiveSessions";

// Practice QCM
export * from "./practice-qcm/types";
export * from "./practice-qcm/api";
export { 
  useQCMs, 
  usePublishedQCMs, 
  useQCMsByModule, 
  useQCM,
  useQCMMutations,
  useQuestions,
  useQCMAttempts,
  useAllMyAttempts,
  useActiveAttempt
} from "./practice-qcm/hooks/usePracticeQCM";

// Dashboard - export separately to avoid naming conflicts
export type {
  ActivityItem,
  ModuleProgress,
  AdminStats
} from "./dashboard/types";
export { dashboardApi } from "./dashboard/api";
export { 
  useStudentStats, 
  useStudentActivity, 
  useModuleProgress,
  useAdminStats,
  useRevenueData,
  useUserGrowthData
} from "./dashboard/hooks/useDashboard";
// Re-export StudentStats with alias to avoid conflict
export type { StudentStats as DashboardStudentStats } from "./dashboard/types";

// Study Sessions
export * from "./study-sessions/types";
export * from "./study-sessions/api";
export { 
  useStudySessions, 
  useStudyStats, 
  useActiveStudySession,
  useStudySessionMutations,
  useStudyTimer
} from "./study-sessions/hooks/useStudySessions";

// Users (backwards compatibility)
export * from "./users/types";
export * from "./users/api";
export * from "./users/hooks/useUser";
