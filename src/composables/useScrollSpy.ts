import { ref, onMounted, onUnmounted } from "vue";

/**
 * Tracks the actively visible page section based on viewport scroll position.
 * Uses requestAnimationFrame throttling to prevent layout thrashing on high-refresh displays.
 *
 * @param sectionIds - Ordered array of DOM element IDs corresponding to target sections
 * @param offset - Vertical pixel offset from the top to trigger section activation
 */
export function useScrollSpy(sectionIds: string[], offset = 140) {
  const activeSection = ref(sectionIds[0] || "home");
  let isTicking = false;
  let rafId: number | null = null;

  function updateActiveSection() {
    const scrollPosition = window.scrollY + offset;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const id = sectionIds[i];
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        if (scrollPosition >= top) {
          activeSection.value = id;
          break;
        }
      }
    }
  }

  function onScroll() {
    if (!isTicking) {
      rafId = window.requestAnimationFrame(() => {
        updateActiveSection();
        isTicking = false;
      });
      isTicking = true;
    }
  }

  onMounted(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    updateActiveSection();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  });

  /**
   * Smoothly navigates the viewport to the target section with top header clearance.
   *
   * @param id - The element ID of the target section
   */
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
      activeSection.value = id;
    }
  }

  return {
    activeSection,
    scrollToSection,
  };
}
