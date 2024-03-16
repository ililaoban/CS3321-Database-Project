import UserTicketList from "../component/UserTicketList";
import {getUserTicketList} from "../train";
import {useEffect, useState} from "react";
import axios from 'axios';


const UserTicketListPage = ()=>{
    const [trainInfo, setTrainInfo] = useState(null);
    const apiUrl = process.env.REACT_APP_BASE_URL
    useEffect(() => {
        axios.post(apiUrl+"/queryTicket", {userId:'123'})
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