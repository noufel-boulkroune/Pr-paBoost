# Adaptation Guide: Next.js Frontend for NestJS Backend

This document explains how the CourseStack Next.js frontend has been adapted to work with the French Exam Prep Platform NestJS backend.

## Overview

The frontend has been restructured to match the NestJS backend's:
- **API structure** (`/api/v1/*` routes)
- **Data models** (19 entities)
- **Content hierarchy** (Category → Module → Course → Lesson)
- **Role system** (`SUPER_ADMIN`, `SUB_ADMIN`, `STUDENT`)
- **Security features** (JWT with HTTP-only cookies)

## API Configuration

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

The `/api/v1` prefix is now included in the base URL, so all API calls automatically include it.

### Axios Configuration

The axios instance in `src/services/axios.ts` is configured to:
- Send cookies with `withCredentials: true`
- Handle 401 errors by attempting token refresh
- Redirect to login on authentication failure

## Content Hierarchy

The French exam prep platform uses a 3-level content hierarchy:

```
Category (e.g., "Médecine", "Droit")
  └── Module (e.g., "Anatomie", "Biochimie")
        ├── Course (e.g., "Anatomie du cœur")
        │     └── Lesson (video/PDF)
        ├── Exam (Annales - past papers)
        └── PracticeQCM (interactive quiz)
```

### Access Control

Students subscribe to a **Plan**, and the plan grants access to specific **Modules**.

## Features Implemented

### 1. Authentication (`src/features/auth`)

**Roles:**
- `SUPER_ADMIN` - Full system access
- `SUB_ADMIN` - Teacher/Instructor role
- `STUDENT` - Student role

**API Endpoints:**
- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/logout`
- `GET /auth/me`
- `POST /auth/refresh`

### 2. Categories (`src/features/categories`)

Top-level content grouping (e.g., "Médecine", "Droit")

**API Endpoints:**
- `GET /categories` - List all categories
- `GET /categories/active` - List active categories
- `GET /categories/:id` - Get category by ID
- `GET /categories/slug/:slug` - Get category by slug

### 3. Modules (`src/features/modules`)

Mid-level grouping (e.g., "Anatomie", "Biochimie")

**API Endpoints:**
- `GET /modules` - List all modules
- `GET /modules/category/:categoryId` - Get modules by category
- `GET /modules/:id` - Get module by ID

### 4. Courses (`src/features/courses`)

Courses within modules

**API Endpoints:**
- `GET /courses` - List courses
- `GET /courses/module/:moduleId` - Get courses by module
- `GET /courses/:id` - Get course details
- `POST /courses/:courseId/lessons` - Add lesson
- `POST /courses/:courseId/lessons/:lessonId/progress` - Update progress

### 5. Exams/Annales (`src/features/exams`)

Past exam papers (PDF)

**API Endpoints:**
- `GET /exams` - List exams
- `GET /exams/module/:moduleId` - Get exams by module
- `GET /exams/years` - Get available years for filtering
- `GET /exams/subjects` - Get available subjects for filtering
- `POST /exams/:id/progress` - Mark as viewed

### 6. Subscriptions (`src/features/subscriptions`)

Subscription plans and user subscriptions

**API Endpoints:**
- `GET /plans` - List all plans
- `GET /plans/active` - List active plans (public)
- `POST /subscriptions/checkout` - Create checkout session
- `GET /subscriptions/me` - Get current user's subscription
- `GET /subscriptions/me/access/:moduleId` - Check module access

### 7. Live Sessions (`src/features/live-sessions`)

Scheduled Zoom/Meet classes

**API Endpoints:**
- `GET /live-sessions` - List sessions
- `GET /live-sessions/upcoming` - Get upcoming sessions
- `POST /live-sessions/:id/register` - Register for session
- `GET /live-sessions/me/registrations` - Get my registrations

### 8. Practice QCM (`src/features/practice-qcm`)

Interactive multiple choice questions

**API Endpoints:**
- `GET /practice-qcm` - List QCMs
- `GET /practice-qcm/:id` - Get QCM details
- `POST /practice-qcm/:id/attempts` - Start attempt
- `POST /practice-qcm/attempts/:attemptId/submit` - Submit answers

### 9. Dashboard (`src/features/dashboard`)

Student and admin statistics

**API Endpoints:**
- `GET /dashboard/student/stats` - Student stats
- `GET /dashboard/student/activity` - Activity feed
- `GET /dashboard/student/module-progress` - Progress by module
- `GET /dashboard/admin/stats` - Admin stats

### 10. Study Sessions (`src/features/study-sessions`)

Focus timer (study-with-me)

**API Endpoints:**
- `GET /study-sessions` - List my sessions
- `GET /study-sessions/stats` - Get study stats
- `POST /study-sessions` - Start session
- `POST /study-sessions/:id/end` - End session

## Usage Examples

### Fetch Categories

```typescript
import { useActiveCategories } from '@/features';

