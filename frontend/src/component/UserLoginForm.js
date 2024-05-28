import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input ,message} from 'antd';
import {Card} from 'antd';
import axios from 'axios';

const UserLoginForm = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const apiUrl = process.env.REACT_APP_BASE_URL
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const response = await axios.post(apiUrl+"/login", {
                userId: values.username,
                password: values.password,
            });
            console.log('Login success:', response.data);
            if (response.data?.result){
                messageApi.success("登陆成功！")
                localStorage.setItem("userId", values.username)
                setTimeout(()=>{
                    navigate('/');
                }, 2000)
            }else{
                messageApi.error("登陆失败！")
                localStorage.removeItem("userId")
            }
            // handle successful login, maybe navigate to another page
            //navigate('/user');
        } catch (error) {
            console.error('Login error:', error);
            // handle login error, show message to user, etc.
        }
    };
    const handleRegisterButtonClick = () => {
      navigate('/register/init');
  };


  return (
    <Card title="用户登录" style={{ width: 300, margin: 'auto', marginTop: '0%' }}>
        {contextHolder}
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
              message: '请输入身份证号!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="身份证号" />
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

          <a className="login-form-forgot" href="#">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
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