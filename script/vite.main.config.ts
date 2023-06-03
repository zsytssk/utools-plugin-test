import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import cleanPlugin from 'vite-plugin-clean';

import { PathConfig, resolve } from './common.config';

export default defineConfig({
  plugins: [
    cleanPlugin({
      targetFiles: ['dist/assets'],
    }) as any,
    react(),
  ],
  build: {
    emptyOutDir: false,
    outDir: PathConfig.Dist,
  },
  resolve: resolve,
  base: './',
});
