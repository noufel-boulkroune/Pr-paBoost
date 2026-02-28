import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-surface-1">
        <div className="w-full max-w-md">
          {/* Logo on mobile */}
          <div className="flex items-center justify-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-heading-md font-bold text-text-primary">
              Course<span className="gradient-text">Stack</span>
            </span>
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600">
        {/* Animated blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full bg-white/10 animate-blob" />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full bg-secondary-400/20 animate-blob-reverse" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-accent-400/20 animate-float" />

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />

        <div className="relative flex flex-col items-center justify-center w-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-heading-xl font-bold text-white">CourseStack</span>
          </div>

          <div className="text-center max-w-sm mb-10">
            <h2 className="text-display-sm font-bold text-white mb-3 leading-tight">
              Start Your Learning Journey Today
            </h2>
            <p className="text-body-md text-primary-100 leading-relaxed">
              Join millions of learners and access world-class courses from expert instructors worldwide.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-4 w-full max-w-xs">
            {[
              { icon: "🚀", text: "250K+ active learners worldwide" },
              { icon: "🎓", text: "15K+ expert instructors" },
              { icon: "📚", text: "12K+ quality courses available" },
              { icon: "🏆", text: "Industry-recognized certificates" },
              { icon: "♾️", text: "Lifetime access to all content" },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-sm flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-body-sm text-primary-100 font-medium">{item.text}</span>
              </li>
            ))}
          </ul>

          {/* Rating */}
          <div className="mt-10 flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="flex -space-x-2">
              {["🧑‍💻", "👩‍🎨", "🧑‍🔬"].map((emoji, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-xs">
                  {emoji}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className="w-3.5 h-3.5 text-warning-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-caption text-primary-200 mt-0.5">4.8 / 5 — Trusted by thousands</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
