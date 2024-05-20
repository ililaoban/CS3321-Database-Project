import {Button, Card, Cascader, Checkbox, Input, Select, Space, Table, message} from "antd";
import React, {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import PassengerTable from "./PassengerTable"



const buildPassengerOptions = (passengerInfo)=>{
    return passengerInfo.map((passenger, index)=>({
        key:index,
        value:passenger,
        label:passenger.passengerName
    }))
}





const TicketPassengerInfo = (props)=>{
    const passengerOptions = buildPassengerOptions(props.passengerInfo)
    let navigate = useNavigate();
    const [ticketForm, setTicketForm] = useState(null);
    //const [selectedPassenger, setSelectedPassenger] = useState(null);


    return (<div><Card title="乘客信息（填写说明）" style={{
        width: "80%",
        marginLeft:"10%",
        marginTop:"0.5%"
    }}>

        <p>乘车人</p>
        <Checkbox.Group options={passengerOptions}  onChange={(values)=>{
            console.log(values);
            props.updateSelectedPassenger(values)
        }}/>
        <PassengerTable selectedPassenger={props.selectPassenger}
                        updateSelectedSeatType={props.updateSelectedSeatType}
                        priceInfo={props.priceInfo}/>



    </Card>
       </div>)
}


export default TicketPassengerInfo;