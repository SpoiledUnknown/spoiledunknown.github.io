<script setup lang="ts">
import { ref, computed } from "vue";
import { skillsData, skillsCategories } from "../data/skills";

const selectedCategory = ref<string>(skillsCategories[0].id);
const isSkillsMenuOpen = ref(false);

const filteredSkills = computed(() => {
  return skillsData.filter((s) => s.category === selectedCategory.value);
});

function selectSkillCategory(id: string) {
  selectedCategory.value = id;
  isSkillsMenuOpen.value = false;
}
</script>

<template>
  <section id="skills" class="py-16 md:py-24 max-w-5xl mx-auto w-full flex flex-col gap-10">
    <!-- Hero Title Zone & Metrics -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
      <div class="flex flex-col gap-3 max-w-2xl">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span class="font-mono text-xs text-primary tracking-widest uppercase font-semibold">
            Stack & Architectural Competencies
          </span>
        </div>
        <h2 class="font-display text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
          Skills & Technologies
        </h2>
        <p class="text-base text-on-surface-variant leading-relaxed">
          Tools, runtimes, and frameworks I use to build reliable software, high-performance web
          systems, and real-time interactive experiences.
        </p>
      </div>

      <!-- Quick Metrics Capsule -->
      <div
        class="flex items-center gap-4 sm:gap-6 p-4 rounded-2xl bg-surface-container-low/70 backdrop-blur-md shadow-sm border border-black/[0.04] dark:border-white/[0.06] shrink-0"
      >
        <div class="flex flex-col">
          <span class="font-mono text-sm sm:text-base text-on-surface font-bold">6+ Yrs</span>
          <span class="font-mono text-[10px] text-outline uppercase tracking-wider"
            >Active Dev</span
          >
        </div>
        <div class="w-px h-8 bg-black/[0.08] dark:bg-white/[0.08]"></div>
        <div class="flex flex-col">
          <span class="font-mono text-sm sm:text-base text-on-surface font-bold">MEVN & Unity</span>
          <span class="font-mono text-[10px] text-outline uppercase tracking-wider"
            >Core Focus</span
          >
        </div>
        <div class="w-px h-8 bg-black/[0.08] dark:bg-white/[0.08]"></div>
        <div class="flex flex-col">
          <span class="font-mono text-sm sm:text-base text-on-surface font-bold">Production</span>
          <span class="font-mono text-[10px] text-outline uppercase tracking-wider"
            >Asset Store / npm</span
          >
        </div>
      </div>
    </div>

    <!-- Mobile Category Hamburger Nav (sm:hidden) -->
    <div class="sm:hidden relative w-full">
      <button
        type="button"
        @click="isSkillsMenuOpen = !isSkillsMenuOpen"
        class="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-surface-container-low/90 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-md font-display text-sm font-semibold text-on-surface"
      >
        <div class="flex items-center gap-2.5">
          <span class="material-symbols-outlined text-primary text-[20px]">
            {{ isSkillsMenuOpen ? "close" : "menu" }}
          </span>
          <span class="text-on-surface-variant font-normal">Category:</span>
          <span class="text-primary font-bold">
            {{ skillsCategories.find((c) => c.id === selectedCategory)?.label }}
          </span>
        </div>
        <span
          class="material-symbols-outlined text-outline text-[20px] transition-transform duration-300"
          :class="{ 'rotate-180': isSkillsMenuOpen }"
        >
          expand_more
        </span>
      </button>

      <!-- Dropdown Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-2 scale-95"
      >
        <div
          v-if="isSkillsMenuOpen"
          class="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-surface-container-low/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.1] shadow-2xl z-30 flex flex-col gap-1"
        >
          <button
            v-for="category in skillsCategories"
            :key="category.id"
            type="button"
            @click="selectSkillCategory(category.id)"
            :class="[
              'w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-display text-xs font-semibold transition-all',
              selectedCategory === category.id
                ? 'bg-primary-container text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high',
            ]"
          >
            <span>{{ category.label }}</span>
            <span v-if="selectedCategory === category.id" class="material-symbols-outlined text-xs"
              >check</span
            >
          </button>
        </div>
      </Transition>
    </div>

    <!-- Desktop Filter Pills Navigation (hidden sm:inline-flex) -->
    <div
      class="hidden sm:inline-flex items-center gap-2 p-1.5 rounded-full bg-surface-container-low/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm max-w-fit overflow-x-auto no-scrollbar"
    >
      <button
        v-for="category in skillsCategories"
        :key="category.id"
        type="button"
        @click="selectedCategory = category.id"
        :class="[
          'px-4 sm:px-5 py-2 rounded-full font-display text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap',
          selectedCategory === category.id
            ? 'bg-primary-container text-white shadow-[0_4px_14px_rgba(45,104,255,0.35)] scale-[1.02]'
            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high',
        ]"
      >
        {{ category.label }}
      </button>
    </div>

    <!-- Animated Skills Grid Container -->
    <div class="min-h-[220px]">
      <Transition name="skills-view" mode="out-in">
        <div :key="selectedCategory" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(skill, idx) in filteredSkills"
            :key="skill.name"
            class="group p-4 rounded-xl bg-surface-container-low/80 hover:bg-surface-container transition-all duration-200 shadow-sm border border-black/[0.04] dark:border-white/[0.06] flex items-center gap-4 hover:-translate-y-1 hover:shadow-md cursor-default"
            :style="{
              animation: `skillCardIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 40}ms both`,
            }"
          >
            <div
              class="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-white transition-all duration-300 shrink-0 shadow-inner group-hover:rotate-6"
            >
              <span class="material-symbols-outlined text-[20px]">{{ skill.iconName }}</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span
                class="font-display text-sm sm:text-base text-on-surface group-hover:text-primary transition-colors font-medium truncate"
              >
                {{ skill.name }}
              </span>
              <span class="font-mono text-[10px] text-outline uppercase tracking-wider">
                {{ skill.category }}
              </span>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.skills-view-enter-active,
.skills-view-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.skills-view-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.skills-view-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

@keyframes skillCardIn {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
