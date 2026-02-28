"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  resize?: "none" | "both" | "horizontal" | "vertical";
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, resize = "vertical", id, rows = 4, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const resizeClasses = {
      none: "resize-none",
      both: "resize",
      horizontal: "resize-x",
      vertical: "resize-y",
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-body-sm font-medium text-text-secondary mb-1.5"
          >
            {label}
            {props.required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            "flex w-full rounded-md border bg-surface-1 px-3 py-2 text-body-md",
            "text-text-primary placeholder:text-text-muted",
            "transition-all duration-fast ease-default",
            "focus-ring focus:border-primary-500",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-2",
            resizeClasses[resize],
            error && "border-error-500 focus:border-error-500 focus:ring-error-500/20",
            !error && "border-border hover:border-primary-300",
            className
          )}
          {...props}
        />
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

Textarea.displayName = "Textarea";

export { Textarea };
