import { storage } from '@common/storage';

import { excuse } from './utils/excuse';

(window as any).findDirectory = async () => {
    const config = storage.get();
    if (!config) {
        throw new Error('请先设置配置！');
    }
    const { folder, ignore, otherFile } = config;
    const otherFiles = otherFile.split(',');
    const ignoreArr = ignore.split(',');
    let ignoreStr = '';
    for (const item of ignoreArr) {
        ignoreStr += ` ! -path '*/${item}' ! -path '*/${item}/*'`;
    }
    const tasks = [] as Promise<string[]>[];
    for (const item of folder) {
        const task = new Promise<string[]>((resolve, reject) => {
            const cmd = `find ${item.folder} -maxdepth ${item.depth} -type d ${ignoreStr}`;

            excuse(cmd, {})
                .then((res) => {
                    resolve(res.split('\n'));
                })
                .catch((err) => {
                    reject(err);
                });
        });
        tasks.push(task);
    }
    return Promise.all(tasks).then((list) => {
        const arr = [...otherFiles, ...list].flat();
        return [...new Set(arr)];
    });
};

(window as any).runSelected = async (dir: string) => {
    const config = storage.get();
    if (!config) {
        throw new Error('请先配置！');
    }
    let { runScript } = config;
    runScript = runScript.replace('${dir}', dir);
    await excuse(runScript, {});
};
