import Checkbox from "antd/es/checkbox/Checkbox";
import {useState, useEffect} from "react";
import {Content} from "antd/es/layout/layout";
import TrainList from "./TrainList";

const trainTypeOptions = [
    {label: 'GC-高铁/城际', value: 'G',},
    {label: 'D-动车', value: 'D',},
    {label: 'Z-直达', value: 'Z',},
    {label: 'T-特快', value: 'T',},
    {label: 'K-快速', value: 'K',},
    {label: '其他', value: 'Q',}
]

const seatTypeOptions = [
    // {label: '特等座', value: 'specialSeat',},
    // {label: '商务座', value: 'businessSeat',},
    {label: '特等座/商务座', value: 'specialSeatAndBusinessSeat',},
    {label: '一等座', value: 'firstSeat',},
    // {label: '二等座', value: 'secondSeat',},
    // {label: '二等包座', value: 'secondBoxSeat',},
    {label: '二等座/二等包座', value: 'secondSeatAndSecondBoxSeat',},
    {label: '高级软卧', value: 'superSoftSleeper',},
    // {label: '一等卧', value: 'fistSleeper',},
    {label: '软卧/一等卧', value: 'softSleeperAndFirstSleeper',},
    {label: '动卧', value: 'highSleeper',},
    // {label: '硬卧', value: 'hardSleeper',},
    // {label: '二等卧', value: 'secondSleeper',},
    {label: '硬卧/二等卧', value: 'secondSleeperAndHardSleeper',},
    {label: '软座', value: 'softSeat',},
    {label: '硬座', value: 'hardSeat',},
    {label: '无座', value: 'noSeat',},
]





// 接受参数 列表startStations, endStations, setInfo, trainInfo

