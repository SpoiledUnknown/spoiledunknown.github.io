import { ref } from "vue";
import type { ThemeMode } from "../types";

const STORAGE_KEY = "spoiledunknown-theme";

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
    } catch {}
  }
  return true;
}

const isDark = ref(detectInitialTheme());
const isUserPinned = ref(false);

export const isTransitioning = ref(false);
export const transitionStage = ref<"idle" | "expanding" | "swapping" | "fading">("idle");
export const transitionTargetIsDark = ref(isDark.value);

// =============================================================================
// THEME SWITCH TRANSITION TIMINGS (in milliseconds):
// Edit these arbitrary timing limits to tune the smoothness and pacing.
// =============================================================================
export const THEME_TRANSITION_TIMINGS = {
  // Time for the expanding circular veil to completely engulf the viewport
  EXPAND_DURATION_MS: 550,

  // Brief pause at full coverage to ensure new theme DOM paint completes cleanly
  SWAP_PAUSE_MS: 80,

  // Time for the overlay to dissolve and reveal the newly applied theme
  FADE_OUT_DURATION_MS: 400,
};

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

  function initTheme() {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
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

  async function toggleTheme() {
    // Prevent overlapping transitions while one is already active
    if (isTransitioning.value) return;

    // Capture current scroll position so viewport never jumps during theme change
    const preservedScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    const target = !isDark.value;
    isUserPinned.value = true;
    localStorage.setItem(STORAGE_KEY, target ? "dark" : "light");

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

    // Ensure scroll position remains locked exactly where the user is
    if (typeof window !== "undefined" && window.scrollY !== preservedScrollY) {
      window.scrollTo({ top: preservedScrollY, behavior: "instant" });
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

    // Final check to guarantee scroll position remains undisturbed
    if (typeof window !== "undefined" && window.scrollY !== preservedScrollY) {
      window.scrollTo({ top: preservedScrollY, behavior: "instant" });
    }
  }

  function setSystemTheme() {
    isUserPinned.value = false;
    localStorage.removeItem(STORAGE_KEY);
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
