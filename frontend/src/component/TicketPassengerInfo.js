import {Button, Card, Cascader, Checkbox, Input, Select, Space, Table} from "antd";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";





const ticketType = [{value:"adult", label:'成人票'},{value:"kid", label:"儿童票"},{value:"student",label:"学生票"}]

const idType = [{value:"PRC", label:'中华人民共和国居民身份证'},]

const columns = [{
    title:"序号",
    dataIndex:"index",
    key:"index",
    width:60
},{
    title: "票种",
    dataIndex :"ticketType",
    key:"ticketType",
    width: 150
},{
    title: "席别",
    dataIndex:"seatLevel",
    key: "seatLevel",
    width: 350
},{
    title: "姓名",
    dataIndex:"passengerName",
    key:"passengerName",
    width: 120,
},{
    title: "证件类型",
    dataIndex: "idType",
    key:"idType",
    width: 300
},{
    title: "证件号码",
    dataIndex: "idNo",
    key:"idNo",
    width: 300
}]


const buildSeatLevel = (tickInfo)=>{
    return tickInfo.priceInfo.map(info=>(
        {
            value:info.seatType,
            label:info.seatType+" ("+info.ticketPrice+")"
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


const TicketPassengerInfo = (props)=>{
    const seatLevel = buildSeatLevel(props.ticketInfo)
    const passengerOptions = buildPassengerOptions(props.passengerInfo)

    let navigate = useNavigate();
    const [ticketForm, setTicketForm] = useState(null);
    const onChange = (values) => {
        console.log(values)
        setTicketForm(values.map((value,index)=>(
            {index:index+1,
                ticketType: <Select defaultValue={ticketType[0]} options={ticketType} style={{width: 90,}}/>,
                passengerName:<Input style={{width:"100px"}} disabled={true} value={value.passengerName}/>,
                seatLevel: <Select defaultValue={seatLevel[0]}options={seatLevel} style={{width:"270px"}}/>,
                idType:<Select defaultValue={idType[0]} options={idType} style={{width: 210,}}/>,
                idNo:<Input disabled={true} value={value.idNo}/>}
        )))
    };


    return (<div><Card title="乘客信息（填写说明）" style={{
        width: "80%",
        marginLeft:"10%",
        marginTop:"0.5%"
    }}>

        <p>乘车人</p>
        <Checkbox.Group options={passengerOptions} defaultValue={['Apple']} onChange={onChange} />
        <Table tableLayout="fixed" columns={columns} dataSource={ticketForm} style={{
            width: "98%",
            marginLeft:"1%"
        }}/>
    </Card>
        <div style={{minWidth:"6%",marginLeft:"43%",marginTop:"1%"}}>
            <Button onClick={()=>{navigate(-1)}}>
                <h3 style={{margin:"0"}}>返回前一页</h3>
            </Button>
            <Button >
                <h3 style={{margin:"0"}}>提交订单</h3>
            </Button>
        </div></div>)
}


export default TicketPassengerInfo;