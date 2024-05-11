import UserTicketList from "../component/UserTicketList";
import {getUserTicketList} from "../train";
import {useEffect, useState} from "react";
import axios from 'axios';


const UserTicketListPage = ()=>{
    const [trainInfo, setTrainInfo] = useState(null);
    //const [userId, setUserId] = useState("");
    const apiUrl = process.env.REACT_APP_BASE_URL
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        axios.post(apiUrl+"/queryTicket", {userId:userId||'123'})
            .then(res => {
                console.log("请求结果:", res.data);
                setTrainInfo(res.data)
            }).catch(err => {
            console.log("错误信息:", err);
        });
    }, []);


        return (<UserTicketList trainInfo={trainInfo}/>)


}

export default UserTicketListPage;