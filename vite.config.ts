import eslint from '@rollup/plugin-eslint';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import commonjsExternals from 'vite-plugin-commonjs-externals';

const externals = ['child_process', 'path', /^electron(\/.+)?$/];

export default defineConfig({
    optimizeDeps: {
        exclude: externals as any[],
    },
    plugins: [
        react(),
        commonjsExternals({
            externals,
        }),
    ],
    build: {
        outDir: './dist',
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
