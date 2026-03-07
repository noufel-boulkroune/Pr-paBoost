"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabList, TabTrigger, TabContent } from "@/components/ui/Tabs";
import { coursesApi } from "@/features/courses/api";
import { modulesApi } from "@/features/modules/api";
import type { Module } from "@/features/modules/types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CreateCoursePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [modules, setModules] = useState<Module[]>([]);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [moduleId, setModuleId] = useState("");

  useEffect(() => {
    modulesApi.getModules().then((res) => {
      const list = Array.isArray(res) ? res : (res as { data?: Module[] }).data ?? [];
      setModules(list);
      if (list.length > 0 && !moduleId) setModuleId(list[0].id);
    }).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moduleOptions = modules.map((m) => ({ value: m.id, label: m.name }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { toast.error("Le titre est requis"); return; }
    if (!moduleId) { toast.error("Veuillez sélectionner un module"); return; }

    setIsSubmitting(true);
    try {
      await coursesApi.createCourse({
        title: title.trim(),
        slug: slugify(title),
        description: description.trim(),
        moduleId,
      });
      toast.success("Cours créé avec succès !");
      router.push("/dashboard/instructor/courses");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur lors de la création";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display-md font-bold text-text-primary">Créer un nouveau cours</h1>
          <p className="text-body-md text-text-secondary mt-1">
            Remplissez les informations ci-dessous pour créer votre cours
          </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Annuler
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabList>
            <TabTrigger value="basic">Informations</TabTrigger>
            <TabTrigger value="details">Détails</TabTrigger>
          </TabList>

          <TabContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Informations de base</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Titre du cours"
                  placeholder="ex: Anatomie du cœur – Niveau avancé"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Textarea
                  label="Description"
                  placeholder="Décrivez le contenu et les objectifs du cours"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Select
                  label="Module"
                  options={moduleOptions.length ? moduleOptions : [{ value: "", label: "Chargement..." }]}
                  value={moduleId}
                  onChange={(e) => setModuleId(e.target.value)}
                  required
                />
              </CardContent>
            </Card>
            <div className="flex justify-end mt-4">
              <Button type="button" onClick={() => setActiveTab("details")}>
                Suivant : Détails
              </Button>
            </div>
          </TabContent>

          <TabContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Objectifs pédagogiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-body-sm font-medium text-text-secondary">
                    Ce que les étudiants apprendront
                  </label>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Input key={i} placeholder={`Objectif ${i + 1}`} />
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-body-sm font-medium text-text-secondary">
                    Prérequis
                  </label>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Input key={i} placeholder={`Prérequis ${i + 1}`} />
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-between mt-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                Précédent
              </Button>
              <Button type="submit" isLoading={isSubmitting}>
                Créer le cours
              </Button>
            </div>
          </TabContent>
        </Tabs>
      </form>
    </div>
  );
}
