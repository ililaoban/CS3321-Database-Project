import Checkbox from "antd/es/checkbox/Checkbox";
import {useState, useEffect} from "react";
import {Content} from "antd/es/layout/layout";
import TrainList from "./TrainList";
import { DatePicker, Space, Input, Button } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';


const apiUrl = process.env.REACT_APP_BASE_URL


const ScheduleQuery = (props)=>{
    const setSchedule = props.setSchedule;
    const setOpen = props.setOpen;

    const [date, setDate] = useState(dayjs());
    const [trainNo, setTrainNo] = useState(null);

    const fetchSchedule = ()=>{
        const params = {trainNo:trainNo,
            initialLaunchTime:date,};

        axios.post(apiUrl+"/trainNo/initialLaunchTime_1",params)
            .then(res=> res.data)
            .then(trainInfo=>{
                //console.log(trainInfo.stations);
                setSchedule(trainInfo);
            }).catch(error=>{
            console.error(error);
        })
    }



    return(
        <div style={{backgroundColor: "white", padding: 5, marginTop: 10, borderRadius: 10}}>
            <p style={{textAlign: "center", fontWeight: 600, fontSize: 20}}>
                列车时刻表查询
            </p>
            <div>
            <span style={{fontWeight: 600, marginLeft: 10}}>始发日期&ensp;</span>
            <DatePicker style={{width: 160}}
                        onChange={(date, dateString)=>{
                            console.log("lauch date is ", dateString);
                            if (dateString){
                                setDate(dateString);
                        }}}
                        defaultValue={dayjs()}/>
            </div>
            <div style={{marginTop:10, marginBottom:10}}>
            <span style={{fontWeight: 600, marginLeft: 10}}>列车车次&ensp;</span>
                <Input style={{width: 160}} placeholder="请输入" onChange={(e)=>{
                    console.log("TrainNo is ", e.target.value);
                    setTrainNo(e.target.value);
                }}/>
            </div>
            <Button style={{ marginLeft:"7%", width:"86%", backgroundColor:"#3b97f8", color:"white", marginBottom:20}}
                    onClick={()=>{
                        if (!(trainNo&&date)){
                            return;}
                        console.log("Clicked!")
                        setOpen(true);
                        fetchSchedule();
                    }}
            >
                查询时刻表
            </Button>
        </div>
    )
}

export default ScheduleQuery;