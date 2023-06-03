import { DeleteOutlined } from '@ant-design/icons';
import { storage } from '@common/storage';
import { Button, Form, Input } from 'antd';
import { useCallback, useEffect, useImperativeHandle } from 'react';

import styles from './index.module.less';

export type SettingOpt = { save: () => void };
type Props = {
    settingRef: React.MutableRefObject<SettingOpt | undefined>;
};
export function Setting({ settingRef }: Props) {
    const [form] = Form.useForm();

    useImperativeHandle(
        settingRef,
        () => {
            return {
                save: () => {
                    form.submit();
                },
            };
        },
        [form],
    );

    useEffect(() => {
        const values = storage.get();
        form.setFieldsValue(values);
    }, [form]);

    const onFinish = useCallback(() => {
        const values = form.getFieldsValue();
        storage.save(values);
    }, [form]);

    return (
        <div className={styles.setting}>
            <Form form={form} onFinish={onFinish}>
                <div className="sub-title">默认运行脚本</div>
                <div className="sub-con">
                    <Form.Item name="runScript">
                        <Input placeholder="默认运行脚本, $dir 是指选中的选项" />
                    </Form.Item>
                </div>
                <Form.List name="folder">
                    {(fields, { add, remove }) => {
                        return (
                            <>
                                <div className="sub-title">
                                    fzf设置
                                    <div className="in-right">
                                        <Button
                                            onClick={() => add({})}
                                            className="btn-add"
                                        >
                                            新增
                                        </Button>
                                    </div>
                                </div>
                                <div className="sub-con">
                                    {fields.map((item) => {
                                        return (
                                            <div
                                                key={item.key}
                                                className="folder-item"
                                            >
                                                <Form.Item
                                                    name={[item.name, 'folder']}
                                                    label="文件夹"
                                                    className="folder-path"
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label="深度"
                                                    name={[item.name, 'depth']}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Button
                                                    className="btn-remove"
                                                    type="link"
                                                    onClick={() =>
                                                        remove(item.name)
                                                    }
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
                            placeholder="用逗号分隔"
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
