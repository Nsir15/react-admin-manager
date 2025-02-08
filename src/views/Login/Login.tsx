import { FC, memo, useEffect } from 'react';
import request from '@/utils/request';
import styles from './index.module.scss';
import { Input, Checkbox, Button, Form } from 'antd';

interface IProps {}

type FieldType = {
  username?: string;
  password?: string;
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const Component: FC<IProps> = props => {
  // const {} = props

  const login = () => {
    request
      .post('/login', {
        username: 'admin',
        password: '123456'
      })
      .then(res => {
        console.log('login res:', res);
      });
  };

  const onFinish = () => {};

  useEffect(() => {
    login();
  }, []);

  return (
    <div className={styles.login}>
      <div className={styles['login-wrapper']}>
        <h1 className={styles['login-title']}>系统登录</h1>
        <Form
          name='basic'
          {...layout}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item<FieldType> label='用户名' name='username'>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label='密码' name='password'>
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type='primary' htmlType='submit' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default memo(Component);
