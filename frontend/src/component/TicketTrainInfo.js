import TicketPriceBox from "./TicketPriceBox";
import {Card} from "antd";
import React from "react";


const spanStyle = {fontSize:"20px", fontWeight:"bold"}




const TicketTrainInfo = (props)=>
{

    const ticketInfo =props.ticketInfo
    return (<Card
        title="列车信息（以下余票仅供参考）"
        //extra={<a href="#">More</a>}
        style={{
            width: "80%",
            marginLeft:"10%"
        }}
    >
        <span style={spanStyle}>{ticketInfo.startDate||""}({ticketInfo.dayOfWeek||""})</span>
        <span> </span>
        <span style={spanStyle}>{ticketInfo.trainNo||""}</span>
        <span>次 </span>
        <span style={spanStyle}>{ticketInfo.startStation||""}</span>
        <span style={spanStyle}>({ticketInfo.startTime||""}开) ——{ticketInfo.endStation||""}</span>
        <span>（{ticketInfo.endTime||""}到）</span>

        <hr/>

        <TicketPriceBox ticketPriceInfo={ticketInfo.priceInfo}/>


        <p style={{color:"darkblue"}}>*显示的价格均为实际活动折扣后票价，供您参考，查看公布票价。具体票价以您确认支付时实际购买的铺别票价为准。</p>
    </Card>)
}

export default TicketTrainInfo;