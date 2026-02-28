"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { CourseGrid } from "@/components/course/CourseGrid";
import { useCategories, useCourses } from "@/features/courses/hooks/useCourses";
import { Badge } from "@/components/ui/Badge";

const levelOptions = [
  { value: "", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
];

function CoursesPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const { courses, isLoading, pagination, updateFilters } = useCourses({
    page: 1,
    limit: 12,
    category: selectedCategory || undefined,
    level: selectedLevel || undefined,
    search: searchQuery || undefined,
  });

  const { categories } = useCategories();

  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...(categories?.map((cat) => ({ value: cat.slug, label: cat.name })) || []),
  ];

  const handleSearch = () => {
    updateFilters({
      search: searchQuery,
      category: selectedCategory,
      level: selectedLevel,
    });
  };

  const activeFilters = [
    selectedCategory && {
      label: selectedCategory,
      onRemove: () => setSelectedCategory(""),
    },
    selectedLevel && {
      label: selectedLevel,
      onRemove: () => setSelectedLevel(""),
    },
    searchQuery && {
      label: `"${searchQuery}"`,
      onRemove: () => setSearchQuery(""),
    },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-surface-1">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600">
        {/* Blobs */}
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-white/10 animate-blob" />
        <div className="absolute bottom-[-30px] left-[-30px] w-36 h-36 rounded-full bg-secondary-300/20 animate-blob-reverse" />
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-8">
            <h1 className="text-display-md font-bold text-white mb-3">
              Explore All Courses
            </h1>
            <p className="text-body-lg text-primary-100 max-w-2xl mx-auto">
              Discover thousands of courses taught by expert instructors. Find the perfect course to advance your skills and career.
            </p>
          </div>

          {/* Embedded Search Bar */}
          <div className="max-w-2xl mx-auto flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="What do you want to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full h-12 pl-11 pr-4 rounded-xl border-0 bg-white text-text-primary placeholder:text-text-muted text-body-md focus:outline-none focus:ring-2 focus:ring-white/40 shadow-lg"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              onClick={handleSearch}
              className="h-12 px-6 rounded-xl bg-white text-primary-700 font-semibold text-body-md hover:bg-primary-50 transition-colors shadow-lg whitespace-nowrap"
            >
              Search
            </button>
          </div>

          {/* Quick stats */}
          <div className="flex justify-center gap-8 mt-6">
            {[
              { label: "Courses", value: "12,000+" },
              { label: "Instructors", value: "15,000+" },
              { label: "Students", value: "250,000+" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-heading-xl font-bold text-white">{s.value}</div>
                <div className="text-caption text-primary-200">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter row */}
        <div className="flex flex-col lg:flex-row gap-3 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <Select
              options={categoryOptions}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-52"
            />
            <Select
              options={levelOptions}
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full sm:w-44"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-52"
            />
          </div>
        </div>

        {/* Active filter pills */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-body-sm text-text-secondary font-medium">Filters:</span>
            {activeFilters.map(
              (filter, index) =>
                filter && (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-body-sm font-medium border border-primary-200"
                  >
                    {filter.label}
                    <button
                      onClick={filter.onRemove}
                      className="w-4 h-4 rounded-full hover:bg-primary-200 flex items-center justify-center text-primary-600 transition-colors"
                    >
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ),
            )}
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
                setSelectedLevel("");
                updateFilters({ search: undefined, category: undefined, level: undefined });
              }}
              className="text-text-muted hover:text-text-primary"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Results count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-body-sm text-text-secondary">
            {isLoading ? (
              <span className="shimmer inline-block w-32 h-4 rounded" />
            ) : (
              <>Showing <span className="font-semibold text-text-primary">{courses.length}</span> courses</>
            )}
          </p>
        </div>

        {/* Course Grid */}
        <CourseGrid courses={courses} isLoading={isLoading} columns={3} />

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.currentPage === 1}
              onClick={() => updateFilters({ page: pagination.currentPage - 1 })}
            >
              ← Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => updateFilters({ page })}
                  className={`w-8 h-8 rounded-lg text-body-sm font-medium transition-colors ${
                    page === pagination.currentPage
                      ? "bg-primary-600 text-white"
                      : "text-text-secondary hover:bg-surface-2"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => updateFilters({ page: pagination.currentPage + 1 })}
            >
              Next →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-1" />}>
      <CoursesPageContent />
    </Suspense>
  );
}