function CategoriesList() {
  const { categories, isLoading, error } = useActiveCategories();
  
  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  
  return (
    <ul>
      {categories.map(cat => (
        <li key={cat.id}>{cat.name}</li>
      ))}
    </ul>
  );
}
```

### Fetch Modules by Category

```typescript
import { useModulesByCategory } from '@/features';

function ModulesList({ categoryId }: { categoryId: string }) {
  const { modules, isLoading, error } = useModulesByCategory(categoryId);
  // ...
}
```

### Check Module Access

```typescript
import { useModuleAccess } from '@/features';

function CourseContent({ moduleId }: { moduleId: string }) {
  const { hasAccess, isLoading } = useModuleAccess(moduleId);
  
  if (isLoading) return <div>Vérification de l'accès...</div>;
  if (!hasAccess) return <div>Abonnement requis</div>;
  
  return <div>Contenu du cours...</div>;
}
```

### Start QCM Attempt

```typescript
import { useActiveAttempt } from '@/features';

function QCMPage({ qcmId }: { qcmId: string }) {
  const { startAttempt, currentAttempt, isLoading } = useActiveAttempt();
  
  const handleStart = async () => {
    const result = await startAttempt(qcmId);
    if (result.success) {
      // Navigate to quiz page
    }
  };
  
  return <button onClick={handleStart}>Commencer le QCM</button>;
}
```

## Role-Based Access Control

### Middleware Protection (`src/middleware.ts`)

```typescript
// Routes accessible to all authenticated users
/dashboard/*

// Routes accessible to teachers and admins
/dashboard/instructor/*

// Routes accessible to admins only
/dashboard/admin/*
```

### Component-Level Checks

```typescript
import { useAuth } from '@/features';

function AdminOnlyComponent() {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) return null;
  
  return <div>Admin content</div>;
}
```

## Authentication Flow

1. User logs in with `POST /auth/login`
2. Backend sets HTTP-only cookies:
   - `accessToken` (15 min expiry)
   - `refreshToken` (7 days expiry)
   - `userRole` (for middleware checks)
3. Frontend stores user in Zustand store
4. Axios sends cookies automatically with each request
5. On 401, axios attempts to refresh the token
6. On refresh failure, user is redirected to login

## File Structure

```
src/
├── features/
│   ├── auth/           # Login, register, JWT handling
│   ├── categories/     # Top-level content groups
│   ├── modules/        # Mid-level content groups
│   ├── courses/        # Courses and lessons
│   ├── exams/          # Past papers (Annales)
│   ├── subscriptions/  # Plans and subscriptions
│   ├── live-sessions/  # Zoom/Meet live classes
│   ├── practice-qcm/   # Interactive quizzes
│   ├── dashboard/      # Stats and progress
│   └── study-sessions/ # Focus timer
├── services/
│   └── axios.ts        # API client with /api/v1 prefix
├── store/
│   └── authStore.ts    # Auth state management
├── middleware.ts       # Route protection
└── types/
    ├── index.ts        # Shared types
    └── api.ts          # Full API types
```

## Migration Checklist

- [x] Update API base URL to include `/api/v1`
- [x] Create types for all 19 backend entities
- [x] Update auth to use NestJS roles (`SUPER_ADMIN`, `SUB_ADMIN`, `STUDENT`)
- [x] Create categories feature
- [x] Create modules feature
- [x] Update courses to work with module hierarchy
- [x] Create exams/annales feature
- [x] Create subscriptions feature
- [x] Create live sessions feature
- [x] Create practice QCM feature
- [x] Create dashboard feature
- [x] Create study sessions feature
- [x] Update middleware for new role system
- [x] Add token refresh handling in axios

## Notes

1. **Content Access**: Always check subscription status before showing module content
2. **Progress Tracking**: Track both lesson progress and exam progress separately
3. **QCM Attempts**: Each attempt is tracked with score and time spent
4. **Live Sessions**: Students must register before joining
5. **Study Timer**: Track focus time for student analytics

## Backend Endpoints Reference

See the full list of NestJS backend endpoints in the project documentation.

All endpoints are prefixed with `/api/v1`.
