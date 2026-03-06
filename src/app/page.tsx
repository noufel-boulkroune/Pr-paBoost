"use client";

/**
 * @file app/page.tsx
 * @description PrepMed landing page — Algerian Medical Residency Exam Prep Platform.
 *
 * Sections:
 *  1. Hero — animated gradient, word-by-word title, CTA buttons
 *  2. How It Works — 3 steps, staggered animation on scroll
 *  3. Teachers — live data from GET /teachers, rank badges, glow effects
 *  4. Categories — live data from GET /categories, tilt on hover
 *  5. Stats Counter — animated number counters on scroll entry
 *  6. Plans — live data from GET /plans, pricing cards
 *  7. Footer CTA
 *
 * All data-fetching uses TanStack Query. Animations use Framer Motion.
 */

import { useQuery } from "@tanstack/react-query";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  BookOpen,
  Video,
  FileText,
  Users,
  Clock,
  Award,
  ChevronDown,
  Crown,
  Star,
  Trophy,
  Microscope,
  Heart,
  Brain,
  Pill,
  Activity,
  Shield,
} from "lucide-react";
import { teachersApi, type TeacherCard } from "@/features/teachers/api";
import { categoriesApi } from "@/features/categories/api";
import { STALE_STATIC } from "@/lib/query-client";

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 28, scale: 0.97 },
  animate: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Build a public S3 URL from an object key — returns null if key is null */
const s3 = (key: string | null | undefined): string | null =>
  key ? `${process.env.NEXT_PUBLIC_S3_BASE_URL || ""}/${key}` : null;

