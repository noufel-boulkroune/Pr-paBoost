"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { coursesApi } from "@/features/courses/api";
import type { Course } from "@/features/courses/types";

const statusOptions = [
  { value: "", label: "Tous les statuts" },
  { value: "published", label: "Publié" },
  { value: "draft", label: "Brouillon" },
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const loadCourses = useCallback(() => {
    setLoading(true);
    coursesApi.getCourses({ all: "true" } as never)
      .then((res) => {
        const list = Array.isArray(res) ? res : (res as { data?: Course[] }).data ?? [];
        setCourses(list);
      })
      .catch(() => toast.error("Impossible de charger les cours"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadCourses(); }, [loadCourses]);

  const handleDelete = async (course: Course) => {
    if (!window.confirm(`Supprimer le cours "${course.title}" ? Cette action est irréversible.`)) return;
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

  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus =
      !selectedStatus ||
      (selectedStatus === "published" && c.isPublished) ||
      (selectedStatus === "draft" && !c.isPublished);
    return matchSearch && matchStatus;
  });

  const published = courses.filter((c) => c.isPublished).length;
  const drafts = courses.filter((c) => !c.isPublished).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-display-md font-bold text-text-primary">Gestion des cours</h1>
          <p className="text-body-md text-text-secondary mt-1">
            Consultez et gérez tous les cours de la plateforme
          </p>
        </div>
        <Link href="/dashboard/instructor/create-course">
          <Button leftIcon={<span>+</span>}>Nouveau cours</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: courses.length },
          { label: "Publiés", value: published },
          { label: "Brouillons", value: drafts },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="text-center py-4">
              <p className="text-display-sm font-bold text-text-primary">{s.value}</p>
              <p className="text-caption text-text-muted">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Rechercher un cours..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
        />
        <Select
          options={statusOptions}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full sm:w-48"
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="space-y-2 p-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-12 rounded-lg bg-surface-2 animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 text-text-secondary">
                {courses.length === 0 ? "Aucun cours pour le moment" : "Aucun cours ne correspond à votre recherche"}
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-surface-2 border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">Cours</th>
                    <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">Module</th>
                    <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">Statut</th>
                    <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">Leçons</th>
                    <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((course) => (
                    <tr key={course.id} className="hover:bg-surface-2/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-8 rounded bg-surface-3 flex items-center justify-center text-base flex-shrink-0">
                            📚
                          </div>
                          <p className="text-body-sm font-medium text-text-primary line-clamp-1">
                            {course.title}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-body-sm text-text-secondary">
                        {course.module?.name ?? "—"}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={course.isPublished ? "success" : "warning"} size="sm">
                          {course.isPublished ? "Publié" : "Brouillon"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-body-sm text-text-secondary">
                        {course.totalLessons ?? 0}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
