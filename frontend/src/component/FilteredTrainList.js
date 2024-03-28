import Checkbox from "antd/es/checkbox/Checkbox";
import {useState} from "react";
import {Content} from "antd/es/layout/layout";
import TrainList from "./TrainList";

const FilteredTrainList = (props) =>{
    const trainInfo = props.trainInfo;
    
    const trainTypeOptions = [
        {label: 'GC-高铁/城际', value: 'G',}, 
        {label: 'D-动车', value: 'D',}, 
        {label: 'Z-直达', value: 'Z',}, 
        {label: 'T-特快', value: 'T',}, 
        {label: 'K-快速', value: 'K',}, 
        {label: '其他', value: 'Q',}
    ]

    const startStationOptions = (props.trainInfo?.map(train => ({
        label: train.startStation,
        value: train.startStation,
    }))) || [];

    const endStationOptions = (props.trainInfo?.map(train => ({
        label: train.endStation,
        value: train.endStation,
    }))) || [];


    const seatTypeOptions = [
    {label: '特等座', value: 'specialSeat',},
    {label: '商务座', value: 'businessSeat',},
    {label: '特等座/商务座', value: 'specialSeatAndBusinessSeat',},
    {label: '一等座', value: 'firstSeat',},
    {label: '二等座', value: 'secondSeat',},
    {label: '二等包座', value: 'secondBoxSeat',},
    {label: '二等座/二等包座', value: 'secondSeatAndSecondBoxSeat',},
    {label: '高级软卧', value: 'superSoftSleeper',},
    {label: '一等卧', value: 'fistSleeper',},
    {label: '软卧/一等卧', value: 'softSleeperAndFirstSleeper',},
    {label: '动卧', value: 'highSleeper',},
    {label: '硬卧', value: 'hardSleeper',},
    {label: '二等卧', value: 'secondSleeper',},
    {label: '硬卧/二等卧', value: 'secondSleeperAndHardSleeper',},
    {label: '软座', value: 'softSeat',},
    {label: '硬座', value: 'hardSeat',},
    {label: '无座', value: 'noSeat',},
    ]



    const [selectedTrainTypes, setSelectedTrainTypes] = useState(trainTypeOptions.map(option => option.value));
    const [selectedStartStations, setSelectedStartStations] = useState(startStationOptions.map(option => option.value));
    const [selectedEndStations, setSelectedEndStations] = useState(endStationOptions.map(option => option.value));
    const [selectedSeatTypes, setSelectedSeatTypes] = useState(seatTypeOptions.map(option => option.value));


    const handleTrainTypeChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
        setSelectedTrainTypes(checkedValues);
    }
    
    const handleStartStationChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
        setSelectedStartStations(checkedValues);
    }
    const handleEndStationChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
        setSelectedEndStations(checkedValues);
    }

    const handleSeatTypeChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
        setSelectedSeatTypes(checkedValues);
    }


    function getFilterInfo(inputTrainInfo) {
        return inputTrainInfo 
            ? inputTrainInfo.filter(
                info => {
                    console.log("Available of fileterInfo: ", info.available)
                    return selectedTrainTypes.some(type => info.trainNo.startsWith(type)) 
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
                    


                }
            )
            : []; // return an empty array if trainInfo is null
    }





    return(
        <Content>
        <div>
        车次类型: <Checkbox.Group options={trainTypeOptions} defaultValue={trainTypeOptions.map(option => option.value)} onChange={handleTrainTypeChange} />
        </div>
        <div>
        出发站: <Checkbox.Group options={startStationOptions} defaultValue={startStationOptions.map(option => option.value)} onChange={handleStartStationChange} />
        </div>
        <div>
        到达站: <Checkbox.Group options={endStationOptions} defaultValue={endStationOptions.map(option => option.value)} onChange={handleEndStationChange} />
        </div>
        <div>
        车次席别: <Checkbox.Group options={seatTypeOptions} defaultValue={seatTypeOptions.map(option => option.value)} onChange={handleSeatTypeChange} />
        </div>
    <div>
        <TrainList trainInfo={getFilterInfo(trainInfo)}/>
    </div>
</Content>

    )
}

export default FilteredTrainList;