const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function dismissPreloader() {
    const el = document.getElementById('preloader');
    if (!el) return;
    setTimeout(() => {
        el.classList.add('loaded');
        el.addEventListener('transitionend', function h() {
            el.removeEventListener('transitionend', h);
            el.remove();
        });
    }, 420);
}

export function markItemsPending() {
    if (prefersReduced) return;

    document.querySelectorAll('.showcase-section').forEach(section => {
        let idx = 0;
        section.querySelectorAll('.reveal-item').forEach(item => {
            item.style.setProperty('--reveal-index', idx);
            idx++;
        });
    });

    document.querySelectorAll('.reveal-item:not(.showcase-section .reveal-item)')
        .forEach((item, i) => item.style.setProperty('--reveal-index', i));
}

export function setupObserver() {
    const items = document.querySelectorAll('.reveal-item');
    if (!items.length) return;

    if (prefersReduced) {
        items.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        },
        {
            root:       null,
            rootMargin: '0px 0px -80px 0px',
            threshold:  0.08,
        }
    );

    items.forEach(el => observer.observe(el));
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
