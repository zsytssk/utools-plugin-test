import { DeleteOutlined } from '@ant-design/icons';
import { storage } from '@common/storage';
import { useDebounceEffect } from 'ahooks';
import { Button, Form, Input } from 'antd';
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
      const values = form.getFieldsValue();
      storage.save(values);
    },
    [values],
    { wait: 300 },
  );

  useEffect(() => {
    const values = storage.get();
    form.setFieldsValue(values);
  }, [form, id]);

  const onFinish = useCallback(() => {
    const values = form.getFieldsValue();
    storage.save(values);
  }, [form]);

  return (
    <div className={styles.setting}>
      <Form form={form} onFinish={onFinish}>
        <div className="sub-title">默认运行脚本</div>
        <div className="sub-con">
          <Form.Item
            name="runScript"
            rules={[{ required: true, message: '请设置默认运行脚本' }]}
          >
            <Input placeholder="默认运行脚本, ${dir} 是指选中的选项" />
          </Form.Item>
        </div>
        <Form.List
          name="folder"
          rules={[
            {
              validator: async (_, values) => {
                if (!values?.length) {
                  return Promise.reject(new Error('请设置搜索文件夹'));
                }
              },
            },
          ]}
        >
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
            <Input.TextArea placeholder="用逗号分隔" className="ignore-input" />
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
