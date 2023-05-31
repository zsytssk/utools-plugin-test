export const APP_NAME = 'fzRun';

function save(data: any) {
    return utools.dbStorage.setItem(APP_NAME, JSON.stringify(data));
}

function get() {
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
