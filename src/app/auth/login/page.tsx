"use client";

/**
 * @file app/auth/login/page.tsx
 * @description Login page for PrepMed — React Hook Form + Zod + medical branding.
 */

import { Suspense, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, Stethoscope } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const loginSchema = z.object({
  email: z.string().min(1, "Email requis").email("Adresse email invalide"),
  password: z.string().min(1, "Mot de passe requis").min(6, "Au moins 6 caractères"),
});

type LoginValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    setServerError(null);
    try {
      await login(values);
    } catch (error: unknown) {
      const msg =
        error instanceof Error
          ? error.message
          : "Email ou mot de passe incorrect.";
      setServerError(msg);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 mb-4">
          <Stethoscope className="w-7 h-7 text-primary-600" />
        </div>
        <h1 className="text-display-sm font-bold text-text-primary mb-1">Connexion</h1>
        <p className="text-body-md text-text-secondary">
          Accédez à votre espace de préparation
        </p>
      </div>

      {serverError && (
        <div role="alert" className="flex items-start gap-3 p-4 rounded-xl bg-error-50 border border-error-200 text-error-700 text-body-sm">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-body-sm font-medium text-text-primary">
            Adresse email
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              <Mail className="w-4 h-4" />
            </span>
            <Input
              id="email"
              type="email"
              placeholder="vous@exemple.com"
              autoComplete="email"
              className="pl-10"
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-caption text-error-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-body-sm font-medium text-text-primary">
            Mot de passe
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              <Lock className="w-4 h-4" />
            </span>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              className="pl-10 pr-10"
              aria-describedby={errors.password ? "password-error" : undefined}
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-caption text-error-600" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-border text-primary-600 focus:ring-primary-500" />
            <span className="text-body-sm text-text-secondary group-hover:text-text-primary transition-colors">
              Se souvenir de moi
            </span>
          </label>
          <Link href="/auth/forgot-password" className="text-body-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
            Mot de passe oublié ?
          </Link>
        </div>

        <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting} disabled={isSubmitting}>
          Se connecter
        </Button>
      </form>

      <p className="text-center text-body-sm text-text-secondary">
        Pas encore de compte ?{" "}
        <Link href="/auth/register" className="font-bold text-primary-600 hover:text-primary-700 transition-colors">
          S&apos;inscrire gratuitement
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="space-y-6 animate-pulse" aria-label="Chargement..." />}>
      <LoginForm />
    </Suspense>
  );
}
