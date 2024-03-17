import {Button, Card, Form, Input, Space, Table, message} from "antd";
import { useNavigate } from 'react-router-dom';

import {React, useState} from 'react';
import { Cascader } from 'antd';
import TicketPriceBox from "./TicketPriceBox";
import { Checkbox } from 'antd';
import TicketTrainInfo from "./TicketTrainInfo";
import TicketPassengerInfo from "./TicketPassengerInfo";
import TicketPurchaseBox from "./TicketPurchaseBox";





const TicketPurchase = (props) =>{
    const [messageApi, contextHolder] = message.useMessage();
    const [selectPassenger, setSelectPassenger] = useState(null);

    const onClickPurchase = ()=>{
        if (!selectPassenger||selectPassenger.length ===0 )
            messageApi.info("请完善乘客信息！");
        else{
            messageApi.info("提交成功！")
        }
    }


    return (
        <Form>
            {contextHolder}
            <TicketTrainInfo ticketInfo={props.ticketInfo}/>
            <TicketPassengerInfo passengerInfo={props.passengerInfo}
                                 priceInfo={props.ticketInfo.priceInfo}
                                 selectPassenger={selectPassenger}
            updateSelectedPassenger={setSelectPassenger}/>
            <TicketPurchaseBox onClickPurchase={onClickPurchase}/>
        </Form>
    )
}

export default TicketPurchase;