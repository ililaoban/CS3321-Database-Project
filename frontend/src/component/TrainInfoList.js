import {Table} from "antd";
import React from "react";

// const data = [
//     {"stationOrder": "01", "stationName": "上海", "arriveTime": "01:57", "leaveTime": "01:57", "remainTime": "----"},
//     {"stationOrder": "02", "stationName": "苏州", "arriveTime": "02:51", "leaveTime": "02:56", "remainTime": "5"},
//     {"stationOrder": "03", "stationName": "无锡", "arriveTime": "03:24", "leaveTime": "03:30", "remainTime": "6"},
//     {"stationOrder": "04", "stationName": "常州", "arriveTime": "03:57", "leaveTime": "04:02", "remainTime": "5"},
//     {"stationOrder": "05", "stationName": "南京", "arriveTime": "06:08", "leaveTime": "06:19", "remainTime": "11"},
//     {"stationOrder": "06", "stationName": "镇江", "arriveTime": "08:31", "leaveTime": "08:34", "remainTime": "3"},
//     {"stationOrder": "07", "stationName": "淮安", "arriveTime": "09:30", "leaveTime": "09:33", "remainTime": "3"},
//     {"stationOrder": "08", "stationName": "连云港", "arriveTime": "11:45", "leaveTime": "12:18", "remainTime": "33"}
// ]


const columns = [
    {
        title: '站序',
        dataIndex: 'stationOrder',
        key: 'stationOrder',
        align:'center',
    },
    {
        title: '站名',
        dataIndex: 'stationName',
        align: 'center',
        key: 'stationName',
    },
    {
        title: '到站时间',
        dataIndex: 'arriveTime',
        align: 'center',
        key: 'arriveTime',
    },
    {
        title: '出发时间',
        key: 'leaveTime',
        dataIndex: 'leaveTime',
        align: 'center',

    },
    {
        title: '停留时间',
        key: 'remainTime',
        dataIndex:'remainTime',
        align: "center",
        render:(text)=>((text === "----") ?"----": text+"分钟")

    },
];




const TrainInfoList = (props)=>{


    return (<Table columns={columns} dataSource={props.schedule}/>);
}

export default TrainInfoList;