import dayjs from 'dayjs';


function describeDate(inputDate) {
    // 将输入转换为 dayjs 对象
    const date = (inputDate).startOf('day');
    // 获取今天的日期
    const today = dayjs().startOf('day');
    // 计算差异（以天为单位）
    const diff = date.diff(today, 'day');

    switch (diff) {
        case 0:
            return '今天';
        case 1:
            return '明天';
        case 2:
            return '后天';
        default:
            return `${diff}天后`;
    }
}



const DateDiffBox = (props)=>{
    const selectedDate = props.date;
    const dateDiff = describeDate(selectedDate);


    return (<spanp> {dateDiff}</spanp>)
}

export default DateDiffBox;