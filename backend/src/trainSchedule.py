from utils import newSqlSession

# get the train schedule
def trainSchedule(trainNoOnly):
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
    # return result

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
    print(trainSchedule('K666_1'))
