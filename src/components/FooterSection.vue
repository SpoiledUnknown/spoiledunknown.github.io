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
    class="relative z-10 w-full border-t border-black/[0.06] dark:border-white/[0.04] bg-surface-container-lowest/70 dark:bg-surface-container-lowest/60 backdrop-blur-xl py-10 transition-colors"
  >
    <div
      class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <!-- Left: Copyright & Telemetry (Single line on all screens) -->
      <div
        class="w-full md:w-auto flex items-center justify-center md:justify-start overflow-x-auto no-scrollbar py-1"
      >
        <span
          class="font-mono text-[11px] sm:text-xs text-outline whitespace-nowrap inline-flex items-center gap-2"
        >
          <span
            >© {{ new Date().getFullYear() }} {{ profileData.name }}. Crafted with precision.</span
          >
          <span class="text-outline/40">•</span>
          <span class="text-on-surface-variant inline-flex items-center gap-1">
            <span>नमस्ते</span>
            <span>🇮🇳</span>
          </span>
        </span>
      </div>

      <!-- Right: Social Links & Back to Top -->
      <div class="flex items-center gap-5 flex-wrap justify-center">
        <a
          v-for="link in profileData.socialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noreferrer"
          class="font-mono text-xs text-on-surface-variant hover:text-primary transition-colors"
        >
          {{ link.name }}
        </a>

        <button
          type="button"
          @click="scrollToTop"
          class="font-mono text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer pl-2"
          aria-label="Back to top of page"
        >
          <span>Top</span>
          <span class="material-symbols-outlined text-xs">arrow_upward</span>
        </button>
      </div>
    </div>
  </footer>
</template>
