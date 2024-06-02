from utils import newSqlSession

# Occasion 1: The user queries the possible train according to the startStation and endStation and StartDay

# input:
# {
#     "startStation":{string},
#     "endStation":{string},
#     "startDay":{string}
# }

# output:
# [
#     {
#         "trainNoOnly",
#         "trainNo",
#         "startStation",
#         "endStation",
#         "startTime",
#         "endTime",
#         "duration"
# 
#         "specialSeat",
#         "businessSeat",
#         "firstSeat",
#         "secondSeat",
#         "secondBoxSeat",
#        "secondSeatAndSecondBoxSeat",
#         "superSoftSleeper",
#         "softSleeper",
#         "fistSleeper",
#         "softSleeperAndFirstSleeper",
#         "highSleeper",
#         "hardSleeper",
#         "secondSleeper",
#         "secondSleeperAndHardSleeper",
#         "softSeat",
#         "hardSeat",
#         "noSeat",
#
#         "available"
#     }, ...
# ]

# TODO(BobHuangC): in the 1st-dev stage, we only have 一二等座 / 软硬座, 只显示这几种座位的有无
# TODO(BobHuangC): in the 1st-dev stage, we focus on the station rather than the city
# TODO(BobHuangC): the implementation is not efficient, we can optimize it later
def query(startStation, endStation, startDay):

    # 1. imitate the logic of buy to get the trainNoOnly, seatType, ticketPrice, testbit of all trains from startStation to endStation
    conn_1, cursor_1 = newSqlSession()
    cursor_1.execute(
        '''
        SELECT trainNoOnly, seatType, ticketPrice, testbit
        FROM Price
        WHERE startStation=%s AND endStation=%s
    ''',(startStation, endStation))
    result1 = cursor_1.fetchall()    


    # 2. add the startDays, startTime, endTime, duration to the result1
    for i in range(len(result1)):
        cursor_1.execute(
            '''
            SELECT DATE_FORMAT(trainDepartTime, '%%Y-%%m-%%d') as startDay, DATE_FORMAT(trainDepartTime, '%%H:%%i:%%s') as startTime, trainNo
            FROM TrainStation
            WHERE trainNoOnly=%s AND stationName=%s
        ''',(result1[i]['trainNoOnly'], startStation))
        result2 = cursor_1.fetchone()
        result1[i]['startDay'] = result2['startDay']
        result1[i]['startTime'] = result2['startTime']
        result1[i]['trainNo'] = result2['trainNo']

        cursor_1.execute(
            '''
            SELECT DATE_FORMAT(trainArriveTime, '%%Y-%%m-%%d %%H:%%i:%%s') as endTime
            FROM TrainStation
            WHERE trainNoOnly=%s AND stationName=%s
        ''',(result1[i]['trainNoOnly'], endStation))
        result2 = cursor_1.fetchone()
        result1[i]['endTime'] = result2['endTime']


    # 3. filter the trains that are not available on the startDay
    result1 = [result1[i] for i in range(len(result1)) if result1[i]['startDay'] == startDay]


    # 4. reorganize the result1, divide by the trainNoOnly
    result3 = {}
    for _ in result1:
        if _['trainNoOnly'] not in result3.keys():

            result3[_['trainNoOnly']] = {'trainNoOnly':_['trainNoOnly'], 'startStation':startStation, 'endStation':endStation, 
                              'startTime':_['startTime'], 'endTime':_['endTime'], 'duration':None, 'trainNo':_['trainNo']}            

        
        # (BobHuangC) add the logic using testbit to test whether the seatType exists
        # first to set it as '无', then to use the testbit to test whether it is available
        if _['seatType'] == '一等座':
            cursor_1.execute(
                '''
                SELECT bitmap
                FROM Seat
                WHERE trainNoOnly=%s AND bitmap&%s=%s AND seatType=%s
            ''', (_['trainNoOnly'], int.from_bytes(_['testbit'], byteorder='big'), int.from_bytes(_['testbit'], byteorder='big'), _['seatType']))
            result4 = cursor_1.fetchone()
            if result4:
                result3[_['trainNoOnly']]['firstSeat'] = '有'
            else:
                result3[_['trainNoOnly']]['firstSeat'] = '无'
        elif _['seatType'] == '二等座':
            cursor_1.execute(
                '''
                SELECT bitmap
                FROM Seat
                WHERE trainNoOnly=%s AND bitmap&%s=%s AND seatType=%s
            ''', (_['trainNoOnly'], int.from_bytes(_['testbit'], byteorder='big'), int.from_bytes(_['testbit'], byteorder='big'), _['seatType']))
            result4 = cursor_1.fetchone()
            if result4:
                result3[_['trainNoOnly']]['secondSeat'] = '有'
            else:
                result3[_['trainNoOnly']]['secondSeat'] = '无'
        elif _['seatType'] == '软座':
            cursor_1.execute(
                '''
                SELECT bitmap
                FROM Seat
                WHERE trainNoOnly=%s AND bitmap&%s=%s AND seatType=%s
            ''', (_['trainNoOnly'], int.from_bytes(_['testbit'], byteorder='big'), int.from_bytes(_['testbit'], byteorder='big'), _['seatType']))
            result4 = cursor_1.fetchone()
            if result4:
                result3[_['trainNoOnly']]['softSeat'] = '有'
            else:
                result3[_['trainNoOnly']]['softSeat'] = '无'
        elif _['seatType'] == '硬座':
            cursor_1.execute(
                '''
                SELECT bitmap
                FROM Seat
                WHERE trainNoOnly=%s AND bitmap&%s=%s AND seatType=%s
            ''', (_['trainNoOnly'], int.from_bytes(_['testbit'], byteorder='big'), int.from_bytes(_['testbit'], byteorder='big'), _['seatType']))
            result4 = cursor_1.fetchone()
            if result4:
                result3[_['trainNoOnly']]['hardSeat'] = '有'
            else:
                result3[_['trainNoOnly']]['hardSeat'] = '无'
    
    cursor_1.close()
    conn_1.close()

    # 5. calculate the duration of each train
    from datetime import datetime
    for _ in result3.values():
        startTime = datetime.strptime(startDay+_['startTime'], '%Y-%m-%d%H:%M:%S')
        endTime = datetime.strptime(_['endTime'], '%Y-%m-%d %H:%M:%S')
        # TODO(BobHuangC) : this might exists some bugs if the duration is negative(but the negative duration itself is a bug)
        _['duration'] = f'{(endTime-startTime).seconds//3600}时{(endTime-startTime).seconds%3600//60}分'


    # 6. reorganize the results into a list
    result4 = list(result3.values())

    # 7. add the availale for each train in result4
    # TODO(BobHuangC): in the 1st-dev stage, we only have 一二等座 / 软硬座, thus the following judge condition only judge the availablity of these seats
    for _train in result4:
        _train['available'] = True if (
            ('firstSeat' in _train.keys() and _train['firstSeat'] == '有')
            or ('secondSeat' in _train.keys() and _train['secondSeat'] == '有')
            or ('softSeat' in _train.keys() and _train['softSeat'] == '有')
            or ('hardSeat' in _train.keys() and _train['hardSeat'] == '有')
            ) else False
        
    # BobHuangC:
    # fix the format for start time and end time
    # only show hour: miniute
    for _ in result4:
        
        _['startTime'] = _['startTime'][-8:-3]
        _['endTime'] = _['endTime'][-8:-3]

    return result4

def queryByList(startStationList, endStationList, startDay):
    result = []
    for st in startStationList:
        for ed in endStationList:
            result+= query(st, ed, startDay)
    return result

def queryStationByCity(cityName):
    if (cityName[-1] == '站'):
        return [cityName]
    result = []
    conn_1, cursor_1 = newSqlSession()
    cursor_1.execute(
        '''
        SELECT stationName
        FROM Station
        WHERE cityName=%s
    ''',(cityName[:-1]))
    while True:
        result1 = cursor_1.fetchone()
        if result1 == None:
            break
        result.append(result1['stationName'])
    conn_1.close()
    return (result)  

def query2(start, end, startDay):
    startStationList = queryStationByCity(start)
    endStationList = queryStationByCity(end)
    return queryByList(startStationList, endStationList, startDay)

if __name__ == '__main__':
    print(query("北京北站", "上海虹桥站", "2024-05-25"))
    