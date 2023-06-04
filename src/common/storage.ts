export const APP_NAME = 'fzRun';

type Data = {
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
function save(data: Data) {
  return utools.dbStorage.setItem(APP_NAME, JSON.stringify(data));
}

function get(): Data | undefined {
  try {
    const content = utools.dbStorage.getItem(APP_NAME);
    return JSON.parse(content);
  } catch {
    return undefined;
  }
}

function remove() {
  return utools.dbStorage.removeItem(APP_NAME);
}

export const storage = {
  save,
  get,
  remove,
};
