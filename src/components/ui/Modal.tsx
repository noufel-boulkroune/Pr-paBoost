"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  className,
}: ModalProps) {
  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-modal">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-text-primary/50 backdrop-blur-sm transition-opacity"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <div
          className={cn(
            "relative w-full bg-surface-1 rounded-2xl shadow-xl",
            "transform transition-all duration-fast ease-spring",
            sizes[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between gap-4 p-6 pb-0">
              <div className="flex-1">
                {title && (
                  <h2 className="text-heading-xl font-semibold text-text-primary">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-body-md text-text-secondary mt-1">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="flex-shrink-0 -mr-2 -mt-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </Button>
              )}
            </div>
          )}

          {/* Content */}
          <div className={cn("p-6", !title && !showCloseButton && "pt-6")}>{children}</div>

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
