<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { blogsData, blogCategories } from "../data/blogs";
import type { BlogArticle } from "../types";

const emit = defineEmits<{
  (e: "set-ambient", color: string): void;
  (e: "reset-ambient"): void;
}>();

const selectedCategory = ref<string>("all");
const isBlogsMenuOpen = ref(false);
const sliderRef = ref<HTMLDivElement | null>(null);
const filterContainerRef = ref<HTMLDivElement | null>(null);

function selectBlogCategory(id: string) {
  selectedCategory.value = id;
  isBlogsMenuOpen.value = false;
}

function getCategoryFilterIcon(id: string): string {
  switch (id) {
    case "game-arch":
      return "sports_esports";
    case "full-stack":
      return "code_blocks";
    case "graphics":
      return "palette";
    case "devlog":
      return "terminal";
    default:
      return "clear_all";
  }
}

function onDocumentClick(e: MouseEvent) {
  if (filterContainerRef.value && !filterContainerRef.value.contains(e.target as Node)) {
    isBlogsMenuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener("click", onDocumentClick);
});

const spotlightArticle = computed(() => {
  if (selectedCategory.value === "all") {
    return blogsData[0];
  }
  const match = blogsData.find((b) => b.category === selectedCategory.value);
  return match || blogsData[0];
});

const otherBlogs = computed(() => {
  if (selectedCategory.value === "all") {
    return blogsData.filter((b) => b.id !== spotlightArticle.value.id);
  }
  const filtered = blogsData.filter((b) => b.category === selectedCategory.value);
  if (filtered.length <= 1) {
    return filtered;
  }
  return filtered.filter((b) => b.id !== spotlightArticle.value.id);
});

function getBlogIcon(blog: BlogArticle): string {
  if (blog.icon) return blog.icon;
  switch (blog.category) {
    case "game-arch":
      return "sports_esports";
    case "full-stack":
      return "code_blocks";
    case "graphics":
      return "palette";
    case "devlog":
      return "terminal";
    default:
      return "article";
  }
}

let targetLeft = -1;
let scrollResetTimer: ReturnType<typeof setTimeout> | null = null;

