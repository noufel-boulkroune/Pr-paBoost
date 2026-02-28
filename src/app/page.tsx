import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "CourseStack - Master New Skills with Expert-Led Courses",
  description: "Join millions of learners worldwide. Access 250,000+ courses in programming, design, business, and more.",
};

const features = [
  {
    title: "Expert Instructors",
    description: "Learn from industry professionals with real-world experience and proven track records.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    gradient: "from-primary-500 to-primary-700",
    bg: "bg-primary-50",
  },
  {
    title: "Lifetime Access",
    description: "Learn at your own pace with unlimited access to all course materials, forever.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-accent-500 to-accent-700",
    bg: "bg-accent-50",
  },
  {
    title: "Certificates",
    description: "Earn industry-recognized certificates to showcase your skills and advance your career.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    gradient: "from-warning-500 to-warning-700",
    bg: "bg-warning-50",
  },
  {
    title: "Interactive Learning",
    description: "Engage with quizzes, live projects, and hands-on exercises that accelerate your growth.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: "from-secondary-500 to-secondary-700",
    bg: "bg-secondary-50",
  },
];

const categories = [
  { name: "Development", courses: "1.2k+ courses", icon: "💻", gradient: "from-primary-500 to-primary-700" },
  { name: "Business", courses: "800+ courses", icon: "💼", gradient: "from-accent-500 to-accent-700" },
  { name: "Design", courses: "600+ courses", icon: "🎨", gradient: "from-secondary-500 to-secondary-700" },
  { name: "Marketing", courses: "450+ courses", icon: "📈", gradient: "from-warning-500 to-warning-700" },
  { name: "Photography", courses: "300+ courses", icon: "📷", gradient: "from-primary-400 to-accent-600" },
  { name: "Music", courses: "250+ courses", icon: "🎵", gradient: "from-secondary-400 to-primary-600" },
];

const stats = [
  { value: "250K+", label: "Active Students" },
  { value: "15K+", label: "Expert Instructors" },
  { value: "12K+", label: "Quality Courses" },
  { value: "4.8★", label: "Average Rating" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer at Google",
    avatar: "SJ",
    avatarColor: "from-primary-500 to-primary-700",
    rating: 5,
    text: "CourseStack completely transformed my career. The React course gave me the skills I needed to land my dream job in just 3 months. The instructors are world-class!",
  },
  {
    name: "Marcus Chen",
    role: "UX Designer at Airbnb",
    avatar: "MC",
    avatarColor: "from-accent-500 to-accent-700",
    rating: 5,
    text: "I went from zero design skills to a full-time UX role in 6 months. The project-based approach on CourseStack is what makes the difference — you build real things from day one.",
  },
  {
    name: "Aisha Okonkwo",
    role: "Data Scientist at Netflix",
    avatar: "AO",
    avatarColor: "from-secondary-500 to-secondary-700",
    rating: 5,
    text: "The Python and machine learning courses here are incredibly well-structured. I found the perfect balance between theory and practice. Highly recommend to anyone breaking into tech!",
  },
];

