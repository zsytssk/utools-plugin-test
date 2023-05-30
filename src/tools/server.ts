import { useRequest } from 'ahooks';
import { Fzf } from 'fzf';
import { useLayoutEffect, useRef, useState } from 'react';

export function useGetList() {
    const fzfRef = useRef<Fzf<string[]>>();
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        const fn = async () => {
            const result: string = await (window as any).findDirectory();
            const list = result.split('\n');
            const fzf = new Fzf(list, { selector: (item) => item });
            fzfRef.current = fzf;
            setLoading(false);
        };
        fn();
    }, []);

    const res = useRequest(
        (filterStr: string) => {
            return new Promise<string[]>((resolve, reject) => {
                if (!fzfRef.current) {
                    return resolve([]);
                }
                const entries = fzfRef.current?.find(filterStr);
                const ranking = entries.map((entry) => entry.item);
                return resolve(ranking);
            });
        },
        { debounceWait: 300 },
    );

    return { ...res, loading };
}
