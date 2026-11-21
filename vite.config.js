import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// npm run build        -> dist/        (upload this folder to a host)
// npm run build:single -> dist-single/ (one index.html that also opens by double-click)
const single = process.env.SINGLE === "1";
export default defineConfig({
  base: "./",
  plugins: [react(), ...(single ? [viteSingleFile()] : [])],
  build: { outDir: single ? "dist-single" : "dist" },
});
