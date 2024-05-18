from utils import newSqlSession, number_to_day_of_week


def availableTicketQuery(trainNoOnly, startStation, endStation):
    """
    Occasion 11: Query the available tickets

    input:
    {
        "trainNoOnly":{string},
        "startStation":{string},
        "endStation":{string},
    }

    output:
    {
        "startDate" : {string},
        "startTime" : {string},
        "dayOfWeek" : {string},
        "trainNo" : {string},
        "endTime" : {string},
        "priceInfo" : [
            {
                "seatType",
                "availableSeats": {true or false},
                "ticketPrice"
            }, ...
        ]
    }

    
    output example:
    {  
        startDate: "2024-02-28", 
        startTime:"20:08",
        dayOfWeek: "周三",
        trainNo:trainNoOnly||"K188", 
        endTime:"18:23",
        "priceInfo":[
            {
                seatType:"硬座",
                availableSeats:"有", //有余票
                ticketPrice:"120元"},
            {
                seatType:"硬卧",
                availableSeats:"无",//无余票
                ticketPrice:"120元"
            }, ...
        ]
    }
    """



    conn, cursor = newSqlSession()
    cursor.execute('''
    SELECT seatType, ticketPrice, testbit
    FROM Price
    WHERE trainNoOnly = %s AND startStation = %s AND endStation = %s
    ''', (trainNoOnly, startStation, endStation))
    result = cursor.fetchall()

    for i in range(len(result)):
        result[i]['ticketPrice'] = float(result[i]['ticketPrice'])    




    # get the available property
    for i in range(len(result)):
        cursor.execute('''
        SELECT bitmap
        FROM Seat
        WHERE trainNoOnly = %s AND bitmap& %s = %s 
        ''', (trainNoOnly, int.from_bytes(result[i]['testbit'], byteorder='big'), int.from_bytes(result[i]['testbit'], byteorder='big')))
        result_2 = cursor.fetchone()
        if not result_2:
            result[i]['availableSeats'] = "无"
        else:
            result[i]['availableSeats'] = "有"
    

    
    # drop the testbit key
    for i in range(len(result)):
        result[i].pop('testbit')

    result = dict(priceInfo = result)

    
    # based on the start Station to get the start time
    cursor.execute('''
    SELECT DATE_FORMAT(trainDepartTime, '%%Y-%%m-%%d') as startDate, DATE_FORMAT(trainDepartTime, '%%H:%%i') as startTime, DAYOFWEEK(trainDepartTime) as dayOfWeek, trainNo
    FROM TrainStation
    WHERE trainNoOnly = %s AND stationName = %s
    ''', (trainNoOnly, startStation)) 

    result_3 = cursor.fetchone()
    result['startDate'] = result_3['startDate']
    result['startTime'] = result_3['startTime']
    result['dayOfWeek'] = number_to_day_of_week(result_3['dayOfWeek'])
    # TODO(BobHuangC) : in the 1-st dev stage, we only use the trainNoOnly (no trainNo)
    result['trainNo'] = trainNoOnly

    # based on the end Station to get the end time
    cursor.execute('''
    SELECT DATE_FORMAT(trainArriveTime, '%%H:%%i') as endTime
    FROM TrainStation
    WHERE trainNoOnly = %s AND stationName = %s
    ''', (trainNoOnly, endStation))
    result_4 = cursor.fetchone()
    result['endTime'] = result_4['endTime']


    cursor.close()
    conn.close()

    return result