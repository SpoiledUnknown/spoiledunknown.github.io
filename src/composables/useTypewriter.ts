import { ref, onMounted, onUnmounted } from "vue";

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
  let timer: number | null = null;

  function type() {
    if (!words.length) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      displayText.value = currentWord.substring(0, charIndex - 1);
      charIndex--;
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

    timer = window.setTimeout(type, delay);
  }

  onMounted(() => {
    type();
  });

  onUnmounted(() => {
    if (timer) clearTimeout(timer);
  });

  return {
    displayText,
  };
}
