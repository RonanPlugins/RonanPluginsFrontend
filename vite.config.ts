import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "MineCentral PWA",
        short_name: "MC",
        description: "All your Minecraft needs in one place",
        theme_color: "#ffffff",
        icons: [
          {
            src: "assets/favicon_64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "assets/favicon_512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
      workbox: {
        disableDevLogs: true,
        runtimeCaching: [
          {
            urlPattern: /^http:\/\/localhost:3001\/api\/.*\/.*\/image$/,
            handler: "CacheFirst",
            options: {
              cacheName: "api-images",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60, // 60 Seconds (dev mode)
              },
            },
          },
          {
            urlPattern: /^https:\/\/api.minecentral.net\/api\/.*\/.*\/image$/,
            handler: "CacheFirst",
            options: {
              cacheName: "api-images",
              expiration: {
                maxEntries: 64,
                maxAgeSeconds: 12 * 60 * 60, // 12 Hours
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
