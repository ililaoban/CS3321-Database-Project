import Checkbox from "antd/es/checkbox/Checkbox";
import {useState, useEffect} from "react";
import {Content} from "antd/es/layout/layout";
import TrainList from "./TrainList";
import { DatePicker, Space, Input, Button, Drawer } from 'antd';
import dayjs from 'dayjs';
import ScheduleQuery from "./ScheduleQuery";
import TrainInfoList from "./TrainInfoList";

const TrainSchedule = (props)=>{
    const [open, setOpen] = useState(false);
    const [schedule, setSchedule] = useState(null);

    return (
        <div>
            <ScheduleQuery setOpen={setOpen}
                           setSchedule={setSchedule}
            />
            <Drawer  width={500}
                     title="列车时刻表" open={open} onClose={()=>{
                setOpen(false);
            }}>
                <h2>{schedule?.trainNo}</h2>
            <TrainInfoList schedule={schedule?.stations}/>
            </Drawer>
        </div>
    )

}

export default TrainSchedule;