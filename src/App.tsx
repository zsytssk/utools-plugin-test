import { Card, ConfigProvider, Select, theme } from 'antd';
import { useCallback, useMemo } from 'react';

import styles from './index.module.less';
import { useGetList } from './server';

export default function App() {
    const { darkAlgorithm } = theme;
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

    return (
        <ConfigProvider
            theme={{
                algorithm: darkAlgorithm,
            }}
        >
            <Card className={styles.app}>
                <div className="con">
                    <div className="select-box">
                        <Select
                            value=""
                            size="large"
                            loading={loading}
                            autoFocus
                            allowClear
                            placeholder={'请输入文件夹名称搜索'}
                            showSearch
                            options={options}
                            onSearch={run}
                            onChange={(e) => {
                                onChange(e);
                            }}
                            filterOption={false}
                        />
                    </div>
                    {/* <div>
                配置
                <Space>
                    find命令 <Input />
                </Space>
                <Space>
                    运行命令 <Input />
                </Space>
            </div> */}
                </div>
            </Card>
        </ConfigProvider>
    );
}