const mockCourses = [
  {
    id: "1",
    title: "Complete React Developer in 2024",
    instructor: "Alex Rivera",
    rating: 4.9,
    reviews: 12400,
    students: 89000,
    price: "$89",
    originalPrice: "$199",
    level: "All Levels",
    hours: "42h",
    emoji: "⚛️",
    tag: "Bestseller",
    tagColor: "bg-warning-500",
    gradient: "from-primary-600 to-primary-800",
  },
  {
    id: "2",
    title: "UI/UX Design Mastery: Figma & Beyond",
    instructor: "Emma Thompson",
    rating: 4.8,
    reviews: 8750,
    students: 54000,
    price: "$79",
    originalPrice: "$179",
    level: "Beginner",
    hours: "36h",
    emoji: "🎨",
    tag: "Hot & New",
    tagColor: "bg-secondary-500",
    gradient: "from-secondary-500 to-secondary-700",
  },
  {
    id: "3",
    title: "Python & Machine Learning Bootcamp",
    instructor: "Dr. James Park",
    rating: 4.9,
    reviews: 15200,
    students: 112000,
    price: "$94",
    originalPrice: "$219",
    level: "Intermediate",
    hours: "55h",
    emoji: "🐍",
    tag: "Top Rated",
    tagColor: "bg-success-500",
    gradient: "from-accent-500 to-accent-800",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 gradient-mesh" />
        {/* Floating blobs */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-200/40 to-secondary-200/30 blur-3xl animate-blob" />
        <div className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-accent-200/30 to-primary-200/20 blur-3xl animate-blob-reverse" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-body-sm font-medium mb-6 animate-fadeInUp">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                🎉 New courses added weekly
              </div>

              <h1 className="text-display-lg lg:text-display-xl font-bold text-text-primary mb-6 animate-fadeInUp delay-100">
                Master New Skills with{" "}
                <span className="gradient-text">Expert-Led</span>{" "}
                Courses
              </h1>

              <p className="text-body-lg text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0 animate-fadeInUp delay-200">
                Join millions of learners worldwide. Access 250,000+ courses in programming,
                design, business, and more. Learn at your own pace, anytime, anywhere.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fadeInUp delay-300">
                <Link href="/public/courses">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore Courses
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Start Free Trial
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start animate-fadeInUp delay-400">
                <div className="flex -space-x-2">
                  {["#4F46E5", "#F43F5E", "#14B8A6", "#F59E0B"].map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="text-body-sm text-text-secondary">
                  <span className="font-semibold text-text-primary">50,000+</span> students enrolled this week
                </div>
              </div>
            </div>

            {/* Right content — Hero visual */}
            <div className="relative hidden lg:block animate-slideInRight delay-200">
              {/* Main card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/50 glass">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-error-500" />
                      <div className="w-3 h-3 rounded-full bg-warning-500" />
                      <div className="w-3 h-3 rounded-full bg-success-500" />
                    </div>
                    <div className="text-caption text-text-muted font-medium">Live Dashboard</div>
                  </div>

                  {/* Welcome message */}
                  <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-4 mb-4 text-white">
                    <p className="text-caption text-primary-200 mb-1">Welcome back! 👋</p>
                    <p className="text-heading-md font-bold">Continue Learning</p>
                    <div className="mt-3 bg-white/20 rounded-full h-2">
                      <div className="h-2 rounded-full bg-white w-3/5" />
                    </div>
                    <p className="text-caption text-primary-200 mt-1.5">60% complete — React Masterclass</p>
                  </div>

                  {/* Course list */}
                  {[
                    { title: "Advanced TypeScript", progress: 85, color: "bg-accent-500" },
                    { title: "System Design", progress: 42, color: "bg-secondary-500" },
                    { title: "Python for ML", progress: 23, color: "bg-warning-500" },
                  ].map((course) => (
                    <div key={course.title} className="flex items-center gap-3 mb-3 last:mb-0">
                      <div className="w-9 h-9 rounded-xl bg-surface-2 flex items-center justify-center text-sm flex-shrink-0">
                        📚
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-body-sm font-medium text-text-primary truncate">{course.title}</p>
                        <div className="mt-1 bg-surface-3 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${course.color}`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-caption text-text-muted">{course.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-5 -left-8 glass rounded-xl shadow-lg p-3 border border-white/50 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-success-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-success-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold text-text-primary">Certificate Earned!</p>
                    <p className="text-caption text-text-muted">Advanced React Patterns</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-5 -right-6 glass rounded-xl shadow-lg p-3 border border-white/50 animate-float-slow delay-300">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">🔥</div>
                  <div>
                    <p className="text-body-sm font-semibold text-text-primary">7 Day Streak!</p>
                    <p className="text-caption text-text-muted">Keep it up! 💪</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeInUp delay-500">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-2xl bg-surface-1 border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-normal"
              >
                <div className="text-display-sm font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-body-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section className="py-24 bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-body-sm font-medium mb-4">
              Why CourseStack?
            </div>
            <h2 className="text-display-md font-bold text-text-primary mb-4">
              Everything you need to{" "}
              <span className="gradient-text">succeed</span>
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Our platform is built for serious learners who want real results, not just certificates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card key={feature.title} isHoverable className={`text-center delay-${i * 100}`}>
                <CardContent className="pt-6 pb-2">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center shadow-md`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-heading-md font-bold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-body-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES SECTION ============ */}
      <section className="py-24 bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent-100 text-accent-700 text-body-sm font-medium mb-4">
              Browse Topics
            </div>
            <h2 className="text-display-md font-bold text-text-primary mb-4">
              Explore Top Categories
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Find the perfect course from our wide range of expertly curated categories.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/public/courses?category=${category.name.toLowerCase()}`}
              >
                <div className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-surface-1 hover:border-primary-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-normal cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform duration-normal`}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-heading-md font-semibold text-text-primary group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-body-sm text-text-secondary">{category.courses}</p>
                  </div>
                  <svg className="w-4 h-4 text-text-muted group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-normal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ POPULAR COURSES SECTION ============ */}
      <section className="py-24 bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-secondary-100 text-secondary-700 text-body-sm font-medium mb-4">
                Student Favourites
              </div>
              <h2 className="text-display-md font-bold text-text-primary">
                Most Popular Courses
              </h2>
              <p className="text-body-lg text-text-secondary mt-2">
                Hand-picked courses loved by over 100,000 students
              </p>
            </div>
            <Link href="/public/courses">
              <Button variant="outline">
                View All Courses
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <Link key={course.id} href="/public/courses" className="group">
                <div className="rounded-2xl border border-border bg-surface-1 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-normal card-glow">
                  {/* Thumbnail */}
                  <div className={`relative aspect-video bg-gradient-to-br ${course.gradient} flex items-center justify-center`}>
                    <span className="text-6xl">{course.emoji}</span>
                    {/* Tag */}
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg ${course.tagColor} text-white text-caption font-semibold`}>
                      {course.tag}
                    </span>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-normal flex items-center justify-center">
                      <div className="bg-white rounded-full px-4 py-2 text-body-sm font-semibold text-text-primary flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                        Preview
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-heading-md font-bold text-text-primary mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-body-sm text-text-secondary mb-2">{course.instructor}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-body-sm font-bold text-warning-600">{course.rating}</span>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} className="w-3.5 h-3.5 text-warning-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-caption text-text-muted">({course.reviews.toLocaleString()})</span>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-caption text-text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.hours}
                      </span>
                      <span>·</span>
                      <span>{course.level}</span>
                      <span>·</span>
                      <span>{course.students.toLocaleString()} students</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-heading-lg font-bold text-text-primary">{course.price}</span>
                        <span className="text-body-sm text-text-muted line-through">{course.originalPrice}</span>
                      </div>
                      <span className="text-caption font-semibold text-success-700 bg-success-50 px-2 py-0.5 rounded-full">
                        Save {Math.round((1 - parseInt(course.price.slice(1)) / parseInt(course.originalPrice.slice(1))) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS SECTION ============ */}
      <section className="py-24 bg-surface-1 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-body-sm font-medium mb-4">
              Real Stories
            </div>
            <h2 className="text-display-md font-bold text-text-primary mb-4">
              What our students say
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Thousands of students have transformed their careers with CourseStack. Here are some of their stories.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div
                key={testimonial.name}
                className={`relative rounded-2xl border border-border bg-surface-1 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-normal card-glow delay-${i * 100}`}
              >
                {/* Quote icon */}
                <div className="absolute top-4 right-5 text-4xl text-primary-100 font-serif leading-none select-none">"</div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-4 h-4 text-warning-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-body-md text-text-secondary mb-5 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center text-white text-body-sm font-bold flex-shrink-0`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold text-text-primary">{testimonial.name}</p>
                    <p className="text-caption text-text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="py-24 bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600" />
            <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-primary-500 via-primary-700 to-secondary-600 opacity-80 [background-size:300%_300%]" />

            {/* Blobs */}
            <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-white/10 animate-blob" />
            <div className="absolute bottom-[-40px] left-[-40px] w-48 h-48 rounded-full bg-secondary-300/20 animate-blob-reverse" />
            <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-accent-400/20 animate-float" />

            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "24px 24px"
              }}
            />

            <div className="relative z-10 p-12 lg:p-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 text-white text-body-sm font-medium mb-6 backdrop-blur-sm">
                🎁 7-day free trial — No credit card needed
              </div>
              <h2 className="text-display-md lg:text-display-lg font-bold text-white mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-body-lg text-primary-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join our community of learners today and get unlimited access to all courses
                with our 7-day free trial. Start your transformation now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-primary-700 hover:bg-primary-50 hover:text-primary-800 shadow-lg border-0"
                  >
                    Get Started Free
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </Link>
                <Link href="/public/courses">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white/50 text-white hover:bg-white/15 hover:border-white"
                  >
                    Browse Courses
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-primary-200 text-body-sm">
                {[
                  "✓ No credit card required",
                  "✓ Cancel anytime",
                  "✓ Access 12,000+ courses",
                  "✓ Offline downloads",
                ].map((item) => (
                  <span key={item} className="font-medium">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
