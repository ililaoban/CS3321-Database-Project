import {Button, Col, DatePicker, Popover, Row, message} from "antd";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import dayjs from 'dayjs';
import CityStationSelector from "./CityStationSelector"
import {getCityStationList} from "../train";



const textStyle = {textAlign:"center"}



const TicketQuery = (props) =>{


    //start and end
    const [start, setStart] = useState("北京")
    const [end, setEnd] = useState("上海")
    const [date, setDate] = useState(dayjs())
    const [options, setOptions] = useState(null)
    const [messageApi, contextHolder] = message.useMessage();

    function swapStartEnd(){
        const tmp = end
        setEnd(start);
        setStart(tmp);
    }

    useEffect(() => {
        getCityStationList().then(options=>{
            setOptions(options);
        })
    }, []);



    return (
        <div style={{width:"250px",padding:"25px",backgroundColor:"white", height:"210px"}}>

        <Row>
           <Col span={10}>
               <Popover content={<CityStationSelector setStation={setStart} options={options}/>}>
                   <h3 style={{textAlign: "left"}}>{start}</h3>
               </Popover>
           </Col>
            <Col span={4}>
                <button onClick={swapStartEnd} style={{backgroundColor:"transparent", border:"none"}}>
                    <img src="exchange.png" style={{width: "50px", marginTop: "10px"}}/>
                </button>
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
                        defaultValue={dayjs()}
                        minDate={dayjs()}
                        maxDate={dayjs().add(14,'day')}
                        onChange={(date, dateString)=>{
                            console.log(dateString)
                            setDate(date)

                        }}
                    />
                    <spanp> 今天</spanp>
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
                        }}>
                        查询车票
                    </Button>
                </Col>
            </Row>

        </div>
    )
}

export default TicketQuery;