"use client";

import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-surface-3 text-text-primary",
    primary: "bg-primary-100 text-primary-800",
    secondary: "bg-secondary-100 text-secondary-800",
    accent: "bg-accent-100 text-accent-800",
    success: "bg-success-100 text-success-700",
    warning: "bg-warning-100 text-warning-700",
    error: "bg-error-100 text-error-700",
    outline: "bg-transparent border border-border text-text-secondary",
  };

  const sizes = {
    sm: "px-1.5 py-0.5 text-caption",
    md: "px-2.5 py-1 text-body-sm",
    lg: "px-3 py-1.5 text-body-md",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
