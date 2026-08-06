import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        projects: resolve(import.meta.dirname, "projects/index.html"),
        blogs: resolve(import.meta.dirname, "blogs/index.html"),
      },
    },
  },
});
