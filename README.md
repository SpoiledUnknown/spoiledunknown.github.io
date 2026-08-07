# Personal Portfolio Website

My personal portfolio website built with vanilla HTML, CSS and JavaScript.

---

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES Modules)
- Vite
- ESLint
- Prettier

---

## Project Structure

```text
.
├── blogs
│   ├── index.html
│   ├── src
│   │   ├── animation.js
│   │   ├── blogTimeline.js
│   │   └── main.js
│   └── styles
│       ├── animation.css
│       ├── blogPage.css
│       └── blogTimeline.css
├── config.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── projects
│   ├── index.html
│   ├── src
│   │   ├── animation.js
│   │   ├── main.js
│   │   └── projects.js
│   └── styles
│       ├── animation.css
│       ├── projects.css
│       └── projectsPage.css
├── public
│   ├── links
│   │   ├── discord.svg
│   │   ├── email.svg
│   │   ├── github.svg
│   │   ├── instagram.svg
│   │   ├── linkedin.svg
│   │   └── youtube.svg
│   ├── missnoty.webp
│   ├── mypic.webp
│   ├── newtya.webp
│   ├── pfp.webp
│   ├── Richcord.webp
│   ├── spoiledunknown.ico
│   └── XtremeFPS.webp
├── README.md
├── src
│   ├── main.js
│   └── utils
│       ├── footer.js
│       ├── hCaptcha.js
│       ├── heroTitleTyper.js
│       ├── lazy-loading.js
│       ├── light-mode.js
│       ├── mobile-navigation.js
│       ├── preloader.js
│       ├── skillsNavigation.js
│       ├── slider.js
│       └── timelineAndWorkBlock.js
├── styles
│   ├── components
│   │   ├── about.css
│   │   ├── blogs.css
│   │   ├── contact.css
│   │   ├── footer.css
│   │   ├── header.css
│   │   ├── hero.css
│   │   ├── mobile-navigation.css
│   │   ├── preloader.css
│   │   ├── projects.css
│   │   ├── skills.css
│   │   └── themeTransition.css
│   ├── modern-normalise.css
│   ├── style.css
│   └── utils.css
└── vite.config.js
```

---

# Requirements

- Node.js 22+
- npm

---

# Installation

Clone the repository.

```bash
git clone https://github.com/spoiledunknown/spoiledunknown.github.io.git
cd <repository>
```

Install dependencies.

```bash
npm install
```

---

# Development

Start the Vite development server.

```bash
npm run dev
```

Open the URL printed in the terminal.

Usually:

```
http://localhost:5173
```

---

# Production Build

Generate an optimized production build.

```bash
npm run build
```

The generated files will be placed inside:

```
dist/
```

---

# Preview Production Build

Run the built website locally.

```bash
npm run preview
```

---

# Formatting

Format the entire project.

```bash
npm run format
```

Check formatting.

```bash
npm run format-check
```

---

# Linting

Run ESLint.

```bash
npm run lint
```

Automatically fix lint issues.

```bash
npm run lint-fix
```

---

# Deployment

The website is automatically deployed using **GitHub Pages**.

Deployment flow:

```
Push
      ↓
GitHub Actions
      ↓
Vite Build
      ↓
Deploy to GitHub Pages
```

No manual deployment is required.

---

# Development Notes

- Built entirely with vanilla HTML, CSS and JavaScript.
- Uses ES Modules for code organization.
- SVG icons are embedded directly into JavaScript.
- Skill cards are generated dynamically from a single data source.
- Navigation uses ARIA-compliant tabs.
- Code formatting is handled with Prettier.
- Static analysis is handled with ESLint.

---

# Available Scripts

| Command                | Description                   |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Start development server      |
| `npm run build`        | Build production files        |
| `npm run preview`      | Preview production build      |
| `npm run lint`         | Run ESLint                    |
| `npm run lint-fix`     | Automatically fix lint issues |
| `npm run format`       | Format project with Prettier  |
| `npm run format-check` | Verify formatting             |

---

# License

This repository contains the source code for my personal portfolio website.
