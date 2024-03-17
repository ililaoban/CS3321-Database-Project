import React, {useState} from 'react';
import {Button, Popover, Space, Table, Tag} from 'antd';
import {Link} from "react-router-dom";
import TrainInfoList from "./TrainInfoList";
import {getTrainSchedule} from "../train";
import TicketCard from"./TicketCard";


const TrainInfoPopover = (props)=>{
    const info = props.info

    const [schedule, setSchedule] = useState(null);


    function fetchTrainSchedule(){
        getTrainSchedule(22).then(
            data =>{
                setSchedule(data)
            }
        )
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
            <Popover content={<TicketCard/>}>
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

    let data = null
    const testInfos = props.trainInfo
    if (testInfos)
    {data = testInfos.map(((testInfo, index)=>({key:index,trainInfo:buildTrainInfo(testInfo), passengerInfo:buildPassengerInfo(testInfo),
                seatInfo:buildSeatInfo(testInfo), ticketPrice:buildTicketPrice(testInfo), ticketState:testInfo.ticketStatus})))}



    return (<Table  tableLayout="fixed" columns={columns} dataSource={data} style={{marginLeft:"15%",width:"70%"}}/>)};
export default UserTickerList;