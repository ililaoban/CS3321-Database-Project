import {Button, Col, DatePicker, Popover, Row} from "antd";
import {Link} from "react-router-dom";
import {useState} from "react";
import dayjs from 'dayjs';




const textStyle = {textAlign:"center"}



const TicketQuery = (props) =>{


    //start and end
    const [start, setStart] = useState("北京")
    const [end, setEnd] = useState("上海")
    const [date, setDate] = useState(dayjs())

    function swapStartEnd(){
        const tmp = end
        setEnd(start);
        setStart(tmp);
    }


    return (
        <div style={{width:"250px",padding:"25px"}}>

        <Row>
           <Col span={10}>
               <h1 style={{textAlign:"left"}}>{start}</h1>
           </Col>
            <Col span={4}>
                <button onClick={swapStartEnd} style={{backgroundColor:"transparent", border:"none"}}>
                    <img src="exchange.png" style={{width: "50px", marginTop: "10px"}}/>
                </button>
            </Col>
            <Col span={10}><h1 style={{textAlign:"right"}}>{end}</h1></Col>
        </Row>
            <Row>
                <Col span={24}>
                    <DatePicker
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
            <Row>
                <Col span={24}>
                    <Button style={{width:"100%", marginTop:"10px", backgroundColor:"#3b97f8", color:"white"}}
                        onClick = {()=>{
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