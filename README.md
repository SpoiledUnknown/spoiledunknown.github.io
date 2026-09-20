# Personal Portfolio Website

Personal portfolio website of **Shashank Raj** ([@spoiledunknown](https://github.com/spoiledunknown)), built with **Vite**, **Vue 3**, and **TypeScript**, styled using the **Obsidian Glass** design system.

---

## Tech Stack

- **Vue 3** (Composition API, `<script setup>`)
- **TypeScript** (Strict mode with `vue-tsc`)
- **Tailwind CSS v4** & `@tailwindcss/vite`
- **Vite 8** (Ultra-fast static build tool)
- **Web3Forms** & **hCaptcha** (Functional email delivery with bot protection)
- **Prettier** & **ESLint** (Code quality and formatting)

---

## Key Features

- **Obsidian Glass Design System**: Deep obsidian surfaces, tactile frosted glass panels, hairline translucent borders, and dynamic ambient radial lighting.
- **System Theme Auto-Detection & Persistence**: Automatically matches the user's OS/Windows color scheme (dark/light) on first visit, responds to live OS changes, and persists manual overrides in `localStorage` without flash of unstyled content (FOUC).
- **Responsive Layout**: Engineered from mobile screens (<640px) to ultra-wide and 4K displays.
- **Dynamic Ambient Reactor**: Hovering project showcases smoothly transitions the global backdrop ambient glow color.
- **Netflix-Style Featured Hero Showcase**: Large cinematic featured banner for XtremeFPS Controller with procedural telemetry.
- **Touch-Friendly Snap Slider**: Native CSS snap-scrolling carousel with smooth JavaScript controls for curated deployments.
- **Live Typewriter Role Engine**: Continuously cycles between developer roles with adjustable typing cadence.
- **Zero Dynamic WebApp Backend Required**: Pure client-side static Single Page Application (SPA) deployable effortlessly to GitHub Pages.
- **Easily Editable Centralized Data**: All profile details, projects, skills, and blogs live in typed data files under `src/data/`.

---

## Project Structure

```text
.
├── index.html                    # Root HTML with anti-FOUC script & font preloads
├── vite.config.ts                # Vite configuration with Vue & Tailwind
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies and build scripts
├── public/                       # Static images, icons, and SVGs
│   ├── XtremeFPS.webp
│   ├── newtya.webp
│   ├── Richcord.webp
│   ├── cube.webp
│   ├── mypic.webp
│   ├── pfp.webp
│   ├── spoiledunknown.ico
│   └── links/                    # Social icon SVGs
├── src/
│   ├── main.ts                   # Vue 3 application entry point
│   ├── App.vue                   # Root component with ambient reactor & layout
│   ├── assets/
│   │   └── main.css              # Tailwind v4 import, theme tokens & light mode
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces (Project, Skill, Blog, etc.)
│   ├── data/                     # Centralized, easily editable content models
│   │   ├── profile.ts            # Personal bio, greetings, social links, Web3Forms
│   │   ├── projects.ts           # Project catalog with links, tags, ambient colors
│   │   ├── skills.ts             # Categorized skills with Material Symbols
│   │   └── blogs.ts              # Technical deep-dives & devlogs
│   ├── composables/
│   │   ├── useTheme.ts           # Dark/Light toggle, storage & OS detection
│   │   ├── useTypewriter.ts      # Configurable typing animation
│   │   └── useScrollSpy.ts       # Active section observer for floating dock
│   └── components/
│       ├── HeaderNav.vue         # Floating pill dock with theme switcher
│       ├── HeroSection.vue       # Cultural greeting & typewriter headline
│       ├── AboutSection.vue      # Left telemetry card & narrative biography
│       ├── SkillsSection.vue     # Filterable skills grid
│       ├── ProjectsSection.vue   # Netflix billboard + snap-scrolling carousel
│       ├── BlogsSection.vue      # Editorial articles with telemetry code card
│       ├── ContactSection.vue    # Web3Forms + hCaptcha contact form
│       └── FooterSection.vue     # Cultural badge, copyright & navigation
```

---

## Development & Build

### Requirements

- Node.js 22+
- npm

### Installation

```bash
git clone https://github.com/spoiledunknown/spoiledunknown.github.io.git
cd spoiledunknown.github.io
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

Generates optimized static assets inside `dist/`.

### Preview Build

```bash
npm run preview
```

### Linting & Formatting

```bash
npm run lint          # Run ESLint
npm run lint-fix      # Fix ESLint issues
npm run format        # Format with Prettier
npm run format-check  # Verify Prettier compliance
```

---

## Documentation

For full architectural deep-dives, component design breakdowns, theming engine specs, and configuration tutorials, see [**DOCUMENTATION.md**](./DOCUMENTATION.md).

---

## Deployment & CI/CD Pipeline

The website utilizes a 2-stage automated GitHub Actions workflow (`.github/workflows/static.yml`):

- **Build Stage**: Runs on `ubuntu-latest` using the latest Node.js release, executes strict ESLint and TypeScript checks, and bundles the production app via Vite.
- **Deploy Stage**: Deploys the static `./dist` artifact directly to **GitHub Pages**.

---

## License

Personal portfolio repository. Source code is open for personal reference.
