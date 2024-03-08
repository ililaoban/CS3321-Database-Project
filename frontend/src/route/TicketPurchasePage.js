import TicketPurchase from "../component/TicketPurchase";
import {useEffect, useState} from "react";
import {getAvailableTicketInfo, getPassengerInfo} from "../train";

// const ticketInfo = {
//     startStation: "上海", endStation: "锦州", startDate: "2024-02-28", startTime:"20:08",dayOfWeek: "周三",
//     trainNo:"K188", endTime:"18:23", priceInfo: [
//         {
//             key:1,
//             seatType:"硬座",
//             available:true,
//             ticketNum:"有票",
//             ticketPrice:"120元"},{
//             key:2,
//             seatType:"硬卧",
//             available:false,
//             ticketNum:"无票",
//             ticketPrice:"上铺120元 中铺130元 下铺140元"
//         }]}

// const passengerInfo =[ {idNo:1, passengerName:"李四"},
//     {idNo:2, passengerName: '李三'},
//     {idNo:323454321, passengerName: "周康"}
// ]


const TicketPurchasePage = ()=>{
    const [ticketInfo, setTicketInfo] = useState(null)
    const [passengerInfo, setPassengerInfo] = useState(null)

    useEffect(() => {
        getAvailableTicketInfo(111).then(ticketInfo=>{
            setTicketInfo(ticketInfo)
        })
        getPassengerInfo(11).then(passengerInfo=>{
            setPassengerInfo(passengerInfo)
        })

    }, []);


    if (ticketInfo && passengerInfo)
    return (<TicketPurchase ticketInfo={ticketInfo} passengerInfo={passengerInfo}/>)
}

export default TicketPurchasePage;