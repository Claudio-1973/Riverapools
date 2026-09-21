import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { mockupPreviewPlugin } from "./mockupPreviewPlugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// PORT is only required for dev/preview server, not for build
const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 4173;

// BASE_PATH defaults to "/" for production builds (e.g. Vercel)
const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: basePath,
  plugins: [
    mockupPreviewPlugin(),
    react(),
    tailwindcss(),
    // Convert render-blocking CSS to async preload in production builds
    {
      name: "async-css-preload",
      apply: "build",
      enforce: "post",
      async closeBundle() {
        const { readFileSync, writeFileSync, existsSync } = await import("node:fs");
        const outDir = path.resolve(import.meta.dirname, "dist");
        const htmlFiles = [
          path.join(outDir, "index.html"),
          path.join(outDir, "temecula", "index.html"),
          path.join(outDir, "murrieta", "index.html"),
          path.join(outDir, "corona", "index.html"),
        ];
        const criticalCss =
          "*,::before,::after{box-sizing:border-box}" +
          "body{margin:0;font-family:Inter,sans-serif;background:#0F253F;color:#fff}" +
          "#root{min-height:100vh}";

        for (const file of htmlFiles) {
          if (!existsSync(file)) continue;
          let html = readFileSync(file, "utf8");
          let injected = false;
          html = html.replace(
            /<link rel="stylesheet"(?:\s+crossorigin)?\s+href="(\/assets\/[^"]+\.css)">/g,
            (_m: string, href: string) => {
              const prefix = injected ? "" : `<style>${criticalCss}</style>`;
              injected = true;
              return (
                prefix +
                `<link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'" href="${href}">` +
                `<noscript><link rel="stylesheet" href="${href}"></noscript>`
              );
            }
          );
          writeFileSync(file, html);
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    cssCodeSplit: false,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
