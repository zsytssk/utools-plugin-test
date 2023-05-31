import { defineConfig } from 'vite';
import commonjsExternals from 'vite-plugin-commonjs-externals';

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
    build: {
        emptyOutDir: false,
        outDir: './dist',
        rollupOptions: {
            input: './preload/main.ts',
            output: {
                strict: false,
                entryFileNames: 'preload.js',
                dir: 'dist',
            },
        },
    },
    base: './',
});
