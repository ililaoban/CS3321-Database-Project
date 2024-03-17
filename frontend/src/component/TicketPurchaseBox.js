import React from "react";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";


const TicketPurchaseBox = (props)=>{
    let navigate = useNavigate();


    return (<div style={{minWidth: "6%", marginLeft: "43%", marginTop: "1%"}}>
        <Button onClick={() => {
            navigate(-1)
        }}>
            <h3 style={{margin: "0"}}>返回前一页</h3>
        </Button>
        <Button onClick={props.onClickPurchase}>
            <h3 style={{margin: "0"}}>提交订单</h3>
        </Button>
    </div>)
}

export default TicketPurchaseBox;