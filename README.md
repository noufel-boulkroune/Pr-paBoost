# CourseStack - Online Learning Platform

A production-ready online course marketplace platform built with Next.js 14+, TypeScript, and Tailwind CSS. Inspired structurally by platforms like Udemy and Residy.

## Features

### Core Functionality
- **Authentication**: Login, Register, Logout with role-based access control
- **Course Catalog**: Browse courses with filtering, sorting, and pagination
- **Course Details**: Comprehensive course view with curriculum, instructor info, and reviews
- **Video Learning Interface**: Course player with lesson tracking
- **Student Dashboard**: Track progress, enrollments, and certificates
- **Instructor Panel**: Create and manage courses
- **Admin Panel**: Manage users and courses

### Technical Features
- Next.js 14+ with App Router
- TypeScript for type safety
- Tailwind CSS with custom design token system
- Feature-based architecture
- Centralized API service layer
- Role-based routing and middleware protection
- Responsive design
- Dark mode support
- SEO optimized

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS Variables
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod validation

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, register)
│   ├── (public)/          # Public routes (landing, courses)
│   └── (dashboard)/       # Protected dashboard routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── course/           # Course-related components
│   └── auth/             # Auth components
├── features/             # Feature-based modules
│   ├── auth/            # Auth feature (api, hooks, types)
│   ├── courses/         # Courses feature
│   └── users/           # Users feature
├── services/            # API services
├── store/               # Global state management
├── styles/              # Global styles and theme
├── lib/                 # Utility functions
└── types/               # Global types
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd coursestack
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_ENV=development
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Architecture

### Design Token System
All colors, spacing, typography, and other design values are defined as CSS variables in `src/styles/theme.ts` and `src/styles/globals.css`. No hardcoded values are used in components.

### API Layer
- Centralized Axios instance in `src/services/axios.ts`
- Request interceptor for token attachment
- Response interceptor for error handling and 401 redirects
- Feature-based API modules in `src/features/*/api/`

### State Management
- Zustand for global auth state
- React hooks for local component state
- React Query pattern for server state (via custom hooks)

### Routing & Protection
- Middleware handles route protection
- Role-based access for instructor and admin routes
- Automatic redirect to login for unauthenticated users

## API Contracts

### Authentication
```
POST /auth/register    - Register new user
POST /auth/login       - Login user
GET  /auth/me          - Get current user
POST /auth/logout      - Logout user
POST /auth/refresh     - Refresh access token
```

### Courses
```
GET    /courses              - List courses
GET    /courses/:id          - Get course details
GET    /courses/:id/lessons  - Get course lessons
POST   /courses              - Create course (instructor/admin)
PUT    /courses/:id          - Update course
DELETE /courses/:id          - Delete course
```

### Users
```
GET /users/me              - Get user profile
PUT /users/me              - Update profile
GET /users/me/enrollments  - Get user enrollments
GET /users/me/stats        - Get student stats
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checker

## Design System

### Colors
- **Primary**: Deep Indigo (#6366f1)
- **Secondary**: Warm Coral (#f43f5e)
- **Accent**: Teal (#14b8a6)
- **Surface**: Light gray backgrounds
- **Text**: Slate colors for readability

### Typography
- Font: Inter
- Scale: Display (xl-lg-md-sm), Heading (xl-lg-md-sm), Body (lg-md-sm), Caption

### Spacing
- Based on 4px grid (0.5rem = 8px)
- Scale: 3xs to 6xl

## License

MIT
