"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-text-secondary mb-1.5"
          >
            {label}
            {props.required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            id={inputId}
            ref={ref}
            className={cn(
              "flex w-full rounded-md border bg-surface-1 px-3 py-2 text-body-md",
              "text-text-primary placeholder:text-text-muted",
              "transition-all duration-fast ease-default",
              "focus-ring focus:border-primary-500",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-2",
              error && "border-error-500 focus:border-error-500 focus:ring-error-500/20",
              !error && "border-border hover:border-primary-300",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={cn(
              "mt-1.5 text-caption",
              error ? "text-error-500" : "text-text-muted"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
