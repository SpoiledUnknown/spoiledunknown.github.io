import type { Project } from "../types";

export const projectsData: Project[] = [
  {
    id: "xtremefps",
    title: "XtremeFPS Controller",
    tagline: "Modular 3D movement framework engineered for high-tempo tactile combat.",
    description:
      "A modular, hyper-customisable first-person movement framework built for high-tempo tactile combat. Engineered with momentum conservation, dynamic crouching, fluid slope sliding, surface-aware procedural head-bob, and decoupled weapon sway logic.",
    version: "v2.0.0",
    featured: true,
    platform: "Unity 3D // Asset Store",
    image: "./XtremeFPS.webp",
    ambientColor: "#2d68ff",
    tags: ["Unity", "C#", "Weapon Sway", "Modular Character Controller", "Asset Store"],
    links: {
      store: "https://assetstore.unity.com/packages/slug/282203",
      github: "https://github.com/SpoiledUnknown/XtremeFPS",
    },
    metrics: {
      label: "Unity Asset Store",
      value: "DEPRECATED",
    },
  },
  {
    id: "newtya",
    title: "Newtya - The Newton Parody",
    tagline: "Sarcastic physics-based comedy game exploring crude humor and gravity mechanics.",
    description:
      "A fast-paced satirical game created for pure enjoyment in the genre of hypercasual crude humour. Available on Google Play Store and Itch.io.",
    version: "v2.0.0",
    featured: false,
    platform: "Unity // Android",
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
    version: "v1.0.1",
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
    version: "v1.0.0",
    featured: false,
    platform: "Unity // Android",
    image: "./cube.webp",
    ambientColor: "#df0042",
    tags: ["Unity C#", "Hypercasual", "Arcade", "Itch.io", "WebGL"],
    links: {
      itch: "https://spoiled-unknown.itch.io/cube-squeeze",
    },
  },
];
