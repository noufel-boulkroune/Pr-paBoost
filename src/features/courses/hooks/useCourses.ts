import { useState, useEffect, useCallback } from "react";
import { coursesApi } from "../api";
import { Course, CourseFilters, CoursesResponse, LessonProgress, Category } from "../types";

export const useCourses = (initialFilters?: CourseFilters) => {
  const [filters, setFilters] = useState<CourseFilters | undefined>(initialFilters);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchCourses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await coursesApi.getCourses(filters);
      setCourses(response.data);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err.message || "Failed to fetch courses");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const updateFilters = useCallback((newFilters: Partial<CourseFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Backwards compatibility: pagination object with currentPage
  const pagination = {
    currentPage: meta.page,
    totalPages: meta.totalPages,
    total: meta.total,
    limit: meta.limit,
  };

  return {
    courses,
    isLoading,
    error,
    meta,
    pagination,
    filters,
    updateFilters,
    refetch: fetchCourses,
  };
};

export const useCourse = (id: string) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const data = await coursesApi.getCourse(id);
        setCourse(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch course");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  return { course, isLoading, error };
};

export const useFeaturedCourses = (limit?: number) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const data = await coursesApi.getFeaturedCourses(limit);
        setCourses(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch featured courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [limit]);

  return { courses, isLoading, error };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await coursesApi.getCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
};
