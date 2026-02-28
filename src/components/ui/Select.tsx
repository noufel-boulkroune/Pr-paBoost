"use client";

import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-body-sm font-medium text-text-secondary mb-1.5"
          >
            {label}
            {props.required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "flex w-full rounded-md border bg-surface-1 px-3 py-2 text-body-md",
              "text-text-primary",
              "transition-all duration-fast ease-default",
              "focus-ring focus:border-primary-500",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-2",
              "appearance-none cursor-pointer pr-10",
              error && "border-error-500 focus:border-error-500 focus:ring-error-500/20",
              !error && "border-border hover:border-primary-300",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          {/* Custom chevron */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
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

Select.displayName = "Select";

export { Select };
