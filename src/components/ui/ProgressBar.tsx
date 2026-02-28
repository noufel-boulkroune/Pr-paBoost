"use client";

import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "primary" | "success" | "warning";
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  variant = "default",
  showLabel = false,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    xs: "h-1",
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  const variants = {
    default: "bg-primary-600",
    primary: "bg-primary-600",
    success: "bg-success-500",
    warning: "bg-warning-500",
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full bg-surface-3 rounded-full overflow-hidden",
          sizes[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-slow ease-out",
            variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-caption text-text-muted mt-1 block">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
