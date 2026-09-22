import { ref, onMounted, onUnmounted } from "vue";

/**
 * Procedural typewriter composable that cycles through an array of strings.
 * Handles forward character typing, full-word hold pause, and backspacing.
 *
 * @param words - List of phrases to cycle through
 * @param typingSpeed - Character advance interval in milliseconds
 * @param deletingSpeed - Character erase interval in milliseconds
 * @param pauseDelay - Hold duration at word completion before backspacing
 */
export function useTypewriter(
  words: string[],
  typingSpeed = 90,
  deletingSpeed = 40,
  pauseDelay = 2200
) {
  const displayText = ref("");
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  function type() {
    if (!words.length) return;
    const currentWord = words[wordIndex] || "";

    if (isDeleting) {
      displayText.value = currentWord.substring(0, Math.max(0, charIndex - 1));
      charIndex = Math.max(0, charIndex - 1);
    } else {
      displayText.value = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      delay = pauseDelay;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    timer = setTimeout(type, delay);
  }

  onMounted(() => {
    type();
  });

  onUnmounted(() => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  });

  return {
    displayText,
  };
}
