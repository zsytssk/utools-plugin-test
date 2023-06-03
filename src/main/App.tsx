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
import { useRef, useState } from 'react';

import { BtnList } from './components/btnList';
import styles from './index.module.less';
import { Search } from './search';
import { Setting, SettingOpt } from './setting';

const { darkAlgorithm, defaultAlgorithm } = theme;
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isSetting, setIsSetting] = useState(false);
  const settingRef = useRef<SettingOpt>();

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Card
        className={classNames({
          [styles.app]: true,
          'theme-dark': darkMode,
          'theme-light': !darkMode,
        })}
      >
        <Space className="config-box">
          {isSetting ? <BtnList settingRef={settingRef} /> : null}
          <Tooltip title="修改主题">
            <Space>
              <Switch
                onChange={(e) => {
                  setDarkMode(!e);
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
