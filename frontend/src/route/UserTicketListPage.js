import UserTicketList from "../component/UserTicketList";
import { useNavigate } from 'react-router-dom';

import {getUserTicketList} from "../train";
import {useEffect, useState} from "react";
import axios from 'axios';


const UserTicketListPage = ()=>{
    const navigate = useNavigate();
    const [trainInfo, setTrainInfo] = useState(null);
    //const [userId, setUserId] = useState("");
    const apiUrl = process.env.REACT_APP_BASE_URL
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        console.log("userId is ", userId)

        if (userId == null || userId == ""){
            //console.log("userId is null")
            navigate('/login')
            //return;
        }else {
            axios.post(apiUrl + "/queryTicket", {userId: userId})
                .then(res => res.data)
                .then(info => {
                    setTrainInfo(info)
                })
                .catch(err => {
                    console.log("错误信息:", err);
                });
        }
    },[]);


        return (<UserTicketList trainInfo={trainInfo}/>)


}

export default UserTicketListPage;