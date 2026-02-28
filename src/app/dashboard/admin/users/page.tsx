"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { ListSkeleton } from "@/components/ui/Skeleton";

// Mock data for users
const mockUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    role: "student",
    status: "active",
    joinedAt: "2024-01-15",
    courses: 5,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    role: "instructor",
    status: "active",
    joinedAt: "2024-01-10",
    courses: 3,
  },
  {
    id: "3",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    role: "student",
    status: "inactive",
    joinedAt: "2024-01-05",
    courses: 0,
  },
];

const roleOptions = [
  { value: "", label: "All Roles" },
  { value: "student", label: "Student" },
  { value: "instructor", label: "Instructor" },
  { value: "admin", label: "Admin" },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !selectedRole || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display-md font-bold text-text-primary">Manage Users</h1>
        <p className="text-body-md text-text-secondary mt-1">
          View and manage all users on the platform
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search users..."
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
          options={roleOptions}
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full sm:w-48"
        />
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-2 border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">
                    User
                  </th>
                  <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">
                    Courses
                  </th>
                  <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">
                    Joined
                  </th>
                  <th className="text-left py-3 px-4 text-body-sm font-medium text-text-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-2/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={`${user.firstName} ${user.lastName}`}
                          size="sm"
                        />
                        <div>
                          <p className="text-body-sm font-medium text-text-primary">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-caption text-text-muted">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          user.role === "admin"
                            ? "error"
                            : user.role === "instructor"
                            ? "primary"
                            : "default"
                        }
                        size="sm"
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={user.status === "active" ? "success" : "warning"}
                        size="sm"
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-body-sm text-text-secondary">
                      {user.courses}
                    </td>
                    <td className="py-3 px-4 text-body-sm text-text-secondary">
                      {user.joinedAt}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
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
