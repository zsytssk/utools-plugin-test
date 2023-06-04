import { useRequest } from 'ahooks';
import { message } from 'antd';
import { Fzf } from 'fzf';
import { ReactNode, useLayoutEffect, useRef, useState } from 'react';

import { TypeIcon } from '../components/typeIcon';

export type Item = {
  label: ReactNode;
  value: string;
};
export function useGetList() {
  const fzfRef = useRef<Fzf<string[]>>();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const fn = async () => {
      try {
        const list: string[] = await (window as any).findDirectory();
        const fzf = new Fzf(list, { limit: 20, selector: (item) => item });
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
      return new Promise<Item[]>((resolve) => {
        if (!fzfRef.current) {
          return resolve([]);
        }
        const entries = fzfRef.current?.find(filterStr);
        const ranking = entries.map((entry) => {
          const { positions, item, start, end } = entry;
          const type = (window as any).getType(item);
          const start_str = item.slice(0, start);
          const middle_str = item.slice(start, end);
          const end_str = item.slice(end, item.length);
          const arr = middle_str.split('');
          const match_str = arr.map((item, index) => {
            if (positions.has(index + start)) {
              return <span key={index + start}>{item}</span>;
            }
            return item;
          });

          return {
            label: (
              <>
                <TypeIcon type={type} />
                {start_str}
                {match_str}
                {end_str}
              </>
            ),
            value: item,
          };
        });
        return resolve(ranking);
      });
    },
    { debounceWait: 300, manual: true },
  );

  return { ...res, loading };
}
