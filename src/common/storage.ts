export const APP_NAME = 'fzRun';

export type Theme = 'dark' | 'light';
export type ConfigData = {
  runScript?: string;
  customRunFnEnabled: boolean;
  customRunFn?: string;
  folder: Array<{
    folder: string;
    depth: number;
  }>;
  ignore: string;
  otherFile?: string;
};
function save(name: string, data: any) {
  return utools.dbStorage.setItem(APP_NAME + ':' + name, JSON.stringify(data));
}

function get(name: string): any | undefined {
  try {
    const content = utools.dbStorage.getItem(APP_NAME + ':' + name);
    return JSON.parse(content);
  } catch {
    return undefined;
  }
}

function remove(name: string) {
  return utools.dbStorage.removeItem(APP_NAME + ':' + name);
}

export const storage = {
  save,
  get,
  remove,
};
