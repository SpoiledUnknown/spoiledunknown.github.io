<script setup lang="ts">
import { ref } from "vue";
import { profileData } from "../data/profile";
import { useTheme } from "../composables/useTheme";

const props = defineProps<{
  activeSection: string;
}>();

const emit = defineEmits<{
  (e: "navigate", sectionId: string): void;
}>();

const { isDark, toggleTheme } = useTheme();
const isMobileMenuOpen = ref(false);

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "blogs", label: "Blogs" },
  { id: "contact", label: "Contact" },
];

function handleNavClick(id: string) {
  isMobileMenuOpen.value = false;
  emit("navigate", id);
}
</script>

<template>
  <header class="fixed top-0 w-full z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
    <div
      class="pointer-events-auto h-16 max-w-5xl w-full bg-surface-container/70 dark:bg-surface-container/60 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] rounded-full px-4 sm:px-6 flex items-center justify-between shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative transition-all duration-300"
    >
      <!-- Brand / Identity (Left) -->
      <a
        href="#home"
        @click.prevent="handleNavClick('home')"
        class="flex items-center gap-3 group select-none z-10"
      >
        <div
          class="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-container to-sky-400 p-[1.5px] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform"
        >
          <div
            class="w-full h-full rounded-full bg-surface-obsidian flex items-center justify-center"
          >
            <span class="font-display font-bold text-xs text-primary">SR</span>
          </div>
        </div>
        <div class="flex flex-col">
          <span
            class="font-display text-sm font-semibold tracking-tight text-on-surface group-hover:text-primary transition-colors"
          >
            {{ profileData.name }}
          </span>
          <span class="font-mono text-[10px] text-outline tracking-wider">
            {{ profileData.handle }}
          </span>
        </div>
      </a>

      <!-- Desktop Nav Items (Mathematically Centered) -->
      <nav
        class="hidden md:flex items-center gap-1 bg-surface-container-low/80 p-1 rounded-full border border-black/[0.04] dark:border-white/[0.04] absolute left-1/2 -translate-x-1/2 z-10"
      >
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          @click="handleNavClick(item.id)"
          :class="[
            'px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 select-none cursor-pointer',
            activeSection === item.id
              ? 'bg-primary-container text-white shadow-md'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high',
          ]"
        >
          {{ item.label }}
        </button>
      </nav>

      <!-- Utility Actions (Right) -->
      <div class="flex items-center gap-2 z-10">
        <!-- Resume Button (Icon Only across all devices) -->
        <a
          :href="profileData.resumeUrl"
          target="_blank"
          rel="noreferrer"
          aria-label="View Resume"
          title="View Resume"
          class="hidden md:flex w-9 h-9 rounded-full items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all border border-black/[0.04] dark:border-white/[0.06] hover:border-primary/40 hover:text-primary cursor-pointer shadow-sm"
        >
          <span class="material-symbols-outlined text-[18px]">description</span>
        </a>

        <!-- Theme Switcher (Desktop Only) -->
        <button
          type="button"
          @click="toggleTheme"
          :aria-label="isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'"
          class="hidden md:flex w-9 h-9 rounded-full items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all border border-black/[0.04] dark:border-white/[0.06] cursor-pointer"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <span class="material-symbols-outlined text-[18px]">
            {{ isDark ? "light_mode" : "dark_mode" }}
          </span>
        </button>

        <!-- Mobile Menu Hamburger Button (Only element on mobile header) -->
        <button
          type="button"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-surface-container-high/80 text-on-surface hover:bg-surface-bright transition-all border border-black/[0.04] dark:border-white/[0.06] shadow-sm cursor-pointer active:scale-95"
          aria-label="Toggle navigation menu"
        >
          <span class="material-symbols-outlined text-[20px]">
            {{ isMobileMenuOpen ? "close" : "menu" }}
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <div
        v-if="isMobileMenuOpen"
        class="pointer-events-auto absolute top-22 inset-x-4 max-w-md mx-auto p-4 rounded-2xl bg-surface-container-low/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.1] shadow-2xl flex flex-col gap-2 z-50 md:hidden"
      >
        <!-- Nav Links -->
        <button
          v-for="item in navItems"
          :key="item.id"
          type="button"
          @click="handleNavClick(item.id)"
          :class="[
            'w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-all',
            activeSection === item.id
              ? 'bg-primary-container text-white font-semibold shadow-md'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high',
          ]"
        >
          {{ item.label }}
        </button>

        <!-- Divider -->
        <div class="h-px bg-black/[0.06] dark:bg-white/[0.08] my-1"></div>

        <!-- Theme Toggle in Mobile Menu -->
        <button
          type="button"
          @click="toggleTheme"
          class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-on-surface hover:bg-surface-container-high transition-all text-sm font-medium cursor-pointer"
        >
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-primary text-[20px]">
              {{ isDark ? "light_mode" : "dark_mode" }}
            </span>
            <span>Switch Theme</span>
          </div>
          <span class="font-mono text-xs text-outline uppercase">
            {{ isDark ? "Dark Mode" : "Light Mode" }}
          </span>
        </button>

        <!-- Resume Link in Mobile Menu -->
        <a
          :href="profileData.resumeUrl"
          target="_blank"
          rel="noreferrer"
          @click="isMobileMenuOpen = false"
          class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-primary font-medium text-sm hover:bg-surface-container-high transition-all"
        >
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-[20px]">description</span>
            <span>View Resume</span>
          </div>
          <span class="material-symbols-outlined text-xs">arrow_outward</span>
        </a>
      </div>
    </transition>
  </header>
</template>