function scrollSlider(delta: number) {
  const el = sliderRef.value;
  if (!el) return;

  const maxScroll = el.scrollWidth - el.clientWidth;
  if (maxScroll <= 0) return;

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

watch(selectedCategory, () => {
  targetLeft = 0;
  if (sliderRef.value) {
    sliderRef.value.scrollTo({ left: 0, behavior: "smooth" });
  }
});
</script>

<template>
  <section id="blogs" class="py-16 md:py-24 max-w-6xl mx-auto w-full flex flex-col gap-14">
    <!-- Section Header -->
    <div v-reveal:base class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
        <span class="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
          Writings & Technical Deep Dives
        </span>
      </div>
      <h2 class="font-display text-3xl sm:text-5xl font-bold text-on-surface tracking-tight">
        Engineering Notes & Insights
      </h2>
      <p class="text-base text-on-surface-variant max-w-2xl leading-relaxed">
        Reflections on building decoupled game engines in Unity, reactive MEVN web architectures,
        and mathematical shader programming. Observations on pragmatic craftsmanship and
        high-frequency systems.
      </p>
    </div>

    <!-- Featured Spotlight Article (Billboard Format, matching Projects Featured Hero) with Transition -->
    <div v-reveal:blogs class="min-h-[380px]">
      <Transition name="blogs-spotlight" mode="out-in">
        <div
          :key="spotlightArticle.id"
          class="blog-spotlight-item group relative w-full rounded-3xl bg-surface-container-low/90 overflow-hidden shadow-2xl transition-all duration-700 ease-out border border-black/[0.06] dark:border-white/[0.08] hover:border-primary/40 hover:shadow-[0_28px_60px_rgba(45,104,255,0.22)]"
          @mouseenter="emit('set-ambient', spotlightArticle.ambientColor || '#2d68ff')"
          @mouseleave="emit('reset-ambient')"
        >
          <!-- Media Aspect Container -->
          <div
            class="relative aspect-[21/9] min-h-[470px] sm:min-h-[420px] md:min-h-[420px] w-full overflow-hidden bg-surface-container-lowest"
          >
            <img
              v-if="spotlightArticle.image"
              :src="spotlightArticle.image"
              :alt="spotlightArticle.title"
              class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
            <!-- Fallback Blueprint for Non-Image Spotlight Articles -->
            <div
              v-else
              class="w-full h-full bg-gradient-to-tr from-surface-obsidian via-surface-container-high/60 to-surface-container-low flex items-center justify-center p-8 relative overflow-hidden"
            >
              <div
                class="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-primary/15 blur-3xl pointer-events-none group-hover:bg-primary/25 transition-all duration-700 ease-out"
              ></div>
              <div
                class="w-24 h-24 rounded-2xl bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out"
              >
                <span class="material-symbols-outlined text-5xl">{{
                  getBlogIcon(spotlightArticle)
                }}</span>
              </div>
            </div>

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
              <span class="material-symbols-outlined text-sm">edit_note</span>
              <span>SPOTLIGHT ESSAY // {{ spotlightArticle.categoryLabel }}</span>
            </div>
            <div
              class="absolute top-4 right-4 sm:top-6 sm:right-6 hidden sm:flex items-center gap-2 font-mono text-xs text-on-surface-variant bg-surface-obsidian/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/[0.06] z-10"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span>{{ spotlightArticle.readTime }}</span>
            </div>

            <!-- Code Telemetry Overlay (if present) -->
            <div
              v-if="spotlightArticle.codeTelemetry"
              class="absolute top-16 left-6 hidden md:flex items-center gap-2 px-3 py-1 rounded-md bg-surface-obsidian/60 backdrop-blur-sm border border-white/[0.04] font-mono text-[11px] text-gray-300"
            >
              <span class="material-symbols-outlined text-xs text-primary">terminal</span>
              <span>{{ spotlightArticle.codeTelemetry.file }}</span>
              <span class="text-outline text-[10px]"
                >({{ spotlightArticle.codeTelemetry.revision }})</span
              >
            </div>
          </div>

          <!-- Hero Content Overlay -->
          <div class="absolute bottom-0 inset-x-0 p-5 sm:p-10 flex flex-col gap-3 sm:gap-4">
            <!-- Dedicated Compact Keywords Area -->
            <div
              v-if="spotlightArticle.tags"
              class="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap"
            >
              <span
                v-for="(tag, idx) in spotlightArticle.tags"
                :key="tag"
                :class="[
                  'font-mono text-[10px] sm:text-[11px] text-on-surface-variant bg-surface-container/85 backdrop-blur-sm px-2.5 py-0.5 sm:py-1 rounded-full border border-white/[0.06]',
                  idx >= 2 ? 'hidden sm:inline-block' : 'inline-block',
                ]"
              >
                {{ tag }}
              </span>
              <span
                v-if="spotlightArticle.tags.length > 2"
                class="sm:hidden font-mono text-[9px] text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20"
              >
                +{{ spotlightArticle.tags.length - 2 }}
              </span>
            </div>

            <div class="flex flex-col gap-2 max-w-3xl">
              <div class="flex items-center gap-2 text-xs font-mono text-outline">
                <span>{{ spotlightArticle.date }}</span>
                <span>•</span>
                <span>{{ spotlightArticle.readTime }}</span>
              </div>
              <h3
                class="font-display text-xl sm:text-4xl font-bold text-white tracking-tight group-hover:text-primary transition-colors leading-snug"
              >
                {{ spotlightArticle.title }}
              </h3>
              <p
                class="font-body text-xs sm:text-base text-gray-300 line-clamp-2 sm:line-clamp-3 leading-relaxed"
              >
                {{ spotlightArticle.excerpt }}
              </p>
            </div>

            <!-- Action Button -->
            <div class="flex flex-wrap items-center gap-4 pt-1 sm:pt-2">
              <a
                v-if="spotlightArticle.link"
                :href="spotlightArticle.link"
                target="_blank"
                rel="noreferrer"
                class="group/btn flex items-center gap-2 bg-primary-container hover:bg-blue-600 text-white px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(45,104,255,0.4)] hover:shadow-[0_0_25px_rgba(45,104,255,0.6)] cursor-pointer"
              >
                <span class="material-symbols-outlined text-[18px]">menu_book</span>
                <span>Read Architecture Article</span>
                <span
                  class="material-symbols-outlined text-xs group-hover/btn:translate-x-1 transition-transform duration-300 ease-out"
                  >arrow_forward</span
                >
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Technical Archive & Articles Showcase Slider with Special Reveal Animation -->
    <div v-reveal:blogs class="flex flex-col gap-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <h3 class="font-display text-2xl font-bold text-on-surface">Technical Archive & Notes</h3>
          <span
            class="font-mono text-xs text-outline bg-surface-container px-2.5 py-1 rounded-full border border-black/[0.04] dark:border-white/[0.05]"
          >
            0{{ otherBlogs.length }} Articles
          </span>
        </div>

        <!-- Universal Filter Tab Dropdown & Looping Navigation Controls (All Devices) -->
        <div
          class="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end"
        >
          <div ref="filterContainerRef" class="relative flex-1 sm:flex-initial">
            <button
              type="button"
              @click="isBlogsMenuOpen = !isBlogsMenuOpen"
              class="w-full sm:w-auto min-w-[190px] sm:min-w-[210px] flex items-center justify-between gap-3 px-4 py-2 sm:py-2.5 rounded-xl bg-surface-container-low/90 hover:bg-surface-container-high/90 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] hover:border-primary/40 shadow-sm font-mono text-xs text-on-surface transition-all duration-300 ease-out hover:scale-[1.02] active:scale-95 cursor-pointer select-none"
            >
              <div class="flex items-center gap-2 min-w-0">
                <span class="material-symbols-outlined text-primary text-[18px] shrink-0">
                  {{ isBlogsMenuOpen ? "close" : "tune" }}
                </span>
                <span class="text-on-surface-variant font-normal shrink-0">Filter:</span>
                <span class="text-primary font-semibold truncate">
                  {{ blogCategories.find((c) => c.id === selectedCategory)?.label }}
                </span>
              </div>
              <span
                class="material-symbols-outlined text-outline text-[18px] transition-transform duration-300 shrink-0"
                :class="{ 'rotate-180': isBlogsMenuOpen }"
              >
                expand_more
              </span>
            </button>

            <!-- Dropdown Menu Overlay -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 -translate-y-2 scale-95"
            >
              <div
                v-if="isBlogsMenuOpen"
                class="absolute top-full right-0 left-0 sm:left-auto sm:w-64 mt-2 p-1.5 rounded-2xl bg-surface-container-low/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.1] shadow-2xl z-40 flex flex-col gap-1"
              >
                <button
                  v-for="cat in blogCategories"
                  :key="cat.id"
                  type="button"
                  @click="selectBlogCategory(cat.id)"
                  :class="[
                    'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs transition-all duration-200 ease-out cursor-pointer',
                    selectedCategory === cat.id
                      ? 'bg-primary-container text-white font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high',
                  ]"
                >
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm opacity-70">
                      {{ getCategoryFilterIcon(cat.id) }}
                    </span>
                    <span>{{ cat.label }}</span>
                  </div>
                  <span
                    v-if="selectedCategory === cat.id"
                    class="material-symbols-outlined text-xs text-white"
                  >
                    check
                  </span>
                </button>
              </div>
            </Transition>
          </div>

          <!-- Looping Navigation Arrows -->
          <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              @click="scrollSlider(-390)"
              aria-label="Previous article"
              class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container-low hover:bg-surface-container-high border border-black/[0.06] dark:border-white/[0.08] hover:border-primary/40 text-on-surface-variant hover:text-primary flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 active:scale-95 shadow-sm cursor-pointer"
            >
              <span class="material-symbols-outlined text-[16px] sm:text-[18px]">chevron_left</span>
            </button>
            <button
              type="button"
              @click="scrollSlider(390)"
              aria-label="Next article"
              class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container-low hover:bg-surface-container-high border border-black/[0.06] dark:border-white/[0.08] hover:border-primary/40 text-on-surface-variant hover:text-primary flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 active:scale-95 shadow-sm cursor-pointer"
            >
              <span class="material-symbols-outlined text-[16px] sm:text-[18px]"
                >chevron_right</span
              >
            </button>
          </div>
        </div>
      </div>

      <!-- Horizontal Scrollable Container with Animated View Transition -->
      <div class="min-h-[380px]">
        <Transition name="blogs-view" mode="out-in">
          <div
            :key="selectedCategory"
            ref="sliderRef"
            @scroll.passive="onSliderScroll"
            class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scroll-smooth no-scrollbar -mx-2 px-2"
          >
            <article
              v-for="(blog, idx) in otherBlogs"
              :key="blog.id"
              class="blog-slider-item w-[320px] sm:w-[370px] shrink-0 snap-start flex flex-col justify-between rounded-2xl overflow-hidden bg-surface-container-low/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] hover:border-primary/40 shadow-xl group cursor-pointer"
              :style="{
                '--stagger': idx,
              }"
              @mouseenter="emit('set-ambient', blog.ambientColor || '#2d68ff')"
              @mouseleave="emit('reset-ambient')"
            >
              <div>
                <!-- Header Media Area -->
                <!-- Case 1: Blog Has an Image Cover -->
                <div
                  v-if="blog.image"
                  class="relative aspect-video w-full overflow-hidden bg-surface-container-lowest"
                >
                  <img
                    :src="blog.image"
                    :alt="blog.title"
                    class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-surface-obsidian via-surface-obsidian/40 to-transparent"
                  ></div>
                  <div
                    class="absolute top-3 left-3 font-mono text-[11px] text-primary bg-surface-obsidian/85 px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/[0.04]"
                  >
                    <span class="material-symbols-outlined text-xs">{{ getBlogIcon(blog) }}</span>
                    <span>{{ blog.categoryLabel }}</span>
                  </div>
                  <div
                    class="absolute top-3 right-3 font-mono text-[11px] text-on-surface-variant bg-surface-obsidian/85 px-2.5 py-1 rounded-md border border-white/[0.04]"
                  >
                    {{ blog.readTime }}
                  </div>
                </div>

                <!-- Case 2: Blog Does Not Have an Image Cover - Rich Stylized Obsidian Glass Editorial Banner -->
                <div
                  v-else
                  class="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-surface-container-high/90 via-surface-container to-surface-container-low flex flex-col justify-between p-5 border-b border-black/[0.04] dark:border-white/[0.04]"
                >
                  <!-- Ambient background bloom -->
                  <div
                    class="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none group-hover:bg-primary/20 transition-all duration-500"
                  ></div>

                  <!-- Top Telemetry Row -->
                  <div class="flex items-center justify-between w-full z-10">
                    <span
                      class="font-mono text-[10px] text-primary uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-primary-container/15 border border-primary/20"
                    >
                      {{ blog.categoryLabel }}
                    </span>
                    <span class="font-mono text-[11px] text-outline flex items-center gap-1">
                      <span class="material-symbols-outlined text-[13px]">schedule</span>
                      {{ blog.readTime }}
                    </span>
                  </div>

                  <!-- Center Stylized Architectural Emblem -->
                  <div class="flex items-center gap-3.5 z-10">
                    <div
                      class="w-12 h-12 rounded-xl bg-surface-container-highest/90 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-white group-hover:scale-110 transition-all duration-400 ease-out shadow-md group-hover:rotate-3"
                    >
                      <span class="material-symbols-outlined text-[22px]">{{
                        getBlogIcon(blog)
                      }}</span>
                    </div>
                    <div class="flex flex-col min-w-0">
                      <span class="font-mono text-[10px] text-outline uppercase tracking-wider">
                        Technical Whitepaper
                      </span>
                      <span class="font-mono text-xs text-on-surface font-semibold truncate">
                        {{ blog.slug }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Card Body -->
                <div class="p-6 flex flex-col gap-2.5">
                  <h4
                    class="font-display text-lg font-bold text-on-surface group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug"
                  >
                    {{ blog.title }}
                  </h4>
                  <p
                    class="font-body text-xs sm:text-sm text-on-surface-variant line-clamp-3 leading-relaxed"
                  >
                    {{ blog.excerpt }}
                  </p>
                </div>
              </div>

              <!-- Card Footer & Links -->
              <div class="p-6 pt-0 flex flex-col gap-4">
                <!-- Tags -->
                <div v-if="blog.tags && blog.tags.length" class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in blog.tags.slice(0, 3)"
                    :key="tag"
                    class="font-mono text-[10px] text-outline bg-surface-container-high px-2 py-0.5 rounded transition-colors group-hover:text-on-surface"
                  >
                    {{ tag }}
                  </span>
                </div>

                <div
                  class="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.06]"
                >
                  <span class="font-mono text-xs text-outline">{{ blog.date }}</span>
                  <a
                    v-if="blog.link"
                    :href="blog.link"
                    target="_blank"
                    rel="noreferrer"
                    class="font-mono text-xs text-primary hover:underline flex items-center gap-1 font-medium group/link"
                  >
                    <span>Read Article</span>
                    <span
                      class="material-symbols-outlined text-xs group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
                      >arrow_outward</span
                    >
                  </a>
                </div>
              </div>
            </article>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Bottom Hub: Discussions & Technical Inquiries -->
    <div
      class="w-full rounded-3xl bg-surface-container-low/80 p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-black/[0.06] dark:border-white/[0.08]"
    >
      <div
        class="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"
      ></div>

      <div class="flex flex-col gap-3 max-w-xl z-10 text-center md:text-left">
        <div class="flex items-center justify-center md:justify-start gap-2">
          <span class="material-symbols-outlined text-primary text-xl">forum</span>
          <span class="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
            Technical Dialogue & Questions
          </span>
        </div>
        <h3 class="font-display text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
          Want to discuss an architecture or idea?
        </h3>
        <p class="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
          I'm always keen to chat about game loop performance, reactive state designs, or procedural
          math algorithms.
        </p>
      </div>

      <div class="flex items-center gap-4 z-10 w-full md:w-auto justify-center md:justify-end">
        <a
          href="#contact"
          class="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary-container hover:bg-blue-600 text-white font-medium text-sm px-6 py-3.5 rounded-xl transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-md hover:shadow-[0_0_25px_rgba(45,104,255,0.45)] cursor-pointer"
        >
          <span class="material-symbols-outlined text-[20px]">mail</span>
          <span>Send Message</span>
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blogs-spotlight-enter-active,
.blogs-spotlight-leave-active,
.blogs-view-enter-active,
.blogs-view-leave-active {
  transition:
    opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.blogs-spotlight-enter-from,
.blogs-view-enter-from {
  opacity: 0;
  transform: translateY(14px) scale(0.98);
}

.blogs-spotlight-leave-to,
.blogs-view-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

@keyframes blogCardIn {
  0% {
    opacity: 0;
    transform: translateY(12px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
