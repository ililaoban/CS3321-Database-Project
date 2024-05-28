import React, {useState} from 'react';
import {Button, Popover, Space, Table, Tag, message, ConfigProvider } from 'antd';
import {Link, useNavigate } from "react-router-dom";
//import { useHistory } from 'react-router-dom';

import TrainInfoList from "./TrainInfoList";
import {getTrainSchedule} from "../train";
import TicketCard from"./TicketCard";
import axios from 'axios';

const apiUrl = process.env.REACT_APP_BASE_URL


const TrainInfoPopover = (props)=>{
    const info = props.info

    const [schedule, setSchedule] = useState(null);


    function fetchTrainSchedule(){
        const params = {trainNoOnly:info.trainNoOnly};

        axios.post(apiUrl+"/trainNo/initialLaunchTime_2",params)
            .then(res=> res.data)
            .then(trainInfo=>{
                //console.log(trainInfo.stations);
                setSchedule(trainInfo.stations);
            }).catch(error=>{
            console.error(error);
        })


    }

    //const schedule = getTrainSchedule(22)

    return (<Popover content={<TrainInfoList schedule={schedule}/>} title={info.trainNo} trigger="click">
        <button style={{background:"transparent", border:"none",color:"#56a7f3", fontWeight:"bold"}} onClick={fetchTrainSchedule}> {info.trainNo}</button>
    </Popover>)
}


const buildTrainInfo = (info)=>
    (<div>
        <h3>{info.startStation}->{info.endStation}
            <Space wrap>
                <TrainInfoPopover info={info}/>


            </Space>
{/*            <Link to={`/train/${info.trainNo}`}> {info.trainNo}
            </Link>*/}
            </h3>
        <p>{info.startDay}  {info.startTime} 开</p>
    </div>)


const buildPassengerInfo = (info) => (
    <div>
        <p>
            {info.passengerName}
            &ensp;
            <Popover content={<TicketCard ticketInfo={info}/>}>
                <span style={{color:"#56a7f3",textDecoration: "underline"}}>行程信息提示</span>
            </Popover>
        </p>
        <p>中国居民身份证</p>
    </div>
)

const buildSeatInfo = (info)=>
    (<div>
        <p>{info.seatType}</p>
        <p>{info.carriageNo}车 {info.seatNo}号</p>
    </div>)


const buildTicketPrice = (info) =>
    (
        <div>
            <p>{info.ticketType}</p>
            <p>{info.ticketPrice} 元</p>
        </div>
    )




const columns = [
    {
        title: '车次信息',
        dataIndex: 'trainInfo',
        key: 'trainInfo',
        align:'center',
    },
    {
        title: '旅客信息',
        dataIndex: 'passengerInfo',
        align: 'center',
        key: 'passengerInfo',
    },
    {
        title: '席位信息',
        dataIndex: 'seatInfo',
        align: 'center',
        key: 'seatInfo',
    },
    {
        title: '票价',
        key: 'ticketPrice',
        dataIndex: 'ticketPrice',
        align: 'center',

    },
    {
        title: '车票状态',
        key: 'ticketState',
        dataIndex:'ticketState',
        align: "center",

    },
];


const UserTickerList = (props) =>{
    console.log("userTiceketList ok")
    let data = null
    const testInfos = props.trainInfo
    const [messageApi, contextHolder] = message.useMessage();
    const history = useNavigate();


    const buildticketStatus =(ticketStatus, ticketNo)=>{
        return (<div>
                <p style={{fontWeight:600, marginBottom:10}}>{ticketStatus}</p>
                <Button onClick={()=>{
                    let url = apiUrl + "/refund"
                    let userId = localStorage.getItem("userId")
                    axios.post(url, {
                        userId:userId,
                        ticketNo: ticketNo,
                    }).then(res=>res.data)
                        .then(res =>{
                            if (res.result){
                                messageApi.success("退票成功,页面即将刷新！")
                                setTimeout(function() {
                                    // 刷新页面
                                    history(0);
                                }, 2000);
                            }else{
                                messageApi.error("退票失败！")
                            }
                        })

                    console.log("refund: No.", ticketNo);
                }}> 退票</Button>
            </div>

        )
    }
    // if (testInfos) {
    //     messageApi.error("当前无购票记录")
    // }

        data = testInfos?.map(((testInfo, index)=>({key:index,trainInfo:buildTrainInfo(testInfo), passengerInfo:buildPassengerInfo(testInfo),
        seatInfo:buildSeatInfo(testInfo), ticketPrice:buildTicketPrice(testInfo), ticketState:buildticketStatus(testInfo.ticketStatus,testInfo.ticketNo),})))
        const locale = {
            emptyText: "无购票记录",
        };

    return (<div>
        {contextHolder}

             <Table  tableLayout="fixed" columns={columns} dataSource={data} style={{marginLeft:"15%",width:"70%"}} locale = {locale}/>

    </div>)
}
;
export default UserTickerList;