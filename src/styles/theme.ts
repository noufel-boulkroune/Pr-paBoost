/**
 * Design Token System
 * 
 * This file contains all design tokens for the application.
 * These values are injected as CSS variables in globals.css
 */

// Color tokens - Modern professional palette
export const colors = {
  // Primary - Deep Indigo
  primary: {
    50: "238 242 255",
    100: "224 231 255",
    200: "199 210 254",
    300: "165 180 252",
    400: "129 140 248",
    500: "99 102 241",
    600: "79 70 229",
    700: "67 56 202",
    800: "55 48 163",
    900: "49 46 129",
    950: "30 27 75",
  },
  // Secondary - Warm Coral
  secondary: {
    50: "255 241 242",
    100: "255 228 230",
    200: "254 205 211",
    300: "253 164 175",
    400: "251 113 133",
    500: "244 63 94",
    600: "225 29 72",
    700: "190 18 60",
    800: "159 18 57",
    900: "136 19 55",
    950: "76 5 25",
  },
  // Accent - Teal
  accent: {
    50: "240 253 250",
    100: "204 251 241",
    200: "153 246 228",
    300: "94 234 212",
    400: "45 212 191",
    500: "20 184 166",
    600: "13 148 136",
    700: "15 118 110",
    800: "17 94 89",
    900: "19 78 74",
    950: "4 47 46",
  },
  // Surface backgrounds
  surface: {
    1: "255 255 255",
    2: "248 250 252",
    3: "241 245 249",
  },
  // Semantic colors
  success: {
    50: "240 253 244",
    100: "220 252 231",
    200: "187 247 208",
    500: "34 197 94",
    700: "21 128 61",
  },
  warning: {
    50: "255 251 235",
    100: "254 243 199",
    200: "253 230 138",
    500: "245 158 11",
    700: "180 83 9",
  },
  error: {
    50: "254 242 242",
    100: "254 226 226",
    200: "254 202 202",
    500: "239 68 68",
    700: "185 28 28",
  },
  // Text colors
  text: {
    primary: "15 23 42",
    secondary: "71 85 105",
    muted: "148 163 184",
    inverse: "255 255 255",
  },
  // Border
  border: "226 232 240",
} as const;

// Dark mode colors
export const darkColors = {
  surface: {
    1: "15 23 42",
    2: "30 41 59",
    3: "51 65 85",
  },
  text: {
    primary: "248 250 252",
    secondary: "203 213 225",
    muted: "148 163 184",
    inverse: "15 23 42",
  },
  border: "51 65 85",
} as const;

// Typography scale
export const typography = {
  fontFamily: {
    sans: "Inter",
    display: "Inter",
  },
  fontSize: {
    "display-xl": ["3.5rem", { lineHeight: "1" }],
    "display-lg": ["3rem", { lineHeight: "1.1" }],
    "display-md": ["2.25rem", { lineHeight: "1.2" }],
    "display-sm": ["1.875rem", { lineHeight: "1.2" }],
    "heading-xl": ["1.5rem", { lineHeight: "1.3" }],
    "heading-lg": ["1.25rem", { lineHeight: "1.4" }],
    "heading-md": ["1.125rem", { lineHeight: "1.4" }],
    "heading-sm": ["1rem", { lineHeight: "1.5" }],
    "body-lg": ["1.125rem", { lineHeight: "1.6" }],
    "body-md": ["1rem", { lineHeight: "1.6" }],
    "body-sm": ["0.875rem", { lineHeight: "1.6" }],
    "caption": ["0.75rem", { lineHeight: "1.5" }],
  },
  lineHeight: {
    tight: "1.2",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
  },
} as const;

// Spacing scale
export const spacing = {
  "3xs": "0.125rem",   // 2px
  "2xs": "0.25rem",    // 4px
  "xs": "0.5rem",      // 8px
  "sm": "0.75rem",     // 12px
  "md": "1rem",        // 16px
  "lg": "1.5rem",      // 24px
  "xl": "2rem",        // 32px
  "2xl": "2.5rem",     // 40px
  "3xl": "3rem",       // 48px
  "4xl": "4rem",       // 64px
  "5xl": "5rem",       // 80px
  "6xl": "6rem",       // 96px
} as const;

// Border radius scale
export const radius = {
  none: "0",
  xs: "0.25rem",       // 4px
  sm: "0.375rem",      // 6px
  md: "0.5rem",        // 8px
  lg: "0.75rem",       // 12px
  xl: "1rem",          // 16px
  "2xl": "1.25rem",    // 20px
  "3xl": "1.5rem",     // 24px
  full: "9999px",
} as const;

// Shadow scale
export const shadows = {
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
} as const;

// Animation tokens
export const animation = {
  duration: {
    fast: "150ms",
    normal: "250ms",
    slow: "350ms",
    slower: "500ms",
  },
  ease: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
} as const;

// Z-index scale
export const zIndex = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Breakpoints
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;
