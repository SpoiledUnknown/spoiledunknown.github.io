<script setup lang="ts">
import { profileData } from "../data/profile";

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
</script>

<template>
  <footer
    class="relative z-10 w-full border-t border-black/[0.06] dark:border-white/[0.04] bg-surface-container-lowest/80 dark:bg-surface-container-lowest/60 backdrop-blur-xl py-8 md:py-10 transition-colors"
  >
    <div
      class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <!-- Left: Copyright & Telemetry (Single line or clean wrap, never clipped) -->
      <div class="flex items-center justify-center md:justify-start">
        <span
          class="font-mono text-[11px] sm:text-xs text-outline inline-flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-center md:text-left"
        >
          <span
            >© {{ new Date().getFullYear() }} {{ profileData.name }}. Crafted with precision.</span
          >
          <span class="inline-flex items-center gap-1 text-on-surface-variant">
            <span class="text-outline/40 mr-0.5">•</span>
            <span>नमस्ते</span>
            <span>🇮🇳</span>
          </span>
        </span>
      </div>

      <!-- Right: Social Links & Back to Top -->
      <div class="flex items-center gap-4 sm:gap-5 flex-wrap justify-center">
        <a
          v-for="link in profileData.socialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noreferrer"
          class="font-mono text-xs text-on-surface-variant hover:text-primary transition-all duration-300 ease-out hover:-translate-y-0.5 inline-block"
        >
          {{ link.name }}
        </a>

        <button
          type="button"
          @click="scrollToTop"
          class="group font-mono text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer pl-2 transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95"
          aria-label="Back to top of page"
        >
          <span>Top</span>
          <span
            class="material-symbols-outlined text-xs group-hover:-translate-y-0.5 transition-transform duration-300 ease-out"
            >arrow_upward</span
          >
        </button>
      </div>
    </div>
  </footer>
</template>
