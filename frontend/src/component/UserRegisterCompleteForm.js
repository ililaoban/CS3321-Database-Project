import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import {Card} from 'antd';


const UserRegisterCompleteForm = () => {
    const navigate = useNavigate();
    const handleRegisterButtonClick = () => {
      navigate('/register');
  };


  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Card title="用户信息完善" style={{ width: 450, margin: 'auto', marginTop: '0%' }}>


      <Form name="normal_login" className="login-form"
        initialValues={{remember: true,}} onFinish={onFinish}
      >

		{/* // TODO(Bob): It's proper to show the username here to remind the user his/her username
        <Form.Item name="username"
          rules={[ {required: true, message: '请输入用户名!',},]}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>用户名: &nbsp;&nbsp;</span>
            <Input placeholder="用户名设置成功后不可修改"  style={{width: 500}} />
          	</div>
        </Form.Item> */}



        <Form.Item name="username"
          rules={[{ required: true, message: '请输入用户名密码!', }, ]}
        >
        	<div style={{ display: 'flex', alignItems: 'center' }}>
            <span>&ensp;&ensp;&ensp;&ensp;姓名:&nbsp;&nbsp;</span>
            <Input  type="password" placeholder="请输入姓名" style={{width: 300}} />
          	</div>
        </Form.Item>


        <Form.Item name="username"
          rules={[{ required: true, message: '请输入密码!', }, ]}
        >
        	<div style={{ display: 'flex', alignItems: 'center' }}>
            <span>身份证号:&nbsp;&nbsp;</span>
            <Input  type="password" placeholder="请输入您的身份证号" style={{width: 300}} />
          	</div>
        </Form.Item>


        <Form.Item name="username"
          rules={[{ required: true, message: '请输入密码!', }, ]}
        >
        	<div style={{ display: 'flex', alignItems: 'center' }}>
            <span>手机号码:&nbsp;&nbsp;</span>
            <Input  type="password" placeholder="请输入您的手机号码" style={{width: 300}} />
          	</div>
        </Form.Item>


        




        <Form.Item>
		  <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleRegisterButtonClick}>
            确认
          </Button>
        </Form.Item>
      </Form>
    </Card>

);
};
export default UserRegisterCompleteForm;