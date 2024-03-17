import {Card} from "antd";
import {useEffect, useState} from "react";
import axios from 'axios';

const ticketInfo = {
    startDate:"2024年03年08日",
    startTime:"13:52",
    startStation:"锦州南",
    endStation:"盘锦北",
    trainNo:"G2602",
    carriageNo:"03",
    seatNo:"02A",
    seatType:"二等座",
    ticketType:"成人票",
    ticketNo:"12345231",
    ticketPrice:"20.5",
    passengerName:"夏雨其",
    sfzNo:"13242313243"
}



const TicketCard = (props)=>{
    // const apiUrl = process.env.REACT_APP_BASE_URL;
    // const [ticketInfo, setTicketInfo] = useState(null);
    //
    //
    // useEffect(() => {
    //     axios.post(apiUrl+"queryTicket",
    //         {
    //             ticketNo:props.ticketNo
    //         }).then(res=>res.data)
    //             .then(data=>{
    //                 setTicketInfo(data);
    //                 })
    //
    // }, []);



    return (<div>
        <Card
            title="行程信息提示"
            style={{
                width: "auto",
            }}
        >
            <p>
                开车时间
                <span style={{fontSize: 20}}> {ticketInfo.startDate} {ticketInfo.startTime}</span>
            </p>
            <p>
                <span style={{fontSize:25,fontWeight: "bold"}}>{ticketInfo.startStation}</span>&ensp;站
                <span style={{marginRight:10,display:"inline-flex",marginLeft:10,fontWeight: "bold", fontSize:20}}>
                    --{ticketInfo.trainNo}-->

                </span>
                <span style={{fontSize:25,fontWeight: "bold"}}>{ticketInfo.endStation}</span>&ensp;站

            </p>
            <p>
                <span style={{fontSize:20, fontWeight:"bold"}}>{ticketInfo.carriageNo}车 {ticketInfo.seatNo}号</span>
                &ensp;&ensp;
                <span>{ticketInfo.seatType}</span>
                &ensp;&ensp;
                <span>{ticketInfo.ticketType}</span>
            </p>
            <h3>限乘当日当次车</h3>
            <p>
                <span style={{fontSize:15, fontWeight:"bold"}}>{ticketInfo.passengerName}&ensp;&ensp;{ticketInfo.sfzNo}&ensp;&ensp;居民身份证</span>
            </p>
            <p>
                <span style={{fontSize:15, fontWeight:"bold"}}>票号:{ticketInfo.ticketNo}</span>
                &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
                <span>票价:{ticketInfo.ticketPrice}元</span>
            </p>


        </Card>
    </div>)

}


export default TicketCard;