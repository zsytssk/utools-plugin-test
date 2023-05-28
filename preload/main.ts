import { excuse } from './utils/excuse';

(window as any).test = async () => {
    const result = await excuse(`ls`, {});
    return result;
};
