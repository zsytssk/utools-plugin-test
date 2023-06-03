import * as path from 'path';

// const BASE_URL = path.resolve('../');
const BASE_URL = path.resolve(__dirname, '../');
const SOURCE_URL = path.resolve(__dirname, '../src');

export const PathConfig = {
    App: BASE_URL,
    Dist: path.resolve(BASE_URL, './dist'),
    MainInput: path.resolve(SOURCE_URL, './src'),
    PreloadInput: path.resolve(SOURCE_URL, './preload/main.ts'),
};

export const resolve = {
    alias: {
        '@common': path.resolve(SOURCE_URL, './common'),
    },
};
