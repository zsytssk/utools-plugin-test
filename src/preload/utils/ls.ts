import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

export function readdir(dir: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, file_list) => {
      if (err) {
        return reject(err);
      }
      resolve(file_list);
    });
  });
}
export async function readFile(file_path: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(file_path, 'utf8', (err, file_str: string) => {
      if (err) {
        return reject(err);
      }
      resolve(file_str);
    });
  });
}

export function exists(file_path: string) {
  return new Promise((resolve, reject) => {
    fs.exists(file_path, (exist) => {
      resolve(exist);
    });
  });
}
export function lstatFile(path: string): Promise<fs.Stats> {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

export function rmdir(path: string) {
  return new Promise((resolve, reject) => {
    fs.rmdir(path, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(undefined);
    });
  });
}
export function unlink(file_path: string) {
  return new Promise((resolve, reject) => {
    // fs.unlink(file_path, err => {
    //     if (err) {
    //         reject(err);
    //     } else {
    //         resolve(undefined);
    //     }
    // });
    try {
      fs.unlinkSync(file_path);
      resolve(undefined);
    } catch (err) {
      reject(err);
    }
  });
}

export function mkdir(path: string) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, (e) => {
      if (!e || (e && e.code === 'EEXIST')) {
        resolve(undefined);
      } else {
        resolve(undefined);
      }
    });
  });
}

export function sleep(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(undefined);
    }, time);
  });
}
export function isEmpty(dirname: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, files) => {
      if (err) {
        reject(err);
      } else {
        if (!files.length) {
          return resolve(true);
        }
        resolve(false);
      }
    });
  });
}

export async function waitFolderEmpty(dir: string): Promise<any> {
  const is_empty = await isEmpty(dir);
  if (is_empty) {
    return true;
  }
  await sleep(0.5);
  return await waitFolderEmpty(dir);
}

export async function write(file_path: string, file_content: string) {
  await new Promise((resolve, reject) => {
    fs.writeFile(file_path, file_content, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(undefined);
    });
  });
}

export function lstatSync(file_path: string) {
  return fs.lstatSync(file_path);
}

export function resolveHome(file_path: string) {
  const homedir = os.homedir();
  if (!homedir) {
    return file_path;
  }

  if (file_path[0] === '~') {
    return path.join(homedir, file_path.slice(1));
  }
  return file_path;
}
