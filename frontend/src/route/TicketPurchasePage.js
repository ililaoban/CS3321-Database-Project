import TicketPurchase from "../component/TicketPurchase";
import {useEffect, useState} from "react";
import {getAvailableTicketInfo, getPassengerInfo} from "../train";
import {useLocation} from 'react-router-dom';
import axios from "axios";

const apiUrl = process.env.REACT_APP_BASE_URL


const TicketPurchasePage = ()=>{
    let location = useLocation();

    let {trainNoOnly} = location.state ||{}

    const [ticketInfo, setTicketInfo] = useState(null)
    const [passengerInfo, setPassengerInfo] = useState(null)

    // const getAvailableTicketInfo = (trainNoOnly)=>{
    //
    // }

    useEffect(() => {
        getAvailableTicketInfo(trainNoOnly).then(ticketInfo=>{
            setTicketInfo(ticketInfo)
        })
        getPassengerInfo(11).then(passengerInfo=>{
            setPassengerInfo(passengerInfo)
        })

    }, []);


    if (ticketInfo && passengerInfo)
    return (<>
        <TicketPurchase ticketInfo={ticketInfo} passengerInfo={passengerInfo}/>

    </>)
}

export default TicketPurchasePage;