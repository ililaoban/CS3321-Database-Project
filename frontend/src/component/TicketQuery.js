import {Button, Col, DatePicker, Popover, Row, message} from "antd";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import dayjs from 'dayjs';
import CityStationSelector from "./CityStationSelector"
//import {getCityStationList} from "../train";
import DateDiffBox from "./DateDiffBox"
import axios from "axios";

const textStyle = {textAlign:"center"}
const apiUrl = process.env.REACT_APP_BASE_URL




const TicketQuery = (props) =>{


    //start and end
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [date, setDate] = useState(dayjs())
    const [options, setOptions] = useState(null)
    const [messageApi, contextHolder] = message.useMessage();

    function swapStartEnd(){
        const tmp = end
        setEnd(start);
        setStart(tmp);
    }

    const stations2options = (stations) =>{
        const options = stations.map(province=>({
                value:province.provinceName,
                label:province.provinceName,
                children: province.children.map(
                    city=>({
                            value:city.cityName,
                            label:city.cityName,
                            children:city.children.map(
                                station=>({
                                        value:station.stationName,
                                        label:station.stationName
                                })
                        )
                    })
            )
        }))

        return options;
    }

    const getCityStationList = () =>{
        axios.post(apiUrl+'/cityStationList')
            .then(
                res=> res.data)
            .then(
                stations =>{
                    //console.log(stations);
                    const options =stations2options(stations);
                    //console.log("options is ", options)
                    setOptions(options)
                }
            ).catch(error=>{
            console.error(error);
        })
    }

    useEffect(() => {
        const savedStart = JSON.parse(sessionStorage.getItem('start'));
        if (savedStart){
            setStart(savedStart)
        }else{
            setStart("北京南站")
        }
        const savedEnd = JSON.parse(sessionStorage.getItem("end"));
        if (savedEnd){
            setEnd(savedEnd)
        }else{
            setEnd("上海东站")
        }
        const savedDate = (sessionStorage.getItem("date"));
        if (savedDate){
            setDate(dayjs(savedDate))
        }else{
            setDate(dayjs());
        }

        // getCityStationList().then(options=>{
        //     setOptions(options);
        // })



    }, []);


    useEffect(() => {
        getCityStationList();
    }, []);

    useEffect(()=>{
        if (start)
        {
            const serializedStart = JSON.stringify(start);
            sessionStorage.setItem('start', serializedStart)
        }

    },[start]);

    useEffect(()=>{
        if (end)
        {
            const serializedEnd = JSON.stringify(end);
            sessionStorage.setItem('end', serializedEnd)
        }

    },[end]);




    return (
        <div style={{width: "250px", padding: "25px", backgroundColor: "white", height: "210px"}}>

            <Row style={{marginBottom:20}}>
                <Col span={17} style={{paddingLeft:0}}>
                    <div style={{marginBottom:20}}>
                    <span style={{
                                    color: "#3b98fa",
                                    borderWidth: 3,
                                    borderStyle: "solid",
                                    borderRadius: 5,
                                    padding: 2,
                                    fontWeight: 600
                                }}>
                出发
            </span>
                        &ensp;
                        <Popover content={<CityStationSelector setStation={setStart} options={options}/>}>
                        <span style={{textAlign: "left", fontWeight:700}}>{start}</span>
                    </Popover>
                    </div>
                    <div>
                        <span style={{
                                        color: "#ffcc00",
                                        borderWidth: 3,
                                        borderStyle: "solid",
                                        borderRadius: 5,
                                        padding: 2,
                                        fontWeight: 600
                                    }}>
                到达
            </span>&ensp;
                        <Popover content={<CityStationSelector setStation={setEnd} options={options}/>}>
                            <span style={{textAlign: "left",fontWeight:700}}>{end}</span>
                        </Popover>
                    </div>


                </Col>

                <Col span={5}>
                    <Button onClick={swapStartEnd}
                            style={{backgroundColor: "transparent", height: "auto", padding: "0", border: 0}}>
                        <img src="exchange.png" style={{width: "50px", margin: "0"}}/>
                    </Button>
                </Col>
            </Row>
            <Row style={{marginTop: "5px"}}>
                <Col span={24}>
                    <DatePicker
                        style={{width: "120px"}}
                        defaultValue={dayjs()}
                        value={date}
                        //minDate={dayjs()}
                        //maxDate={dayjs().add(14, 'day')}
                        onChange={(date, dateString) => {
                            console.log(dateString)
                            if (date) {
                                setDate(date)
                                const serializedDate = date.toISOString();
                                sessionStorage.setItem('date', serializedDate);
                            }
                        }}
                    />
                    &ensp;&ensp;
                    <DateDiffBox date={date}/>
                </Col>
            </Row>
            <Row style={{marginTop: "5px"}}>
                <Col span={24}>
                    {contextHolder}

                    <Button style={{width: "100%", marginTop: "10px", backgroundColor: "#3b97f8", color: "white"}}
                            onClick={() => {
                                if (start == end)
                                    messageApi.info('始发站与终到站不可相同！');
                                else{

                                    props.updateTrainInfo(start, end, date)
                                }
                            }}
                    >
                        查询车票
                    </Button>
                </Col>
            </Row>

        </div>
    )
}

export default TicketQuery;