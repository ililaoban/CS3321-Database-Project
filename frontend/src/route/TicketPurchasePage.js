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
    const apiUrl = process.env.REACT_APP_BASE_URL

    // const getAvailableTicketInfo = (trainNoOnly)=>{
    //
    // }

    useEffect(()=>{
        getAvailableTicketInfo(trainNoOnly).then(ticketInfo=>{
            setTicketInfo(ticketInfo)
        })
    }, [])

    useEffect(() => {
        const userId = localStorage.getItem('userId');


        // getPassengerInfo(userId||'11').then(passengerInfo=>{
        //     setPassengerInfo(passengerInfo)
        // })
        axios.post(apiUrl+"/passengerInformation", {userId:userId||'123'})
            .then(res => {
                console.log("请求结果:", res.data);
                setPassengerInfo(res.data)
            }).catch(err => {
            console.log("错误信息:", err);
        });

    }, []);


    if (ticketInfo && passengerInfo)
    return (<>
        <TicketPurchase ticketInfo={ticketInfo} passengerInfo={passengerInfo}/>

    </>)
}

export default TicketPurchasePage;