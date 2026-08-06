const SkillsNavigation = {
  languages: [
    {
      name: "HTML5",
      accent: "#e34c26",
      icon: `<svg viewBox="0 0 24 24"><path d="M4 3h16l-1.4 15.6L12 21l-6.6-2.4L4 3z" fill="currentColor" opacity="0.14"/><path d="M4 3h16l-1.4 15.6L12 21l-6.6-2.4L4 3z" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="12" y="15" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="7" fill="currentColor">5</text></svg>`,
    },
    {
      name: "CSS3",
      accent: "#2965f1",
      icon: `<svg viewBox="0 0 24 24"><path d="M4 3h16l-1.4 15.6L12 21l-6.6-2.4L4 3z" fill="currentColor" opacity="0.14"/><path d="M4 3h16l-1.4 15.6L12 21l-6.6-2.4L4 3z" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="12" y="15" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="7" fill="currentColor">3</text></svg>`,
    },
    {
      name: "JavaScript",
      accent: "#f7df1e",
      icon: `<svg viewBox="0 0 24 24" fill="none"><rect x="1" y="1" width="22" height="22" rx="4" fill="currentColor" opacity="0.12"/><text x="12" y="16" text-anchor="middle" font-family="'Space Grotesk',sans-serif" font-weight="700" font-size="9" fill="currentColor">JS</text></svg>`,
    },
    {
      name: "TypeScript",
      accent: "#3178c6",
      icon: `<svg viewBox="0 0 24 24" fill="none"><rect x="1" y="1" width="22" height="22" rx="4" fill="currentColor" opacity="0.12"/><text x="12" y="16" text-anchor="middle" font-family="'Space Grotesk',sans-serif" font-weight="700" font-size="9" fill="currentColor">TS</text></svg>`,
    },
    {
      name: "C++",
      accent: "#00599C",
      icon: `<svg viewBox="0 0 24 24" fill="none"><rect x="1" y="1" width="22" height="22" rx="4"fill="currentColor" opacity="0.12"/><text x="12" y="15.8" text-anchor="middle" font-family="'Space Grotesk',sans-serif" font-weight="700" font-size="6.2" fill="currentColor">C++</text></svg>`,
    },
    {
      name: "C",
      accent: "#00599c",
      icon: `<svg viewBox="0 0 24 24" fill="none">
    <rect
      x="1"
      y="1"
      width="22"
      height="22"
      rx="4"
      fill="currentColor"
      opacity="0.12"
    />
    <text
      x="12"
      y="16"
      text-anchor="middle"
      font-family="'Space Grotesk', sans-serif"
      font-weight="700"
      font-size="9"
      fill="currentColor"
    >
      C
    </text>
  </svg>`,
    },
    {
      name: "C#",
      accent: "#68217A",
      icon: `<svg viewBox="0 0 24 24" fill="none">
            <rect x="1" y="1" width="32" height="32" rx="4"
          fill="currentColor" opacity="0.12"/>
            <text x="12" y="15.5"
          text-anchor="middle"
          font-family="'Space Grotesk',sans-serif"
          font-weight="700"
          font-size="7"
          fill="currentColor">C#</text>
        </svg>`,
    },
    {
      name: "Python",
      accent: "#4b8bbe",
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-3 0-5 1-5 4v2h5v1H5c-2 0-3 1.5-3 4s1 4 3 4h2v-2.5c0-2 1.5-3.5 3.5-3.5H15c1.7 0 3-1.3 3-3V6c0-3-2-4-6-4z"/><path d="M12 22c3 0 5-1 5-4v-2h-5v-1h7c2 0 3-1.5 3-4s-1-4-3-4h-2v2.5c0 2-1.5 3.5-3.5 3.5H9c-1.7 0-3 1.3-3 3v2c0 3 2 4 6 4z" opacity="0.72"/><circle cx="9" cy="5.3" r="0.85" fill="#090b12"/><circle cx="15" cy="18.7" r="0.85" fill="#090b12"/></svg>`,
    },
  ],
  frameworks: [
    {
      name: "Node.js",
      accent: "#83cd29",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 2 20.5 7v10L12 22 3.5 17V7z"/><text x="12" y="15" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="700" font-size="6.5" fill="currentColor" stroke="none">JS</text></svg>`,
    },
    {
      name: ".NET",
      accent: "#512BD4",
      icon: `<svg viewBox="0 0 24 24" fill="none">
    <rect x="1" y="1" width="22" height="22" rx="4" fill="currentColor" opacity="0.12"/>
    <text
      x="12"
      y="15.2"
      text-anchor="middle"
      font-family="'Space Grotesk',sans-serif"
      font-weight="700"
      font-size="5.4"
      fill="currentColor">.NET</text>
  </svg>`,
    },
    {
      name: "Vue",
      accent: "#42B883",
      icon: `<svg viewBox="0 0 24 24" fill="none">
    <path
      d="M4 5h3.3L12 13.2 16.7 5H20L12 19 4 5Z"
      fill="currentColor"
      opacity="0.22"/>
    <path
      d="M7.3 5L12 13.2 16.7 5"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linejoin="round"/>
    <path
      d="M4 5L12 19L20 5"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linejoin="round"/>
  </svg>`,
    },
  ],
  tools: [
    {
      name: "Git",
      accent: "#f05033",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><line x1="5" y1="19" x2="19" y2="5"/><circle cx="6.5" cy="17.5" r="2.2" fill="currentColor" stroke="none"/><circle cx="17.5" cy="6.5" r="2.2" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/></svg>`,
    },
    {
      name: "Unity",
      accent: "#ffffff",
      icon: `<svg fill="white" width="800px" height="800px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M26.531 25.599l-5.728-9.599 5.728-9.599 2.803 9.599zM13.864 24.667l-7.197-7.068h11.469l5.728 9.599zM13.864 7.197l10-2.531-5.728 9.599h-11.605c0 0.136 7.333-7.068 7.333-7.068zM28.531 0l-13.061 3.333-2 3.333h-3.871l-9.599 9.333 9.599 9.333h3.871l1.864 3.333 13.068 3.333 3.463-12.667-1.864-3.333 2-3.333z"/>
</svg>`,
    },
  ],
  databases: [
    {
      name: "MySQL",
      accent: "#4479a1",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6"/><path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6"/></svg>`,
    },
    {
      name: "MongoDB",
      accent: "#47a248",
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c3 4 6 8 6 12.5A6 6 0 0 1 12 21a6 6 0 0 1-6-6.5C6 10 9 6 12 2z"/><rect x="11.6" y="2" width="0.8" height="19" fill="#090b12" opacity="0.5"/></svg>`,
    },
    {
      name: "Redis",
      accent: "#dc382d",
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 21 7l-9 4-9-4z"/><path d="M3 11.2l9 4 9-4v2.6l-9 4-9-4z"/><path d="M3 16.2l9 4 9-4v2.2l-9 4-9-4z" opacity="0.65"/></svg>`,
    },
  ],
};

