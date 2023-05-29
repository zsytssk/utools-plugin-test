import path from 'path';

import { excuse } from './utils/excuse';

(window as any).test = async (callback) => {
    console.log(`test:>test`);
    const dir = path.resolve(__dirname);
    const result = await excuse(
        `/opt/homebrew/bin/fzf`,
        {
            path: dir,
        },
        callback,
    );
    return result;
};
