import path from 'path';

import { excuse } from './utils/excuse';

(window as any).findDirectory = async () => {
    const dir = path.resolve(__dirname);
    const result = await excuse(
        `find ~/Documents/zsy ~/Documents/zsy/job/whjs ~/Documents/zsy/job/whjs_copy ~/Documents/zsy/job/whjs_copy2  -maxdepth 3 -type d ! -path '*/node_modules' ! -path "*/node_modules/*" ! -path "*/.git" ! -path "*/.git/*"`,
        {
            path: dir,
        },
    );
    return result || [];
};

(window as any).runSelected = async (dir: string) => {
    return await excuse(`/opt/homebrew/bin/nvim ${dir}`, { output: true });
};
