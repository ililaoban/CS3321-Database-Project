import {Button, Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import TicketQuery from "../component/TicketQuery";
import TrainList from "../component/TrainList";
import {useEffect, useState} from "react";
import {queryTrain} from "../train";
import {Link,useNavigate} from "react-router-dom";
import axios from 'axios';




const Home = () =>{
    let navigate = useNavigate();

    const [trainInfo, setTrainInfo] = useState(null)

    const updateTrainInfo = (start, end, date)=>{
        const params = {startStation:start,
                        endStation:end,
                        startDay:date};
        axios.post("http://127.0.0.1:5000/query",params)
            .then(res=> res.data)
            .then(trainInfo=>{
            const data = trainInfo.map((train,index)=>({key:index, trainNo:train.trainNo,
                startEndStation:(<><p>{train.startStation}</p><p>{train.endStation}</p></>),
                startEndTime:(<><p>{train.startTime}</p><p>{train.EndTime}</p></>), duration:train.duration,
                specialSeatAndBusinessSeat:train.specialSeatAndBusinessSeat,
                firstSeat:train.firstSeat,
                secondSeatAndSecondBoxSeat:train.secondSeatAndSecondBoxSeat,
                superSoftSleeper:train.superSoftSleeper,
                softSleeperAndFirstSleeper:train.softSleeperAndFirstSleeper,
                secondAndHardSleeper:train.secondAndHardSleeper,
                hardSleeper:train.hardSleeper,
                softSeat:train.softSeat,
                noSeat:train.noSeat,
                other:<Button onClick={()=>{
                    navigate('./purchase', {state:{trainNoOnly:train.trainNoOnly}})
                }}>预定</Button>}))
            setTrainInfo(data)
        })
    }

    // useEffect(() => {
    //     updateTrainInfo(1,1,1)
    // }, []);




return (<Layout>
        <Sider style={{backgroundColor:"transparent"}} width={"auto"} >
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
