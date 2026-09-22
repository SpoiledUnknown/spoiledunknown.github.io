import type { Directive, DirectiveBinding } from "vue";

interface RevealElement extends HTMLElement {
  _revealObserver?: IntersectionObserver;
}

/**
 * Vue 3 Custom Directive for Scroll-Driven Reveal and Hide Transitions.
 *
 * Attaches an IntersectionObserver to toggle the `is-revealed` class based on
 * viewport visibility. Disconnects cleanly on component unmount to prevent leaks.
 *
 * Modifiers / Variants:
 *   v-reveal             -> Base smooth vertical slide, scale, and subtle blur
 *   v-reveal:projects    -> Special cinematic expand with smooth glow
 *   v-reveal:skills      -> Special matrix card pop with staggered 3D tilt
 *   v-reveal:blogs       -> Special lateral editorial slide with parchment reveal
 */
export const vReveal: Directive<RevealElement, string | undefined> = {
  mounted(el, binding: DirectiveBinding<string | undefined>) {
    const variant = binding.arg || binding.value || "base";
    el.classList.add(`reveal-${variant}`);

    // Immediately reveal without animation if the user prefers reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add("is-revealed");
          } else {
            target.classList.remove("is-revealed");
          }
        }
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
      el._revealObserver.unobserve(el);
      el._revealObserver.disconnect();
      delete el._revealObserver;
    }
  },
};
