import { Button, Form, Input, Modal, Space } from 'antd';

import styles from './index.module.less';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
};

export function Setting() {
    return (
        <div className={styles.setting}>
            <Form {...layout}>
                <div className="sub-title">fzf设置</div>
                <div className="sub-con">
                    <Form.List name="folder">
                        {(fields, { add, remove }) => {
                            return (
                                <>
                                    {fields.map((item) => {
                                        return (
                                            <Space key={item.key}>
                                                <Form.Item label="文件夹">
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item label="深度">
                                                    <Input />
                                                </Form.Item>
                                            </Space>
                                        );
                                    })}
                                    <Button onClick={() => add({})}>
                                        新增
                                    </Button>
                                </>
                            );
                        }}
                    </Form.List>
                </div>
                <div className="sub-title">ignore文件</div>
                <div className="sub-con">
                    <Form.Item label="">
                        <Input.TextArea placeholder="用逗号分隔" />
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}
