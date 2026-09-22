import type { Metric, SocialLink } from "../types";

export const profileData = {
  name: "Shashank Raj",
  handle: "@spoiledunknown",
  title: "Full-Stack Developer",
  resumeUrl: "https://github.com/spoiledunknown",
  email: "spoiledunknowndev@gmail.com",
  location: "India",
  culturalGreeting: "नमस्ते 🙏",
  bioShort:
    "I build high-performance web applications, games, and developer tooling with a focus on craft, ergonomics, and clean systems architecture.",
  bioParagraphs: [
    "I'm Shashank Raj, also known online as Spoiled Unknown. I'm a self-taught software developer from India who started programming in 2019 out of curiosity and gradually turned it into something I genuinely enjoy.",
    "I build useful, interesting, and sometimes just fun things. I mainly work with the MEVN stack for web development and Unity for game development, while also exploring areas like graphics programming and other software projects.",
    "Outside of programming, I enjoy experimenting with video editing, graphic and photo editing, hardware tinkering, and random ideas that catch my interest. I like learning and exploring new things, even when they have nothing to do with software.",
  ],
  typewriterRoles: [
    "Web Architect",
    "Game Developer (Unity)",
    "MEVN Stack Specialist",
    "Graphics & Shaders",
    "Interactive Experiences",
  ],
  metrics: [
    {
      value: "5+ Years",
      tag: "Est. 2019",
      label: "Coding curiosity & software craft",
    },
    {
      value: "Unity & MEVN",
      tag: "Core Stack",
      label: "Native workflows & reactive engines",
    },
    {
      value: "Open Source",
      tag: "Public Repos",
      label: "24+ Public modules & asset packages",
    },
  ] as Metric[],
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/spoiledunknown",
      icon: "code",
      ariaLabel: "GitHub Profile",
      color: "#ffffff",
      external: true,
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/c/SpoiledUnknown",
      icon: "smart_display",
      ariaLabel: "YouTube Channel",
      color: "#ff0000",
      external: true,
    },
    {
      name: "Discord",
      url: "https://discord.gg/YykdmCjzmQ",
      icon: "forum",
      ariaLabel: "Discord Server",
      color: "#5865F2",
      external: true,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/spoiledunknown",
      icon: "photo_camera",
      ariaLabel: "Instagram Profile",
      color: "#E1306C",
      external: true,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/shashank-raj-4a028540b",
      icon: "work",
      ariaLabel: "LinkedIn Profile",
      color: "#0077b5",
      external: true,
    },
  ] as SocialLink[],
  web3Forms: {
    accessKey: "3cc48bb2-96da-40b8-963e-fed4179c5a89",
    fromName: "Spoiled Unknown Portfolio",
  },
};
