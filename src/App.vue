<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTheme } from "./composables/useTheme";
import { useScrollSpy } from "./composables/useScrollSpy";

import HeaderNav from "./components/HeaderNav.vue";
import HeroSection from "./components/HeroSection.vue";
import AboutSection from "./components/AboutSection.vue";
import SkillsSection from "./components/SkillsSection.vue";
import ProjectsSection from "./components/ProjectsSection.vue";
import BlogsSection from "./components/BlogsSection.vue";
import ContactSection from "./components/ContactSection.vue";
import FooterSection from "./components/FooterSection.vue";
import ThemeTransition from "./components/ThemeTransition.vue";
import Preloader from "./components/Preloader.vue";

const { initTheme, isDark } = useTheme();

const sectionIds = ["home", "about", "skills", "projects", "blogs", "contact"];
const { activeSection, scrollToSection } = useScrollSpy(sectionIds);

// Dynamic Ambient Backdrop Reactor
const currentAmbientColor = ref("#2d68ff");
const ambientIntensity = ref(0.2);

function handleSetAmbient(color: string) {
  currentAmbientColor.value = color;
  ambientIntensity.value = 0.35;
}

function handleResetAmbient() {
  currentAmbientColor.value = "#2d68ff";
  ambientIntensity.value = 0.2;
}

onMounted(() => {
  initTheme();
});
</script>

<template>
  <div
    class="min-h-screen bg-surface-obsidian font-body text-on-surface antialiased relative selection:bg-primary selection:text-on-primary"
  >
    <!-- Interactive Fidget-like Preloader -->
    <Preloader />

    <!-- Dynamic Atmospheric Backdrop Reactor -->
    <div
      class="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-700 ease-out"
      :style="{ opacity: isDark ? ambientIntensity : 0.1 }"
    >
      <div
        class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full blur-[140px] transition-all duration-700"
        :style="{ backgroundColor: currentAmbientColor }"
      ></div>
      <div
        class="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[#2d68ff] blur-[120px] opacity-20"
      ></div>
      <div
        class="absolute -bottom-32 -right-32 w-[560px] h-[560px] rounded-full bg-[#60a5fa] blur-[120px] opacity-20"
      ></div>
    </div>

    <!-- Universal Floating Navbar -->
    <HeaderNav :active-section="activeSection" @navigate="scrollToSection" />

    <!-- Main Views & Sections -->
    <main class="relative z-10 w-full px-4 sm:px-6 md:px-8">
      <HeroSection @navigate="scrollToSection" />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection @set-ambient="handleSetAmbient" @reset-ambient="handleResetAmbient" />
      <BlogsSection />
      <ContactSection />
    </main>

    <!-- Footer -->
    <FooterSection />

    <!-- Circular Expanding Theme Wipe Transition -->
    <ThemeTransition />
  </div>
</template>
