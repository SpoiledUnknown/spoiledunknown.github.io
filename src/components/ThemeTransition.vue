<script setup lang="ts">
import { computed } from "vue";
import {
  isTransitioning,
  transitionStage,
  transitionTargetIsDark,
  THEME_TRANSITION_TIMINGS,
} from "../composables/useTheme";

const fadeDurationSec = computed(() => `${THEME_TRANSITION_TIMINGS.FADE_OUT_DURATION_MS}ms`);
const expandDurationSec = computed(() => `${THEME_TRANSITION_TIMINGS.EXPAND_DURATION_MS}ms`);
</script>

<template>
  <Transition name="theme-panel-fade">
    <div
      v-if="isTransitioning"
      class="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto select-none overflow-hidden"
      :class="[
        transitionTargetIsDark ? 'bg-[#F8FAFC]' : 'bg-[#0D0F14]',
        transitionStage === 'fading' ? 'opacity-0' : 'opacity-100',
      ]"
      :style="{
        transition: `opacity ${fadeDurationSec} cubic-bezier(0.16, 1, 0.3, 1)`,
      }"
    >
      <!-- Growing Circle Emerging from Behind the Icon -->
      <!-- Expands smoothly over the arbitrary delay (5 seconds default) covering the entire viewport -->
      <div
        class="theme-circle-expanding absolute rounded-full pointer-events-none"
        :class="[
          transitionTargetIsDark
            ? 'bg-[#0D0F14] ring-4 ring-[#2D68FF]/40 shadow-[0_0_120px_rgba(0,0,0,0.85)]'
            : 'bg-[#F8FAFC] ring-4 ring-blue-400/50 shadow-[0_0_100px_rgba(45,104,255,0.45)]',
        ]"
        :style="{
          width: '120px',
          height: '120px',
          animationDuration: expandDurationSec,
        }"
      ></div>

      <!-- Center Icon Glyph Indicator sitting in front of the growing circle -->
      <div
        class="theme-glyph-card relative z-10 flex flex-col items-center gap-3.5 transition-all duration-300"
        :class="{
          'scale-100 opacity-100':
            transitionStage === 'expanding' || transitionStage === 'swapping',
          'scale-105 opacity-0 blur-sm': transitionStage === 'fading',
        }"
      >
        <div
          class="w-18 h-18 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300 border backdrop-blur-md"
          :class="[
            transitionTargetIsDark
              ? 'bg-white/95 text-amber-500 border-amber-300/50 shadow-amber-500/25'
              : 'bg-[#1a1b21]/95 text-sky-400 border-sky-400/40 shadow-blue-500/30',
          ]"
        >
          <span class="material-symbols-outlined text-3xl animate-spin-slow select-none">
            {{ transitionTargetIsDark ? "light_mode" : "dark_mode" }}
          </span>
        </div>

        <div class="flex flex-col items-center gap-1">
          <span
            class="font-mono text-xs uppercase tracking-widest font-semibold drop-shadow-md"
            :class="transitionTargetIsDark ? 'text-slate-800' : 'text-primary'"
          >
            {{ transitionTargetIsDark ? "Entering Obsidian" : "Entering Light" }}
          </span>
          <span
            class="font-mono text-[10px] tracking-wide"
            :class="transitionTargetIsDark ? 'text-slate-500' : 'text-outline'"
          >
            Adapting visual canvas...
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Outer panel fade on mount & unmount */
.theme-panel-fade-enter-active {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.theme-panel-fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.theme-panel-fade-enter-from,
.theme-panel-fade-leave-to {
  opacity: 0;
}

/* Progressive, multi-stage growth curve:
   Starts tucked behind icon, gently emerges, swells smoothly, and fills screen */
.theme-circle-expanding {
  animation-name: circleGrow;
  animation-duration: 2s;
  animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
  animation-fill-mode: forwards;
  transform-origin: center center;
  will-change: transform;
}

@keyframes circleGrow {
  0% {
    transform: scale(0);
    opacity: 0.9;
  }
  100% {
    transform: scale(65);
    opacity: 1;
  }
}

/* Center glyph card spring on open */
.theme-glyph-card {
  animation: glyphAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes glyphAppear {
  from {
    opacity: 0;
    transform: scale(0.7) translateY(10px);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0px);
  }
}

@keyframes spinSlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spinSlow 6s linear infinite;
}
</style>
