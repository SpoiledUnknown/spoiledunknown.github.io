export type ThemeMode = "dark" | "light";

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
  ariaLabel: string;
  external?: boolean;
}

export interface Metric {
  value: string;
  label: string;
  subtext?: string;
  tag?: string;
}

export interface SkillItem {
  name: string;
  iconName: string;
  accent?: string;
  category: "languages" | "frameworks" | "tools" | "databases";
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  version?: string;
  featured?: boolean;
  platform?: string;
  image: string;
  ambientColor: string;
  tags: string[];
  links: {
    store?: string;
    playStore?: string;
    itch?: string;
    npm?: string;
    github?: string;
    demo?: string;
  };
  metrics?: {
    label: string;
    value: string;
  };
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: "game-arch" | "full-stack" | "graphics" | "devlog";
  categoryLabel: string;
  image?: string;
  icon?: string;
  tags?: string[];
  codeTelemetry?: {
    file: string;
    revision: string;
  };
  link?: string;
}
