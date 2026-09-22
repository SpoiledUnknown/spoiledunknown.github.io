import { ref } from "vue";
import type { ThemeMode } from "../types";

const STORAGE_KEY = "spoiledunknown-theme";

/**
 * Resolves the initial theme state from DOM classes, localStorage, or system media query.
 */
function detectInitialTheme(): boolean {
  if (typeof document !== "undefined") {
    if (document.documentElement.classList.contains("light")) return false;
    if (document.documentElement.classList.contains("dark")) return true;
  }
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light") return false;
      if (saved === "dark") return true;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      // SecurityError / QuotaExceededError in restricted iframe or private mode
    }
  }
  return true;
}

const isDark = ref(detectInitialTheme());
const isUserPinned = ref(false);
let isInitialized = false;

export const isTransitioning = ref(false);
export const transitionStage = ref<"idle" | "expanding" | "swapping" | "fading">("idle");
export const transitionTargetIsDark = ref(isDark.value);

/**
 * Pacing configuration for the expanding circle theme transition (in milliseconds).
 */
export const THEME_TRANSITION_TIMINGS = {
  // Time for the circular veil to expand from center and engulf the viewport
  EXPAND_DURATION_MS: 3000,

  // Pause at 100% coverage to allow the DOM class switch and layout to paint cleanly
  SWAP_PAUSE_MS: 150,

  // Fade-out duration for the transition overlay veil
  FADE_OUT_DURATION_MS: 500,
};

/**
 * Application-wide theme controller managing dark/light modes,
 * persistent storage, system media query synchronization, and animated transitions.
 */
export function useTheme() {
  function getSystemPreference(): boolean {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function applyTheme(dark: boolean) {
    isDark.value = dark;
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (dark) {
        root.classList.add("dark");
        root.classList.remove("light");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        root.style.colorScheme = "light";
      }
    }
  }

  /**
   * Initializes theme on mount, restoring saved preferences and listening for OS changes.
   * Guarded to prevent duplicate event listener bindings on remounts.
   */
  function initTheme() {
    if (typeof window === "undefined" || isInitialized) return;
    isInitialized = true;

    let saved: ThemeMode | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    } catch {
      // Safe fallback if storage access is restricted
    }

    if (saved === "dark" || saved === "light") {
      isUserPinned.value = true;
      applyTheme(saved === "dark");
    } else {
      isUserPinned.value = false;
      applyTheme(getSystemPreference());
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (e) => {
      if (!isUserPinned.value) {
        applyTheme(e.matches);
      }
    });
  }

  /**
   * Initiates the expanding circular theme transition. Locks scroll and overflow
   * in both directions until the transition finishes and the DOM paints the new theme.
   */
  async function toggleTheme() {
    if (isTransitioning.value) return;

    const preservedScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    const preservedScrollX = typeof window !== "undefined" ? window.scrollX : 0;

    const target = !isDark.value;
    isUserPinned.value = true;
    try {
      localStorage.setItem(STORAGE_KEY, target ? "dark" : "light");
    } catch {
      // Ignore storage write failure on private browsing
    }

    // Lock overflow in both directions (X & Y) while the theme transition panel is active
    if (typeof document !== "undefined") {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    try {
      // Stage 1: Begin animation and wait for expanding veil to cover viewport
      transitionTargetIsDark.value = target;
      transitionStage.value = "expanding";
      isTransitioning.value = true;

      await new Promise((resolve) =>
        setTimeout(resolve, THEME_TRANSITION_TIMINGS.EXPAND_DURATION_MS)
      );

      // Stage 2: Screen is 100% covered — execute the theme change now
      transitionStage.value = "swapping";
      applyTheme(target);

      if (typeof window !== "undefined") {
        window.scrollTo({ left: preservedScrollX, top: preservedScrollY, behavior: "instant" });
      }

      await new Promise((resolve) => setTimeout(resolve, THEME_TRANSITION_TIMINGS.SWAP_PAUSE_MS));

      // Stage 3: Smoothly fade out the veil to reveal the rendered theme
      transitionStage.value = "fading";

      await new Promise((resolve) =>
        setTimeout(resolve, THEME_TRANSITION_TIMINGS.FADE_OUT_DURATION_MS)
      );

      // Stage 4: Reset state completely
      isTransitioning.value = false;
      transitionStage.value = "idle";
    } finally {
      // Restore overflow in both directions back to normal once the theme is changed
      if (typeof document !== "undefined") {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }

      if (typeof window !== "undefined") {
        window.scrollTo({ left: preservedScrollX, top: preservedScrollY, behavior: "instant" });
      }
    }
  }

  function setSystemTheme() {
    isUserPinned.value = false;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    applyTheme(getSystemPreference());
  }

  return {
    isDark,
    isUserPinned,
    isTransitioning,
    transitionStage,
    transitionTargetIsDark,
    initTheme,
    toggleTheme,
    setSystemTheme,
  };
}
