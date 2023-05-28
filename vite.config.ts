import eslint from '@rollup/plugin-eslint';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import commonjsExternals from 'vite-plugin-commonjs-externals';

const externals = ['child_process', 'path', /^electron(\/.+)?$/];

export default defineConfig({
    optimizeDeps: {
        exclude: externals as any[],
    },
    plugins: [
        {
            ...eslint(),
            enforce: 'pre',
            apply: 'build',
        },
        react(),
        commonjsExternals({
            externals,
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                index: './index.html',
                preload: './preload/main.ts',
            },
            output: {
                strict: false,
                entryFileNames: '[name].js',
                dir: 'dist',
            },
        },
    },

    base: './',
});