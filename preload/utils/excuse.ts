import * as child_process from 'child_process';
import * as pty from 'node-pty';

const { exec } = child_process;

type Opts = {
    path?: string;
    output?: boolean;
};
export function excuse(
    command: string,
    opts: Opts,
    callback: (data: any) => void,
) {
    const { path } = opts;
    const config: any = {
        maxBuffer: 1024 * 1024 * 100 /* encoding: 'utf-8' */,
    };
    if (path) {
        config.cwd = path;
    }

    return new Promise((resolve) => {
        const run_process = pty.spawn(command, [], {
            ...config,
            name: 'xterm-color',
            cols: 800,
            rows: 30,
        });
        run_process.onData((data) => {
            callback(data);
        });
        run_process.onExit(() => {
            resolve('');
        });
    });
}
