/**
 * @file layout.tsx
 * @description Root Next.js App Router layout.
 * Injects global fonts (Inter + Plus Jakarta Sans), wraps the app with
 * client-side providers (TanStack Query, Sonner), and renders the
 * public Navbar + Footer for the main public shell.
 *
 * Dashboard and auth routes override this layout via nested layouts.
 */

import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "PrepMed — Réussissez votre Concours de Résidanat",
  description:
    "La plateforme de référence pour préparer le concours de résidanat en Algérie. Cours vidéo, annales, QCM interactifs et sessions live avec les meilleurs enseignants.",
  keywords: [
    "résidanat",
    "concours résidanat algérie",
    "médecine algérie",
    "prépamed",
    "annales résidanat",
    "QCM médecine",
  ],
};

/**
 * RootLayout
 *
 * The top-level shell shared by all public routes (landing, auth, catalog).
 * Dashboard routes use their own nested layout and do NOT render Navbar/Footer.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // dark class is toggled by the theme switcher stored in localStorage
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-surface-1 text-text-primary antialiased transition-colors duration-300">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
