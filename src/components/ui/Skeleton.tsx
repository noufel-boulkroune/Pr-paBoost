"use client";

import { cn } from "@/lib/utils";

export interface SkeletonProps {
  className?: string;
  variant?: "default" | "circle" | "text" | "card";
  width?: string | number;
  height?: string | number;
  count?: number;
}

export function Skeleton({
  className,
  variant = "default",
  width,
  height,
  count = 1,
}: SkeletonProps) {
  const variants = {
    default: "rounded-md",
    circle: "rounded-full",
    text: "rounded h-4 w-full",
    card: "rounded-xl h-32 w-full",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "animate-pulse bg-surface-3",
            variants[variant],
            className
          )}
          style={style}
        />
      ))}
    </>
  );
}

// Course card skeleton
export function CourseCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface-1 overflow-hidden">
      <Skeleton variant="default" height={180} className="rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton variant="circle" width={32} height={32} />
          <Skeleton variant="text" width={100} />
        </div>
      </div>
    </div>
  );
}

// List skeleton
export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border border-border rounded-lg">
          <Skeleton variant="circle" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="70%" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Stats card skeleton
export function StatsCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-6 border border-border rounded-xl bg-surface-1">
          <Skeleton variant="circle" width={48} height={48} className="mb-4" />
          <Skeleton variant="text" width={60} className="mb-2" />
          <Skeleton variant="text" width="80%" />
        </div>
      ))}
    </div>
  );
}
