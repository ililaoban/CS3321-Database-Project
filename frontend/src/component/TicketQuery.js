import {Button, Col, DatePicker, Popover, Row} from "antd";
import {Link} from "react-router-dom";
import {useState} from "react";
import dayjs from 'dayjs';


const dateFormat = 'YYYY-MM-DD';

const textStyle = {textAlign:"center"}
const content = (<DatePicker
    defaultValue={dayjs('2024-02-25', dateFormat)}
    minDate={dayjs('2024-02-25', dateFormat)}
    maxDate={dayjs('2024-04-11', dateFormat)}
/>)


const TicketQuery = () =>{


    //start and end
    const [start, setStart] = useState("北京")
    const [end, setEnd] = useState("上海")

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
                    {content}


                    <spanp> 今天</spanp>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Link to = "#">
                    <h1 style={{textAlign:"center", color:"white", backgroundColor:"#3b98fa"}}>查询车票</h1>
                    </Link>
                </Col>
            </Row>

        </div>
    )
}

export default TicketQuery;