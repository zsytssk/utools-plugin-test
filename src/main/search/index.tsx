import { Select } from 'antd';
import { useCallback, useMemo } from 'react';

import { useGetList } from '../hooks/useGetList';
import styles from './index.module.less';

export function Search() {
  const { run, data: findList, loading } = useGetList();

  const options = useMemo(() => {
    return findList?.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
  }, [findList]);

  const onChange = useCallback((dir: string) => {
    (window as any).runSelected(dir);
    utools.hideMainWindow();
  }, []);

  const onSearch = useCallback(
    (text = '') => {
      run(text);
    },
    [run],
  );

  return (
    <div className={styles.search}>
      <Select
        value=""
        size="large"
        loading={loading}
        autoFocus
        allowClear
        placeholder={'请输入文件夹名称搜索'}
        showSearch
        options={options}
        onSearch={onSearch}
        onChange={onChange}
        filterOption={false}
      />
    </div>
  );
}
