

export async function getUserTicketList(id){
    return [{
        start: "锦州南", end: "北京西", trainNo: "G1202", date: "2024-02-22", time: "13:01", passenger: "苏展",
        seatLevel: "二等座", coachNo: "14", //车厢号
        seatNo: "16D", //座位号
        ticketType: "学生票", price: "597.0", ticketState: "已出站"
    },{
        start: "锦州南", end: "上海虹桥", trainNo: "G1203", date: "2024-02-22", time: "13:01", passenger: "苏展",
        seatLevel: "二等座", coachNo: "14", //车厢号
        seatNo: "16D", //座位号
        ticketType: "学生票", price: "597.0", ticketState: "已出站"
    }];

}

export async function queryTrain(condition){
    const trainInfo = [{trainNo:"K666", startStation:"锦州", endStation:"上海", startTime:"今天", EndTime:"明天",
        duration:"15小时", highSleeper:"15",softSeat:"售罄"},
        {trainNo:"K6647", startStation:"北京", endStation:"上海", startTime:"今天", EndTime:"明天",
            duration:"15小时", softSleeper:"13",highSleeper:"15",softSeat:"售罄"}]
    return trainInfo
}


export async function getTrainSchedule(trainId){
    const data = [
        {"stationOrder": "01", "stationName": "上海", "arriveTime": "01:57", "leaveTime": "01:57", "remainTime": "----"},
        {"stationOrder": "02", "stationName": "苏州", "arriveTime": "02:51", "leaveTime": "02:56", "remainTime": "5"},
        {"stationOrder": "03", "stationName": "无锡", "arriveTime": "03:24", "leaveTime": "03:30", "remainTime": "6"},
        {"stationOrder": "04", "stationName": "常州", "arriveTime": "03:57", "leaveTime": "04:02", "remainTime": "5"},
        {"stationOrder": "05", "stationName": "南京", "arriveTime": "06:08", "leaveTime": "06:19", "remainTime": "11"},
        {"stationOrder": "06", "stationName": "镇江", "arriveTime": "08:31", "leaveTime": "08:34", "remainTime": "3"},
        {"stationOrder": "07", "stationName": "淮安", "arriveTime": "09:30", "leaveTime": "09:33", "remainTime": "3"},
        {"stationOrder": "08", "stationName": "连云港", "arriveTime": "11:45", "leaveTime": "12:18", "remainTime": "33"}
    ]

    return data;
}


export async function getAvailableTicketInfo(tranId){
    const ticketInfo = {
        startStation: "上海", endStation: "锦州", startDate: "2024-02-28", startTime:"20:08",dayOfWeek: "周三",
        trainNo:"K188", endTime:"18:23", priceInfo: [
            {
                key:1,
                seatType:"硬座",
                available:true,
                ticketNum:"有票",
                ticketPrice:"120元"},{
                key:2,
                seatType:"硬卧",
                available:false,
                ticketNum:"无票",
                ticketPrice:"上铺120元 中铺130元 下铺140元"
            }]}
    return ticketInfo
}


export async function getPassengerInfo(userId){
    const passengerInfo =[ {idNo:1, passengerName:"李四"},
        {idNo:2, passengerName: '李三'},
        {idNo:323454321, passengerName: "周康qqqq"}
    ]
    return passengerInfo;
}