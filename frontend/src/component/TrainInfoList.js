import {Table} from "antd";
import React from "react";



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