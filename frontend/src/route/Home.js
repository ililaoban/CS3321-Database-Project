import {Button, Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import TicketQuery from "../component/TicketQuery";
import TrainList from "../component/TrainList";
import {useEffect, useState} from "react";
import {queryTrain} from "../train";
import {Link} from "react-router-dom";






const Home = () =>{

    const [trainInfo, setTrainInfo] = useState(null)

    const updateTrainInfo = (start, end, date)=>{
        queryTrain(1).then(trainInfo=>{
            const data = trainInfo.map((train,index)=>({key:index, trainNo:train.trainNo,
                startEndStation:(<><p>{train.startStation}</p><p>{train.endStation}</p></>),
                startEndTime:(<><p>{train.startTime}</p><p>{train.EndTime}</p></>), duration:train.duration,
                businessSeat:train.businessSeat,
                firstSeat:train.firstSeat,
                secondSeat:train.secondSeat,
                superSoftSleeper:train.superSoftSleeper,
                softSleeper:train.softSleeper,
                highSleeper:train.highSleeper,
                hardSleeper:train.hardSleeper,
                softSeat:train.softSeat,
                noSeat:train.noSeat,
                other:<Link to="/purchase"><Button>预定</Button></Link>}))
            setTrainInfo(data)
        })
    }

    // useEffect(() => {
    //     updateTrainInfo(1,1,1)
    // }, []);




return (<Layout>
        <Sider style={{backgroundColor:"white", }} width={"auto"} >
            <TicketQuery updateTrainInfo={updateTrainInfo}/>
        </Sider>
        <Content>
            <div  style={{ margin: '20px 16px 0',}}>
                <TrainList trainInfo={trainInfo}/>
            </div>

        </Content>
    </Layout>)
}

export default Home;
