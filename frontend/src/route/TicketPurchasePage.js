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


    useEffect(()=>{
        const url = apiUrl + "/queryTicketBasedOnTrain"
        axios.post(url, {
            trainNoOnly: trainNoOnly,
            startStation:"兰州西站",
            endStation:"北京南站"

        }).then(res=>res.data)
            .then(ticketInfo=>{
                setTicketInfo(ticketInfo)
            }).catch(e=>{
                console.log(e)
            }
        )

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