import React from 'react';
import { Cascader } from 'antd';


const filter = (inputValue, path) =>
    path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
const CityStationSelector = (props) => {
    const onChange = (value, selectedOptions) => {
        console.log(value[2], selectedOptions);
        props.setStation(value[2])
    };

    return (<Cascader
        options={props.options}
        onChange={onChange}
        placeholder="请选择"
        showSearch={{
            filter,
        }}
        onSearch={(value) => console.log(value)}
    />
)};
export default CityStationSelector;