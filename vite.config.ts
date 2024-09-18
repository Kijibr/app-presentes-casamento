import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";
import manifestsSetup from './public/manifest.json'
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: '/',
  plugins: [
    react(),
    viteTsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      srcDir: 'src',
      filename: 'sw.ts',
      strategies: 'injectManifest',
      manifest: manifestsSetup as ManifestOptions,
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
      },
    })
  ],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    emptyOutDir: true
  },
  server: {
    open: true,
    port: 5173
  }
});