import {Button, Card, Cascader, Checkbox, Input, Select, Space, Table} from "antd";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

// const seatLevel =  [{
//     value:"hardSeat",
//     label:"硬座 (120元)",
// },{
//     value: "hardSleeper",
//     label:"硬卧 (上铺120元 中铺130元 下铺140元)"
// }]

// const plainOptions = [{key:1,value:{idNo:1, passengerName:"李四"},label:'李四'}, {key:2,value:{idNo:2, passengerName: '李三'}, label:'李三'},
//             {key:3,value:{idNo:3, passengerName: "周康"}, label:'周康'}];

// const data = [{index:1,
//     ticketType: <Cascader options={ticketType}/>,
//     passengerName:<Input disabled={true} value={'suzhan'}/>,
//     seatLevel: <Cascader options={seatLevel}/>,
//     idType:<Cascader options={idType}/>,
//     idNo:<Input disabled={true} value={'222'}/>}]



const ticketType = [{value:"adult", label:'成人票'},{value:"kid", label:"儿童票"},{value:"student",label:"学生票"}]

const idType = [{value:"PRC", label:'中华人民共和国居民身份证'},]

const columns = [{
    title:"序号",
    dataIndex:"index",
    key:"index",
},{
    title: "票种",
    dataIndex :"ticketType",
    key:"ticketType"
},{
    title: "席别",
    dataIndex:"seatLevel",
    key: "seatLevel"
},{
    title: "姓名",
    dataIndex:"passengerName",
    key:"passengerName"
},{
    title: "证件类型",
    dataIndex: "idType",
    key:"idType"
},{
    title: "证件号码",
    dataIndex: "idNo",
    key:"idNo"
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
                ticketType: <Select options={ticketType} style={{width: 100,}}/>,
                passengerName:<Input disabled={true} value={value.passengerName}/>,
                seatLevel: <Select options={seatLevel} style={{width: 120}}/>,
                idType:<Select options={idType} style={{width: 200,}}/>,
                idNo:<Input disabled={true} value={value.idNo}/>}
        )))
    };


    return (<><Card title="乘客信息（填写说明）" style={{
        width: "80%",
        marginLeft:"10%",
        marginTop:"0.5%"
    }}>

        <p>乘车人</p>
        <Checkbox.Group options={passengerOptions} defaultValue={['Apple']} onChange={onChange} />
        <Table columns={columns} dataSource={ticketForm} style={{
            width: "98%",
            marginLeft:"1%"
        }}/>
    </Card>
        <Space style={{minWidth:"6%",marginLeft:"43%",marginTop:"2%",height:"auto"}}>
            <Button onClick={()=>{navigate(-1)}}>
                <h3 style={{margin:"0"}}>返回前一页</h3>
            </Button>
            <Button >
                <h3 style={{margin:"0"}}>提交订单</h3>
            </Button>
        </Space></>)
}


export default TicketPassengerInfo;