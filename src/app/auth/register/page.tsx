"use client";

/**
 * @file app/auth/register/page.tsx
 * @description Registration page for PrepMed — React Hook Form + Zod.
 * Students only. Teachers/admins are created by SUPER_ADMIN via the admin panel.
 */

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, User, Stethoscope } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// ─── Validation schema ────────────────────────────────────────────────────────

const registerSchema = z
  .object({
    firstName: z.string().min(2, "Au moins 2 caracteres"),
    lastName: z.string().min(2, "Au moins 2 caracteres"),
    email: z.string().email("Adresse email invalide"),
    password: z
      .string()
      .min(8, "Au moins 8 caracteres")
      .regex(/[A-Z]/, "Doit contenir une majuscule")
      .regex(/[0-9]/, "Doit contenir un chiffre"),
    confirmPassword: z.string().min(1, "Confirmation requise"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

// ─── Password strength helper ────────────────────────────────────────────────

function getStrength(pw: string) {
  if (!pw) return null;
  const score =
    (pw.length >= 8 ? 1 : 0) +
    (/[A-Z]/.test(pw) ? 1 : 0) +
    (/[0-9]/.test(pw) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(pw) ? 1 : 0) +
    (pw.length >= 12 ? 1 : 0);
  if (score <= 1) return { label: "Faible", color: "bg-error-500", width: "w-1/4" };
  if (score <= 2) return { label: "Moyen", color: "bg-warning-500", width: "w-2/4" };
  if (score <= 3) return { label: "Fort", color: "bg-success-500", width: "w-3/4" };
  return { label: "Excellent", color: "bg-success-500", width: "w-full" };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const { register: registerAuth } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" },
  });

  const strength = getStrength(watch("password") || "");

  const onSubmit = async (values: RegisterValues) => {
    setServerError(null);
    try {
      await registerAuth({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
    } catch (error: unknown) {
      setServerError(error instanceof Error ? error.message : "Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 mb-4">
          <Stethoscope className="w-7 h-7 text-primary-600" />
        </div>
        <h1 className="text-display-sm font-bold text-text-primary mb-1">
          Creer un compte
        </h1>
        <p className="text-body-md text-text-secondary">
          Commencez votre preparation aujourd&apos;hui
        </p>
      </div>

      {/* Server error */}
      {serverError && (
        <div role="alert" className="flex items-start gap-3 p-4 rounded-xl bg-error-50 border border-error-200 text-error-700 text-body-sm">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="firstName" className="block text-body-sm font-medium text-text-primary">
              Prenom
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                <User className="w-4 h-4" />
              </span>
              <Input
                id="firstName"
                placeholder="Ahmed"
                autoComplete="given-name"
                className="pl-10"
                aria-invalid={!!errors.firstName}
                {...register("firstName")}
              />
            </div>
            {errors.firstName && (
              <p className="text-caption text-error-600" role="alert">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="lastName" className="block text-body-sm font-medium text-text-primary">
              Nom
            </label>
            <Input
              id="lastName"
              placeholder="Benali"
              autoComplete="family-name"
              aria-invalid={!!errors.lastName}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-caption text-error-600" role="alert">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
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
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-caption text-error-600" role="alert">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
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
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              className="pl-10 pr-10"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
              aria-label={showPw ? "Masquer" : "Afficher"}
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {/* Strength indicator */}
          {strength && (
            <div className="mt-1.5">
              <div className="flex justify-between mb-1">
                <span className="text-caption text-text-muted">Securite</span>
                <span className={`text-caption font-semibold ${
                  strength.color === "bg-error-500"
                    ? "text-error-600"
                    : strength.color === "bg-warning-500"
                    ? "text-warning-600"
                    : "text-success-600"
                }`}>{strength.label}</span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
                <div className={`h-full rounded-full ${strength.color} ${strength.width} transition-all duration-slow`} />
              </div>
            </div>
          )}
          {errors.password && (
            <p className="text-caption text-error-600" role="alert">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="block text-body-sm font-medium text-text-primary">
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              <Lock className="w-4 h-4" />
            </span>
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              className="pl-10 pr-10"
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
              aria-label={showConfirm ? "Masquer" : "Afficher"}
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-caption text-error-600" role="alert">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2.5">
          <input
            type="checkbox"
            id="terms"
            required
            className="w-4 h-4 mt-0.5 rounded border-border text-primary-600 focus:ring-primary-500 flex-shrink-0"
          />
          <label htmlFor="terms" className="text-body-sm text-text-secondary leading-relaxed cursor-pointer">
            J&apos;accepte les{" "}
            <Link href="#" className="font-semibold text-primary-600 hover:text-primary-700">
              Conditions d&apos;utilisation
            </Link>{" "}
            et la{" "}
            <Link href="#" className="font-semibold text-primary-600 hover:text-primary-700">
              Politique de confidentialite
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Creer mon compte
        </Button>
      </form>

      <p className="text-center text-body-sm text-text-secondary">
        Deja inscrit ?{" "}
        <Link
          href="/auth/login"
          className="font-bold text-primary-600 hover:text-primary-700 transition-colors"
        >
          Se connecter
        </Link>
      </p>
    </div>
  );
}
