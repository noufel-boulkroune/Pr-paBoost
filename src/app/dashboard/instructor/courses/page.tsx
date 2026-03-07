"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useInstructorStats } from "@/features/users/hooks/useUser";
import { StatsCardSkeleton } from "@/components/ui/Skeleton";
import { coursesApi } from "@/features/courses/api";
import type { Course } from "@/features/courses/types";

export default function InstructorCoursesPage() {
  const { stats, isLoading: statsLoading } = useInstructorStats();
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const loadCourses = useCallback(() => {
    setCoursesLoading(true);
    coursesApi.getCourses({ all: "true" } as never)
      .then((res) => {
        const list = Array.isArray(res) ? res : (res as { data?: Course[] }).data ?? [];
        setCourses(list);
      })
      .catch(() => toast.error("Impossible de charger les cours"))
      .finally(() => setCoursesLoading(false));
  }, []);

  useEffect(() => { loadCourses(); }, [loadCourses]);

  const handleDelete = async (course: Course) => {
    if (!window.confirm(`Supprimer le cours "${course.title}" ?`)) return;
    setDeletingId(course.id);
    try {
      await coursesApi.deleteCourse(course.id);
      setCourses((prev) => prev.filter((c) => c.id !== course.id));
      toast.success("Cours supprimé");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de la suppression");
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (course: Course) => {
    setTogglingId(course.id);
    try {
      const updated = await coursesApi.updateCourse(course.id, { isPublished: !course.isPublished });
      setCourses((prev) => prev.map((c) => (c.id === course.id ? { ...c, isPublished: updated.isPublished } : c)));
      toast.success(updated.isPublished ? "Cours publié" : "Cours mis en brouillon");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erreur lors de la mise à jour");
    } finally {
      setTogglingId(null);
    }
  };

  const statCards = [
    { label: "Total Cours", value: stats?.totalCourses ?? courses.length, icon: "📚" },
    { label: "Étudiants", value: stats?.totalStudents ?? 0, icon: "👥" },
    { label: "Revenus", value: `${stats?.totalRevenue ?? 0} DA`, icon: "💰" },
    { label: "Note moy.", value: stats?.averageRating ?? 0, icon: "⭐" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-display-md font-bold text-text-primary">Mes Cours</h1>
          <p className="text-body-md text-text-secondary mt-1">
            Gérez vos cours et suivez leur performance
          </p>
        </div>
        <Link href="/dashboard/instructor/create-course">
          <Button leftIcon={<span>+</span>}>Créer un cours</Button>
        </Link>
      </div>

      {/* Stats */}
      {statsLoading ? (
        <StatsCardSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-2xl flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-caption text-text-muted uppercase tracking-wide">{stat.label}</p>
                  <p className="text-display-sm font-bold text-text-primary">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Courses List */}
      <div className="space-y-4">
        <h2 className="text-heading-xl font-semibold text-text-primary">Vos cours</h2>

        {coursesLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-surface-2 animate-pulse" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-display-sm mb-2">📚</p>
              <p className="text-heading-md font-semibold text-text-primary mb-1">
                Aucun cours pour le moment
              </p>
              <p className="text-body-sm text-text-secondary mb-4">
                Créez votre premier cours pour commencer
              </p>
              <Link href="/dashboard/instructor/create-course">
                <Button>Créer un cours</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          courses.map((course) => (
            <Card key={course.id} isHoverable>
              <CardContent className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-full sm:w-40 h-24 rounded-lg bg-surface-2 flex-shrink-0 flex items-center justify-center text-3xl">
                  📚
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-heading-md font-semibold text-text-primary">{course.title}</h3>
                    <Badge variant={course.isPublished ? "success" : "warning"} size="sm">
                      {course.isPublished ? "Publié" : "Brouillon"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-body-sm text-text-secondary">
                    {course.module && <span>Module : {course.module.name}</span>}
                    <span>{course.totalLessons ?? 0} leçon(s)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    isLoading={togglingId === course.id}
                    onClick={() => handleTogglePublish(course)}
                  >
                    {course.isPublished ? "Dépublier" : "Publier"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-error-500"
                    isLoading={deletingId === course.id}
                    onClick={() => handleDelete(course)}
                  >
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
