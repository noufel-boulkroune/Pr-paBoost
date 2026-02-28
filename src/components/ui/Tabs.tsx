"use client";

import {
  useState,
  createContext,
  useContext,
  ReactNode,
  Children,
  isValidElement,
} from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
};

// Tabs Container
export interface TabsProps {
  children: ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Tabs({
  children,
  defaultValue,
  value,
  onValueChange,
  className,
}: TabsProps) {
  const [activeTab, setActiveTabState] = useState(value ?? defaultValue ?? "");

  const activeTabValue = value ?? activeTab;
  const setActiveTab = onValueChange ?? setActiveTabState;

  return (
    <TabsContext.Provider value={{ activeTab: activeTabValue, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

// Tab List
export interface TabListProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "pills" | "underline";
}

export function TabList({
  children,
  className,
  variant = "default",
}: TabListProps) {
  const variants = {
    default: "border-b border-border",
    pills: "p-1 bg-surface-2 rounded-lg",
    underline: "border-b border-border",
  };

  return (
    <div
      className={cn("flex items-center gap-1", variants[variant], className)}
    >
      {children}
    </div>
  );
}

// Tab Trigger
export interface TabTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function TabTrigger({
  value,
  children,
  className,
  disabled,
}: TabTriggerProps) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => !disabled && setActiveTab(value)}
      disabled={disabled}
      className={cn(
        "relative px-4 py-2 text-body-md font-medium transition-all duration-fast",
        "focus-ring rounded-md",
        isActive
          ? "text-primary-600"
          : "text-text-secondary hover:text-text-primary hover:bg-surface-2",
        disabled && "opacity-50 cursor-not-allowed",
        isActive &&
          "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 after:rounded-t-full",
        className,
      )}
    >
      {children}
    </button>
  );
}

// Tab Content
export interface TabContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabContent({ value, children, className }: TabContentProps) {
  const { activeTab } = useTabs();

  if (activeTab !== value) return null;

  return <div className={cn("py-4", className)}>{children}</div>;
}
