import Checkbox from "antd/es/checkbox/Checkbox";
import {useState, useEffect} from "react";
import {Content} from "antd/es/layout/layout";
import TrainList from "./TrainList";
import { DatePicker, Space, Input, Button, Drawer } from 'antd';
import dayjs from 'dayjs';
import ScheduleQuery from "./ScheduleQuery";
import TrainInfoList from "./TrainInfoList";

const TrainSchedule = (props)=>{


    return (
        <div>
            <ScheduleQuery setOpen={props.setOpen}
                           setSchedule={props.setSchedule}
            />
            <Drawer  width={500}
                     title="列车时刻表" open={props.open} onClose={()=>{
                props.setOpen(false);
            }}>
                <h2>{props.schedule?.trainNo}</h2>
            <TrainInfoList schedule={props.schedule?.stations}/>
            </Drawer>
        </div>
    )

}

export default TrainSchedule;