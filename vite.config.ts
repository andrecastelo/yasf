import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});
