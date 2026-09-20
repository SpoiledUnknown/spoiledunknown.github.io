<script setup lang="ts">
import { profileData } from "../data/profile";
import { useTypewriter } from "../composables/useTypewriter";

const emit = defineEmits<{
  (e: "navigate", sectionId: string): void;
}>();

const { displayText } = useTypewriter(profileData.typewriterRoles);
</script>

<template>
  <section
    id="home"
    class="relative pt-28 pb-16 md:py-24 min-h-[85vh] flex flex-col justify-center"
  >
    <div class="max-w-4xl mx-auto w-full flex flex-col justify-center items-start text-left">
      <!-- Greeting Row: Squarish Profile Avatar & Cultural Location Badge -->
      <div class="flex items-center gap-4 mb-8">
        <div class="relative group shrink-0">
          <div
            class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-[0_0_25px_rgba(45,104,255,0.2)] bg-surface-container-high transition-transform duration-300 group-hover:scale-105"
          >
            <img
              src="/pfp.webp"
              alt="Shashank Raj"
              class="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <span class="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-surface-obsidian"
            ></span>
          </span>
        </div>

        <div class="flex flex-col gap-1.5">
          <div
            class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-container/70 shadow-sm backdrop-blur-md select-none border border-black/[0.04] dark:border-white/[0.05] w-fit"
          >
            <span class="text-xs text-on-surface font-medium">{{
              profileData.culturalGreeting
            }}</span>
            <span class="w-1 h-1 rounded-full bg-outline/40"></span>
            <span class="relative flex h-2 w-2 items-center justify-center">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"
              ></span>
              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
            </span>
            <span class="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
              Based in {{ profileData.location }}
            </span>
          </div>
          <span class="text-xs font-mono text-outline pl-1"
            >Crafting reliable & curious software</span
          >
        </div>
      </div>

      <!-- Main Name & Tag -->
      <div class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
        <h1 class="font-display text-4xl sm:text-6xl font-bold tracking-tight text-on-surface">
          {{ profileData.name }}
        </h1>
        <span class="font-mono text-sm sm:text-base text-primary/80 font-medium">
          {{ profileData.handle }}
        </span>
      </div>

      <!-- Typewriter Headline -->
      <div class="flex items-center gap-2 mb-6 min-h-[3rem] overflow-hidden flex-wrap">
        <span class="font-display text-2xl sm:text-4xl text-primary font-semibold">
          Full-Stack Developer
        </span>
        <span class="font-display text-2xl sm:text-4xl text-outline/40 font-light hidden sm:inline"
          >/</span
        >
        <span
          class="font-display text-2xl sm:text-4xl text-on-surface font-light transition-all duration-200"
        >
          {{ displayText }}
        </span>
        <span class="inline-block w-0.5 h-7 bg-primary animate-pulse ml-0.5 self-center"></span>
      </div>

      <!-- Short Bio Summary -->
      <p
        class="font-body text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed mb-10"
      >
        {{ profileData.bioShort }}
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center gap-4 mb-16">
        <button
          type="button"
          @click="emit('navigate', 'projects')"
          class="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container hover:bg-blue-600 text-white font-medium text-sm shadow-md hover:shadow-[0_0_25px_rgba(45,104,255,0.4)] transition-all duration-200"
        >
          <span>Explore Projects</span>
          <span
            class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform"
          >
            arrow_forward
          </span>
        </button>
        <button
          type="button"
          @click="emit('navigate', 'contact')"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high/70 hover:bg-surface-bright text-on-surface font-medium text-sm hover:border-white/10 transition-all duration-200 border border-black/[0.04] dark:border-white/[0.05]"
        >
          <span>Get in Touch</span>
        </button>
      </div>

      <!-- Quick Telemetry Metrics Grid -->
      <div
        class="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 bg-surface-container-lowest/30 rounded-2xl px-6 py-5 shadow-sm backdrop-blur-sm border border-black/[0.04] dark:border-white/[0.05]"
      >
        <div
          v-for="(metric, idx) in profileData.metrics"
          :key="metric.value"
          :class="[
            'flex flex-col gap-1',
            idx > 0 ? 'sm:border-l sm:border-black/[0.06] sm:dark:border-white/[0.08] sm:pl-6' : '',
          ]"
        >
          <div class="flex items-baseline gap-2">
            <span class="font-display text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
              {{ metric.value }}
            </span>
            <span v-if="metric.tag" class="font-mono text-[11px] text-primary uppercase">
              {{ metric.tag }}
            </span>
          </div>
          <span class="text-xs text-on-surface-variant">
            {{ metric.label }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
