import { defineConfig } from 'vite';
import commonjsExternals from 'vite-plugin-commonjs-externals';

import { PathConfig, resolve } from './common.config';

const externals = ['child_process', 'fs', 'os', 'path', /^electron(\/.+)?$/];

export default defineConfig({
  optimizeDeps: {
    exclude: externals as any[],
  },
  plugins: [
    commonjsExternals({
      externals,
    }),
  ],
  resolve: resolve,
  build: {
    minify: false,
    emptyOutDir: false,
    outDir: PathConfig.Dist,
    rollupOptions: {
      input: PathConfig.PreloadInput,
      output: {
        strict: false,
        entryFileNames: 'preload.js',
        dir: 'dist',
      },
    },
  },
  base: './',
});
