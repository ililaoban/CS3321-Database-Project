import React, {useState} from 'react';
import {Button, Popover, Space, Table, Tag} from 'antd';
import {Link} from "react-router-dom";
import TrainInfoList from "./TrainInfoList";
import {getTrainSchedule} from "../train";

// const testInfos = [{start:"锦州南", end:"上海虹桥", trainNo:"G1202",date:"2024-02-22", time:"13:01", passenger:"苏展",
//                         seatLevel:"二等座", coachNo:"14", //车厢号
//                         seatNo:"16D", //座位号
//                         ticketType:"学生票", price:"597.0", ticketState:"已出站"}]

const content = "sz"




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
        <h3>{info.start}->{info.end}
            <Space wrap>
                <TrainInfoPopover info={info}/>


            </Space>
{/*            <Link to={`/train/${info.trainNo}`}> {info.trainNo}
            </Link>*/}
            </h3>
        <p>{info.date}  {info.time} 开</p>
    </div>)


const buildPassengerInfo = (info) => (
    <div>
        <p>{info.passenger}</p>
        <p>中国居民身份证</p>
    </div>
)

const buildSeatInfo = (info)=>
    (<div>
        <p>{info.seatLevel}</p>
        <p>{info.coachNo}车 {info.seatNo}号</p>
    </div>)


const buildTicketPrice = (info) =>
    (
        <div>
            <p>{info.ticketType}</p>
            <p>{info.price} 元</p>
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

    const testInfos = props.trainInfo
    const data = testInfos.map(((testInfo, index)=>({key:index,trainInfo:buildTrainInfo(testInfo), passengerInfo:buildPassengerInfo(testInfo),
                seatInfo:buildSeatInfo(testInfo), ticketPrice:buildTicketPrice(testInfo), ticketState:testInfo.ticketState})))


    return (<Table columns={columns} dataSource={data} style={{marginLeft:"15%",width:"70%"}}/>)};
export default UserTickerList;