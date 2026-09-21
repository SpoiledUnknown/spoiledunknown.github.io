<script setup lang="ts">
import { ref, onMounted } from "vue";
import { profileData } from "../data/profile";
import { useTheme } from "../composables/useTheme";

const { isDark } = useTheme();

const emailCopied = ref(false);
const formStatus = ref<{ message: string; type: "idle" | "loading" | "success" | "error" }>({
  message: "",
  type: "idle",
});

const formRef = ref<HTMLFormElement | null>(null);
const captchaContainerRef = ref<HTMLDivElement | null>(null);
let captchaWidgetId: string | number | null = null;

function renderHCaptcha() {
  if (typeof window === "undefined" || !captchaContainerRef.value) return;

  const hcaptcha = (
    window as unknown as {
      hcaptcha?: {
        render: (el: HTMLElement, opt: Record<string, unknown>) => string | number;
        reset: (id?: string | number) => void;
        getResponse: (id?: string | number) => string;
      };
    }
  ).hcaptcha;

  if (hcaptcha && typeof hcaptcha.render === "function") {
    if (captchaWidgetId !== null) return;
    try {
      captchaWidgetId = hcaptcha.render(captchaContainerRef.value, {
        sitekey: "50b2fe65-b00b-4b9e-ad62-3ba471098be2",
        theme: isDark.value ? "dark" : "light",
      });
    } catch (e) {
      console.warn("hCaptcha render notice:", e);
    }
  } else {
    setTimeout(renderHCaptcha, 300);
  }
}

onMounted(() => {
  renderHCaptcha();
});

function copyEmailAddress() {
  navigator.clipboard.writeText(profileData.email).then(() => {
    emailCopied.value = true;
    setTimeout(() => {
      emailCopied.value = false;
    }, 2500);
  });
}

async function handleSubmit(event: Event) {
  event.preventDefault();
  if (!formRef.value) return;

  const form = formRef.value;
  const hcaptcha = (
    window as unknown as {
      hcaptcha?: {
        getResponse: (id?: string | number) => string;
        reset: (id?: string | number) => void;
      };
    }
  ).hcaptcha;

  const hCaptchaResponse =
    (form.querySelector("textarea[name=h-captcha-response]") as HTMLTextAreaElement)?.value ||
    (hcaptcha && typeof hcaptcha.getResponse === "function"
      ? hcaptcha.getResponse(captchaWidgetId ?? undefined)
      : "");

  if (!hCaptchaResponse) {
    formStatus.value = {
      message: "Please complete the hCaptcha challenge.",
      type: "error",
    };
    return;
  }

  const formData = new FormData(form);
  if (!formData.get("h-captcha-response") && hCaptchaResponse) {
    formData.append("h-captcha-response", hCaptchaResponse);
  }

  formStatus.value = {
    message: "Transmitting packet...",
    type: "loading",
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success || response.status === 200) {
      formStatus.value = {
        message: result.message || "Message delivered successfully! I will respond promptly.",
        type: "success",
      };
      form.reset();
      if (hcaptcha && typeof hcaptcha.reset === "function") {
        hcaptcha.reset(captchaWidgetId ?? undefined);
      }
      setTimeout(() => {
        formStatus.value = { message: "", type: "idle" };
      }, 6000);
    } else {
      formStatus.value = {
        message: result.message || "An error occurred while submitting. Please try again.",
        type: "error",
      };
    }
  } catch (error) {
    formStatus.value = {
      message: "Network communication failure. Please check connection or email directly.",
      type: "error",
    };
  }
}
</script>

