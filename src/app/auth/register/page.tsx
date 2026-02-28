"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student" as "student" | "instructor", // UI role
  });

  // Map UI roles to API roles
  const getApiRole = (uiRole: "student" | "instructor"): "STUDENT" | "SUB_ADMIN" => {
    return uiRole === "student" ? "STUDENT" : "SUB_ADMIN";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: getApiRole(formData.role),
      });
      router.push("/dashboard/dashboard");
    } catch {
      setError("Failed to create account. Please try again.");
    }
  };

  const roleOptions = [
    { value: "student", label: "🎓  Student — I want to learn" },
    { value: "instructor", label: "🏫  Instructor — I want to teach" },
  ];

  const passwordStrength = formData.password.length === 0
    ? null
    : formData.password.length < 6
    ? { label: "Weak", color: "bg-error-500", width: "w-1/4" }
    : formData.password.length < 10
    ? { label: "Good", color: "bg-warning-500", width: "w-2/4" }
    : { label: "Strong", color: "bg-success-500", width: "w-full" };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-display-sm font-bold text-text-primary mb-2">
          Create your account ✨
        </h1>
        <p className="text-body-md text-text-secondary">
          Start your learning journey today — it&apos;s free!
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-error-50 border border-error-200 text-error-700 text-body-sm">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role selection */}
        <div className="grid grid-cols-2 gap-3">
          {(["student", "instructor"] as const).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setFormData({ ...formData, role })}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-fast text-center ${
                formData.role === role
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-border bg-surface-1 text-text-secondary hover:border-primary-200 hover:bg-surface-2"
              }`}
            >
              <span className="text-2xl">{role === "student" ? "🎓" : "🏫"}</span>
              <span className="text-body-sm font-semibold capitalize">{role}</span>
              <span className="text-caption text-text-muted">
                {role === "student" ? "I want to learn" : "I want to teach"}
              </span>
            </button>
          ))}
        </div>

        {/* Name fields */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="First Name"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>

        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          {/* Password strength */}
          {passwordStrength && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-caption text-text-muted">Password strength</span>
                <span className={`text-caption font-semibold ${
                  passwordStrength.color === "bg-error-500" ? "text-error-600"
                  : passwordStrength.color === "bg-warning-500" ? "text-warning-600"
                  : "text-success-600"
                }`}>{passwordStrength.label}</span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
                <div className={`h-full rounded-full ${passwordStrength.color} ${passwordStrength.width} transition-all duration-slow`} />
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />

        <div className="flex items-start gap-2.5">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 mt-0.5 rounded border-border text-primary-600 focus:ring-primary-500 flex-shrink-0"
            required
          />
          <label htmlFor="terms" className="text-body-sm text-text-secondary leading-relaxed cursor-pointer">
            I agree to the{" "}
            <Link href="#" className="font-semibold text-primary-600 hover:text-primary-700">Terms of Service</Link>{" "}
            and{" "}
            <Link href="#" className="font-semibold text-primary-600 hover:text-primary-700">Privacy Policy</Link>
          </label>
        </div>

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading} disabled={isLoading}>
          Create Account — It&apos;s Free!
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-surface-1 text-text-muted font-medium">Or sign up with</span>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2.5 h-11 px-4 rounded-lg border-2 border-border bg-surface-1 text-body-sm font-semibold text-text-primary hover:bg-surface-2 hover:border-primary-200 transition-all duration-fast">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
        <button className="flex items-center justify-center gap-2.5 h-11 px-4 rounded-lg border-2 border-border bg-surface-1 text-body-sm font-semibold text-text-primary hover:bg-surface-2 hover:border-primary-200 transition-all duration-fast">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </button>
      </div>

      <p className="text-center text-body-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-bold text-primary-600 hover:text-primary-700 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