/** Initials fallback for avatar */
const initials = (first: string, last: string) =>
  `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();

// ─── Category icon map ────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  anatomie: Microscope,
  cardiologie: Heart,
  neurologie: Brain,
  pharmacologie: Pill,
  physiologie: Activity,
  default: Shield,
};

const getCategoryIcon = (slug: string): React.ElementType =>
  CATEGORY_ICONS[slug.toLowerCase()] ?? CATEGORY_ICONS.default;

// ─── Teacher rank badge config ────────────────────────────────────────────────

const RANK_CONFIG: Record<
  number,
  { glow: string; ring: string; badge: string; icon: React.ElementType | null; pulse: boolean }
> = {
  1: {
    glow: "shadow-[0_0_20px_rgba(251,191,36,0.5),0_0_60px_rgba(251,191,36,0.2)]",
    ring: "ring-2 ring-yellow-400",
    badge: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white",
    icon: Crown,
    pulse: true,
  },
  2: {
    glow: "shadow-[0_0_20px_rgba(148,163,184,0.5),0_0_60px_rgba(148,163,184,0.2)]",
    ring: "ring-2 ring-slate-400",
    badge: "bg-gradient-to-r from-slate-300 to-slate-500 text-white",
    icon: Star,
    pulse: false,
  },
  3: {
    glow: "shadow-[0_0_20px_rgba(180,120,60,0.5),0_0_60px_rgba(180,120,60,0.2)]",
    ring: "ring-2 ring-amber-600",
    badge: "bg-gradient-to-r from-amber-500 to-amber-700 text-white",
    icon: Trophy,
    pulse: false,
  },
};

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="font-mono text-display-sm font-bold text-accent-400"
    >
      {value}{suffix}
    </motion.div>
  );
}

// ─── Section wrapper with scroll-triggered fade ───────────────────────────────

function ScrollSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ─── Teacher card ─────────────────────────────────────────────────────────────

function TeacherCardComponent({ teacher }: { teacher: TeacherCard }) {
  const config = teacher.rank ? RANK_CONFIG[teacher.rank] : null;
  const avatarUrl = s3(teacher.user.avatarKey);
  const name = `${teacher.user.firstName} ${teacher.user.lastName}`;

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative rounded-2xl border border-border bg-surface-1 p-6 flex flex-col items-center text-center cursor-pointer transition-shadow duration-300 ${
        config ? config.glow : "shadow-sm hover:shadow-md"
      }`}
    >
      {/* Rank badge */}
      {config && (
        <motion.div
          initial={{ scale: 0, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.2 }}
          className={`absolute -top-2 -right-2 flex items-center gap-1 px-2 py-1 rounded-md text-caption font-bold ${config.badge}`}
        >
          {config.icon && <config.icon className="w-3 h-3" />}
          #{teacher.rank}
        </motion.div>
      )}

      {/* Avatar */}
      <div className={`relative w-20 h-20 rounded-full mb-4 ${config ? config.ring : ""} ${teacher.rank === 1 ? "animate-pulse-glow" : ""}`}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="w-full h-full rounded-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-heading-md">
            {initials(teacher.user.firstName, teacher.user.lastName)}
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="text-heading-md font-bold text-text-primary mb-0.5">{name}</h3>
      {teacher.specialty && (
        <p className="text-body-sm text-accent-600 font-medium mb-2">{teacher.specialty}</p>
      )}
      {teacher.bio && (
        <p className="text-caption text-text-secondary line-clamp-2 mb-4">{teacher.bio}</p>
      )}

      <Link
        href={`/teachers/${teacher.id}`}
        className="mt-auto text-body-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
      >
        Voir le profil
      </Link>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  // Fetch teachers and categories from the real API
  const { data: teachers = [] } = useQuery({
    queryKey: ["teachers"],
    queryFn: teachersApi.getTeachers,
    staleTime: STALE_STATIC,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.getActiveCategories(),
    staleTime: STALE_STATIC,
  });

  // Hero words for staggered entrance
  const heroWords = ["Reussissez", "votre", "Concours", "de", "Residanat"];

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* ================================================================
          1. HERO SECTION
      ================================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900" />

        {/* Animated blobs */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary-700/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent-600/15 blur-3xl"
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-body-sm font-medium mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              Plateforme officielle de preparation au Residanat
            </motion.div>

            {/* Animated title — words fade up one by one */}
            <h1 className="text-display-lg lg:text-display-xl font-bold text-white mb-6 leading-tight">
              {heroWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                  className={`inline-block mr-3 ${word === "Residanat" ? "text-accent-400" : ""}`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-body-lg text-primary-200 mb-10 max-w-xl mx-auto leading-relaxed"
            >
              Cours video HD, annales PDF, QCM interactifs et sessions live avec
              les meilleurs enseignants d&apos;Algerie. Tout ce qu&apos;il vous faut en un seul endroit.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-semibold text-body-md transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-accent-600/25"
              >
                Commencer gratuitement
                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              </Link>
              <Link
                href="/public/courses"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/30 text-white font-semibold text-body-md hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
              >
                Voir les cours
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-8 mt-14 pt-10 border-t border-white/10"
            >
              {[
                { value: "500+", label: "Cours disponibles" },
                { value: "10K+", label: "Etudiants inscrits" },
                { value: "98%", label: "Taux de reussite" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-mono text-2xl font-bold text-accent-400">{s.value}</div>
                  <div className="text-caption text-primary-300 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ================================================================
          2. HOW IT WORKS
      ================================================================ */}
      <ScrollSection className="py-24 bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-body-sm font-medium mb-4">
              Simple et efficace
            </div>
            <h2 className="text-display-md font-bold text-text-primary mb-4">
              Comment ca fonctionne ?
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Trois etapes simples pour demarrer votre preparation et maximiser vos chances de succes.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "01",
                icon: Users,
                title: "Creez votre compte",
                description:
                  "Inscription gratuite en 30 secondes. Acces immediat aux contenus gratuits et aux previews.",
                color: "bg-primary-50 text-primary-600",
              },
              {
                step: "02",
                icon: Award,
                title: "Choisissez votre plan",
                description:
                  "Selectionnez les modules correspondant a votre specialite. Acces illimite aux cours, annales et QCM.",
                color: "bg-accent-50 text-accent-600",
              },
              {
                step: "03",
                icon: Trophy,
                title: "Reussissez le concours",
                description:
                  "Suivez votre progression, identifiez vos lacunes et presentez-vous en pleine confiance.",
                color: "bg-success-50 text-success-700",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={staggerItem}
                className="relative text-center"
              >
                {/* Step connector line (hidden on mobile) */}
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2 z-0" />

                <div className="relative z-10">
                  <div className={`w-16 h-16 mx-auto rounded-2xl ${item.color} flex items-center justify-center mb-5 shadow-sm`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div className="text-caption font-mono font-bold text-text-muted mb-2">
                    ETAPE {item.step}
                  </div>
                  <h3 className="text-heading-lg font-bold text-text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-body-md text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollSection>

      {/* ================================================================
          3. TEACHERS SECTION
      ================================================================ */}
      <ScrollSection className="py-24 bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent-100 text-accent-700 text-body-sm font-medium mb-4">
              Nos enseignants
            </div>
            <h2 className="text-display-md font-bold text-text-primary mb-4">
              Les meilleurs formateurs du Residanat
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Des specialistes reconnus, classes par les etudiants eux-memes.
            </p>
          </div>

          {teachers.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-80px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {teachers.slice(0, 8).map((teacher) => (
                <TeacherCardComponent key={teacher.id} teacher={teacher} />
              ))}
            </motion.div>
          ) : (
            // Skeleton while loading or empty
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-surface-1 p-6 animate-shimmer">
                  <div className="w-20 h-20 rounded-full bg-surface-3 mx-auto mb-4" />
                  <div className="h-4 bg-surface-3 rounded-full mx-auto w-32 mb-2" />
                  <div className="h-3 bg-surface-3 rounded-full mx-auto w-24" />
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollSection>

      {/* ================================================================
          4. CATEGORIES / SPECIALITES SECTION
      ================================================================ */}
      <ScrollSection className="py-24 bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-body-sm font-medium mb-4">
              Nos specialites
            </div>
            <h2 className="text-display-md font-bold text-text-primary mb-4">
              Toutes les disciplines du Residanat
            </h2>
            <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
              Des modules couvrant l&apos;integralite du programme officiel du concours.
            </p>
          </div>

          {categories.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-80px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {categories.map((category) => {
                const Icon = getCategoryIcon(category.slug);
                return (
                  <motion.div key={category.id} variants={staggerItem}>
                    <Link
                      href={`/public/courses?category=${category.slug}`}
                      className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-surface-1 hover:border-primary-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-heading-md font-semibold text-text-primary group-hover:text-primary-600 transition-colors truncate">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-body-sm text-text-secondary truncate mt-0.5">
                            {category.description}
                          </p>
                        )}
                      </div>
                      <ChevronDown className="w-4 h-4 text-text-muted group-hover:text-primary-600 group-hover:translate-x-1 rotate-[-90deg] transition-all duration-200 flex-shrink-0" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-20 rounded-2xl border border-border bg-surface-3 animate-shimmer" />
              ))}
            </div>
          )}
        </div>
      </ScrollSection>

      {/* ================================================================
          5. STATS COUNTER
      ================================================================ */}
      <section className="py-24 bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display-md font-bold text-white mb-4">
              PrepMed en chiffres
            </h2>
            <p className="text-body-lg text-primary-200 max-w-xl mx-auto">
              Des milliers d&apos;etudiants nous font confiance chaque annee.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Etudiants actifs", icon: Users },
              { value: "500+", label: "Cours disponibles", icon: BookOpen },
              { value: "200+", label: "Annales PDF", icon: FileText },
              { value: "98%", label: "Taux de reussite", icon: Award },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-4">
                  <stat.icon className="w-7 h-7 text-accent-400" />
                </div>
                <AnimatedCounter value={stat.value} />
                <div className="text-body-sm text-primary-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          6. FEATURES SECTION
      ================================================================ */}
      <ScrollSection className="py-24 bg-surface-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent-100 text-accent-700 text-body-sm font-medium mb-4">
              Pourquoi PrepMed ?
            </div>
            <h2 className="text-display-md font-bold text-text-primary mb-4">
              Tout ce qu&apos;il faut pour reussir
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Video,
                title: "Cours video HD",
                description: "Des videos de haute qualite filmees en studio, par des enseignants experts du Residanat.",
                gradient: "from-primary-500 to-primary-700",
              },
              {
                icon: FileText,
                title: "Annales officielles",
                description: "Les 10 dernieres annees de sujets corriges en PDF, avec recherche et filtrages par annee et matiere.",
                gradient: "from-accent-500 to-accent-700",
              },
              {
                icon: BookOpen,
                title: "QCM interactifs",
                description: "Des milliers de questions avec corrections detaillees et explications pedagogiques.",
                gradient: "from-success-500 to-success-700",
              },
              {
                icon: Users,
                title: "Sessions live",
                description: "Rejoignez des cours en direct sur Zoom ou Google Meet avec les meilleurs formateurs.",
                gradient: "from-warning-500 to-warning-700",
              },
              {
                icon: Clock,
                title: "Timer Pomodoro",
                description: "Suivez vos sessions d&apos;etude, construisez des habitudes et restez motive avec des statistiques.",
                gradient: "from-primary-400 to-accent-600",
              },
              {
                icon: Activity,
                title: "Progression detaillee",
                description: "Tableau de bord personnalise avec votre avancee par module, vos scores et vos objectifs.",
                gradient: "from-accent-400 to-primary-600",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-border bg-surface-1 p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-sm`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-heading-md font-bold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-body-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollSection>

      {/* ================================================================
          7. CTA SECTION
      ================================================================ */}
      <section className="py-24 bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.animate}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-slate-900" />
            <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-white/5 animate-blob" />
            <div className="absolute bottom-[-40px] left-[-40px] w-48 h-48 rounded-full bg-accent-400/10 animate-blob-reverse" />
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

            <div className="relative z-10 p-12 lg:p-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-body-sm font-medium mb-6 backdrop-blur-sm">
                Inscription gratuite — Acces immediat
              </div>
              <h2 className="text-display-md lg:text-display-lg font-bold text-white mb-4">
                Pret a commencer votre preparation ?
              </h2>
              <p className="text-body-lg text-primary-200 mb-8 max-w-2xl mx-auto">
                Rejoignez des milliers d&apos;etudiants qui preparent le Residanat avec PrepMed.
                Commencez gratuitement aujourd&apos;hui.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-semibold text-body-md transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Commencer gratuitement
                </Link>
                <Link
                  href="/public/courses"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/30 text-white font-semibold text-body-md hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
                >
                  Parcourir les cours
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-primary-300 text-body-sm">
                {[
                  "Inscription gratuite",
                  "Acces aux previews",
                  "Annulez a tout moment",
                  "Support pedagogique inclus",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
