const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function dismissPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Brief delay so the ring animation is seen for at least one cycle
    setTimeout(() => {
        preloader.classList.add('loaded');

        // Remove after CSS transition completes (clean up layer & accessibility)
        preloader.addEventListener('transitionend', function handler() {
            preloader.removeEventListener('transitionend', handler);
            preloader.remove();
        });
    }, 400);
}

export function markItemsPending() {
    if (prefersReduced) return;

    document.querySelectorAll('.blog__item').forEach(item => {
        item.classList.add('reveal-pending');
    });
}

export function setupObserver() {
    const items = document.querySelectorAll('.blog__item');
    if (!items.length) return;
    if (prefersReduced) {
        items.forEach(item => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const item = entry.target;
                item.classList.remove('reveal-pending');
                item.classList.add('is-visible');
                obs.unobserve(item);
            });
        },
        {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.12,
        }
    );

    items.forEach(item => observer.observe(item));
}

export function initAnimations() {
    dismissPreloader();
    markItemsPending();
    setupObserver();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}
