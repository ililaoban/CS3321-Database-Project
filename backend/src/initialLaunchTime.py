from utils import newSqlSession


# Query the ticket based on trainNoOnly rather than trainNo, the time is redundant
def initialLaunchTime_1(trainNoOnly):
    """
    Occasion 5.1 The user queries the train timetable based on the trainNoOnly
    
    input: 
    {
        "trainNoOnly":{string},
    }

    output:
    {
    "trainNo": {string},
    "initialLaunchTime": "08:00",
    "stations": [
        {
            "stationOrder": "01",
            "stationName": "上海",
            "trainArriveTime": "01:57",
            "trainDepartTime": "01:57",
            "stopTime": "----"
        },
        {
            "stationOrder": "02",
            "stationName": "苏州",
            "trainArriveTime": "02:51",
            "trainDepartTime": "02:56",
            "stopTime": "5分钟"
        },
        ]
    }
    
    """

    


    conn, cursor = newSqlSession()
    cursor.execute('''
    SELECT trainNoOnly,stationName, stationOrder, trainNo,DATE_FORMAT(trainArriveTime, '%%Y-%%m-%%d %%H:%%i:%%s') as trainArriveTime, DATE_FORMAT(trainDepartTime, '%%Y-%%m-%%d %%H:%%i:%%s') as trainDepartTime, TIME_FORMAT(TIMEDIFF(trainDepartTime, trainArriveTime), '%%H小时%%i分钟%%s秒') as stopTime
    FROM TrainStation
    WHERE trainNoOnly=%s
    ORDER BY stationOrder
    ''', (trainNoOnly))
    result = cursor.fetchall()
    cursor.close()
    conn.close()

    # result time fix
    for i in result:
        if i['stopTime'] == None:
            pass
        elif i['stopTime'].startswith('00小时00分钟'):
            i['stopTime'] = i['stopTime'][8:]
        elif i['stopTime'].startswith('00小时'):
            i['stopTime'] = i['stopTime'][4:]


    res = {}
    res['trainNoOnly'] = result[0]['trainNoOnly']
    res['stations'] = []
    for i in result:
        res['stations'].append({
            'stationOrder': i['stationOrder'],
            'stationName': i['stationName'],
            'trainArriveTime': '--' if i['trainArriveTime'] == None else i['trainArriveTime'],
            'trainDepartTime': '--' if i['trainDepartTime'] == None else i['trainDepartTime'],
            'stopTime': '--' if i['stopTime'] == None else i['stopTime']
        })
    res['initialLaunchTime'] = res['stations'][0]['trainDepartTime']

    return res






# get the train schedule
def initialLaunchTime_2(trainNoOnly):
    """
    Occasion 5.2 The user queries the train timetable based on the trainNoOnly
    
    input:
    {
        "trainNoOnly":{string},
    }

    output:
    {
    "trainNo": {string},
    "stations": [
        {
            "stationOrder": "01",
            "stationName": "上海",
            "trainArriveTime": "01:57",
            "trainDepartTime": "01:57",
            "stopTime": "----"
        },
        {
            "stationOrder": "02",
            "stationName": "苏州",
            "trainArriveTime": "02:51",
            "trainDepartTime": "02:56",
            "stopTime": "5分钟"
        },
        ]
    }
    """


    conn, cursor = newSqlSession()
    cursor.execute('''
    SELECT trainNoOnly,stationName, stationOrder, trainNo,DATE_FORMAT(trainArriveTime, '%%H:%%i') as trainArriveTime, DATE_FORMAT(trainDepartTime, '%%H:%%i') as trainDepartTime, TIME_FORMAT(TIMEDIFF(trainDepartTime, trainArriveTime), '%%H小时%%i分钟%%s秒') as stopTime
    FROM TrainStation
    WHERE trainNoOnly=%s
    ORDER BY stationOrder
    ''', (trainNoOnly))
    result = cursor.fetchall()
    cursor.close()
    conn.close()

    # result time fix
    for i in result:
        if i['stopTime'] == None:
            pass
        elif i['stopTime'].startswith('00小时00分钟'):
            i['stopTime'] = i['stopTime'][8:]
        elif i['stopTime'].startswith('00小时'):
            i['stopTime'] = i['stopTime'][4:]


    res = {}
    res['trainNoOnly'] = result[0]['trainNoOnly']
    res['stations'] = []
    for i in result:
        res['stations'].append({
            'stationOrder': i['stationOrder'],
            'stationName': i['stationName'],
            'trainArriveTime': '--' if i['trainArriveTime'] == None else i['trainArriveTime'],
            'trainDepartTime': '--' if i['trainDepartTime'] == None else i['trainDepartTime'],
            'stopTime': '--' if i['stopTime'] == None else i['stopTime']
        })

    return res


if __name__ == "__main__":
    print(initialLaunchTime_1('K666_1'))
    print(initialLaunchTime_2('K666_1'))
