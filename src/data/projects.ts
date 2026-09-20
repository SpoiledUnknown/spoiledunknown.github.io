import type { Project } from "../types";

export const projectsData: Project[] = [
  {
    id: "xtremefps",
    title: "XtremeFPS Controller",
    tagline: "Modular 3D movement framework engineered for high-tempo tactile combat.",
    description:
      "A modular, hyper-customisable first-person movement framework built for high-tempo tactile combat. Engineered with momentum conservation, dynamic crouching, fluid slope sliding, surface-aware procedural head-bob, and decoupled weapon sway logic.",
    version: "v2.8.4",
    featured: true,
    platform: "Unity 3D // Asset Store",
    image: "./XtremeFPS.webp",
    ambientColor: "#2d68ff",
    tags: [
      "Unity Engine",
      "C# Rigidbody",
      "Procedural Weapon Sway",
      "Modular Kinematics",
      "Asset Store",
    ],
    links: {
      store: "https://assetstore.unity.com/packages/slug/282203",
      github: "https://github.com/SpoiledUnknown/XtremeFPS",
    },
    metrics: {
      label: "Unity Asset Store",
      value: "★ 140+ Stars",
    },
  },
  {
    id: "newtya",
    title: "Newtya - The Newton Parody",
    tagline: "Sarcastic physics-based comedy game exploring crude humor and gravity mechanics.",
    description:
      "A fast-paced satirical game created for pure enjoyment in the genre of hypercasual crude humour. Available on Google Play Store and Itch.io.",
    version: "v1.4.0",
    featured: false,
    platform: "Android // WebGL",
    image: "./newtya.webp",
    ambientColor: "#ca4c00",
    tags: ["Unity 2D", "Android", "Google Play", "Itch.io", "Physics"],
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.nds.newtya&pcampaignid=web_share",
      itch: "https://spoiled-unknown.itch.io/newtya-the-newtons-parody",
    },
  },
  {
    id: "richcord",
    title: "Richcord Presence",
    tagline:
      "Customizable Discord Rich Presence manager with fine-grained state control without bloat.",
    description:
      "Richcord is a customizable Discord Rich Presence application that provides fine-grained control over your Discord activity without unnecessarily complicating the user experience.",
    version: "v1.1.2",
    featured: false,
    platform: "Node.js // CLI",
    image: "./Richcord.webp",
    ambientColor: "#60a5fa",
    tags: ["Node.js", "IPC Client", "CLI Tool", "NPM Package", "MIT"],
    links: {
      npm: "https://www.npmjs.com/package/richcord",
      github: "https://github.com/SpoiledUnknown/Richcord",
    },
  },
  {
    id: "cube-squeeze",
    title: "Cube Squeeze",
    tagline:
      "Fast-paced reflex game: destroy the correct color blocks to squeeze through obstacles.",
    description:
      "A fast-paced hypercasual game built around a simple idea: destroy the right cubes to make your way through each obstacle while the speed continuously scales.",
    version: "v1.2.0",
    featured: false,
    platform: "Unity C# // WebGL",
    image: "./cube.webp",
    ambientColor: "#df0042",
    tags: ["Unity C#", "Hypercasual", "Arcade", "Itch.io", "WebGL"],
    links: {
      itch: "https://spoiled-unknown.itch.io/cube-squeeze",
    },
  },
  {
    id: "miss-noty",
    title: "Miss Noty (Discord Bot)",
    tagline:
      "Multi-feature utility bot with moderation, economy, music, and an intuitive dashboard.",
    description:
      "A feature-rich Discord bot featuring giveaway orchestration, virtual economy, music streaming, and interactive web dashboard management.",
    version: "v2.0.1",
    featured: false,
    platform: "Node.js // Discord API",
    image: "./missnoty.webp",
    ambientColor: "#9333ea",
    tags: ["Discord.js", "Node.js", "REST API", "Dashboard", "Bot"],
    links: {
      demo: "https://spoiledunknown.github.io/Miss-Noty/",
      github: "https://github.com/SpoiledUnknown",
    },
  },
  {
    id: "web-experiments",
    title: "Personal Web Experiments",
    tagline:
      "Interactive Canvas, Three.js shaders, generative math animations, and creative web tools.",
    description:
      "A playground collection of visual computing experiments including WebGL GLSL fragment shaders, interactive particle sandboxes, and generative Canvas animations.",
    version: "Lab Sandbox",
    featured: false,
    platform: "Three.js // WebGL",
    image: "./mypic.webp",
    ambientColor: "#38bdf8",
    tags: ["Three.js", "GLSL", "Shaders", "Vue 3", "Canvas"],
    links: {
      github: "https://github.com/SpoiledUnknown",
    },
  },
];
