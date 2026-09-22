<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useTheme } from "../composables/useTheme";

const { isDark } = useTheme();

// =============================================================================
// PRELOADER CONFIGURATION:
// Edit PRELOADER_MIN_DURATION_MS below to change the delay (in milliseconds).
// Default is 5000ms (5 seconds).
// =============================================================================
const PRELOADER_MIN_DURATION_MS = 5000; // <-- EDIT THIS DELAY AS NEEDED (5000 = 5 seconds)
// =============================================================================

const isVisible = ref(true);
const isClosing = ref(false);
const progressPercent = ref(0);
const pageFullyLoaded = ref(false);
const minTimerElapsed = ref(false);

// Fidget interactivity state
const fidgetRotation = ref(0);
const spinCount = ref(0);
const isDragging = ref(false);
let lastPointerX = 0;
let animationFrameId: number | null = null;
let rotationalVelocity = 1.2; // Ambient base rotation speed
let progressInterval: ReturnType<typeof setInterval> | null = null;
let dismissTimer: ReturnType<typeof setTimeout> | null = null;
let isDestroyed = false;

function onPointerDown(e: MouseEvent | TouchEvent) {
  isDragging.value = true;
  lastPointerX = "touches" in e ? e.touches[0].clientX : e.clientX;
  rotationalVelocity += 3.5; // Kickstart spin on touch/click
  spinCount.value++;
}

function onPointerMove(e: MouseEvent | TouchEvent) {
  if (!isDragging.value) return;
  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
  const deltaX = clientX - lastPointerX;
  rotationalVelocity += deltaX * 0.15;
  lastPointerX = clientX;
}

function onPointerUp() {
  isDragging.value = false;
}

function triggerFidgetBoost() {
  rotationalVelocity += 6.0;
  spinCount.value++;
}

function animationLoop() {
  // Apply velocity to rotation with smooth natural friction
  fidgetRotation.value = (fidgetRotation.value + rotationalVelocity) % 360;
  rotationalVelocity *= 0.982; // Natural deceleration
  if (Math.abs(rotationalVelocity) < 0.8) {
    rotationalVelocity = rotationalVelocity >= 0 ? 0.8 : -0.8; // Ambient rotation floor
  }

  if (isVisible.value && !isDestroyed) {
    animationFrameId = requestAnimationFrame(animationLoop);
  }
}

function finishPreloader() {
  if (isClosing.value || isDestroyed) return;
  isClosing.value = true;
  document.body.style.overflow = "";

  // Smooth cinematic exit transition handled by Vue <Transition>
  isVisible.value = false;
}

function onPreloaderAfterLeave() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
}

function checkCanDismiss() {
  if (isDestroyed) return;
  if (pageFullyLoaded.value && minTimerElapsed.value) {
    progressPercent.value = 100;
    if (dismissTimer) clearTimeout(dismissTimer);
    dismissTimer = setTimeout(finishPreloader, 350);
  }
}

onMounted(() => {
  // Lock body scroll while preloader is active
  document.body.style.overflow = "hidden";

  // Start fidget physics loop
  animationLoop();

  // 1. Monitor real browser load state & fonts
  const checkAssetsLoaded = async () => {
    if (document.readyState !== "complete") {
      await new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
    }
    if ("fonts" in document) {
      await document.fonts.ready;
    }
    if (!isDestroyed) {
      pageFullyLoaded.value = true;
      checkCanDismiss();
    }
  };
  checkAssetsLoaded();

  // 2. Track smooth progress toward the arbitrary 5s limit
  const startTime = Date.now();
  progressInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(99, Math.floor((elapsed / PRELOADER_MIN_DURATION_MS) * 100));
    progressPercent.value = progress;

    if (elapsed >= PRELOADER_MIN_DURATION_MS) {
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
      minTimerElapsed.value = true;
      checkCanDismiss();
    }
  }, 40);

  window.addEventListener("pointerup", onPointerUp);
});

onUnmounted(() => {
  isDestroyed = true;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
  if (dismissTimer) {
    clearTimeout(dismissTimer);
    dismissTimer = null;
  }
  window.removeEventListener("pointerup", onPointerUp);
  document.body.style.overflow = "";
});
</script>

