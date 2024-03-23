import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import {Card} from 'antd';


const UserLoginForm = () => {
    const navigate = useNavigate();
    const handleLoginButtonClick = () => {
        navigate('/user');
    };
    const handleRegisterButtonClick = () => {
      navigate('/register/init');
  };


  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Card title="用户登录" style={{ width: 300, margin: 'auto', marginTop: '0%' }}>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >

        <Form.Item
          ></Form.Item>

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>



        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>


        
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleLoginButtonClick}>
            登录
          </Button>

          
          {'\u00A0\u00A0\u00A0\u00A0'}  
          {/* <a href="">注册账号</a> */}
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleRegisterButtonClick}>
            注册
          </Button>
        </Form.Item>
      </Form>
    </Card>

);
};
export default UserLoginForm;