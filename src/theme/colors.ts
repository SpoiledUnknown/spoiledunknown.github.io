/**
 * Centralized Color Theme Configuration
 * =====================================
 * Edit the values in this file to customize colors across the entire website.
 * Changes here are mapped to CSS custom properties and Tailwind tokens.
 */

export interface ThemeColors {
  // Background canvas
  background: string;
  surfaceObsidian: string;
  surfaceElevated: string;

  // Glass panel surfaces
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;

  // Typography
  onSurface: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;

  // Primary interactive accents (e.g. Buttons, Links, Highlights)
  primary: string;
  primaryContainer: string;
  onPrimary: string;
  onPrimaryContainer: string;

  // Secondary accents (e.g. Warnings, Crimson accents)
  secondary: string;
  secondaryContainer: string;
  onSecondary: string;

  // Tertiary accents (e.g. Amber/Orange accents)
  tertiary: string;
  tertiaryContainer: string;
  onTertiary: string;

  // Borders & Glows
  borderSubtle: string;
  borderStrong: string;
  glowElectric: string;
  glowCrimson: string;
}

export const darkThemeColors: ThemeColors = {
  background: "#0D0F14",
  surfaceObsidian: "#0D0F14",
  surfaceElevated: "#141B2D",

  surfaceContainerLowest: "#0c0e13",
  surfaceContainerLow: "rgba(26, 27, 33, 0.85)",
  surfaceContainer: "#1e1f25",
  surfaceContainerHigh: "#282a2f",
  surfaceContainerHighest: "#33353a",

  onSurface: "#e2e2e9",
  onSurfaceVariant: "#c3c5d8",
  outline: "#8d90a1",
  outlineVariant: "#434655",

  primary: "#b5c4ff",
  primaryContainer: "#2d68ff",
  onPrimary: "#00287c",
  onPrimaryContainer: "#fffcff",

  secondary: "#ffb3b6",
  secondaryContainer: "#df0042",
  onSecondary: "#68001a",

  tertiary: "#ffb597",
  tertiaryContainer: "#ca4c00",
  onTertiary: "#591d00",

  borderSubtle: "rgba(255, 255, 255, 0.08)",
  borderStrong: "rgba(255, 255, 255, 0.16)",
  glowElectric: "rgba(45, 104, 255, 0.20)",
  glowCrimson: "rgba(255, 42, 85, 0.15)",
};

export const lightThemeColors: ThemeColors = {
  background: "#F8FAFC",
  surfaceObsidian: "#F8FAFC",
  surfaceElevated: "#E2E8F0",

  surfaceContainerLowest: "#FFFFFF",
  surfaceContainerLow: "rgba(255, 255, 255, 0.90)",
  surfaceContainer: "#FFFFFF",
  surfaceContainerHigh: "#F1F5F9",
  surfaceContainerHighest: "#E2E8F0",

  onSurface: "#0F172A",
  onSurfaceVariant: "#475569",
  outline: "#64748B",
  outlineVariant: "#CBD5E1",

  primary: "#2563EB",
  primaryContainer: "#2d68ff",
  onPrimary: "#FFFFFF",
  onPrimaryContainer: "#FFFFFF",

  secondary: "#E11D48",
  secondaryContainer: "#BE123C",
  onSecondary: "#FFFFFF",

  tertiary: "#EA580C",
  tertiaryContainer: "#C2410C",
  onTertiary: "#FFFFFF",

  borderSubtle: "rgba(15, 23, 42, 0.08)",
  borderStrong: "rgba(15, 23, 42, 0.18)",
  glowElectric: "rgba(45, 104, 255, 0.15)",
  glowCrimson: "rgba(225, 29, 72, 0.12)",
};
