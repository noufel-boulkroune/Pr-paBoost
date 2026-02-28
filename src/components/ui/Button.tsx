"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-normal ease-default",
      "focus-ring disabled:pointer-events-none disabled:opacity-50",
      "rounded-lg whitespace-nowrap relative overflow-hidden"
    );

    const variants = {
      primary: cn(
        "bg-gradient-to-r from-primary-600 to-primary-700 text-text-inverse",
        "hover:from-primary-700 hover:to-primary-800",
        "active:from-primary-800 active:to-primary-900",
        "shadow-sm hover:shadow-md hover:shadow-primary-600/25",
        "hover:-translate-y-px active:translate-y-0"
      ),
      secondary: cn(
        "bg-gradient-to-r from-secondary-500 to-secondary-600 text-text-inverse",
        "hover:from-secondary-600 hover:to-secondary-700",
        "active:from-secondary-700 active:to-secondary-800",
        "shadow-sm hover:shadow-md hover:shadow-secondary-500/25",
        "hover:-translate-y-px active:translate-y-0"
      ),
      outline: cn(
        "border-2 border-border bg-transparent text-text-primary",
        "hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700",
        "active:bg-primary-100",
        "hover:-translate-y-px active:translate-y-0"
      ),
      ghost: cn(
        "bg-transparent text-text-primary hover:bg-surface-2",
        "active:bg-surface-3"
      ),
      danger: cn(
        "bg-gradient-to-r from-error-500 to-error-600 text-text-inverse",
        "hover:from-error-600 hover:to-error-700",
        "active:from-error-700 shadow-sm hover:shadow-md",
        "hover:-translate-y-px active:translate-y-0"
      ),
      link: cn(
        "bg-transparent text-primary-600 hover:text-primary-700",
        "hover:underline underline-offset-4 p-0 h-auto"
      ),
    };

    const sizes = {
      xs: "h-7 px-2.5 text-caption",
      sm: "h-8 px-3.5 text-body-sm",
      md: "h-10 px-5 text-body-md",
      lg: "h-12 px-7 text-body-lg",
      xl: "h-14 px-9 text-body-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], variant !== "link" && sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Shine overlay for primary/secondary */}
        {(variant === "primary" || variant === "secondary") && (
          <span className="absolute inset-0 opacity-0 hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 transition-opacity duration-normal pointer-events-none" />
        )}
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
