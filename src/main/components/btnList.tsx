import {
  ExportOutlined,
  ImportOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useCallback } from 'react';

import { SettingOpt } from '../setting';

type Props = {
  settingRef: React.MutableRefObject<SettingOpt | undefined>;
};
export function BtnList({ settingRef }: Props) {
  const importConfig = useCallback(async () => {
    await (window as any).importConfig();
    settingRef.current?.update();
  }, [settingRef]);

  return (
    <>
      <Tooltip title="导入配置">
        <Button className="btn-config" onClick={importConfig}>
          <ImportOutlined />
        </Button>
      </Tooltip>
      <Tooltip title="导出配置">
        <Button
          title="导出配置"
          className="btn-config"
          onClick={() => (window as any).exportConfig()}
        >
          <ExportOutlined />
        </Button>
      </Tooltip>
    </>
  );
}
