"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Tabs, TabList, TabTrigger, TabContent } from "@/components/ui/Tabs";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display-md font-bold text-text-primary">Settings</h1>
        <p className="text-body-md text-text-secondary mt-1">
          Manage your account preferences and security
        </p>
      </div>

      <Tabs defaultValue="account">
        <TabList>
          <TabTrigger value="account">Account</TabTrigger>
          <TabTrigger value="notifications">Notifications</TabTrigger>
          <TabTrigger value="security">Security</TabTrigger>
        </TabList>

        <TabContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Language & Region</CardTitle>
              <CardDescription>
                Set your preferred language and regional settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Language"
                value="English"
                disabled
                helperText="More languages coming soon"
              />
              <Input
                label="Time Zone"
                value="UTC"
                disabled
                helperText="Automatically detected from your browser"
              />
              <Button onClick={handleSave} isLoading={isSaving}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabContent>

        <TabContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Course updates", description: "Get notified when courses are updated" },
                { label: "New messages", description: "Receive notifications for new messages" },
                { label: "Promotions", description: "Get notified about sales and promotions" },
                { label: "Weekly digest", description: "Receive a weekly summary of your activity" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id={item.label}
                    defaultChecked
                    className="w-4 h-4 mt-1 rounded border-border text-primary-600 focus:ring-primary-500"
                  />
                  <div>
                    <label htmlFor={item.label} className="text-body-md font-medium text-text-primary">
                      {item.label}
                    </label>
                    <p className="text-body-sm text-text-secondary">{item.description}</p>
                  </div>
                </div>
              ))}
              <Button onClick={handleSave} isLoading={isSaving} className="mt-4">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabContent>

        <TabContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm New Password" type="password" />
              <Button onClick={handleSave} isLoading={isSaving}>
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6 border-error-200">
            <CardHeader>
              <CardTitle className="text-error-600">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions for your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-heading-sm font-medium text-text-primary">
                    Delete Account
                  </h4>
                  <p className="text-body-sm text-text-secondary">
                    This will permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="danger">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabContent>
      </Tabs>
    </div>
  );
}
