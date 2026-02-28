"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/authStore";

interface NavLink {
  label: string;
  href: string;
  requiresAuth?: boolean;
  roles?: ("student" | "instructor" | "admin")[];
}

const navLinks: NavLink[] = [
  { label: "Courses", href: "/public/courses" },
  {
    label: "My Learning",
    href: "/dashboard/my-learning",
    requiresAuth: true,
    roles: ["student"],
  },
  {
    label: "Teach",
    href: "/dashboard/instructor/courses",
    requiresAuth: true,
    roles: ["instructor", "admin"],
  },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout, hasRole } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredNavLinks = navLinks.filter((link) => {
    if (link.requiresAuth && !isAuthenticated) return false;
    if (link.roles && !link.roles.some((role) => hasRole(role))) return false;
    return true;
  });

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-sticky w-full transition-all duration-normal",
        isScrolled
          ? "border-b border-border/60 bg-surface-1/80 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-surface-1/60 backdrop-blur-md"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm group-hover:shadow-glow-primary transition-all duration-normal">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <span className="text-heading-md font-bold text-text-primary hidden sm:block">
            Course<span className="gradient-text">Stack</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {filteredNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2 rounded-lg text-body-md font-medium transition-all duration-fast",
                isActive(link.href)
                  ? "text-primary-600 bg-primary-50"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-600" />
              )}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden sm:block relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-56 h-9 pl-9 pr-4 rounded-lg border border-border bg-surface-2 text-body-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 focus:bg-surface-1 focus:w-72 transition-all duration-normal"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Auth Buttons or User Menu */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard/dashboard">
                <Avatar
                  src={user.avatar}
                  name={`${user.firstName} ${user.lastName}`}
                  size="md"
                  className="cursor-pointer hover:ring-2 hover:ring-primary-500 hover:ring-offset-2 transition-all duration-fast"
                />
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="hidden sm:flex"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-2 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5 text-text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface-1/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
            {/* Mobile Search */}
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-surface-2 text-body-md text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {filteredNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg text-body-md font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-primary-50 text-primary-600"
                    : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="pt-2 space-y-2">
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center px-3 py-2.5 rounded-lg text-body-md font-medium text-text-secondary hover:bg-surface-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center justify-center px-3 py-2.5 rounded-lg text-body-md font-semibold bg-gradient-to-r from-primary-600 to-primary-700 text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
