"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { useUser } from "@/features/users/hooks/useUser";
import { ListSkeleton } from "@/components/ui/Skeleton";

export default function ProfilePage() {
  const { user, isLoading, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-display-md font-bold text-text-primary">Profile</h1>
        <ListSkeleton count={1} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display-md font-bold text-text-primary">Profile</h1>
          <p className="text-body-md text-text-secondary mt-1">
            Manage your personal information and public profile
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} isLoading={isSaving}>
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <Avatar
                src={user?.avatar}
                name={`${user?.firstName} ${user?.lastName}`}
                size="2xl"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}
            </div>
            <h3 className="text-heading-lg font-semibold text-text-primary">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-body-md text-text-secondary capitalize">{user?.role}</p>
            {user?.bio && (
              <p className="text-body-sm text-text-secondary mt-3">{user.bio}</p>
            )}
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                disabled={!isEditing}
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <Input
              label="Email"
              type="email"
              value={user?.email}
              disabled
              helperText="Email cannot be changed"
            />
            <Textarea
              label="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              rows={4}
              placeholder="Tell us about yourself..."
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={!isEditing}
                placeholder="City, Country"
              />
              <Input
                label="Website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                disabled={!isEditing}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
