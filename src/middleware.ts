import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Route patterns for different access levels
 */
const PUBLIC_ROUTES = ["/", "/public/*", "/auth/*"];
const PROTECTED_ROUTES = ["/dashboard/*"];
const STUDENT_ROUTES = ["/dashboard/my-learning", "/dashboard/study-sessions"];
const TEACHER_ROUTES = ["/dashboard/instructor/*"];
const ADMIN_ROUTES = ["/dashboard/admin/*"];

/**
 * Check if path matches a pattern
 */
function matchesPattern(path: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    if (pattern.endsWith("/*")) {
      const prefix = pattern.slice(0, -1);
      return path.startsWith(prefix);
    }
    return path === pattern;
  });
}

/**
 * Get access token from request cookies
 */
function getTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get("accessToken")?.value || null;
}

/**
 * Get user role from request cookies
 */
function getUserRoleFromRequest(request: NextRequest): string | null {
  return request.cookies.get("userRole")?.value || null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getTokenFromRequest(request);
  const userRole = getUserRoleFromRequest(request);
  const isAuthenticated = !!token;

  // Allow public routes
  if (matchesPattern(pathname, PUBLIC_ROUTES)) {
    // Redirect authenticated users away from auth pages
    if (pathname.startsWith("/auth/") && isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (matchesPattern(pathname, PROTECTED_ROUTES)) {
    // Not authenticated - redirect to login
    if (!isAuthenticated) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check teacher routes (SUB_ADMIN role in NestJS)
    if (matchesPattern(pathname, TEACHER_ROUTES)) {
      if (userRole !== "SUB_ADMIN" && userRole !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/dashboard/dashboard", request.url));
      }
    }

    // Check admin routes (SUPER_ADMIN role in NestJS)
    if (matchesPattern(pathname, ADMIN_ROUTES)) {
      if (userRole !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/dashboard/dashboard", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
