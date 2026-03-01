"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Course } from "@/features/courses/types";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";

const DEFAULT_THUMBNAIL = "/images/course-placeholder.jpg";

interface CourseCardProps {
  course: Course;
  variant?: "default" | "compact" | "horizontal";
  className?: string;
}

export function CourseCard({ course, variant = "default", className }: CourseCardProps) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  if (variant === "horizontal") {
    return (
      <Link
        href={`/public/course/${course.slug}`}
        className={cn(
          "flex gap-4 p-4 rounded-xl border border-border bg-surface-1",
          "hover:shadow-md transition-all duration-fast",
          className
        )}
      >
        <div className="relative w-48 h-28 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={course.thumbnail || DEFAULT_THUMBNAIL}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-heading-md font-semibold text-text-primary line-clamp-1">
            {course.title}
          </h3>
          {course.instructor && (
            <p className="text-body-sm text-text-secondary mt-1">
              {course.instructor.firstName} {course.instructor.lastName}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="default" size="sm">
              {course.level || "All Levels"}
            </Badge>
            <span className="text-caption text-text-muted">
              {course.totalLessons} lessons
            </span>
          </div>
          {course.rating !== undefined && course.rating > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-warning-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-body-sm font-medium text-text-primary">
                  {course.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-caption text-text-muted">
                ({course.reviewCount || 0} reviews)
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-heading-md font-bold text-text-primary">
              {formatPrice(course.price || 0, course.currency || "USD")}
            </span>
            {course.compareAtPrice !== undefined && course.compareAtPrice > 0 && (
              <span className="text-body-sm text-text-muted line-through">
                {formatPrice(course.compareAtPrice, course.currency || "USD")}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/public/course/${course.slug}`}
        className={cn(
          "block rounded-xl border border-border bg-surface-1 overflow-hidden",
          "hover:shadow-md transition-all duration-fast",
          className
        )}
      >
        <div className="relative aspect-video">
          <Image
            src={course.thumbnail || DEFAULT_THUMBNAIL}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-3">
          <h3 className="text-body-md font-semibold text-text-primary line-clamp-1">
            {course.title}
          </h3>
          {course.instructor && (
            <p className="text-caption text-text-secondary mt-0.5">
              {course.instructor.firstName} {course.instructor.lastName}
            </p>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className="text-body-sm font-bold text-text-primary">
              {formatPrice(course.price || 0, course.currency || "USD")}
            </span>
            {course.rating !== undefined && course.rating > 0 && (
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-warning-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-caption text-text-primary">{course.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/public/course/${course.slug}`}
      className={cn(
        "block rounded-xl border border-border bg-surface-1 overflow-hidden",
        "hover:shadow-lg hover:-translate-y-0.5 transition-all duration-fast",
        className
      )}
    >
      <div className="relative aspect-video">
        <Image
          src={course.thumbnail || DEFAULT_THUMBNAIL}
          alt={course.title}
          fill
          className="object-cover"
        />
        {course.isFeatured && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" size="sm">
              Featured
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" size="sm">
            {course.level}
          </Badge>
          <span className="text-caption text-text-muted">
            {formatDuration(course.totalDuration)}
          </span>
        </div>
        <h3 className="text-heading-md font-semibold text-text-primary line-clamp-2 mb-2">
          {course.title}
        </h3>
        <p className="text-body-sm text-text-secondary line-clamp-2 mb-3">
          {course.shortDescription || course.description}
        </p>
        {course.instructor && (
          <div className="flex items-center gap-2 mb-3">
            <Avatar
              src={course.instructor.avatar}
              name={`${course.instructor.firstName || ""} ${course.instructor.lastName || ""}`}
              size="sm"
            />
            <span className="text-body-sm text-text-secondary">
              {course.instructor.firstName} {course.instructor.lastName}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          {course.rating !== undefined && course.rating > 0 ? (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-warning-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-body-sm font-medium text-text-primary">
                {course.rating.toFixed(1)}
              </span>
              <span className="text-caption text-text-muted">
                ({course.reviewCount || 0})
              </span>
            </div>
          ) : (
            <span className="text-caption text-text-muted">No ratings yet</span>
          )}
          <div className="flex items-center gap-2">
            {course.compareAtPrice !== undefined && course.compareAtPrice > 0 && (
              <span className="text-body-sm text-text-muted line-through">
                {formatPrice(course.compareAtPrice, course.currency || "USD")}
              </span>
            )}
            <span className="text-heading-md font-bold text-primary-600">
              {formatPrice(course.price || 0, course.currency || "USD")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
