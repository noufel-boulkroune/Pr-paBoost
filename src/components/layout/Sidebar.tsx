"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { Avatar } from "@/components/ui/Avatar";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: ("student" | "instructor" | "admin")[];
}

const studentItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard/dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    label: "My Learning",
    href: "/dashboard/my-learning",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const instructorItems: SidebarItem[] = [
  {
    label: "My Courses",
    href: "/dashboard/instructor/courses",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    roles: ["instructor", "admin"],
  },
  {
    label: "Create Course",
    href: "/dashboard/instructor/create-course",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    roles: ["instructor", "admin"],
  },
];

const adminItems: SidebarItem[] = [
  {
    label: "Manage Users",
    href: "/dashboard/admin/users",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    roles: ["admin"],
  },
  {
    label: "Manage Courses",
    href: "/dashboard/admin/courses",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    roles: ["admin"],
  },
];

const sectionColors: Record<string, string> = {
  Student: "text-primary-600",
  Instructor: "text-accent-600",
  Admin: "text-secondary-600",
};

export function Sidebar() {
  const pathname = usePathname();
  const { user, hasRole } = useAuthStore();

  const isActive = (href: string) => {
    if (href === "/dashboard/dashboard") {
      return pathname === "/dashboard/dashboard";
    }
    return pathname.startsWith(href);
  };

  const filterItems = (items: SidebarItem[]) =>
    items.filter((item) => !item.roles || item.roles.some((role) => { const r = role === "student" ? "STUDENT" : role === "instructor" ? "SUB_ADMIN" : "SUPER_ADMIN"; return user?.role === r; }));

  const allItems = [
    { title: "Student", items: filterItems(studentItems) },
    { title: "Instructor", items: filterItems(instructorItems) },
    { title: "Admin", items: filterItems(adminItems) },
  ].filter((section) => section.items.length > 0);

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] sticky top-16 border-r border-border bg-surface-1 overflow-y-auto hidden lg:flex flex-col">
      {/* User profile mini-card */}
      {user && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary-50 to-primary-100/50 border border-primary-100">
            <Avatar
              src={user.avatarKey ? (process.env.NEXT_PUBLIC_S3_BASE_URL + "/" + user.avatarKey) : undefined}
              name={`${user.firstName} ${user.lastName}`}
              size="md"
              className="ring-2 ring-primary-300 ring-offset-1"
            />
            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-semibold text-text-primary truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-caption text-primary-600 capitalize font-medium">
                {user.role || "Student"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6">
        {allItems.map((section) => (
          <div key={section.title}>
            <h3 className={cn(
              "px-3 text-caption font-bold uppercase tracking-widest mb-2",
              sectionColors[section.title]
            )}>
              {section.title}
            </h3>
            <nav className="space-y-0.5">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-md font-medium transition-all duration-fast",
                    isActive(item.href)
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm shadow-primary-500/25"
                      : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                  )}
                >
                  <span className={cn(
                    "transition-colors",
                    isActive(item.href) ? "text-white" : "text-text-muted"
                  )}>
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive(item.href) && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />
                  )}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom browse courses CTA */}
      <div className="p-4 border-t border-border">
        <Link href="/public/courses">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 transition-all duration-fast cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <p className="text-body-sm font-semibold">Browse Courses</p>
              <p className="text-caption text-primary-200">12K+ available</p>
            </div>
            <svg className="w-4 h-4 ml-auto group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </aside>
  );
}
