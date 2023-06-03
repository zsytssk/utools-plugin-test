import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { PathConfig, resolve } from './common.config';

export default defineConfig({
    plugins: [react()],
    build: {
        emptyOutDir: false,
        outDir: PathConfig.Dist,
    },
    resolve: resolve,
    base: './',
});
