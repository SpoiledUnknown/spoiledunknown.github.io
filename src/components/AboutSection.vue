<script setup lang="ts">
import { profileData } from "../data/profile";
</script>

<template>
  <section id="about" class="py-16 md:py-24 max-w-5xl mx-auto w-full">
    <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
      <!-- Left Column: Frosted Glass Profile Identity & Telemetry -->
      <div v-reveal:base class="w-full lg:w-5/12 flex flex-col gap-6 lg:sticky lg:top-28">
        <div
          class="p-8 rounded-2xl bg-surface-container-low/80 backdrop-blur-md shadow-xl flex flex-col gap-6 relative overflow-hidden border border-black/[0.06] dark:border-white/[0.08] group transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:border-primary/30"
        >
          <!-- Ambient card bloom -->
          <div
            class="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-primary-container/15 blur-3xl pointer-events-none group-hover:bg-primary-container/25 transition-all duration-700 ease-out"
          ></div>

          <!-- Prominent Portrait Image -->
          <div
            class="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl border border-black/[0.08] dark:border-white/[0.1] bg-surface-container-high group-hover:border-primary/40 transition-all duration-500"
          >
            <img
              src="/mypic.webp"
              alt="Shashank Raj"
              class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none"
            ></div>

            <!-- Active Status Pip Overlay -->
            <div
              class="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-surface-obsidian/85 backdrop-blur-md border border-white/15 flex items-center gap-2 shadow-lg transition-transform duration-300 ease-out group-hover:scale-105"
            >
              <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span
                class="font-mono text-[11px] text-white/95 uppercase tracking-wider font-semibold"
                >Available</span
              >
            </div>
          </div>

          <!-- Name and Handle Header -->
          <div class="flex flex-col min-w-0">
            <h2 class="font-display text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
              {{ profileData.name }}
            </h2>
            <span class="font-mono text-xs sm:text-sm text-primary font-medium">{{
              profileData.handle
            }}</span>
          </div>

          <!-- Primary Focus Badge -->
          <div
            class="bg-surface-container-high/60 rounded-xl p-3.5 flex flex-col gap-1 border border-black/[0.03] dark:border-white/[0.04] transition-all duration-300 ease-out group-hover:bg-surface-container-high/80"
          >
            <span class="font-mono text-sm text-on-surface flex items-center gap-2 font-medium">
              <span class="material-symbols-outlined text-[16px] text-primary">terminal</span>
              MEVN Stack & Unity Engine
            </span>
          </div>
        </div>
      </div>

      <!-- Right Column: Narrative Story -->
      <div v-reveal:base class="w-full lg:w-7/12 flex flex-col gap-6">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
          <span class="font-mono text-xs text-primary uppercase tracking-wider font-semibold"
            >Background & Story</span
          >
        </div>

        <h2 class="font-display text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
          Turning curiosities into reliable systems.
        </h2>

        <div
          class="flex flex-col gap-5 text-on-surface-variant text-base sm:text-lg leading-relaxed font-body"
        >
          <p v-for="(paragraph, index) in profileData.bioParagraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
