import { useRequest } from 'ahooks';
import { message } from 'antd';
import { Fzf } from 'fzf';
import { useLayoutEffect, useRef, useState } from 'react';

export function useGetList() {
  const fzfRef = useRef<Fzf<string[]>>();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const fn = async () => {
      try {
        const list: string[] = await (window as any).findDirectory();
        const fzf = new Fzf(list, { selector: (item) => item });
        fzfRef.current = fzf;
        setLoading(false);
      } catch (err: any) {
        message.error((err as Error).message);
      }
    };
    fn();
  }, []);

  const res = useRequest(
    (filterStr: string) => {
      return new Promise<string[]>((resolve) => {
        if (!fzfRef.current) {
          return resolve([]);
        }
        const entries = fzfRef.current?.find(filterStr);
        const ranking = entries.map((entry) => entry.item);
        return resolve(ranking);
      });
    },
    { debounceWait: 300, manual: true },
  );

  return { ...res, loading };
}
