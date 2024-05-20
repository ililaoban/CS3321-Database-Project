import {Button, Card, Form, Input, Space, Table, message} from "antd";
import { useNavigate } from 'react-router-dom';

import {React, useState} from 'react';
import { Cascader, Modal } from 'antd';
import TicketPriceBox from "./TicketPriceBox";
import { Checkbox } from 'antd';
import TicketTrainInfo from "./TicketTrainInfo";
import TicketPassengerInfo from "./TicketPassengerInfo";
import TicketPurchaseBox from "./TicketPurchaseBox";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BASE_URL



const TicketPurchase = (props) =>{
    const ticketInfo = props.ticketInfo;
    const passengerInfo = props.passengerInfo;
    let navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();
    const [selectPassenger, setSelectPassenger] = useState(null);
    const [selectSeatType, setSelectSeatType] = useState(ticketInfo.priceInfo[0].seatType);


    const showModal = (carriageNo, seatNo)=>{
        Modal.info({
            title: '车票信息提示',
            content: (
                <div>
                    <p>
                        开车时间
                        <span style={{fontSize: 20}}> {ticketInfo.startDate} {ticketInfo.startTime}</span>
                    </p>
                    <p>
                        <span style={{fontSize: 15, fontWeight: "bold"}}>{ticketInfo.startStation}</span>&ensp;
                        <span style={{
                            marginRight: 10,
                            display: "inline-flex",
                            marginLeft: 10,
                            fontWeight: "bold",
                            fontSize: 20
                        }}>
                    --{ticketInfo.trainNo}-->

                </span>
                        <span style={{fontSize: 15, fontWeight: "bold"}}>{ticketInfo.endStation}</span>&ensp;

                    </p>
                    <p>
                        <span style={{
                            fontSize: 20,
                            fontWeight: "bold"
                        }}>{carriageNo}车 {seatNo}号</span>
                        &ensp;&ensp;
                        <span>{ticketInfo.seatType}</span>
                        &ensp;&ensp;
                        <span>{ticketInfo.ticketType}</span>
                    </p>
                    <p>
                        <span style={{
                            fontSize: 15,
                            fontWeight: "bold"
                        }}>{selectPassenger[0].passengerName}&ensp;&ensp;{selectPassenger[0].sfzNo}</span>
                    </p>


                </div>
            ),
            onOk() {
                navigate(-1);
            },
        });
    }

    const onClickPurchase = () => {
        if (!selectPassenger || selectPassenger.length === 0)
            messageApi.error("请完善乘客信息！");
        else {
            console.log("seatType is", selectSeatType);
            axios.post(apiUrl+"/buy1",{
                trainNoOnly: ticketInfo.trainNoOnly,
                startStation: ticketInfo.startStation,
                endStation: ticketInfo.endStation,
                seatType: selectSeatType,
                sfzNo: selectPassenger[0].sfzNo,
            }).then(res=>res.data)
                .then((info)=>{
                    if (info.result) {
                        messageApi.success("购票成功！")
                        showModal(info.carraigeNo, info.seatNo);
                    }else{
                        messageApi.error("购票失败：没有足够的票！")
                    }
                }).catch((e)=>{
                    console.log(e);
            })


        }
    }


    return (
        <Form>
            {contextHolder}
            <TicketTrainInfo ticketInfo={ticketInfo}/>
            <TicketPassengerInfo passengerInfo={passengerInfo}
                                 priceInfo={props.ticketInfo.priceInfo}
                                 selectPassenger={selectPassenger}
                                 updateSelectedPassenger={setSelectPassenger}
                                updateSelectedSeatType = {setSelectSeatType}/>
            <TicketPurchaseBox onClickPurchase={onClickPurchase}/>

        </Form>
    )
}

export default TicketPurchase;