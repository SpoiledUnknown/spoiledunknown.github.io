import type { BlogArticle } from "../types";

export const blogCategories = [
  { id: "all", label: "All Posts" },
  { id: "game-arch", label: "Game Architecture" },
  { id: "full-stack", label: "Full-Stack Web" },
  { id: "graphics", label: "Graphics & Shaders" },
  { id: "devlog", label: "Devlogs" },
] as const;

export const blogsData: BlogArticle[] = [
  {
    id: "xtremefps-kinematics",
    title: "Decoupled Physics & Weapon Sway Architecture in Unity 3D",
    slug: "decoupled-physics-weapon-sway",
    excerpt:
      "Designing a modular kinematic movement framework that preserves momentum through slope sliding, dynamic crouching, and surface-aware procedural head-bob.",
    date: "February 2026",
    readTime: "6 min read",
    category: "game-arch",
    categoryLabel: "Game Architecture",
    image: "./XtremeFPS.webp",
    ambientColor: "#2d68ff",
    tags: ["Unity 3D", "Kinematics", "C# Engine", "Physics"],
    codeTelemetry: {
      file: "XtremeFPS :: KinematicKernel.cs",
      revision: "rev #3c9f1a0",
    },
    link: "https://github.com/SpoiledUnknown/XtremeFPS",
  },
  {
    id: "vanilla-js-architecture",
    title: "Vanilla JS Architecture: Modular Systems Without Build Steps",
    slug: "vanilla-js-architecture-no-build",
    excerpt:
      "Organizing multi-file JavaScript projects using native ES modules, browser import maps, and decoupled event buses without bundler overhead.",
    date: "August 2025",
    readTime: "7 min read",
    category: "full-stack",
    categoryLabel: "Vanilla JS",
    icon: "javascript",
    ambientColor: "#eab308",
    tags: ["JavaScript", "ES Modules", "Architecture", "No-Build"],
    link: "https://github.com/SpoiledUnknown",
  },
];
