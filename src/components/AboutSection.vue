<script setup lang="ts">
import { profileData } from "../data/profile";
</script>

<template>
  <section id="about" class="py-16 md:py-24 max-w-5xl mx-auto w-full">
    <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
      <!-- Left Column: Frosted Glass Profile Identity & Telemetry -->
      <div class="w-full lg:w-5/12 flex flex-col gap-6 lg:sticky lg:top-28">
        <div
          class="p-8 rounded-2xl bg-surface-container-low/80 backdrop-blur-md shadow-xl flex flex-col gap-6 relative overflow-hidden border border-black/[0.06] dark:border-white/[0.08] group transition-all duration-300"
        >
          <!-- Ambient card bloom -->
          <div
            class="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-primary-container/15 blur-3xl pointer-events-none group-hover:bg-primary-container/25 transition-all duration-700"
          ></div>

          <!-- Prominent Portrait Image -->
          <div
            class="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl border border-black/[0.08] dark:border-white/[0.1] bg-surface-container-high group-hover:border-primary/40 transition-colors duration-500"
          >
            <img
              src="/mypic.webp"
              alt="Shashank Raj"
              class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none"
            ></div>

            <!-- Active Status Pip Overlay -->
            <div
              class="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-surface-obsidian/85 backdrop-blur-md border border-white/15 flex items-center gap-2 shadow-lg"
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
            <div class="flex items-center gap-2 mt-1">
              <span class="font-mono text-xs sm:text-sm text-primary font-medium">{{
                profileData.handle
              }}</span>
              <span class="text-outline text-xs">/</span>
              <span
                class="font-mono text-xs sm:text-sm text-on-surface-variant flex items-center gap-1"
              >
                <span class="material-symbols-outlined text-[15px] text-tertiary">location_on</span>
                {{ profileData.location }}
              </span>
            </div>
          </div>

          <!-- Primary Focus Badge -->
          <div
            class="bg-surface-container-high/60 rounded-xl p-3.5 flex flex-col gap-1 border border-black/[0.03] dark:border-white/[0.04]"
          >
            <span class="font-mono text-[10px] text-outline uppercase tracking-wider"
              >Current Focus</span
            >
            <span class="font-mono text-sm text-on-surface flex items-center gap-2 font-medium">
              <span class="material-symbols-outlined text-[16px] text-primary">terminal</span>
              MEVN Stack & Unity Engine
            </span>
          </div>

          <!-- Quick Telemetry Information -->
          <div class="flex flex-col gap-3 pt-2">
            <div class="flex items-start gap-3 text-on-surface-variant">
              <span class="material-symbols-outlined text-[18px] text-primary mt-0.5"
                >calendar_month</span
              >
              <div class="flex flex-col">
                <span class="text-xs font-semibold text-on-surface">Started in 2019</span>
                <span class="text-[11px] text-outline">Began out of spontaneous curiosity</span>
              </div>
            </div>

            <div class="flex items-start gap-3 text-on-surface-variant">
              <span class="material-symbols-outlined text-[18px] text-primary mt-0.5">school</span>
              <div class="flex flex-col">
                <span class="text-xs font-semibold text-on-surface">Self-Taught Engineer</span>
                <span class="text-[11px] text-outline"
                  >Autonomous discovery & systems architecture</span
                >
              </div>
            </div>

            <div class="flex items-start gap-3 text-on-surface-variant">
              <span class="material-symbols-outlined text-[18px] text-primary mt-0.5"
                >handshake</span
              >
              <div class="flex flex-col">
                <span class="text-xs font-semibold text-on-surface">Open for Opportunities</span>
                <span class="text-[11px] text-outline">Full-stack web, tooling & game dev</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Narrative Story -->
      <div class="w-full lg:w-7/12 flex flex-col gap-6">
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
