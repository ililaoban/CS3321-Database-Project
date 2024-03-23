import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import {Card} from 'antd';


const UserRegisterInitForm = () => {
    const navigate = useNavigate();
    const handleRegisterButtonClick = () => {
      navigate('/register');
  };


  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Card title="用户注册" style={{ width: 450, margin: 'auto', marginTop: '0%' }}>



      <Form name="normal_login" className="login-form"
        initialValues={{remember: true,}} onFinish={onFinish}
      >


        <Form.Item name="username"
          rules={[ {required: true, message: '请输入用户名!',},]}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>&ensp;&ensp;用户名:&nbsp;&nbsp;</span>
            <Input placeholder="用户名设置成功后不可修改" style={{width: 300}} />
          	</div>
        </Form.Item>



        <Form.Item name="password"
          rules={[{ required: true, message: '请输入密码!', }, ]}
        >
        	<div style={{ display: 'flex', alignItems: 'center' }}>
            <span>登录密码:&nbsp;&nbsp;</span>
            <Input  type="password" placeholder="6-20位字母, 数字或符号" style={{width: 300}} />
          	</div>
        </Form.Item>


        <Form.Item name="password"
          rules={[{ required: true, message: '请确认密码!', }, ]}
        >
        	<div style={{ display: 'flex', alignItems: 'center' }}>
            <span>确认密码:&nbsp;&nbsp;</span>
            <Input  type="password" placeholder="再次输入您的登录密码" style={{width: 300}} />
          	</div>
        </Form.Item>



        <Form.Item>
		  <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleRegisterButtonClick}>
            注册账号
          </Button>
        </Form.Item>
      </Form>
    </Card>

);
};
export default UserRegisterInitForm;