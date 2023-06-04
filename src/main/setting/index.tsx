import { DeleteOutlined } from '@ant-design/icons';
import { ConfigData, storage } from '@common/storage';
import { useDebounceEffect } from 'ahooks';
import { Button, Form, Input, Space, Switch } from 'antd';
import { useCallback, useEffect, useImperativeHandle } from 'react';

import { useStateId } from '../hooks/useStateId';
import styles from './index.module.less';

export type SettingOpt = { save: () => void; update: () => void };
type Props = {
  settingRef: React.MutableRefObject<SettingOpt | undefined>;
};
export function Setting({ settingRef }: Props) {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [id, updateId] = useStateId();

  useImperativeHandle(
    settingRef,
    () => {
      return {
        save: () => {
          form.submit();
        },
        update: () => {
          updateId();
        },
      };
    },
    [form, updateId],
  );

  useDebounceEffect(
    () => {
      let abort = false;
      const fn = async () => {
        const values = (await form.validateFields()) as ConfigData;
        if (abort) {
          return;
        }
        storage.save('config', values);
      };
      fn();
      return () => {
        abort = true;
      };
    },
    [values],
    { wait: 300 },
  );

  useEffect(() => {
    const values = storage.get('config') as ConfigData;
    form.setFieldsValue(values);
  }, [form, id]);

  const onFinish = useCallback(() => {
    const values = form.getFieldsValue() as ConfigData;
    storage.save('config', values);
  }, [form]);

  return (
    <div className={styles.setting}>
      <Form form={form} onFinish={onFinish}>
        <div className="sub-title">
          运行脚本
          <div className="in-right">
            <Form.Item noStyle>
              <Space>
                自定义函数
                <Form.Item
                  noStyle
                  name="customRunFnEnabled"
                  valuePropName="checked"
                  rules={[{ required: true, message: '请设置运行脚本' }]}
                >
                  <Switch />
                </Form.Item>
              </Space>
            </Form.Item>
          </div>
        </div>
        <div className="sub-con">
          {values?.customRunFnEnabled ? (
            <Form.Item
              name="customRunFn"
              rules={[{ required: true, message: '请设置默认运行脚本' }]}
            >
              <Input.TextArea
                defaultValue="function genRunStr(item, utils) {
                  if (item.startsWith('http:') || item.startsWith('https:')) {
                    return `open ${item}`;
                  }
                  if (utils.isFile(item)) {
                    return `/usr/local/bin/code ${item}`;
                  }
                  return `open -a terminal ${item}`;
                };genRunStr"
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="runScript"
              rules={[{ required: true, message: '请设置默认运行脚本' }]}
            >
              <Input placeholder="默认运行脚本, ${dir} 是指选中的选项" />
            </Form.Item>
          )}
        </div>
        <Form.List name="folder">
          {(fields, { add, remove }) => {
            return (
              <>
                <div className="sub-title">
                  fzf设置
                  <div className="in-right">
                    <Button onClick={() => add({})} className="btn-add">
                      新增
                    </Button>
                  </div>
                </div>
                <div className="sub-con">
                  {fields.map((item) => {
                    return (
                      <div key={item.key} className="folder-item">
                        <Form.Item
                          name={[item.name, 'folder']}
                          label="文件夹"
                          className="folder-path"
                          rules={[
                            {
                              required: true,
                              message: '请设置文件夹',
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="深度"
                          name={[item.name, 'depth']}
                          rules={[
                            {
                              required: true,
                              message: '请设置深度',
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Button
                          className="btn-remove"
                          type="link"
                          onClick={() => remove(item.name)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          }}
        </Form.List>
        <div className="sub-title">ignore文件</div>
        <div className="sub-con">
          <Form.Item name="ignore">
            <Input.TextArea
              placeholder="用逗号或者换行符分·隔"
              className="ignore-input"
            />
          </Form.Item>
        </div>
        <div className="sub-title">其他文件</div>
        <div className="sub-con">
          <Form.Item name="otherFile">
            <Input.TextArea
              placeholder="用逗号分隔，放在搜索中的独立文件或文件夹"
              className="other-input"
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
