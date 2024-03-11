import * as React from "react";
import * as ReactDOM from "react-dom";
import {Avatar, Col, Layout, Row} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Link, Outlet} from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';

export default function Root(){
    return (<Layout style={{minHeight:"100vh"}}>
        <Header style={{backgroundColor:"#3b98fa", height:"auto"}}>
            <Row>
                <Col span={22}>
                    <Link to=".">
                        <img src={require("./logo1.png")} style={{marginTop: "15px",}} alt={"loading"}/>

                    </Link>
                </Col>
            <Col>
                <Link to="./user">
                <Avatar shape="square" size={50} icon={<UserOutlined />} style={{marginTop:"40px"}}/>
                </Link>
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