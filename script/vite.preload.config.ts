import { defineConfig } from 'vite';
import commonjsExternals from 'vite-plugin-commonjs-externals';

import { PathConfig, resolve } from './common.config';

const externals = ['child_process', 'path', /^electron(\/.+)?$/];

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
