"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabList, TabTrigger, TabContent } from "@/components/ui/Tabs";

const levelOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "all-levels", label: "All Levels" },
];

const categoryOptions = [
  { value: "development", label: "Development" },
  { value: "business", label: "Business" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
];

export default function CreateCoursePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    router.push("/dashboard/instructor/courses");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display-md font-bold text-text-primary">Create New Course</h1>
          <p className="text-body-md text-text-secondary mt-1">
            Fill in the details below to create your course
          </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabList>
            <TabTrigger value="basic">Basic Info</TabTrigger>
            <TabTrigger value="details">Details</TabTrigger>
            <TabTrigger value="curriculum">Curriculum</TabTrigger>
            <TabTrigger value="pricing">Pricing</TabTrigger>
          </TabList>

          <TabContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Course Title"
                  placeholder="e.g., Complete React Developer Course"
                  required
                />
                <Textarea
                  label="Short Description"
                  placeholder="Brief description of your course (150 characters max)"
                  rows={2}
                  required
                />
                <Textarea
                  label="Full Description"
                  placeholder="Detailed description of what students will learn"
                  rows={6}
                  required
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select
                    label="Category"
                    options={categoryOptions}
                    required
                  />
                  <Select
                    label="Level"
                    options={levelOptions}
                    required
                  />
                </div>
                <Input
                  label="Course Thumbnail"
                  type="file"
                  accept="image/*"
                  helperText="Recommended size: 1280x720 pixels"
                />
              </CardContent>
            </Card>
            <div className="flex justify-end mt-4">
              <Button type="button" onClick={() => setActiveTab("details")}>
                Next: Details
              </Button>
            </div>
          </TabContent>

          <TabContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>What Students Will Learn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-body-sm font-medium text-text-secondary">
                    Learning Outcomes
                  </label>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Input
                      key={i}
                      placeholder={`Outcome ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="space-y-2">
                  <label className="text-body-sm font-medium text-text-secondary">
                    Requirements
                  </label>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Input
                      key={i}
                      placeholder={`Requirement ${i + 1}`}
                    />
                  ))}
                </div>
                <Input
                  label="Target Audience"
                  placeholder="Who is this course for?"
                />
              </CardContent>
            </Card>
            <div className="flex justify-between mt-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                Previous
              </Button>
              <Button type="button" onClick={() => setActiveTab("curriculum")}>
                Next: Curriculum
              </Button>
            </div>
          </TabContent>

          <TabContent value="curriculum">
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg bg-surface-2">
                    <div className="flex items-center justify-between mb-4">
                      <Input
                        placeholder="Section 1: Introduction"
                        className="max-w-md"
                      />
                      <Button variant="ghost" size="sm">Delete Section</Button>
                    </div>
                    <div className="space-y-2 pl-4">
                      <div className="flex items-center gap-2 p-2 bg-surface-1 rounded">
                        <span className="text-caption text-text-muted">1.1</span>
                        <Input
                          placeholder="Lesson title"
                          className="flex-1"
                        />
                        <Input
                          type="file"
                          accept="video/*"
                          className="w-48"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="ml-6">
                        + Add Lesson
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline">+ Add Section</Button>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-between mt-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                Previous
              </Button>
              <Button type="button" onClick={() => setActiveTab("pricing")}>
                Next: Pricing
              </Button>
            </div>
          </TabContent>

          <TabContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Price"
                    type="number"
                    placeholder="99.99"
                    required
                  />
                  <Select
                    label="Currency"
                    options={[
                      { value: "USD", label: "USD - US Dollar" },
                      { value: "EUR", label: "EUR - Euro" },
                      { value: "GBP", label: "GBP - British Pound" },
                    ]}
                    required
                  />
                </div>
                <Input
                  label="Compare at Price (Optional)"
                  type="number"
                  placeholder="199.99"
                  helperText="Original price to show discount"
                />
              </CardContent>
            </Card>
            <div className="flex justify-between mt-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab("curriculum")}>
                Previous
              </Button>
              <Button type="submit" isLoading={isSubmitting}>
                Create Course
              </Button>
            </div>
          </TabContent>
        </Tabs>
      </form>
    </div>
  );
}
