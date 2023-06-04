import { Select } from 'antd';
import { useCallback } from 'react';

import { useGetList } from '../hooks/useGetList';
import styles from './index.module.less';

export function Search() {
  const { run, data: findList, loading } = useGetList();

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
        open
        popupClassName={styles.selectPopUp}
        placeholder={'请输入文件夹名称搜索'}
        showSearch
        options={findList}
        onSearch={onSearch}
        onChange={onChange}
        filterOption={false}
      />
    </div>
  );
}
