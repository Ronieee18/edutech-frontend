import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy'; // Import rollup-plugin-copy

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [{ src: 'sitemap.xml', dest: 'dist' }], // Copy sitemap.xml to the output directory
    }),
  ],
});
