import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message } from 'antd';
import {Card} from 'antd';
import axios from 'axios';

const UserRegisterInitForm = () => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_BASE_URL
    const [messageApi, contextHolder] = message.useMessage();

    const handleRegisterButtonClick = () => {
      navigate('/register');
  };


  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios.post(apiUrl+"/register", {
        userId: values.username,
        password: values.password,
        passengerName: values.passengername
    }).then(res=>res.data)
        .then(res=>{
            if (res?.result){
                messageApi.info("注册成功，即将自动登陆")
                localStorage.setItem("userId", values.username)
                setTimeout(()=>{
                    navigate("/")
                },3000)
            }else{
                messageApi.error("注册失败！")
            }
        }).catch(e=>{
            console.log(e)
    })


  };
  return (
    <Card title="用户注册" style={{ width: 450, margin: 'auto', marginTop: '0%' }}>
        {contextHolder}


      <Form name="normal_login" className="login-form"
        initialValues={{remember: true,}} onFinish={onFinish}
      >


        <Form.Item name="username"
          rules={[ {required: true, message: '请输入身份证号!',},]}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>身份证号:&nbsp;&nbsp;</span>
            <Input placeholder="身份证号设置成功后不可修改" style={{width: 300}} />
          	</div>
        </Form.Item>

          <Form.Item name="passengername"
                     rules={[ {required: true, message: '请输入姓名!',},]}
          >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>乘客姓名:&nbsp;&nbsp;</span>
                  <Input placeholder="乘客姓名设置成功后不可修改" style={{width: 300}} />
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
		  <Button type="primary" htmlType="submit" className="login-form-button">
            注册
          </Button>
        </Form.Item>
      </Form>
    </Card>

);
};
export default UserRegisterInitForm;