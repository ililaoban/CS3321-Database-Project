import {Button, Table} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {queryTrain} from "../train";


const TrainList = (props) =>{
    let navigate = useNavigate();
    const trainInfo = props.trainInfo;
    const data = trainInfo ? (trainInfo.map((train,index)=>({key:index, trainNo:train.trainNo,
        startEndStation:(<><p>{train.startStation}</p><p>{train.endStation}</p></>),
        startEndTime:(<><p>{train.startTime}</p><p>{train.endTime}</p></>), duration:train.duration,
        specialSeatAndBusinessSeat:train.specialSeatAndBusinessSeat||"---",
        firstSeat:train.firstSeat||"---",
        secondSeatAndSecondBoxSeat:train.secondSeatAndSecondBoxSeat||"---",
        superSoftSleeper:train.superSoftSleeper||"---",
        softSleeperAndFirstSleeper:train.softSleeperAndFirstSleeper||"---",
        secondAndHardSleeper:train.secondAndHardSleeper||"---",
        highSleeper:train.highSleeper||"---",
        secondSleeperAndHardSleeper:train.secondSleeperAndHardSleeper||"---",
        hardSeat:train.hardSeat||"---",
        softSeat:train.softSeat||"---",
        noSeat:train.noSeat||"---",
        other:<Button disabled={!train.available} onClick={()=>{
            navigate('./purchase', {state:{trainNoOnly:train.trainNoOnly, startStation:train.startStation, endStation:train.endStation}})
        }}>预定</Button>}))
    ):null;


    const columns = [{
        title: "车次",
        dataIndex: "trainNo",
        key: "trainNo",
        align:"center"
    },{
        title:(<>
            出发站
            <br/>
            到达站</>),
        dataIndex:"startEndStation",
        key:"startEndStation",
        align:"center"
        },{
        title: (<>出发时间<br/>到达时间</>),
        dataIndex: "startEndTime",
        key: "startEndTime",
        align: "center"
    },{
        title:"历时",
        dataIndex: "duration",
        key:"duration",
        align: "center"
    },{
        title:(<>特等座<br/>商务座</>),
        dataIndex: "specialSeatAndBusinessSeat",
        key: "specialSeatAndBusinessSeat",
        align: "center",
    },{
        title: "一等座",
        dataIndex: "firstSeat",
        key: "firstSeat",
        align: "center"
    },{
        title:(<>二等座<br/>二等包座</>),
        dataIndex: "secondSeatAndSecondBoxSeat",
        key:"secondSeatAndSecondBoxSeat",
        align: "center"
    },{
        title: "高级软卧",
        dataIndex: "superSoftSleeper",
        key:"superSoftSleeper",
        align: "center"
    },{
        title: (<>软卧<br/>一等卧</>),
        dataIndex: "softSleeperAndFirstSleeper",
        key:"softSleeperAndFirstSleeper",
        align: "center"
    },{
        title: "动卧",
        dataIndex: "highSleeper", //HighSpeedSleeper
        key:"highSleeper",
        align: "center"
    },{
        title:(<>硬卧<br/>二等卧</>),
        dataIndex: "secondSleeperAndHardSleeper",
        key:"secondSleeperAndHardSleeper",
        align: "center"
    },{
        title:"软座",
        dataIndex: "softSeat",
        key: "softSeat",
        align: "center"
    },{
        title:"硬座",
        dataIndex: "hardSeat",
        key: "hardSeat",
        align: "center"
    },{
        title: "无座",
        dataIndex: "noSeat",
        key: "noSeat",
        align: "center"
    },{
        title: "其他",
        dataIndex: "other",
        key:"other",
        align: "center"
    }]


    return (<Table tableLayout="fixed" columns={columns} dataSource={data}/>)
}

export default TrainList;