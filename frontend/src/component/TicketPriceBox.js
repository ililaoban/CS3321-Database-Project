



const TicketPriceBox = (props)=>{
    if (!props.ticketPriceInfo)
        return null

    const ticketData = props.ticketPriceInfo.map((info, index)=>{
        if (info.availableSeats == "有") {
            return (
                <span>
                    <span>{info.seatType}</span>
                    <span> (</span>
                    <span style={{color:"orange"}}>{info.ticketPrice}元</span>
                    <span>) </span>
                    <span>{info.ticketNum}&emsp;</span>
                </span>
            )
        }else{
            return (
                <span style={{color:"darkgrey"}}>
                    <span>{info.seatType}</span>
                    <span> (</span>
                    <span >{info.ticketPrice}元</span>
                    <span>) </span>
                    <span>{info.ticketNum}&emsp;</span>
                </span>
            )
        }
    })



    return (<div>
        {ticketData}
    </div>)
}

export default TicketPriceBox;