import UserTicketList from "../component/UserTicketList";
import {getUserTicketList} from "../train";
import {useEffect, useState} from "react";


const UserTicketListPage = ()=>{
    const [trainInfo, setTrainInfo] = useState(null);

    useEffect(() => {
        getUserTicketList(10).then(trainInfo=>{
            setTrainInfo(trainInfo)
        })
    }, []);

   if (trainInfo)
        return (<UserTicketList trainInfo={trainInfo}/>)


}

export default UserTicketListPage;