const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice  = window.matchMedia('(hover: none)').matches;

export function buildParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const count = prefersReduced ? 6 : 18;

    const colours = [
        'rgba(225,29,72,VAL)',
        'rgba(121,9,226,VAL)',
        'rgba(79,70,229,VAL)',
        'rgba(29,78,216,VAL)',
    ];

    for (let i = 0; i < count; i++) {
        const el = document.createElement('span');
        el.className = 'particle';

        const size  = rand(6, 28);
        const x     = rand(0, 100);
        const y     = rand(0, 100);
        const dur   = rand(16, 32);
        const delay = rand(0, -20);
        const alpha = rand(20, 45) / 100;
        const clr   = colours[i % colours.length].replace('VAL', alpha);

        el.style.cssText = [
            `width:${size}px`,
            `height:${size}px`,
            `left:${x}%`,
            `top:${y}%`,
            `background:${clr}`,
            `filter:blur(${rand(8, 20)}px)`,
            `--particle-dur:${dur}s`,
            `--particle-delay:${delay}s`,
        ].join(';');

        container.appendChild(el);
    }
}

export function setupCardGlow() {
    if (prefersReduced || isTouchDevice) return;

    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        let rafId = null;

        card.addEventListener('mousemove', e => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                // Cursor position relative to card, as percentage
                const x = ((e.clientX - rect.left) / rect.width)  * 100;
                const y = ((e.clientY - rect.top)  / rect.height) * 100;

                // Inject a subtle radial highlight using a CSS custom property
                card.style.setProperty('--glow-x', `${x}%`);
                card.style.setProperty('--glow-y', `${y}%`);
                card.classList.add('card--glow-active');
                rafId = null;
            });
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('card--glow-active');
            card.style.removeProperty('--glow-x');
            card.style.removeProperty('--glow-y');
        });
    });

    injectGlowStyle();
}

function injectGlowStyle() {
    if (document.getElementById('card-glow-style')) return;
    const style = document.createElement('style');
    style.id = 'card-glow-style';
    style.textContent = `
    .project-card.card--glow-active::before {
      background:
        radial-gradient(
          circle at var(--glow-x, 50%) var(--glow-y, 30%),
          rgba(255,255,255,0.07) 0%,
          transparent 60%
        ),
        linear-gradient(160deg, rgba(255,255,255,0.10) 0%, transparent 40%);
    }
  `;
    document.head.appendChild(style);
}

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

export function initProjects() {
    buildParticles();
    setupCardGlow();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjects);
} else {
    initProjects();
}
