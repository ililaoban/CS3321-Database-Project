import React from "react";
import {Button, Card, Cascader, Checkbox, Input, Select, Space, Table, message} from "antd";


const ticketType = [{value:"adult", label:'成人票'},{value:"kid", label:"儿童票"},{value:"student",label:"学生票"}]

const idType = [{value:"PRC", label:'中华人民共和国居民身份证'},]

const columns = [{
    title:"序号",
    dataIndex:"index",
    key:"index",
    minWidth:"5%"
},{
    title: "票种",
    dataIndex :"ticketType",
    key:"ticketType",
    width: "12%"
},{
    title: "席别",
    dataIndex:"seatLevel",
    key: "seatLevel",
    width: "27%"
},{
    title: "姓名",
    dataIndex:"passengerName",
    key:"passengerName",
    width: "9%",
},{
    title: "证件类型",
    dataIndex: "idType",
    key:"idType",
    width: "23%"
},{
    title: "证件号码",
    dataIndex: "idNo",
    key:"idNo",
    width: "23%"
}]


const buildSeatLevel = (tickInfo)=>{
    return tickInfo.map(info=>(
        {
            value:info.seatType,
            label:info.seatType+" ("+info.ticketPrice+"元)"
        }
    ))
}


const buildPassengerOptions = (passengerInfo)=>{
    return passengerInfo.map((passenger, index)=>({
        key:index,
        value:passenger,
        label:passenger.passengerName
    }))
}





const PassengerTable = (props)=> {
    const seatLevel = buildSeatLevel(props.priceInfo)
    //const passengerOptions = buildPassengerOptions(props.passengerInfo)
    const selectedPassenger = props.selectedPassenger;

    const data = selectedPassenger?(selectedPassenger.map((value,index)=>(
        {index:index+1,
            ticketType: <Select defaultValue={ticketType[0]} options={ticketType} style={{minWidth: "70%",}}/>,
            passengerName:<Input style={{width:"100%",color:"#000000",backgroundColor:"#ffffff"}} disabled={true} value={value.passengerName}/>,
            seatLevel: <Select defaultValue={seatLevel[0]} options={seatLevel} style={{width:"90%"}}/>,
            idType:<Select defaultValue={idType[0]} options={idType} style={{minWidth: "80%",}}/>,
            idNo:<Input disabled={true} value={value.sfzNo} style = {{color:"#000000",backgroundColor:"#ffffff", minWidth:"90%"}}/>}
    ))):null;



    return (
        <Table tableLayout="fixed" columns={columns} dataSource={data} style={{
            width: "98%",
            marginLeft:"1%"
        }}/>
    )

}

export default PassengerTable;