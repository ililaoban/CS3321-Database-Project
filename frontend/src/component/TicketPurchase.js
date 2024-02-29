import {Button, Card, Form, Input, Space, Table} from "antd";
import { useNavigate } from 'react-router-dom';

import React from 'react';
import { Cascader } from 'antd';
const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
    },
];
const onChange = (value) => {
    console.log(value);
};
const MyCascader = () => <Cascader options={options} onChange={onChange} placeholder="Please select" />;


const columns = [{
    title:"序号",
    dataIndex:"index",
    key:"index",
},{
    title: "票种",
    dataIndex :"ticketType",
    key:"ticketType"
},{
    title: "席别",
    dataIndex:"seatLevel",
    key: "seatLevel"
},{
    title: "姓名",
    dataIndex:"passengerName",
    key:"passengerName"
},{
    title: "证件类型",
    dataIndex: "idType",
    key:"idType"
},{
    title: "证件号码",
    dataIndex: "idNo",
    key:"idNo"
}]


const data = [{index:1, ticketType: <MyCascader/>,
    passengerName:<Input/>,
    seatLevel: <MyCascader/>, idType:<MyCascader/>, idNo:<Input/>}]
const spanStyle = {fontSize:"20px", fontWeight:"bold"}



const TicketPurchase = () =>{
    let navigate = useNavigate();
    return (
        <Form>
            <Card
                title="列车信息（以下余票仅供参考）"
                //extra={<a href="#">More</a>}
                style={{
                    width: "80%",
                    marginLeft:"10%"
                }}
            >
                <span style={spanStyle}>2024-02-28(周三)</span>
                <span> </span>
                <span style={spanStyle}>K188</span>
                <span>次 </span>
                <span style={spanStyle}>上海</span>
                <span>站 </span>
                <span style={spanStyle}>(20:08开) ——锦州</span>
                <span>站（18:23到）</span>

                <hr/>

                <p>硬座(206元) 有票</p>


                <p style={{color:"darkblue"}}>*显示的价格均为实际活动折扣后票价，供您参考，查看公布票价。具体票价以您确认支付时实际购买的铺别票价为准。</p>
            </Card>
            <Card title="乘客信息（填写说明）" style={{
                width: "80%",
                marginLeft:"10%",
                marginTop:"0.5%"
            }}>
                <p>受让人</p>
                <p>乘车人</p>
                <Table columns={columns} dataSource={data} style={{
                    width: "98%",
                    marginLeft:"1%"
                }}/>
            </Card>
            <Space style={{minWidth:"6%",marginLeft:"43%",marginTop:"2%",height:"auto"}}>
                <Button onClick={()=>{navigate(-1)}}>
                    <h3 style={{margin:"0"}}>返回前一页</h3>
                </Button>
                <Button >
                    <h3 style={{margin:"0"}}>提交订单</h3>
                </Button>
            </Space>

        </Form>
    )
}

export default TicketPurchase;