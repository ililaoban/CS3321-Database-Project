import Checkbox from "antd/es/checkbox/Checkbox";
import {useState, useEffect, useMemo} from "react";
import {Content} from "antd/es/layout/layout";
import TrainList from "./TrainList";
import FilterBar from "./FilterBar";




const FilteredTrainList_2 = (props) => {
    const trainInfo = props.trainInfo;
    const [filteredInfo, setFilteredInfo] = useState(props.trainInfo);


    const startStations = useMemo(() => {
        return Array.from(new Set(props.trainInfo?.map(train => train.startStation))) || [];
    }, [props.trainInfo]);

    const endStations = useMemo(() => {
        return Array.from(new Set(props.trainInfo?.map(train => train.endStation))) || [];
    }, [props.trainInfo]);

    // const startStations = (props.trainInfo?.map(train => (
    //     train.startStation
    // ))) || [];

    // const startStations = Array.from(new Set(props.trainInfo?.map(train => (
    //     train.startStation
    // )))) || [];

    // const endStations = Array.from(new Set(props.trainInfo?.map(train => (train.endStation
    // )))) || [];

    //console.log("startStations? : ", startStations);

    useEffect(()=>{
         console.log("trainInfo changed");
    },[trainInfo])

    return (
        <div>
            <FilterBar trainInfoUpdater={setFilteredInfo}
                       trainInfo={trainInfo}
                       startStations={startStations}
                       endStations={endStations}

            />
            <TrainList trainInfo={filteredInfo} />
        </div>
    )

}

export default FilteredTrainList_2;