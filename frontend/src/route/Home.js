import {Button, Layout, message} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import TicketQuery from "../component/TicketQuery";
import FilteredTrainList from "../component/FilteredTrainList";
import FilteredTrainList_2 from "../component/FilteredTrainList_2";
import ScheduleQuery from "../component/ScheduleQuery";
import TrainSchedule from "../component/TrainSchedule";
import {useEffect, useState} from "react";
import {queryTrain} from "../train";
import {Link,useNavigate} from "react-router-dom";
import axios from 'axios';
import dayjs from 'dayjs';




const Home = () =>{
    const [trainInfo, setTrainInfo] = useState(null)
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [schedule, setSchedule] = useState(null);

    const updateTrainInfo = (start, end, date)=>{
        //"2024-04-27T16:00:00.000Z"
        let tmpdate = dayjs(date).format('YYYY-MM-DD');

        const params = {startStation:start,
                        endStation:end,
                        startDay:tmpdate};
        const apiUrl = process.env.REACT_APP_BASE_URL

        axios.post(apiUrl+"/query",params)
            .then(res=> res.data)
            .then(trainInfo=>{
                if (trainInfo.length == 0) {
                    messageApi.error("没有符合条件的车票！")
                }
                console.log("traininfo is ", trainInfo)
                setTrainInfo(trainInfo)
                if (trainInfo.length != 0) {
                    messageApi.success("已刷新")
                }
            }).catch(error=>{
            console.error(error);
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
            <TicketQuery
                updateTrainInfo={updateTrainInfo}
            />
            <TrainSchedule
                open = {open}
                setOpen = {setOpen}
                setSchedule = {setSchedule}
                schedule = {schedule}
            />
        </Sider>
        <Content>
            {contextHolder}

            <div  style={{ margin: '20px 16px 0',}}>
                <FilteredTrainList_2
                    trainInfo={trainInfo}
                    setOpen = {setOpen}
                    setSchedule = {setSchedule}
                />
            </div>

        </Content>
    </Layout>)
}

export default Home;
