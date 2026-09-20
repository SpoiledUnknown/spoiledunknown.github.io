import { ref, onMounted, onUnmounted } from "vue";

export function useScrollSpy(sectionIds: string[], offset = 140) {
  const activeSection = ref(sectionIds[0] || "home");

  function onScroll() {
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

  onMounted(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });

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