<template>
  <section id="contact" class="py-16 md:py-24 max-w-5xl mx-auto w-full flex flex-col gap-10">
    <!-- Header -->
    <div v-reveal:base class="flex flex-col items-center text-center max-w-2xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/60 backdrop-blur-md shadow-sm mb-4 border border-black/[0.04] dark:border-white/[0.05]"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="font-mono text-xs text-on-surface-variant uppercase tracking-wider">
          Typical response within 24 hours
        </span>
      </div>

      <h2 class="font-display text-3xl sm:text-5xl font-bold text-on-surface tracking-tight mb-4">
        Wanna Get In Contact With Me?
      </h2>

      <p class="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed mb-2">
        Whether you have a question, a project idea, or just want to connect, feel free to reach
        out. I'm always open to new opportunities and conversations.
      </p>

      <p class="font-body text-sm text-outline">
        Best Regards,
        <strong class="text-secondary font-semibold font-display">{{ profileData.name }}</strong>
      </p>
    </div>

    <!-- Main Glass Container -->
    <div
      v-reveal:base
      class="rounded-3xl bg-surface-container-low/90 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] p-4 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden max-w-full"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
        <!-- Left Column: Social Links & Copy Email -->
        <div class="lg:col-span-5 flex flex-col justify-between gap-6">
          <div>
            <h3 class="font-display text-xl font-bold text-secondary mb-2 tracking-wide">
              Connect & Links
            </h3>
            <p class="text-xs text-on-surface-variant mb-6">
              Connect directly via social channels or copy my developer address.
            </p>

            <div class="grid grid-cols-2 gap-3 sm:gap-4">
              <!-- GitHub -->
              <a
                href="https://github.com/spoiledunknown"
                target="_blank"
                rel="noreferrer"
                class="group bg-surface-container hover:bg-surface-container-high border border-black/[0.04] dark:border-white/[0.06] rounded-2xl p-5 flex flex-col items-center justify-center gap-2.5 transition-all duration-400 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:border-primary/40 active:scale-95 cursor-pointer"
              >
                <img
                  src="/links/github.svg"
                  alt="GitHub"
                  class="w-8 h-8 transition-transform duration-400 ease-out group-hover:scale-115 group-hover:-rotate-3"
                />
                <span
                  class="font-mono text-xs text-on-surface font-medium transition-colors duration-300 group-hover:text-primary"
                  >GitHub</span
                >
              </a>

              <!-- YouTube -->
              <a
                href="https://www.youtube.com/c/SpoiledUnknown"
                target="_blank"
                rel="noreferrer"
                class="group bg-surface-container hover:bg-surface-container-high border border-black/[0.04] dark:border-white/[0.06] rounded-2xl p-5 flex flex-col items-center justify-center gap-2.5 transition-all duration-400 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:border-red-500/40 active:scale-95 cursor-pointer"
              >
                <img
                  src="/links/youtube.svg"
                  alt="YouTube"
                  class="w-8 h-8 transition-transform duration-400 ease-out group-hover:scale-115 group-hover:-rotate-3"
                />
                <span
                  class="font-mono text-xs text-on-surface font-medium transition-colors duration-300 group-hover:text-red-400"
                  >YouTube</span
                >
              </a>

              <!-- Discord -->
              <a
                href="https://discord.gg/YykdmCjzmQ"
                target="_blank"
                rel="noreferrer"
                class="group bg-surface-container hover:bg-surface-container-high border border-black/[0.04] dark:border-white/[0.06] rounded-2xl p-5 flex flex-col items-center justify-center gap-2.5 transition-all duration-400 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:border-[#5865F2]/40 active:scale-95 cursor-pointer"
              >
                <img
                  src="/links/discord.svg"
                  alt="Discord"
                  class="w-8 h-8 transition-transform duration-400 ease-out group-hover:scale-115 group-hover:-rotate-3"
                />
                <span
                  class="font-mono text-xs text-on-surface font-medium transition-colors duration-300 group-hover:text-[#8891f7]"
                  >Discord</span
                >
              </a>

              <!-- LinkedIn -->
              <a
                href="https://www.linkedin.com/in/shashank-raj-4a028540b"
                target="_blank"
                rel="noreferrer"
                class="group bg-surface-container hover:bg-surface-container-high border border-black/[0.04] dark:border-white/[0.06] rounded-2xl p-5 flex flex-col items-center justify-center gap-2.5 transition-all duration-400 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:border-[#0077b5]/40 active:scale-95 cursor-pointer"
              >
                <img
                  src="/links/linkedin.svg"
                  alt="LinkedIn"
                  class="w-8 h-8 transition-transform duration-400 ease-out group-hover:scale-115 group-hover:-rotate-3"
                />
                <span
                  class="font-mono text-xs text-on-surface font-medium transition-colors duration-300 group-hover:text-[#38a9e6]"
                  >LinkedIn</span
                >
              </a>

              <!-- Instagram -->
              <a
                href="https://instagram.com/spoiledunknown"
                target="_blank"
                rel="noreferrer"
                class="group bg-surface-container hover:bg-surface-container-high border border-black/[0.04] dark:border-white/[0.06] rounded-2xl p-5 flex flex-col items-center justify-center gap-2.5 transition-all duration-400 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:border-pink-500/40 active:scale-95 cursor-pointer"
              >
                <img
                  src="/links/instagram.svg"
                  alt="Instagram"
                  class="w-8 h-8 transition-transform duration-400 ease-out group-hover:scale-115 group-hover:-rotate-3"
                />
                <span
                  class="font-mono text-xs text-on-surface font-medium transition-colors duration-300 group-hover:text-pink-400"
                  >Instagram</span
                >
              </a>

              <!-- Direct Mail Link -->
              <a
                :href="'mailto:' + profileData.email"
                class="group bg-surface-container hover:bg-surface-container-high border border-black/[0.04] dark:border-white/[0.06] rounded-2xl p-5 flex flex-col items-center justify-center gap-2.5 transition-all duration-400 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:border-amber-500/40 active:scale-95 cursor-pointer"
              >
                <img
                  src="/links/email.svg"
                  alt="Email"
                  class="w-8 h-8 transition-transform duration-400 ease-out group-hover:scale-115 group-hover:-rotate-3"
                />
                <span
                  class="font-mono text-xs text-on-surface font-medium transition-colors duration-300 group-hover:text-amber-400"
                  >Mail Client</span
                >
              </a>
            </div>
          </div>

          <!-- 1-Click Copy Email Capsule -->
          <div
            @click="copyEmailAddress"
            role="button"
            tabindex="0"
            class="p-4 rounded-2xl bg-surface-container border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between cursor-pointer hover:border-primary/50 hover:bg-surface-container-high hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] transition-all duration-300 ease-out group select-none"
          >
            <div class="flex items-center gap-3">
              <span
                class="text-2xl transition-transform duration-300 ease-out group-hover:scale-115 group-hover:rotate-6"
                >💌</span
              >
              <div class="flex flex-col">
                <span class="font-mono text-xs font-semibold text-on-surface">
                  {{ emailCopied ? "Copied to clipboard!" : profileData.email }}
                </span>
                <span class="font-mono text-[10px] text-outline">Click to copy address</span>
              </div>
            </div>
            <span
              class="hidden sm:inline-flex material-symbols-outlined text-sm text-outline group-hover:text-primary transition-all duration-300 ease-out group-hover:scale-110 shrink-0"
            >
              {{ emailCopied ? "done" : "content_copy" }}
            </span>
          </div>
        </div>

        <!-- Right Column: Web3Forms + hCaptcha Contact Form -->
        <div class="lg:col-span-7 flex flex-col min-w-0">
          <div
            class="h-full bg-surface-container/70 rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between border border-black/[0.04] dark:border-white/[0.05] shadow-inner overflow-hidden max-w-full"
          >
            <h3
              class="font-display text-xl font-bold text-secondary mb-6 tracking-wide text-center sm:text-left"
            >
              Send Message
            </h3>

            <!-- Web3Forms Form Preserved Exactly -->
            <form
              id="contact-form"
              ref="formRef"
              @submit="handleSubmit"
              class="flex flex-col gap-5 flex-1 justify-between"
            >
              <!-- Hidden Web3Forms Keys -->
              <input type="hidden" name="access_key" :value="profileData.web3Forms.accessKey" />
              <input type="hidden" name="from_name" :value="profileData.web3Forms.fromName" />
              <input
                type="checkbox"
                name="botcheck"
                tabindex="-1"
                autocomplete="off"
                style="display: none"
              />

              <!-- Form Inputs -->
              <div class="flex flex-col gap-4">
                <!-- Full Name -->
                <div class="relative group">
                  <input
                    type="text"
                    name="name"
                    id="fullName"
                    required
                    autocomplete="name"
                    placeholder="Full Name"
                    class="w-full bg-transparent border-b border-black/15 dark:border-white/15 py-3 px-1 font-body text-sm text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <!-- Email Address -->
                <div class="relative group">
                  <input
                    type="email"
                    name="email"
                    id="emailAddress"
                    required
                    autocomplete="email"
                    placeholder="Email Address"
                    class="w-full bg-transparent border-b border-black/15 dark:border-white/15 py-3 px-1 font-body text-sm text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <!-- Subject -->
                <div class="relative group">
                  <input
                    type="text"
                    name="subject"
                    id="subjectLine"
                    required
                    placeholder="Subject"
                    class="w-full bg-transparent border-b border-black/15 dark:border-white/15 py-3 px-1 font-body text-sm text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <!-- Message Body -->
                <div class="relative group">
                  <textarea
                    name="message"
                    id="messageContent"
                    rows="3"
                    required
                    placeholder="Type Your Message...."
                    class="w-full bg-transparent border-b border-black/15 dark:border-white/15 py-3 px-1 font-body text-sm text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary resize-none transition-colors"
                  ></textarea>
                </div>
              </div>

              <!-- hCaptcha Container (Responsive Scaler to prevent overflow on mobile devices) -->
              <div class="mt-4 flex flex-col gap-3 w-full overflow-hidden">
                <div
                  class="w-full flex justify-center sm:justify-start items-center overflow-hidden py-1"
                >
                  <div class="hcaptcha-responsive-scaler">
                    <div
                      ref="captchaContainerRef"
                      class="h-captcha"
                      :data-theme="isDark ? 'dark' : 'light'"
                      data-sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                      data-captcha="true"
                    ></div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    type="submit"
                    id="submit_button"
                    :disabled="formStatus.type === 'loading'"
                    class="w-full sm:w-auto px-8 py-3 rounded-xl bg-primary-container hover:bg-blue-600 disabled:opacity-50 text-white font-display text-sm font-semibold tracking-wide transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-md hover:shadow-[0_0_25px_rgba(45,104,255,0.45)] cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <span
                      class="material-symbols-outlined text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ease-out"
                      >send</span
                    >
                    <span>{{
                      formStatus.type === "loading" ? "Transmitting..." : "Submit Message"
                    }}</span>
                  </button>

                  <!-- Live Form Status Message -->
                  <p
                    v-if="formStatus.message"
                    :class="[
                      'font-mono text-xs transition-all duration-300 ease-out text-center sm:text-left',
                      formStatus.type === 'success' ? 'text-emerald-400 font-semibold' : '',
                      formStatus.type === 'error' ? 'text-rose-400 font-semibold' : '',
                      formStatus.type === 'loading' ? 'text-primary animate-pulse' : '',
                    ]"
                  >
                    {{ formStatus.message }}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hcaptcha-responsive-scaler {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  transform-origin: center center;
  transition: transform 0.2s ease;
}

@media (min-width: 640px) {
  .hcaptcha-responsive-scaler {
    justify-content: flex-start;
    transform-origin: left center;
  }
}

@media (max-width: 420px) {
  .hcaptcha-responsive-scaler {
    transform: scale(0.88);
  }
}

@media (max-width: 360px) {
  .hcaptcha-responsive-scaler {
    transform: scale(0.78);
  }
}

@media (max-width: 330px) {
  .hcaptcha-responsive-scaler {
    transform: scale(0.72);
  }
}
</style>
