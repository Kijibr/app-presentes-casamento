import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: '',
  plugins: [
    react(),
    viteTsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: "Igor e Maria",
        name: "Nosso casamento!",
        icons: [
          {
            src: "./public/icon.png",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon"
          },
          {
            src: "./public/icon.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "./public/icon.png",
            type: "image/png",
            sizes: "512x512"
          }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
      }

    })
  ],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
  server: {
    open: true,
    port: 3000,
  },
})
