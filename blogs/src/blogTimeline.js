export function buildProgressBar(track) {
    const barEl  = document.createElement('div');
    const fillEl = document.createElement('div');

    barEl.className  = 'blog__bar';
    fillEl.className = 'blog__bar-fill';

    barEl.appendChild(fillEl);
    track.insertBefore(barEl, track.firstChild);

    return fillEl;
}

export function buildNodeRings(track) {
    const svgNS = 'http://www.w3.org/2000/svg';

    track.querySelectorAll('.blog__node').forEach(nodeEl => {
        if (nodeEl.querySelector('.blog__node-ring')) return;

        const outerSize = 44;
        const outerCx   = outerSize / 2;

        const svgOuter = document.createElementNS(svgNS, 'svg');
        svgOuter.setAttribute('viewBox', `0 0 ${outerSize} ${outerSize}`);
        svgOuter.setAttribute('width',   outerSize);
        svgOuter.setAttribute('height',  outerSize);
        svgOuter.setAttribute('aria-hidden', 'true');
        svgOuter.classList.add('blog__node-ring', 'blog__node-ring--cw');
        svgOuter.style.cssText =
            'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);';

        const cOuter = document.createElementNS(svgNS, 'circle');
        cOuter.setAttribute('cx', outerCx);
        cOuter.setAttribute('cy', outerCx);
        cOuter.setAttribute('r',  outerCx - 1.5);
        cOuter.setAttribute('fill', 'none');
        cOuter.setAttribute('stroke', 'rgba(225,29,72,0.45)');
        cOuter.setAttribute('stroke-width', '1.2');
        cOuter.setAttribute('stroke-dasharray', '4 3');
        svgOuter.appendChild(cOuter);

        /* ── Inner ring: smaller, violet tint, rotates CCW ── */
        const innerSize = outerSize * 0.7;
        const innerCx   = innerSize / 2;

        const svgInner = document.createElementNS(svgNS, 'svg');
        svgInner.setAttribute('viewBox', `0 0 ${innerSize} ${innerSize}`);
        svgInner.setAttribute('width',   innerSize);
        svgInner.setAttribute('height',  innerSize);
        svgInner.setAttribute('aria-hidden', 'true');
        svgInner.classList.add('blog__node-ring', 'blog__node-ring--ccw');
        svgInner.style.cssText =
            'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);';

        const cInner = document.createElementNS(svgNS, 'circle');
        cInner.setAttribute('cx', innerCx);
        cInner.setAttribute('cy', innerCx);
        cInner.setAttribute('r',  innerCx - 1);
        cInner.setAttribute('fill', 'none');
        cInner.setAttribute('stroke', 'rgba(121,9,226,0.35)');
        cInner.setAttribute('stroke-width', '1');
        cInner.setAttribute('stroke-dasharray', '2 4');
        svgInner.appendChild(cInner);

        nodeEl.appendChild(svgOuter);
        nodeEl.appendChild(svgInner);
    });
}

function getScrollProgress(track) {
    const rect    = track.getBoundingClientRect();
    const vpH     = window.innerHeight;
    const trackH  = track.offsetHeight;
    const start   = -(vpH * 0.6);
    const end     = trackH - vpH * 0.4;
    const scrolled = -rect.top;
    return Math.max(0, Math.min(1, (scrolled - start) / (end - start)));
}

export function initBlogTimeline() {
    const track = document.getElementById('blogTrack');
    if (!track) return;

    const fillEl = buildProgressBar(track);
    buildNodeRings(track);

    let rafId = null;

    function updateFill() {
        fillEl.style.height = `${getScrollProgress(track) * 100}%`;
        rafId = null;
    }

    function onScroll() {
        if (rafId) return;
        rafId = requestAnimationFrame(updateFill);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateFill();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogTimeline);
} else {
    initBlogTimeline();
}
