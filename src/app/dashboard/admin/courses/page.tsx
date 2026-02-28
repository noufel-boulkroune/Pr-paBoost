"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

// Mock data for courses
const mockCourses = [
  {
    id: "1",
    title: "Complete React Developer Course",
    instructor: "John Doe",
    students: 1234,
    rating: 4.8,
    price: 99.99,
    status: "published",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Advanced TypeScript Patterns",
    instructor: "Jane Smith",
    students: 567,
    rating: 4.9,
    price: 79.99,
    status: "published",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Next.js 14 Masterclass",
    instructor: "Bob Johnson",
    students: 0,
    rating: 0,
    price: 129.99,
    status: "draft",
    createdAt: "2024-01-20",
  },
];

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
  { value: "under-review", label: "Under Review" },
];

export default function AdminCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || course.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display-md font-bold text-text-primary">Manage Courses</h1>
        <p className="text-body-md text-text-secondary mt-1">
          Review and manage all courses on the platform
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search courses..."
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

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Courses", value: "12,345" },
          { label: "Published", value: "10,234" },
          { label: "Under Review", value: "456" },
          { label: "Draft", value: "1,655" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="text-center py-4">
              <p className="text-display-sm font-bold text-text-primary">{stat.value}</p>
              <p className="text-caption text-text-muted">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Courses Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-2 border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">
                    Course
                  </th>
                  <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">
                    Instructor
                  </th>
                  <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">
                    Students
                  </th>
                  <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-surface-2/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 rounded bg-surface-3 flex items-center justify-center text-lg">
                          📚
                        </div>
                        <div>
                          <p className="text-body-sm font-medium text-text-primary">
                            {course.title}
                          </p>
                          <p className="text-caption text-text-muted">
                            Rating: {course.rating > 0 ? course.rating.toFixed(1) : "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-body-sm text-text-secondary">
                      {course.instructor}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          course.status === "published"
                            ? "success"
                            : course.status === "draft"
                            ? "warning"
                            : "default"
                        }
                        size="sm"
                      >
                        {course.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-body-sm text-text-secondary">
                      {course.students.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-body-sm text-text-secondary">
                      {formatPrice(course.price)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="text-error-600">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
