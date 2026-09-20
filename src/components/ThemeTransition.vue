<script setup lang="ts">
import { computed } from "vue";
import {
  useTheme,
  isTransitioning,
  transitionStage,
  transitionTargetIsDark,
  THEME_TRANSITION_TIMINGS,
} from "../composables/useTheme";

const expandDurationSec = computed(() => `${THEME_TRANSITION_TIMINGS.EXPAND_DURATION_MS}ms`);
const fadeDurationSec = computed(() => `${THEME_TRANSITION_TIMINGS.FADE_OUT_DURATION_MS}ms`);
</script>

<template>
  <div
    v-if="isTransitioning"
    class="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden"
    :class="{
      'opacity-100': transitionStage === 'expanding' || transitionStage === 'swapping',
      'opacity-0': transitionStage === 'fading',
    }"
    :style="{
      transition: `opacity ${fadeDurationSec} cubic-bezier(0.16, 1, 0.3, 1)`,
    }"
  >
    <!-- Expanding Radial Veil: Grows until full screen coverage, then theme swaps -->
    <div
      :class="[
        'absolute rounded-full shadow-2xl transition-transform ease-out',
        transitionTargetIsDark
          ? 'bg-[#0D0F14] ring-4 ring-[#2D68FF]/50'
          : 'bg-[#F8FAFC] ring-4 ring-blue-500/40',
        transitionStage === 'expanding' ||
        transitionStage === 'swapping' ||
        transitionStage === 'fading'
          ? 'scale-[80]'
          : 'scale-0',
      ]"
      :style="{
        width: '120px',
        height: '120px',
        transitionDuration: expandDurationSec,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }"
    ></div>

    <!-- Center Celestial Glyph Indicator -->
    <div
      class="relative z-10 flex flex-col items-center gap-3 transition-all duration-300"
      :class="{
        'scale-100 opacity-100': transitionStage === 'expanding' || transitionStage === 'swapping',
        'scale-110 opacity-0': transitionStage === 'fading',
      }"
    >
      <div
        class="w-16 h-16 rounded-full bg-surface-container/90 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl"
      >
        <span class="material-symbols-outlined text-2xl text-primary animate-spin-slow">
          {{ transitionTargetIsDark ? "dark_mode" : "light_mode" }}
        </span>
      </div>
      <span
        class="font-mono text-xs text-primary/90 uppercase tracking-widest font-semibold drop-shadow-md"
      >
        {{ transitionTargetIsDark ? "Obsidian Mode" : "Light Mode" }}
      </span>
    </div>
  </div>
</template>

<style scoped>
@keyframes spinSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spinSlow 1.4s linear infinite;
}
</style>
