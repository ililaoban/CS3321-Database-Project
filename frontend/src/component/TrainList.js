import {Button, Table} from "antd";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {queryTrain} from "../train";



// const trainInfo = [{trainNo:"K666", startStation:"锦州", endStation:"上海", startTime:"今天", EndTime:"明天",
//     duration:"15小时", highSleeper:"15",softSeat:"售罄"}]


// const data = [{trainNo:"K666",startEndStation:(<><p>锦州</p><p>上海</p></>), startEndTime:"今天", duration:"15小时", highSleeper:"15",
//     softSeat:"售罄", other:<Link to="/purchase"><Button>预定</Button></Link>}]



const TrainList = (props) =>{




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
        dataIndex: "businessSeat",
        key: "businessSeat",
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


    return (<Table tableLayout="fixed" columns={columns} dataSource={props.trainInfo}/>)
}

export default TrainList;