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

    # 1. imitate the logic of buy to get the trainNoOnly, seatTYpe, ticketPrice, testbit of all trains from startStation to endStation
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
            SELECT DATE_FORMAT(trainDepartTime, '%%Y-%%m-%%d') as startDay, DATE_FORMAT(trainDepartTime, '%%H:%%i:%%s') as startTime
            FROM TrainStation
            WHERE trainNoOnly=%s AND stationName=%s
        ''',(result1[i]['trainNoOnly'], startStation))
        result2 = cursor_1.fetchone()
        result1[i]['startDay'] = result2['startDay']
        result1[i]['startTime'] = result2['startTime']

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
                              'startTime':_['startTime'], 'endTime':_['endTime'], 'duration':None,}            

            
        if _['seatType'] == '一等座':
            result3[_['trainNoOnly']]['firstSeat'] = '有'
        elif _['seatType'] == '二等座':
            result3[_['trainNoOnly']]['secondSeat'] = '有'
        elif _['seatType'] == '软座':
            result3[_['trainNoOnly']]['softSeat'] = '有'
        elif _['seatType'] == '硬座':
            result3[_['trainNoOnly']]['hardSeat'] = '有'
    
    cursor_1.close()
    conn_1.close()

    # 5. calculate the duration of each train
    from datetime import datetime
    for _ in result3.values():
        startTime = datetime.strptime(startDay+_['startTime'], '%Y-%m-%d%H:%M:%S')
        endTime = datetime.strptime(_['endTime'], '%Y-%m-%d %H:%M:%S')
        # TODO(BobHuangC) : this might exists some bugs if the duration is negative(but the negative duration itself is a bug)
        _['duration'] = f'{(endTime-startTime).seconds//3600}小时{(endTime-startTime).seconds%3600//60}分钟'


    # 6. reorganize the results into a list
    result4 = list(result3.values())

    # 7. add the availale for each train in result4
    # TODO(BobHuangC): in the 1st-dev stage, we only have 一二等座 / 软硬座, thus the following judge condition only judge the availablity of these seats
    for _train in result4:
        _train['availale'] = True if (
            'firstSeat' in _train.keys() 
            or 'secondSeat' in _train.keys() 
            or 'softSeat' in _train.keys() 
            or 'hardSeat' in _train.keys()) else False

    return result4