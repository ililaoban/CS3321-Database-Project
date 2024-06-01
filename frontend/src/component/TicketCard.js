import {Card} from "antd";
import {useEffect, useState} from "react";
import axios from 'axios';


const TicketCard = (props)=>{

    const ticketInfo = props.ticketInfo;


    return (<div>
        <Card
            title="行程信息提示"
            style={{
                width: "auto",
            }}
        >
            <p>
                开车时间
                <span style={{fontSize: 20}}> {ticketInfo.startDay} {ticketInfo.startTime}</span>
            </p>
            <p>
                <span style={{fontSize:25,fontWeight: "bold"}}>{ticketInfo.startStation}</span>&ensp;
                <span style={{marginRight:10,display:"inline-flex",marginLeft:10,fontWeight: "bold", fontSize:20}}>
                    --{ticketInfo.trainNo}-->

                </span>
                <span style={{fontSize:25,fontWeight: "bold"}}>{ticketInfo.endStation}</span>&ensp;

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