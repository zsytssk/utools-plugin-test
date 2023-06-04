import { storage } from '@common/storage';
import * as path from 'path';

import { excuse } from './utils/excuse';
import { lstatSync, readFile, resolveHome, write } from './utils/ls';

(window as any).findDirectory = async () => {
  const config = storage.get();
  if (!config?.folder?.length) {
    throw new Error('请先设置配置！');
  }
  const { folder, ignore = '', otherFile = '' } = config;
  const otherFiles = otherFile
    .split('\n')
    .map((item) => {
      return item.split(',');
    })
    .flat();
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

const utils = {
  isFile: (item: string) => lstatSync(item).isFile(),
  isFolder: (item: string) => lstatSync(item).isDirectory(),
};

(window as any).runSelected = async (dir: string) => {
  const config = storage.get();
  if (!config || (!config.customRunFn && !config.runScript)) {
    throw new Error('请先配置！');
  }
  dir = resolveHome(dir);
  const { runScript = '', customRunFnEnabled, customRunFn = '' } = config;
  if (!customRunFnEnabled && runScript) {
    const newRunScript = runScript.replace('${dir}', dir);
    await excuse(newRunScript, {});
  }
  try {
    const fn = eval(customRunFn);
    const str = fn(dir, utils);
    await excuse(str, {});
  } catch (err) {
    throw new Error('可能是自定义函数配置有问题！');
  }
};

(window as any).exportConfig = async () => {
  const file_path = utools.showSaveDialog({
    title: '保存配置文件',
    defaultPath: path.resolve(utools.getPath('downloads'), 'fzRunConfig.json'),
    buttonLabel: '保存',
    filters: [{ name: 'fzRunConfig', extensions: ['json'] }],
  });
  if (!file_path) {
    return;
  }
  const config = storage.get();
  if (!config) {
    throw new Error('请先设置配置！');
  }
  await write(file_path, JSON.stringify(config));
};

(window as any).importConfig = async () => {
  const file_paths = utools.showOpenDialog({
    title: '导入配置文件',
    defaultPath: utools.getPath('downloads'),
    buttonLabel: '导入',
    filters: [{ name: '', extensions: ['json'] }],
  });
  if (!file_paths?.length) {
    return;
  }
  const file_path = file_paths[0];

  try {
    const content = await readFile(file_path);
    await storage.save(JSON.parse(content));
  } catch {
    throw new Error('读取配置文件出错，可能是配置文件格式有问题');
  }
};