const FilterBar = (props)=>{
    const startStations = props.startStations;
    const endStations = props.endStations;
    const trainInfo = props.trainInfo;
    const trainInfoUpdater = props.trainInfoUpdater
    //console.log("1.1trainInfo is:",props.trainInfo);

    // var selectedTrainTypes =trainTypeOptions.map(option => option.value);
    // var selectedStartStations = [];
    // var selectedEndStations = [];
    // var selectedSeatTypes = seatTypeOptions.map(option => option.value);
    // var filterInfo = [];
    const [selectedTrainTypes, setSelectedTrainTypes] = useState(trainTypeOptions.map(option => option.value));
    const [selectedStartStations, setSelectedStartStations] = useState(startStations);
    const [selectedEndStations, setSelectedEndStations] = useState(endStations);
    const [selectedSeatTypes, setSelectedSeatTypes] = useState(seatTypeOptions.map(option => option.value));
    //const [isFirstRender, setIsFirstRender] = useState(true);

    //const [filteredInfo, setFilteredInfo] = useState([]);

    function getFilterInfo() {
        console.log("Begin filtering.");
        console.log("1.2 trainInfo is:",props.trainInfo);
        let filterInfo1 =  trainInfo
            ? trainInfo.filter(
                info => {
                    // console.log("Available of fileterInfo: ", info.available)
                    //console.log("info startstations is ", info.startStation)
                    console.log("startStations is: ", selectedStartStations)
                    console.log("endStations is: ", selectedEndStations)

                    return (
                    selectedTrainTypes.some(type => info.trainNo.startsWith(type))
                        &&
                        selectedStartStations.includes(info.startStation)
                        &&
                        selectedEndStations.includes(info.endStation)
                       &&
                        (
                            (selectedSeatTypes.includes('specialSeat') &&  (info.softSeat === '有' || !isNaN(info.softSeat)))
                            || (selectedSeatTypes.includes('businessSeat') &&  (info.businessSeat === '有' || !isNaN(info.businessSeat)))
                            || (selectedSeatTypes.includes('specialSeatAndBusinessSeat') &&  ((info.specialSeatAndBusinessSeat === '有' || !isNaN(info.specialSeatAndBusinessSeat)) ))
                            || (selectedSeatTypes.includes('firstSeat') &&  (info.firstSeat === '有' || !isNaN(info.firstSeat)))
                            || (selectedSeatTypes.includes('secondSeat') &&  (info.secondSeat === '有' || !isNaN(info.secondSeat)))
                            || (selectedSeatTypes.includes('secondBoxSeat') &&  (info.secondBoxSeat === '有' || !isNaN(info.secondBoxSeat)))
                            || (selectedSeatTypes.includes('secondSeatAndSecondBoxSeat') &&  ((info.secondSeatAndSecondBoxSeat === '有' || !isNaN(info.secondSeatAndSecondBoxSeat))))
                            || (selectedSeatTypes.includes('superSoftSleeper') &&  (info.superSoftSleeper === '有' || !isNaN(info.superSoftSleeper)))
                            || (selectedSeatTypes.includes('fistSleeper') &&  (info.fistSleeper === '有' || !isNaN(info.fistSleeper)))
                            || (selectedSeatTypes.includes('softSleeperAndFirstSleeper') &&  ((info.softSleeperAndFirstSleeper === '有' || !isNaN(info.softSleeperAndFirstSleeper))))
                            || (selectedSeatTypes.includes('highSleeper') &&  (info.highSleeper === '有' || !isNaN(info.highSleeper)))
                            || (selectedSeatTypes.includes('hardSleeper') &&  (info.hardSleeper === '有' || !isNaN(info.hardSleeper)))
                            || (selectedSeatTypes.includes('secondSleeper') &&  (info.secondSleeper === '有' || !isNaN(info.secondSleeper)))
                            || (selectedSeatTypes.includes('secondSleeperAndHardSleeper') &&  ((info.secondSleeperAndHardSleeper === '有' || !isNaN(info.secondSleeperAndHardSleeper))))
                            || (selectedSeatTypes.includes('softSeat') &&  (info.softSeat === '有' || !isNaN(info.softSeat)))
                            || (selectedSeatTypes.includes('hardSeat') &&  (info.hardSeat === '有' || !isNaN(info.hardSeat)))
                            || (selectedSeatTypes.includes('noSeat') &&  (info.noSeat === '有' || !isNaN(info.noSeat)))
                        )


                    )
                }
            )
            : []; // return an empty array if trainInfo is null

        return (filterInfo1);
    };
    useEffect(()=>{
        //console.log("props startstions has changed to", startStations);
        setSelectedStartStations(startStations);

    },[startStations])

     useEffect(()=>{
         if (trainInfo)
         trainInfoUpdater(getFilterInfo());
     },[selectedStartStations, selectedEndStations, selectedSeatTypes, selectedTrainTypes]);



    useEffect(()=>{
        setSelectedEndStations(endStations);
    }, [endStations])

    return (<div style={{backgroundColor: "white", padding: 20, marginBottom: 15, borderRadius: 10}}>
        车次类型: <Checkbox.Group options={trainTypeOptions} defaultValue={trainTypeOptions.map(option => option.value)}
                                  onChange={ (checkedValues) => {
                                      console.log('checked = ', checkedValues);
                                      setSelectedTrainTypes(checkedValues);
                                      //getFilterInfo();
                                      //console.log("filterinfo:", filterInfo);
                                      //trainInfoUpdater(filterInfo);
                                  }}/>
        <br/>
        出发车站: <Checkbox.Group key={`start-${startStations.join('-')}`} value={selectedStartStations}
                                  onChange={(checkedValues) => {
                                      console.log('checked = ', checkedValues);
                                      setSelectedStartStations(checkedValues);
                                      //console.log("selectedstations is ", selectedStartStations);
                                        //getFilterInfo();
                                        //console.log("filterinfo:", filterInfo);
                                        //trainInfoUpdater(filterInfo);
                                  }}>
        {props.startStations?.map(station=> (<Checkbox key={station+"s"} value={station}>{station}</Checkbox>))}

    </Checkbox.Group>

        <br/>
        到达车站: <Checkbox.Group key={`end-${endStations.join('-')}`}
                        defaultValue={endStations}
                        onChange={(checkedValues) => {
                            console.log('checked = ', checkedValues);
                            setSelectedEndStations(checkedValues);
                         //console.log("2.1 selectedstations is ", selectedStartStations);
                            //getFilterInfo();
                            //console.log("filterinfo:", filterInfo);
                             //trainInfoUpdater(filterInfo);
        }}>
            {props.endStations?.map(station=> (<Checkbox key={station+"e"} value={station}>{station}</Checkbox>))}

        </Checkbox.Group>
        <br/>
        车次席别: <Checkbox.Group options={seatTypeOptions} defaultValue={seatTypeOptions.map(option => option.value)}
                                  onChange={ (checkedValues) => {
                                      console.log('checked = ', checkedValues);
                                      setSelectedSeatTypes(checkedValues);
                                      //trainInfoUpdater(getFilterInfo());
                                  }}/>

    </div>)

}


export default FilterBar;