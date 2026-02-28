"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useInstructorStats } from "@/features/users/hooks/useUser";
import { ListSkeleton, StatsCardSkeleton } from "@/components/ui/Skeleton";

// Mock data for instructor courses
const mockCourses = [
  {
    id: "1",
    title: "Complete React Developer Course",
    students: 1234,
    rating: 4.8,
    revenue: 45600,
    status: "published",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    students: 567,
    rating: 4.9,
    revenue: 18900,
    status: "published",
    lastUpdated: "2024-01-10",
  },
  {
    id: "3",
    title: "Next.js 14 Masterclass",
    students: 0,
    rating: 0,
    revenue: 0,
    status: "draft",
    lastUpdated: "2024-01-20",
  },
];

export default function InstructorCoursesPage() {
  const { stats, isLoading: statsLoading } = useInstructorStats();

  const statCards = [
    { label: "Total Courses", value: stats?.totalCourses || 0, icon: "📚" },
    { label: "Total Students", value: stats?.totalStudents || 0, icon: "👥" },
    { label: "Total Revenue", value: `$${stats?.totalRevenue || 0}`, icon: "💰" },
    { label: "Avg Rating", value: stats?.averageRating || 0, icon: "⭐" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-display-md font-bold text-text-primary">My Courses</h1>
          <p className="text-body-md text-text-secondary mt-1">
            Manage your courses and track their performance
          </p>
        </div>
        <Link href="/dashboard/instructor/create-course">
          <Button leftIcon={<span>+</span>}>Create New Course</Button>
        </Link>
      </div>

      {/* Stats */}
      {statsLoading ? (
        <StatsCardSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-2xl flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-caption text-text-muted uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-display-sm font-bold text-text-primary">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Courses List */}
      <div className="space-y-4">
        <h2 className="text-heading-xl font-semibold text-text-primary">Your Courses</h2>
        
        {mockCourses.map((course) => (
          <Card key={course.id} isHoverable>
            <CardContent className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-full sm:w-40 h-24 rounded-lg bg-surface-2 flex-shrink-0 flex items-center justify-center text-3xl">
                📚
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-heading-md font-semibold text-text-primary">
                    {course.title}
                  </h3>
                  <Badge
                    variant={course.status === "published" ? "success" : "warning"}
                    size="sm"
                  >
                    {course.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-body-sm text-text-secondary">
                  <span>{course.students.toLocaleString()} students</span>
                  {course.rating > 0 && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-warning-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {course.rating.toFixed(1)}
                    </span>
                  )}
                  <span>Revenue: ${course.revenue.toLocaleString()}</span>
                  <span>Updated: {course.lastUpdated}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="ghost" size="sm">
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