function renderGrids() {
  Object.entries(SkillsNavigation).forEach(([category, items]) => {
    const grid = document.querySelector(`[data-grid="${category}"]`);
    if (!grid) return;

    grid.innerHTML = items
      .map(
        (skill, index) => `
        <div class="skill-card" style="--accent:${skill.accent}; --card-delay:${index * 45}ms" tabindex="0" aria-label="${skill.name}">
          <span class="skill-card__icon-wrap">${skill.icon}</span>
          <span class="skill-card__name">${skill.name}</span>
        </div>
      `
      )
      .join("");
  });
}

const tabs = Array.from(document.querySelectorAll(".tabbar__tab"));
const panels = Array.from(document.querySelectorAll(".panel"));
const indicator = document.querySelector(".tabbar__indicator");

function moveIndicatorTo(tab) {
  const list = tab.closest(".tabbar__list");
  const listRect = list.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  const offsetX = tabRect.left - listRect.left - 6; // account for list padding
  indicator.style.width = `${tabRect.width}px`;
  indicator.style.transform = `translateX(${offsetX}px)`;
}

function activateTab(targetTab, { focus = false } = {}) {
  const category = targetTab.dataset.category;

  tabs.forEach((tab) => {
    const isActive = tab === targetTab;
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel) => {
    const isTarget = panel.id === `panel-${category}`;
    if (isTarget) {
      panel.hidden = false;
      panel.classList.remove("panel--leaving");
      // restart the entrance animation
      panel.style.animation = "none";
      // eslint-disable-next-line no-unused-expressions
      panel.offsetHeight; // force reflow
      panel.style.animation = "";
    } else if (!panel.hidden) {
      panel.hidden = true;
    }
  });

  moveIndicatorTo(targetTab);
  if (focus) targetTab.focus();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab));

  tab.addEventListener("keydown", (event) => {
    const currentIndex = tabs.indexOf(tab);
    let nextIndex = null;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      activateTab(tabs[nextIndex], { focus: true });
    }
  });
});

window.addEventListener("resize", () => {
  const activeTab = tabs.find((tab) => tab.getAttribute("aria-selected") === "true");
  if (activeTab) moveIndicatorTo(activeTab);
});

export function initSkills() {
  renderGrids();

  const initialTab = document.getElementById("tab-languages");

  activateTab(initialTab);
}
