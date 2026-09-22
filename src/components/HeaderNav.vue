<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
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
const headerContainerRef = ref<HTMLElement | null>(null);

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

function handleMobileThemeToggle() {
  isMobileMenuOpen.value = false;
  toggleTheme();
}

function onDocumentClick(e: MouseEvent) {
  if (
    isMobileMenuOpen.value &&
    headerContainerRef.value &&
    !headerContainerRef.value.contains(e.target as Node)
  ) {
    isMobileMenuOpen.value = false;
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  document.removeEventListener("click", onDocumentClick);
  document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <header
    ref="headerContainerRef"
    class="fixed top-0 w-full z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none"
  >
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
          class="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-container to-sky-400 p-[1.5px] flex items-center justify-center shrink-0 shadow-md group-hover:scale-108 transition-transform duration-300 ease-out"
        >
          <div
            class="w-full h-full rounded-full bg-surface-obsidian flex items-center justify-center"
          >
            <span class="font-display font-bold text-xs text-primary">SR</span>
          </div>
        </div>
        <div class="flex flex-col">
          <span
            class="font-display text-sm font-semibold tracking-tight text-on-surface group-hover:text-primary transition-colors duration-300"
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
            'px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ease-out select-none cursor-pointer hover:scale-105 active:scale-95',
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
          class="hidden md:flex w-9 h-9 rounded-full items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all duration-300 ease-out hover:scale-110 active:scale-95 border border-black/[0.04] dark:border-white/[0.06] hover:border-primary/40 cursor-pointer shadow-sm"
        >
          <span class="material-symbols-outlined text-[18px]">description</span>
        </a>

        <!-- Theme Switcher (Desktop Only) -->
        <button
          type="button"
          @click="toggleTheme"
          :aria-label="isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'"
          class="group/theme hidden md:flex w-9 h-9 rounded-full items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all duration-300 ease-out hover:scale-110 active:scale-95 border border-black/[0.04] dark:border-white/[0.06] hover:border-primary/40 cursor-pointer shadow-sm"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <span
            class="material-symbols-outlined text-[18px] transition-transform duration-500 ease-out group-hover/theme:rotate-45"
          >
            {{ isDark ? "light_mode" : "dark_mode" }}
          </span>
        </button>

        <!-- Mobile Menu Hamburger Button (Only element on mobile header) -->
        <button
          type="button"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-surface-container-high/80 text-on-surface hover:bg-surface-bright transition-all duration-300 ease-out hover:scale-105 active:scale-95 border border-black/[0.04] dark:border-white/[0.06] shadow-sm cursor-pointer"
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
      enter-active-class="transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)"
      enter-from-class="opacity-0 -translate-y-3 scale-95 blur-sm"
      enter-to-class="opacity-100 translate-y-0 scale-100 blur-0"
      leave-active-class="transition-all duration-200 cubic-bezier(0.16, 1, 0.3, 1)"
      leave-from-class="opacity-100 translate-y-0 scale-100 blur-0"
      leave-to-class="opacity-0 -translate-y-3 scale-95 blur-sm"
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
            'w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ease-out hover:translate-x-1',
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
          @click="handleMobileThemeToggle"
          class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-on-surface hover:bg-surface-container-high transition-all duration-200 ease-out hover:translate-x-1 text-sm font-medium cursor-pointer"
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
          class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-primary font-medium text-sm hover:bg-surface-container-high transition-all duration-200 ease-out hover:translate-x-1"
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
