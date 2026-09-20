<script setup lang="ts">
import { ref } from "vue";
import { projectsData } from "../data/projects";
import type { Project } from "../types";

const emit = defineEmits<{
  (e: "set-ambient", color: string): void;
  (e: "reset-ambient"): void;
}>();

const sliderRef = ref<HTMLDivElement | null>(null);

const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];
const otherProjects = projectsData.filter((p) => p.id !== featuredProject.id);

let targetLeft = -1;
let scrollResetTimer: ReturnType<typeof setTimeout> | null = null;

function scrollSlider(delta: number) {
  const el = sliderRef.value;
  if (!el) return;

  const maxScroll = el.scrollWidth - el.clientWidth;
  if (maxScroll <= 0) return;

  // Dynamically compute step based on card width + gap (24px)
  const firstCard = el.firstElementChild as HTMLElement | null;
  const step = firstCard ? firstCard.offsetWidth + 24 : 390;
  const scrollDelta = delta > 0 ? step : -step;

  if (targetLeft < 0 || Math.abs(targetLeft - el.scrollLeft) > step * 1.5) {
    targetLeft = el.scrollLeft;
  }

  targetLeft += scrollDelta;

  // Wrap around when scrolling past boundaries
  if (targetLeft > maxScroll + step * 0.4) {
    targetLeft = 0;
  } else if (targetLeft < -step * 0.4) {
    targetLeft = maxScroll;
  }

  el.scrollTo({
    left: Math.round(targetLeft),
    behavior: "smooth",
  });

  if (scrollResetTimer) clearTimeout(scrollResetTimer);
  scrollResetTimer = setTimeout(() => {
    if (sliderRef.value) {
      targetLeft = sliderRef.value.scrollLeft;
    }
  }, 500);
}

function onSliderScroll() {
  if (!scrollResetTimer && sliderRef.value) {
    targetLeft = sliderRef.value.scrollLeft;
  }
}
</script>

