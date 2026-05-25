import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        outDir: "dist",
        cssCodeSplit: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                projects: resolve(__dirname, "projects/index.html"),
                blogs: resolve(__dirname, "blogs/index.html"),
            },
        },
    },
});
