"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "flat" | "glass" | "gradient";
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  isHoverable?: boolean;
  isClickable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", isHoverable = false, isClickable = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-surface-1 shadow-sm border border-border",
      elevated: "bg-surface-1 shadow-lg border border-border/50",
      outlined: "bg-surface-1 border-2 border-border",
      flat: "bg-surface-2",
      glass: "glass shadow-lg",
      gradient: "bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100 shadow-sm",
    };

    const paddings = {
      none: "",
      xs: "p-2",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-normal ease-default",
          variants[variant],
          paddings[padding],
          isHoverable && "hover:shadow-lg hover:-translate-y-1 card-glow",
          isClickable && "cursor-pointer active:scale-[0.99]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Card Header
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, action, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-start justify-between gap-4 mb-4", className)}
      {...props}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
);

CardHeader.displayName = "CardHeader";

// Card Title
const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-heading-lg font-semibold text-text-primary", className)}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

// Card Description
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-body-sm text-text-secondary mt-1", className)}
      {...props}
    />
  )
);

CardDescription.displayName = "CardDescription";

// Card Content
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-body-md text-text-primary", className)} {...props} />
  )
);

CardContent.displayName = "CardContent";

// Card Footer
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-3 mt-4 pt-4 border-t border-border", className)}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
