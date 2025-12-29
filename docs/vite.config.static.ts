// Static Build Configuration for GitHub Pages
// Copy this file to your project root as: vite.config.static.ts
// Or merge these settings into your existing vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  
  // Base path for GitHub Pages
  // Change to "/" if using custom domain (fullstackmaster.net)
  // Use "/repo-name/" if deploying to username.github.io/repo-name
  base: "/",
  
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    
    // Optimize for production
    minify: "esbuild",
    sourcemap: false,
    
    rollupOptions: {
      output: {
        // Chunk splitting for better caching
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-accordion",
            "@radix-ui/react-tabs",
          ],
        },
      },
    },
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  
  // Define environment variables
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});
