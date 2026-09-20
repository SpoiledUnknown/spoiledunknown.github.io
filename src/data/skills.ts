import type { SkillItem } from "../types";

export const skillsCategories = [
  { id: "languages", label: "Languages" },
  { id: "frameworks", label: "Frameworks" },
  { id: "tools", label: "Tools & Graphics" },
  { id: "databases", label: "Databases" },
] as const;

export const skillsData: SkillItem[] = [
  // Languages
  { name: "JavaScript (ESNext)", iconName: "javascript", category: "languages", accent: "#f7df1e" },
  { name: "TypeScript", iconName: "data_object", category: "languages", accent: "#3178c6" },
  { name: "C# (Unity Engine)", iconName: "code_blocks", category: "languages", accent: "#68217A" },
  { name: "C / C++", iconName: "memory", category: "languages", accent: "#00599c" },
  { name: "HTML5 & CSS3", iconName: "html", category: "languages", accent: "#e34c26" },
  { name: "Python", iconName: "terminal", category: "languages", accent: "#3776ab" },
  { name: "GLSL / Shaders", iconName: "blur_on", category: "languages", accent: "#5586a4" },

  // Frameworks
  { name: "Vue.js (v3)", iconName: "layers", category: "frameworks", accent: "#42b883" },
  { name: "Node.js", iconName: "dns", category: "frameworks", accent: "#339933" },
  { name: "Express.js", iconName: "alt_route", category: "frameworks", accent: "#ffffff" },
  { name: "Tailwind CSS", iconName: "style", category: "frameworks", accent: "#06b6d4" },
  { name: "Three.js", iconName: "view_in_ar", category: "frameworks", accent: "#000000" },
  { name: "Vite", iconName: "bolt", category: "frameworks", accent: "#646cff" },

  // Tools & Graphics
  { name: "Unity 3D / 2D", iconName: "sports_esports", category: "tools", accent: "#222c37" },
  { name: "Git & GitHub", iconName: "source", category: "tools", accent: "#f05032" },
  { name: "Blender 3D", iconName: "token", category: "tools", accent: "#f5792a" },
  { name: "Photoshop", iconName: "brush", category: "tools", accent: "#31a8ff" },
  { name: "DaVinci Resolve", iconName: "movie_filter", category: "tools", accent: "#ff4081" },
  { name: "VS Code & JetBrains", iconName: "code", category: "tools", accent: "#007acc" },

  // Databases
  { name: "MongoDB (MEVN)", iconName: "database", category: "databases", accent: "#47a248" },
  { name: "REST & WebSockets", iconName: "sync_alt", category: "databases", accent: "#2d68ff" },
  { name: "Mongoose ODM", iconName: "schema", category: "databases", accent: "#880000" },
  {
    name: "Local & Session Storage",
    iconName: "storage",
    category: "databases",
    accent: "#ffd700",
  },
];
