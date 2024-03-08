import {Button, Card, Form, Input, Space, Table} from "antd";
import { useNavigate } from 'react-router-dom';

import React from 'react';
import { Cascader } from 'antd';
import TicketPriceBox from "./TIcketPriceBox";
import { Checkbox } from 'antd';
import TicketTrainInfo from "./TicketTrainInfo";
import TicketPassengerInfo from "./TicketPassengerInfo";




const TicketPurchase = (props) =>{
    return (
        <Form>
            <TicketTrainInfo ticketInfo={props.ticketInfo}/>
            <TicketPassengerInfo ticketInfo={props.ticketInfo} passengerInfo={props.passengerInfo}/>

        </Form>
    )
}

export default TicketPurchase;