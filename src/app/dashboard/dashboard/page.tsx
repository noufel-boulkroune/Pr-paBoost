"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  useEnrollments,
  useStudentStats,
} from "@/features/users/hooks/useUser";
import { useAuthStore } from "@/store/authStore";
import { StatsCardSkeleton } from "@/components/ui/Skeleton";

const activityData = [40, 70, 55, 90, 65, 80, 45];
const activityLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { stats, isLoading: statsLoading } = useStudentStats();
  const { enrollments, isLoading: enrollmentsLoading } = useEnrollments();

  const statCards = [
    {
      label: "Enrolled Courses",
      value: stats?.enrolledCourses || 0,
      icon: "📚",
      gradient: "from-primary-500 to-primary-700",
      bg: "bg-primary-50",
      trend: "+2 this month",
      trendUp: true,
    },
    {
      label: "Completed",
      value: stats?.completedCourses || 0,
      icon: "✅",
      gradient: "from-success-500 to-success-700",
      bg: "bg-success-50",
      trend: "+1 this week",
      trendUp: true,
    },
    {
      label: "In Progress",
      value: stats?.inProgressCourses || 0,
      icon: "🔄",
      gradient: "from-warning-500 to-warning-700",
      bg: "bg-warning-50",
      trend: "Active now",
      trendUp: null,
    },
    {
      label: "Certificates",
      value: stats?.certificatesEarned || 0,
      icon: "🏆",
      gradient: "from-secondary-500 to-secondary-700",
      bg: "bg-secondary-50",
      trend: "Share on LinkedIn",
      trendUp: null,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-display-md font-bold text-text-primary">
            Welcome back,{" "}
            <span className="gradient-text">
              {user?.firstName || "Student"}
            </span>
            ! 👋
          </h1>
          <p className="text-body-md text-text-secondary mt-1">
            Here&apos;s what&apos;s happening with your learning journey
          </p>
        </div>
        <Link href="/public/courses">
          <Button>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Browse Courses
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      {statsLoading ? (
        <StatsCardSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.label} className="relative overflow-hidden">
              {/* Left accent */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${stat.gradient} rounded-l-2xl`}
              />
              <CardContent className="flex items-center gap-4 pl-5">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} text-xl flex items-center justify-center shadow-sm flex-shrink-0`}
                >
                  {stat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-caption text-text-muted uppercase tracking-wider font-semibold">
                    {stat.label}
                  </p>
                  <p className="text-display-sm font-bold text-text-primary leading-none mt-0.5">
                    {stat.value}
                  </p>
                  {stat.trend && (
                    <p
                      className={`text-caption mt-1 font-medium ${stat.trendUp ? "text-success-600" : "text-text-muted"}`}
                    >
                      {stat.trendUp && "↑ "}
                      {stat.trend}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Activity + Continue Learning */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart */}
        <Card className="lg:col-span-1">
          <CardContent>
            <h2 className="text-heading-lg font-bold text-text-primary mb-1">
              Weekly Activity
            </h2>
            <p className="text-caption text-text-muted mb-4">
              Minutes learned per day
            </p>
            <div className="flex items-end justify-between gap-1.5 h-28">
              {activityData.map((val, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1"
                >
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-primary-600 to-primary-400 transition-all duration-slow hover:from-primary-700 hover:to-primary-500 group relative"
                    style={{ height: `${val}%` }}
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-caption text-primary-600 font-semibold opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      {val}m
                    </span>
                  </div>
                  <span className="text-caption text-text-muted">
                    {activityLabels[i]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-heading-xl font-bold text-text-primary">
              Continue Learning
            </h2>
            <Link
              href="/dashboard/my-learning"
              className="text-body-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              View all
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {enrollmentsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="h-24 shimmer" />
                </Card>
              ))}
            </div>
          ) : enrollments.length > 0 ? (
            <div className="space-y-3">
              {enrollments.slice(0, 3).map((enrollment) => (
                <Card key={enrollment.id} isHoverable>
                  <CardContent className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex-shrink-0 overflow-hidden">
                      {enrollment.course.thumbnail ? (
                        <img
                          src={enrollment.course.thumbnail}
                          alt={enrollment.course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                          📚
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-heading-md font-bold text-text-primary truncate">
                        {enrollment.course.title}
                      </h3>
                      <p className="text-body-sm text-text-secondary">
                        {enrollment.course.instructor?.firstName ?? ""}{" "}
                        {enrollment.course.instructor?.lastName ?? ""}
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-caption mb-1">
                          <span className="text-primary-600 font-semibold">
                            {typeof enrollment.progress === "object" &&
                            "progressPercentage" in enrollment.progress
                              ? enrollment.progress.progressPercentage
                              : enrollment.progress}
                            % complete
                          </span>
                          <span className="text-text-muted">
                            {typeof enrollment.progress === "object" &&
                            "completedLessons" in enrollment.progress &&
                            "totalLessons" in enrollment.progress
                              ? `${enrollment.progress.completedLessons}/${enrollment.progress.totalLessons} lessons`
                              : ""}
                          </span>
                        </div>
                        <ProgressBar
                          value={
                            typeof enrollment.progress === "object" &&
                            "progressPercentage" in enrollment.progress
                              ? enrollment.progress.progressPercentage
                              : 0
                          }
                          size="sm"
                        />
                      </div>
                    </div>
                    <Link href={`/dashboard/learn/${enrollment.course.id}`}>
                      <Button variant="outline" size="sm">
                        Continue
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card variant="gradient">
              <CardContent className="text-center py-10">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="text-heading-md font-bold text-text-primary mb-2">
                  No courses yet
                </h3>
                <p className="text-body-md text-text-secondary mb-4">
                  Start your learning journey by enrolling in a course
                </p>
                <Link href="/public/courses">
                  <Button>Browse Courses</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Recommended Courses */}
      <div>
        <h2 className="text-heading-xl font-bold text-text-primary mb-4">
          Recommended for You
        </h2>
        <Card variant="gradient" className="border-dashed border-primary-200">
          <CardContent className="text-center py-10">
            <div className="text-4xl mb-3">✨</div>
            <p className="text-heading-md font-semibold text-text-primary mb-1">
              Personalized Recommendations
            </p>
            <p className="text-body-md text-text-secondary">
              Complete a few courses and we&apos;ll tailor recommendations just
              for you.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
