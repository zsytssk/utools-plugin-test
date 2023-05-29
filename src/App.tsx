import { useDebounceFn } from 'ahooks';
import { Input, Select } from 'antd';
import { Fzf } from 'fzf';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

export default function App() {
    const fzfRef = useRef<Fzf<string[]>>();
    const [findList, setFindList] = useState<string[]>([]);

    useLayoutEffect(() => {
        const fn = async () => {
            const result: string = await (window as any).findDirectory();
            const list = result.split('\n');
            const fzf = new Fzf(list, { selector: (item) => item });
            fzfRef.current = fzf;
        };
        fn();
    }, []);

    const { run } = useDebounceFn(
        (findStr: string) => {
            if (!fzfRef.current) {
                return;
            }
            const entries = fzfRef.current?.find(findStr);
            const ranking = entries.map((entry) => entry.item);
            setFindList(ranking);
        },
        { wait: 300 },
    );

    useEffect(() => {
        run('');
    }, [run]);

    const options = useMemo(() => {
        return findList.map((item) => {
            return {
                label: item,
                value: item,
            };
        });
    }, [findList]);

    return (
        <div style={{ margin: 50 }}>
            <Select
                showSearch
                style={{ width: 700 }}
                options={options}
                onSearch={run}
                filterOption={false}
            />
        </div>
    );
}
