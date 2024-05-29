import * as React from "react";
import * as ReactDOM from "react-dom";
import {Avatar, Col, Layout, Row, Dropdown,Button} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Link, Outlet, useNavigate} from "react-router-dom";
import { PoweroffOutlined } from '@ant-design/icons';

import { UserOutlined } from '@ant-design/icons';

const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
];

const handleOpenNewTab = () => {
    const path = '/about';
    const url = new URL(window.location);
    url.pathname = path;
    window.open(url.toString(), '_blank');
};

export default function Root(){
    const navigate = useNavigate()
    return (<Layout style={{minHeight:"100vh"}}>
        <Header style={{backgroundColor:"#3b98fa", height:"auto"}}>
            <Row>
                <Col span={22}>

                        <Link to=".">
                            <img src={require("./logo1.png")} style={{marginTop: "15px",}} alt={"loading"}/>

                        </Link>


                </Col>
            <Col >
                <Link to="./user">
                <Avatar shape="square" size={50} icon={<UserOutlined />} style={{marginTop:"40px"}}/>
                </Link>
            </Col>
            <Col>
                <Button
                    style={{marginTop:60, marginLeft:20}}
                    type="primary"
                    icon={<PoweroffOutlined style={{color:"red"}}/>}
                    onClick={()=>{
                        localStorage.removeItem("userId")
                        navigate("login")
                    }}

                />
            </Col>
            </Row>

        </Header>
        <Content>
            <Outlet/>
        </Content>
        <Footer>
            <p style={{textAlign: "center"}}>中国铁路总公司</p>
            <p style={{textAlign: "center"}}>CopyRight 2024</p>
        </Footer>

    </Layout>)
}