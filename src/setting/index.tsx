import { DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import styles from './index.module.less';

export function Setting() {
    const [form] = Form.useForm();

    return (
        <div className={styles.setting}>
            <Form form={form}>
                <Form.List name="folder">
                    {(fields, { add, remove }) => {
                        return (
                            <>
                                <div className="sub-title">
                                    fzf设置
                                    <div className="in-right">
                                        <Button
                                            type="link"
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
                                                    label="文件夹"
                                                    className="folder-path"
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item label="深度">
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
                <div className="sub-title">默认运行脚本</div>
                <div className="sub-con">
                    <Form.Item name="ignore">
                        <Input placeholder="用逗号分隔" />
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}
