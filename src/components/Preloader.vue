<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

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

  if (isVisible.value) {
    animationFrameId = requestAnimationFrame(animationLoop);
  }
}

function finishPreloader() {
  if (isClosing.value) return;
  isClosing.value = true;
  document.body.style.overflow = "";

  setTimeout(() => {
    isVisible.value = false;
  }, 650);
}

function checkCanDismiss() {
  if (pageFullyLoaded.value && minTimerElapsed.value) {
    progressPercent.value = 100;
    setTimeout(finishPreloader, 350);
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
    pageFullyLoaded.value = true;
    checkCanDismiss();
  };
  checkAssetsLoaded();

  // 2. Track smooth progress toward the arbitrary 5s limit
  const startTime = Date.now();
  const interval = window.setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(99, Math.floor((elapsed / PRELOADER_MIN_DURATION_MS) * 100));
    progressPercent.value = progress;

    if (elapsed >= PRELOADER_MIN_DURATION_MS) {
      clearInterval(interval);
      minTimerElapsed.value = true;
      checkCanDismiss();
    }
  }, 40);

  window.addEventListener("pointerup", onPointerUp);
});

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  window.removeEventListener("pointerup", onPointerUp);
  document.body.style.overflow = "";
});
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-[120] bg-[#0D0F14] text-[#E2E2E9] flex flex-col items-center justify-between p-8 select-none transition-all duration-600 ease-out"
    :class="{
      'opacity-0 scale-105 pointer-events-none': isClosing,
      'opacity-100 scale-100': !isClosing,
    }"
  >
    <!-- Top Branding Telemetry -->
    <div class="w-full max-w-4xl flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2D68FF] to-[#60A5FA] p-[1.5px] flex items-center justify-center"
        >
          <div class="w-full h-full rounded-full bg-[#0D0F14] flex items-center justify-center">
            <span class="font-display font-bold text-xs text-[#B5C4FF]">SR</span>
          </div>
        </div>
        <div class="flex flex-col">
          <span class="font-display text-sm font-semibold text-white tracking-tight"
            >Shashank Raj</span
          >
          <span class="font-mono text-[10px] text-gray-400">@spoiledunknown</span>
        </div>
      </div>

      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-[#2D68FF] animate-ping"></span>
        <span class="font-mono text-xs text-gray-300">System Initializing</span>
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
          class="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2D68FF]/20 to-[#FF2A55]/15 blur-3xl group-hover:scale-110 transition-transform duration-500"
        ></div>

        <!-- Outer Ring -->
        <div
          class="absolute inset-2 rounded-full border border-dashed border-[#2D68FF]/40"
          :style="{ transform: `rotate(${fidgetRotation}deg)` }"
        ></div>

        <!-- Middle Counter-Rotating Ring -->
        <div
          class="absolute inset-8 rounded-full border border-white/15"
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
          class="absolute inset-16 rounded-full border-2 border-[#B5C4FF]/30"
          :style="{ transform: `rotate(${fidgetRotation * 2.2}deg)` }"
        >
          <div
            class="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34D399]"
          ></div>
        </div>

        <!-- Core Interactive Fidget Hub -->
        <div
          class="w-24 h-24 rounded-full bg-[#141B2D]/90 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(45,104,255,0.35)] group-hover:scale-105 transition-transform"
        >
          <span class="font-display font-bold text-lg text-white">
            {{ isClosing ? "100%" : `${progressPercent}%` }}
          </span>
          <span class="font-mono text-[9px] text-[#B5C4FF] uppercase tracking-wider">
            {{ isClosing ? "Ready" : "Loaded" }}
          </span>
        </div>
      </div>

      <!-- Playful Fidget Prompt -->
      <div class="flex flex-col items-center gap-1.5 text-center">
        <span class="font-mono text-xs text-gray-300 flex items-center gap-2">
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
      <div class="flex items-center justify-between font-mono text-xs text-gray-400">
        <span>Asset Pipeline</span>
        <span>{{ isClosing ? "100%" : `${progressPercent}%` }}</span>
      </div>
      <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          class="h-full bg-gradient-to-r from-[#2D68FF] via-[#60A5FA] to-emerald-400 rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(45,104,255,0.8)]"
          :style="{ width: isClosing ? '100%' : `${progressPercent}%` }"
        ></div>
      </div>
      <span class="font-mono text-[10px] text-gray-500 text-center">
        Enforcing 5s asset verification & hydration window
      </span>
    </div>
  </div>
</template>