<template>
  <section id="projects" class="py-16 md:py-24 max-w-6xl mx-auto w-full flex flex-col gap-14">
    <!-- Section Header -->
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
        <span class="font-mono text-xs text-primary uppercase tracking-widest font-semibold"
          >Featured Work</span
        >
      </div>
      <h2 class="font-display text-3xl sm:text-5xl font-bold text-on-surface tracking-tight">
        Engineering & Deployments
      </h2>
      <p class="text-base text-on-surface-variant max-w-2xl leading-relaxed">
        Standout game systems, open-source packages, developer utilities, and interactive
        experiences.
      </p>
    </div>

    <!-- Featured Hero Billboard (Netflix Billboard Format) -->
    <div
      class="group relative w-full rounded-3xl bg-surface-container-low/90 overflow-hidden shadow-2xl transition-all duration-500 border border-black/[0.06] dark:border-white/[0.08] hover:shadow-[0_24px_50px_rgba(45,104,255,0.18)]"
      @mouseenter="emit('set-ambient', featuredProject.ambientColor)"
      @mouseleave="emit('reset-ambient')"
    >
      <!-- Media Aspect Container -->
      <div
        class="relative aspect-[21/9] min-h-[500px] sm:min-h-[420px] md:min-h-[420px] w-full overflow-hidden bg-surface-container-lowest"
      >
        <img
          :src="featuredProject.image"
          :alt="featuredProject.title"
          class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          loading="lazy"
        />

        <!-- Gradient Vignette & Scrims -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-surface-obsidian via-surface-obsidian/75 to-transparent"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-r from-surface-obsidian via-surface-obsidian/70 to-transparent"
        ></div>

        <!-- Telemetry Badges -->
        <div
          class="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs text-primary bg-surface-obsidian/85 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-full border border-white/[0.06] z-10"
        >
          <span class="material-symbols-outlined text-sm">sports_esports</span>
          <span>FEATURED SHOWCASE // {{ featuredProject.version }}</span>
        </div>
        <div
          class="absolute top-4 right-4 sm:top-6 sm:right-6 hidden sm:flex items-center gap-2 font-mono text-xs text-on-surface-variant bg-surface-obsidian/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/[0.06] z-10"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>{{ featuredProject.platform }}</span>
        </div>
      </div>

      <!-- Hero Content Overlay -->
      <div class="absolute bottom-0 inset-x-0 p-5 sm:p-10 flex flex-col gap-3 sm:gap-4">
        <!-- Dedicated Compact Keywords Area -->
        <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap">
          <span
            v-for="(tag, idx) in featuredProject.tags"
            :key="tag"
            :class="[
              'font-mono text-[10px] sm:text-[11px] text-on-surface-variant bg-surface-container/85 backdrop-blur-sm px-2.5 py-0.5 sm:py-1 rounded-full border border-white/[0.06]',
              idx >= 2 ? 'hidden sm:inline-block' : 'inline-block',
            ]"
          >
            {{ tag }}
          </span>
          <span
            v-if="featuredProject.tags.length > 2"
            class="sm:hidden font-mono text-[9px] text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20"
          >
            +{{ featuredProject.tags.length - 2 }}
          </span>
        </div>

        <div class="flex flex-col gap-2 max-w-3xl">
          <h3
            class="font-display text-xl sm:text-4xl font-bold text-white tracking-tight group-hover:text-primary transition-colors leading-snug"
          >
            {{ featuredProject.title }}
          </h3>
          <p
            class="font-body text-xs sm:text-base text-gray-300 line-clamp-2 sm:line-clamp-3 leading-relaxed"
          >
            {{ featuredProject.description }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center gap-4 pt-2">
          <a
            v-if="featuredProject.links.store"
            :href="featuredProject.links.store"
            target="_blank"
            rel="noreferrer"
            class="flex items-center gap-2 bg-primary-container hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(45,104,255,0.4)]"
          >
            <span class="material-symbols-outlined text-[18px]">shopping_bag</span>
            <span>Get on Unity Store</span>
          </a>

          <a
            v-if="featuredProject.links.github"
            :href="featuredProject.links.github"
            target="_blank"
            rel="noreferrer"
            class="flex items-center gap-2 bg-surface-container-high hover:bg-surface-bright text-on-surface px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all border border-white/[0.06]"
          >
            <span class="material-symbols-outlined text-[18px]">code</span>
            <span>Browse Repository</span>
            <span v-if="featuredProject.metrics" class="font-mono text-xs text-outline pl-1">
              {{ featuredProject.metrics.value }}
            </span>
          </a>
        </div>
      </div>
    </div>

    <!-- Curated Deployments Showcase Grid & Slider -->
    <div class="flex flex-col gap-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <h3 class="font-display text-2xl font-bold text-on-surface">Curated Deployments</h3>
          <span
            class="font-mono text-xs text-outline bg-surface-container px-2.5 py-1 rounded-full border border-black/[0.04] dark:border-white/[0.05]"
          >
            0{{ otherProjects.length }} Projects
          </span>
        </div>

        <div class="flex items-center gap-4">
          <div class="font-mono text-xs text-outline hidden sm:flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span>SCROLL OR USE ARROWS</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="scrollSlider(-390)"
              aria-label="Previous project"
              class="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container-high border border-black/[0.06] dark:border-white/[0.08] text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-all active:scale-95 shadow-sm"
            >
              <span class="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button
              type="button"
              @click="scrollSlider(390)"
              aria-label="Next project"
              class="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container-high border border-black/[0.06] dark:border-white/[0.08] text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-all active:scale-95 shadow-sm"
            >
              <span class="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Horizontal Scrollable Container -->
      <div
        ref="sliderRef"
        @scroll.passive="onSliderScroll"
        class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scroll-smooth no-scrollbar -mx-2 px-2"
      >
        <div
          v-for="project in otherProjects"
          :key="project.id"
          class="w-[320px] sm:w-[370px] shrink-0 snap-start flex flex-col justify-between rounded-2xl overflow-hidden bg-surface-container-low/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] hover:border-primary/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl group"
          @mouseenter="emit('set-ambient', project.ambientColor)"
          @mouseleave="emit('reset-ambient')"
        >
          <div>
            <!-- Thumbnail Media -->
            <div class="relative aspect-video w-full overflow-hidden bg-surface-container-lowest">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-surface-obsidian via-surface-obsidian/40 to-transparent"
              ></div>
              <div
                v-if="project.version"
                class="absolute top-3 left-3 font-mono text-[11px] text-primary bg-surface-obsidian/85 px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/[0.04]"
              >
                <span class="material-symbols-outlined text-xs">tune</span>
                <span>{{ project.version }}</span>
              </div>
              <div
                v-if="project.platform"
                class="absolute top-3 right-3 font-mono text-[11px] text-on-surface-variant bg-surface-obsidian/85 px-2.5 py-1 rounded-md border border-white/[0.04]"
              >
                {{ project.platform }}
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-6 flex flex-col gap-2">
              <h4
                class="font-display text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1"
              >
                {{ project.title }}
              </h4>
              <p
                class="font-body text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed"
              >
                {{ project.tagline }}
              </p>
            </div>
          </div>

          <!-- Card Footer & Links -->
          <div class="p-6 pt-0 flex flex-col gap-4">
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in project.tags.slice(0, 3)"
                :key="tag"
                class="font-mono text-[10px] text-outline bg-surface-container-high px-2 py-0.5 rounded"
              >
                {{ tag }}
              </span>
            </div>

            <div
              class="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.06]"
            >
              <a
                v-if="project.links.playStore"
                :href="project.links.playStore"
                target="_blank"
                rel="noreferrer"
                class="font-mono text-xs text-primary hover:underline flex items-center gap-1 font-medium"
              >
                <span>Play Store</span>
                <span class="material-symbols-outlined text-xs">arrow_outward</span>
              </a>
              <a
                v-else-if="project.links.itch"
                :href="project.links.itch"
                target="_blank"
                rel="noreferrer"
                class="font-mono text-xs text-primary hover:underline flex items-center gap-1 font-medium"
              >
                <span>Itch.io</span>
                <span class="material-symbols-outlined text-xs">arrow_outward</span>
              </a>
              <a
                v-else-if="project.links.npm"
                :href="project.links.npm"
                target="_blank"
                rel="noreferrer"
                class="font-mono text-xs text-primary hover:underline flex items-center gap-1 font-medium"
              >
                <span>NPM Package</span>
                <span class="material-symbols-outlined text-xs">arrow_outward</span>
              </a>
              <a
                v-else-if="project.links.demo"
                :href="project.links.demo"
                target="_blank"
                rel="noreferrer"
                class="font-mono text-xs text-primary hover:underline flex items-center gap-1 font-medium"
              >
                <span>Live Demo</span>
                <span class="material-symbols-outlined text-xs">arrow_outward</span>
              </a>
              <span v-else class="text-xs text-outline font-mono">Completed</span>

              <a
                v-if="project.links.github"
                :href="project.links.github"
                target="_blank"
                rel="noreferrer"
                class="font-mono text-xs text-on-surface-variant hover:text-on-surface flex items-center gap-1"
              >
                <span>Repo</span>
                <span class="material-symbols-outlined text-xs">code</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom CTA: GitHub Source Repository Hub -->
    <div
      class="w-full rounded-3xl bg-surface-container-low/80 p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-black/[0.06] dark:border-white/[0.08]"
    >
      <div
        class="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"
      ></div>

      <div class="flex flex-col gap-3 max-w-xl z-10 text-center md:text-left">
        <div class="flex items-center justify-center md:justify-start gap-2">
          <span class="material-symbols-outlined text-primary text-xl">terminal</span>
          <span class="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
            Public Repositories & Modules
          </span>
        </div>
        <h3 class="font-display text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Looking for full source code?
        </h3>
        <p class="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
          Explore complete game engines, experimental physics prototypes, frontend snippets, and
          open-source packages directly on GitHub.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row items-center gap-4 z-10 w-full md:w-auto">
        <div
          class="flex flex-col items-center sm:items-start px-4 py-2 rounded-xl bg-surface-container border border-black/[0.04] dark:border-white/[0.05]"
        >
          <span class="font-mono text-[10px] text-outline uppercase tracking-wider"
            >TOTAL REPOSITORIES</span
          >
          <span class="font-display text-xl text-on-surface font-bold">24+ Repos</span>
        </div>
        <a
          href="https://github.com/spoiledunknown"
          target="_blank"
          rel="noreferrer"
          class="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary-container hover:bg-blue-600 text-white font-medium text-sm px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-[0_0_25px_rgba(45,104,255,0.35)]"
        >
          <span class="material-symbols-outlined text-[20px]">code</span>
          <span>@SpoiledUnknown</span>
          <span class="material-symbols-outlined text-sm">arrow_outward</span>
        </a>
      </div>
    </div>
  </section>
</template>
