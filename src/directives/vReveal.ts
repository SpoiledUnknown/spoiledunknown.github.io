import type { Directive, DirectiveBinding } from "vue";

interface RevealElement extends HTMLElement {
  _revealObserver?: IntersectionObserver;
}

/**
 * Vue 3 Custom Directive for Scroll Reveal & Hide Animations
 *
 * Usage:
 *   v-reveal             -> standard base smooth vertical slide + scale + blur
 *   v-reveal:projects    -> special 3D perspective horizon tilt + depth expansion
 *   v-reveal:skills      -> special high-tech matrix pop with staggered 3D card tilt
 *   v-reveal:blogs       -> special editorial lateral parchment reveal + light sweep
 */
export const vReveal: Directive<RevealElement, string | undefined> = {
  mounted(el, binding: DirectiveBinding<string | undefined>) {
    const variant = binding.arg || binding.value || "base";
    el.classList.add(`reveal-${variant}`);

    // Accessibility check: immediately reveal if prefers-reduced-motion is active
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-revealed");
          } else {
            // Scroll Reveal & Hide: Remove class when scrolled out of view
            el.classList.remove("is-revealed");
          }
        });
      },
      {
        threshold: [0, 0.12],
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    el._revealObserver = observer;
  },

  unmounted(el) {
    if (el._revealObserver) {
      el._revealObserver.disconnect();
      delete el._revealObserver;
    }
  },
};
