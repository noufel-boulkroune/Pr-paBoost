/**
 * Global Type Definitions
 */

// ============================================================================
// BASE TYPES
// ============================================================================

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  details?: Record<string, string[]>;
}

export interface ApiSuccessResponse<T> {
  data: T;
  message?: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// French translations for common UI elements
export const UI_TRANSLATIONS = {
  common: {
    loading: "Chargement...",
    error: "Une erreur est survenue",
    retry: "Réessayer",
    cancel: "Annuler",
    save: "Enregistrer",
    delete: "Supprimer",
    edit: "Modifier",
    create: "Créer",
    search: "Rechercher",
    filter: "Filtrer",
    sort: "Trier",
    next: "Suivant",
    previous: "Précédent",
    submit: "Valider",
    close: "Fermer",
    back: "Retour",
    continue: "Continuer",
    start: "Commencer",
    finish: "Terminer",
  },
  auth: {
    login: "Connexion",
    logout: "Déconnexion",
    register: "Inscription",
    email: "Email",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    firstName: "Prénom",
    lastName: "Nom",
    forgotPassword: "Mot de passe oublié ?",
    resetPassword: "Réinitialiser le mot de passe",
  },
  navigation: {
    home: "Accueil",
    courses: "Cours",
    modules: "Modules",
    exams: "Annales",
    practice: "Entraînement",
    liveSessions: "Sessions en direct",
    dashboard: "Tableau de bord",
    profile: "Profil",
    settings: "Paramètres",
    subscription: "Abonnement",
    studySessions: "Sessions d'étude",
  },
  roles: {
    SUPER_ADMIN: "Super Admin",
    SUB_ADMIN: "Enseignant",
    STUDENT: "Étudiant",
  },
} as const;
