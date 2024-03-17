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

    const [trainInfo, setTrainInfo] = useState(null)

    const updateTrainInfo = (start, end, date)=>{
        const params = {startStation:start,
                        endStation:end,
                        startDay:date};
        const apiUrl = process.env.REACT_APP_BASE_URL

        axios.post(apiUrl+"/query",params)
            .then(res=> res.data)
            .then(trainInfo=>{
            setTrainInfo(trainInfo)
        })
    }


    useEffect(() => {
        const savedState = sessionStorage.getItem('trainInfo');
        if (savedState) {
            try {
                // 假设trainInfo应该是一个对象
                const parsedState = JSON.parse(savedState);
                setTrainInfo(parsedState);
            } catch (error) {
                console.error("Failed to parse trainInfo from sessionStorage:", error);
                // 可以设置一个默认状态或者根据实际情况处理错误
            }
        }
    }, []);

    useEffect(() => {
        try {
            if (trainInfo) { // 假设trainInfo是一个对象，需要转换成字符串保存
                const serializedState = JSON.stringify(trainInfo);
                sessionStorage.setItem('trainInfo', serializedState);
            }
        } catch (error) {
            console.error("Failed to serialize trainInfo for sessionStorage:", error);
        }
    }, [trainInfo]);



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
