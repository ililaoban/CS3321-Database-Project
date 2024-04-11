import {Button, Col, DatePicker, Popover, Row, message} from "antd";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import dayjs from 'dayjs';
import CityStationSelector from "./CityStationSelector"
import {getCityStationList} from "../train";
import DateDiffBox from "./DateDiffBox"


const textStyle = {textAlign:"center"}



const TicketQuery = (props) =>{


    //start and end
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [date, setDate] = useState(dayjs())
    const [options, setOptions] = useState(null)
    const [messageApi, contextHolder] = message.useMessage();

    function swapStartEnd(){
        const tmp = end
        setEnd(start);
        setStart(tmp);
    }

    useEffect(() => {
        const savedStart = JSON.parse(sessionStorage.getItem('start'));
        if (savedStart){
            setStart(savedStart)
        }else{
            setStart("北京")
        }
        const savedEnd = JSON.parse(sessionStorage.getItem("end"));
        if (savedEnd){
            setEnd(savedEnd)
        }else{
            setEnd("上海")
        }
        const savedDate = (sessionStorage.getItem("date"));
        if (savedDate){
            setDate(dayjs(savedDate))
        }else{
            setDate(dayjs());
        }

        getCityStationList().then(options=>{
            setOptions(options);
        })


    }, []);




    useEffect(()=>{
        if (start)
        {
            const serializedStart = JSON.stringify(start);
            sessionStorage.setItem('start', serializedStart)
        }

    },[start]);

    useEffect(()=>{
        if (end)
        {
            const serializedEnd = JSON.stringify(end);
            sessionStorage.setItem('end', serializedEnd)
        }

    },[end]);




    return (
        <div style={{width:"250px",padding:"25px",backgroundColor:"white", height:"210px"}}>
        <Row>
           <Col span={9}>
               <Popover content={<CityStationSelector setStation={setStart} options={options}/>}>
                   <h3 style={{textAlign: "left"}}>{start}</h3>
               </Popover>
           </Col>
            <Col span={5}>
                <Button onClick={swapStartEnd} style={{backgroundColor:"transparent", height:"auto", padding:"0", border:0}}>
                    <img src="exchange.png" style={{width: "50px", margin: "0"}}/>
                </Button>
            </Col>
            <Col span={10}>
                <Popover content={<CityStationSelector setStation={setEnd} options={options}/>}>
                <h3 style={{textAlign:"right"}}>{end}</h3>
                </Popover>
            </Col>
        </Row>
            <Row style={{marginTop:"5px"}}>
                <Col span={24}>
                    <DatePicker
                        style={{width:"120px"}}
                        defaultValue = {dayjs()}
                       value={date}
                        minDate={dayjs()}
                        maxDate={dayjs().add(14,'day')}
                        onChange={(date, dateString)=>{
                            console.log(dateString)
                            if (date)
                            {
                                setDate(date)
                                const serializedDate = date.toISOString();
                                sessionStorage.setItem('date', serializedDate);
                            }
                        }}
                    />
                    &ensp;&ensp;
                    <DateDiffBox  date = {date}/>
                </Col>
            </Row>
            <Row style={{marginTop:"5px"}}>
                <Col span={24}>
                    {contextHolder}

                    <Button style={{width:"100%", marginTop:"10px", backgroundColor:"#3b97f8", color:"white"}}
                        onClick = {()=>{
                            if (start==end)
                                messageApi.info('始发站与终到站不可相同！');
                            else
                            props.updateTrainInfo(start, end, date)
                        }}
                            >
                        查询车票
                    </Button>
                </Col>
            </Row>

        </div>
    )
}

export default TicketQuery;