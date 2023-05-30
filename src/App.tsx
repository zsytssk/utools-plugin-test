import { SettingOutlined } from '@ant-design/icons';
import { Button, Card, ConfigProvider, Space, Switch, theme } from 'antd';
import { useState } from 'react';

import styles from './index.module.less';
import { Search } from './search';
import { Setting } from './setting';

export default function App() {
    const { darkAlgorithm, defaultAlgorithm } = theme;
    const [darkMode, setDarkMode] = useState(false);
    const [isSetting, setIsSetting] = useState(true);

    return (
        <ConfigProvider
            theme={{
                algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
            }}
        >
            <Card className={styles.app}>
                <Space className="config-box">
                    <Space>
                        <Switch
                            onChange={(e) => {
                                setDarkMode(!e);
                            }}
                        />
                        主题
                    </Space>

                    <Button
                        className="btn-config"
                        type={isSetting ? 'primary' : 'default'}
                        onClick={() => setIsSetting(!isSetting)}
                    >
                        <SettingOutlined />
                    </Button>
                </Space>

                {isSetting ? <Setting /> : <Search />}
            </Card>
        </ConfigProvider>
    );
}
