"use client";

import { cn } from "@/lib/utils";
import { Course } from "@/features/courses/types";
import { CourseCard } from "./CourseCard";
import { CourseCardSkeleton } from "@/components/ui/Skeleton";

interface CourseGridProps {
  courses: Course[];
  isLoading?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function CourseGrid({
  courses,
  isLoading = false,
  columns = 3,
  className,
}: CourseGridProps) {
  const columnsClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  if (isLoading) {
    return (
      <div className={cn("grid gap-6", columnsClass[columns], className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-2 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="text-heading-md font-semibold text-text-primary mb-2">
          No courses found
        </h3>
        <p className="text-body-md text-text-secondary">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6", columnsClass[columns], className)}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