<template>
  <Transition name="preloader-fade" @after-leave="onPreloaderAfterLeave">
    <div
      v-if="isVisible"
      :class="[
        'fixed inset-0 z-[120] flex flex-col items-center justify-between p-6 sm:p-8 select-none transition-colors duration-400',
        isDark ? 'bg-[#0D0F14] text-[#E2E2E9]' : 'bg-[#F8FAFC] text-[#0F172A]',
      ]"
    >
      <!-- Top Branding Telemetry -->
      <div class="w-full max-w-4xl flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2D68FF] to-[#60A5FA] p-[1.5px] flex items-center justify-center shadow-sm"
          >
            <div
              :class="[
                'w-full h-full rounded-full flex items-center justify-center transition-colors duration-400',
                isDark ? 'bg-[#0D0F14]' : 'bg-white',
              ]"
            >
              <span class="font-display font-bold text-xs text-[#2D68FF]">SR</span>
            </div>
          </div>
          <div class="flex flex-col">
            <span
              :class="[
                'font-display text-sm font-semibold tracking-tight transition-colors duration-400',
                isDark ? 'text-white' : 'text-slate-900',
              ]"
            >
              Shashank Raj
            </span>
            <span
              :class="[
                'font-mono text-[10px] transition-colors duration-400',
                isDark ? 'text-gray-400' : 'text-slate-500',
              ]"
            >
              @spoiledunknown
            </span>
          </div>
        </div>

        <div
          :class="[
            'inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md border shadow-sm transition-colors duration-400',
            isDark
              ? 'bg-white/[0.04] border-white/[0.08] text-gray-300'
              : 'bg-black/[0.04] border-black/[0.08] text-slate-700',
          ]"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#2D68FF] animate-ping"></span>
          <span class="font-mono text-xs font-medium">System Initializing</span>
        </div>
      </div>

      <!-- Center: Interactive Gyroscopic Fidget Spinner -->
      <div
        class="flex flex-col items-center gap-8 cursor-grab active:cursor-grabbing"
        @mousedown="onPointerDown"
        @mousemove="onPointerMove"
        @touchstart="onPointerDown"
        @touchmove="onPointerMove"
        @click="triggerFidgetBoost"
      >
        <div class="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center group">
          <!-- Ambient Glow Bloom -->
          <div
            :class="[
              'absolute inset-0 rounded-full blur-3xl group-hover:scale-110 transition-all duration-500',
              isDark
                ? 'bg-gradient-to-tr from-[#2D68FF]/20 to-[#FF2A55]/15'
                : 'bg-gradient-to-tr from-[#2D68FF]/15 to-[#FF2A55]/10',
            ]"
          ></div>

          <!-- Outer Ring -->
          <div
            class="absolute inset-2 rounded-full border border-dashed border-[#2D68FF]/40"
            :style="{ transform: `rotate(${fidgetRotation}deg)` }"
          ></div>

          <!-- Middle Counter-Rotating Ring -->
          <div
            :class="[
              'absolute inset-8 rounded-full border transition-colors duration-400',
              isDark ? 'border-white/15' : 'border-black/15',
            ]"
            :style="{ transform: `rotate(${-fidgetRotation * 1.4}deg)` }"
          >
            <!-- Orbital Satellite nodes -->
            <div
              class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#60A5FA] shadow-[0_0_12px_#60A5FA]"
            ></div>
            <div
              class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-[#FF2A55] shadow-[0_0_12px_#FF2A55]"
            ></div>
          </div>

          <!-- Inner Gyroscope Ring -->
          <div
            :class="[
              'absolute inset-16 rounded-full border-2 transition-colors duration-400',
              isDark ? 'border-[#B5C4FF]/30' : 'border-[#2D68FF]/30',
            ]"
            :style="{ transform: `rotate(${fidgetRotation * 2.2}deg)` }"
          >
            <div
              class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34D399]"
            ></div>
          </div>

          <!-- Core Interactive Fidget Hub -->
          <div
            :class="[
              'w-24 h-24 rounded-full backdrop-blur-xl border flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-2xl',
              isDark
                ? 'bg-[#141B2D]/90 border-white/20 shadow-[0_0_35px_rgba(45,104,255,0.35)]'
                : 'bg-white/95 border-black/10 shadow-[0_10px_30px_rgba(45,104,255,0.2)]',
            ]"
          >
            <span
              :class="[
                'font-display font-bold text-lg transition-colors duration-400',
                isDark ? 'text-white' : 'text-slate-900',
              ]"
            >
              {{ isClosing ? "100%" : `${progressPercent}%` }}
            </span>
            <span
              :class="[
                'font-mono text-[9px] uppercase tracking-wider font-semibold transition-colors duration-400',
                isDark ? 'text-[#B5C4FF]' : 'text-primary-container',
              ]"
            >
              {{ isClosing ? "Ready" : "Loaded" }}
            </span>
          </div>
        </div>

        <!-- Playful Fidget Prompt -->
        <div class="flex flex-col items-center gap-1.5 text-center">
          <span
            :class="[
              'font-mono text-xs flex items-center gap-2 transition-colors duration-400',
              isDark ? 'text-gray-300' : 'text-slate-600',
            ]"
          >
            <span class="material-symbols-outlined text-sm text-[#2D68FF] animate-pulse"
              >touch_app</span
            >
            <span>Click, drag, or flick the gyroscope to spin</span>
          </span>
          <span v-if="spinCount > 0" class="font-mono text-[11px] text-[#2D68FF] font-semibold">
            Fidget Energy: +{{ spinCount * 12 }} RPM
          </span>
        </div>
      </div>

      <!-- Bottom: Progress Bar & Verification Info -->
      <div class="w-full max-w-md flex flex-col gap-3">
        <div
          :class="[
            'flex items-center justify-between font-mono text-xs transition-colors duration-400',
            isDark ? 'text-gray-400' : 'text-slate-500',
          ]"
        >
          <span>Asset Pipeline</span>
          <span>{{ isClosing ? "100%" : `${progressPercent}%` }}</span>
        </div>
        <div
          :class="[
            'w-full h-1.5 rounded-full overflow-hidden transition-colors duration-400',
            isDark ? 'bg-white/10' : 'bg-black/10',
          ]"
        >
          <div
            class="h-full bg-gradient-to-r from-[#2D68FF] via-[#60A5FA] to-emerald-400 rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(45,104,255,0.8)]"
            :style="{ width: isClosing ? '100%' : `${progressPercent}%` }"
          ></div>
        </div>
        <span
          :class="[
            'font-mono text-[10px] text-center transition-colors duration-400',
            isDark ? 'text-gray-500' : 'text-slate-400',
          ]"
        >
          Enforcing 5s asset verification & hydration window
        </span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.preloader-fade-leave-active {
  transition:
    opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.95s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.95s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.preloader-fade-leave-to {
  opacity: 0;
  transform: scale(1.04);
  filter: blur(10px);
}
</style>
