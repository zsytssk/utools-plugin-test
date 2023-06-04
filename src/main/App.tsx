import { SettingOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  ConfigProvider,
  Space,
  Switch,
  Tooltip,
  theme,
} from 'antd';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { BtnList } from './components/btnList';
import { useTheme } from './hooks/useTheme';
import styles from './index.module.less';
import { Search } from './search';
import { Setting, SettingOpt } from './setting';

const { darkAlgorithm, defaultAlgorithm } = theme;
export default function App() {
  const [isSetting, setIsSetting] = useState(false);
  const [theme, setTheme] = useTheme();
  const settingRef = useRef<SettingOpt>();

  useEffect(() => {
    const classList = document.documentElement.classList;
    classList.remove('theme-dark', 'theme-light');
    if (theme) {
      classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
    }
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Card className={styles.app}>
        <Space className="config-box">
          {isSetting ? <BtnList settingRef={settingRef} /> : null}
          <Tooltip title="修改主题">
            <Space>
              <Switch
                checked={theme === 'light'}
                onChange={(e) => {
                  setTheme(!e ? 'dark' : 'light');
                }}
              />
              主题
            </Space>
          </Tooltip>

          <Tooltip title="修改配置">
            <Button
              className="btn-config"
              type={isSetting ? 'primary' : 'default'}
              onClick={() => setIsSetting(!isSetting)}
            >
              <SettingOutlined />
            </Button>
          </Tooltip>
        </Space>

        {isSetting ? <Setting settingRef={settingRef} /> : <Search />}
      </Card>
    </ConfigProvider>
  );
}
