"use client";

import { cn } from "@/lib/utils";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  status?: "online" | "offline" | "busy" | "away";
}

export function Avatar({
  src,
  alt,
  name,
  size = "md",
  className,
  status,
}: AvatarProps) {
  const sizes = {
    xs: "w-6 h-6 text-caption",
    sm: "w-8 h-8 text-body-sm",
    md: "w-10 h-10 text-body-md",
    lg: "w-12 h-12 text-body-lg",
    xl: "w-16 h-16 text-display-sm",
    "2xl": "w-24 h-24 text-display-md",
  };

  const statusColors = {
    online: "bg-success-500",
    offline: "bg-text-muted",
    busy: "bg-error-500",
    away: "bg-warning-500",
  };

  const statusSizes = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-3.5 h-3.5",
    "2xl": "w-4 h-4",
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate a consistent color based on name
  const getColorFromName = (name: string) => {
    const colors = [
      "bg-primary-500",
      "bg-secondary-500",
      "bg-accent-500",
      "bg-primary-600",
      "bg-secondary-600",
    ];
    const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center overflow-hidden",
          "bg-surface-2 text-text-inverse font-medium",
          sizes[size],
          !src && name && getColorFromName(name)
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name || "Avatar"}
            className="w-full h-full object-cover"
          />
        ) : name ? (
          getInitials(name)
        ) : (
          <svg
            className="w-1/2 h-1/2 text-text-muted"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-surface-1",
            statusColors[status],
            statusSizes[size]
          )}
        />
      )}
    </div>
  );
}
