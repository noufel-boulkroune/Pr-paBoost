"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useEnrollments } from "@/features/users/hooks/useUser";
import { ListSkeleton } from "@/components/ui/Skeleton";

export default function MyLearningPage() {
  const { enrollments, isLoading } = useEnrollments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display-md font-bold text-text-primary">
          My Learning
        </h1>
        <p className="text-body-md text-text-secondary mt-1">
          Track your progress and continue where you left off
        </p>
      </div>

      {isLoading ? (
        <ListSkeleton count={3} />
      ) : enrollments.length > 0 ? (
        <div className="space-y-4">
          {enrollments.map((enrollment) => {
            const progressPct =
              typeof enrollment.progress === "object" &&
              "progressPercentage" in enrollment.progress
                ? enrollment.progress.progressPercentage
                : (enrollment.progress as number);

            const completedLessons =
              typeof enrollment.progress === "object" &&
              "completedLessons" in enrollment.progress
                ? enrollment.progress.completedLessons
                : null;

            const totalLessons =
              typeof enrollment.progress === "object" &&
              "totalLessons" in enrollment.progress
                ? enrollment.progress.totalLessons
                : null;

            return (
              <Card key={enrollment.id} isHoverable>
                <CardContent className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-full sm:w-48 h-28 rounded-lg bg-surface-2 flex-shrink-0 overflow-hidden">
                    {enrollment.course.thumbnail ? (
                      <img
                        src={enrollment.course.thumbnail}
                        alt={enrollment.course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">
                        📚
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-heading-lg font-semibold text-text-primary mb-1">
                      {enrollment.course.title}
                    </h3>
                    <p className="text-body-sm text-text-secondary mb-3">
                      {enrollment.course.instructor?.firstName ?? ""}{" "}
                      {enrollment.course.instructor?.lastName ?? ""}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-caption">
                        <span className="text-text-muted">
                          {progressPct}% complete
                        </span>
                        <span className="text-text-muted">
                          {completedLessons !== null && totalLessons !== null
                            ? `${completedLessons} of ${totalLessons} lessons`
                            : ""}
                        </span>
                      </div>
                      <ProgressBar value={progressPct} size="md" />
                    </div>
                  </div>
                  <Link href={`/dashboard/learn/${enrollment.course.id}`}>
                    <Button className="w-full sm:w-auto">
                      {progressPct === 0
                        ? "Start Course"
                        : progressPct === 100
                          ? "Review"
                          : "Continue"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-2 flex items-center justify-center text-3xl">
              📚
            </div>
            <h3 className="text-heading-lg font-semibold text-text-primary mb-2">
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
  );
}
