from utils import newSqlSession

# Occasion 3: The user queries the ticket information he/she bought
# TODO(BobHuangC): In the 1st dev-stage, the userID is replaced by sfzno
# TODO(BobHuangC): In the 1st dev-stage, there's no trainNo
# TODO(BobHuangC): In the 1st dev-stage, there's no ticketStatus


def queryTicket(sfzNo):
    """
    Occasion 3: The user queries the ticket information he/she bought

    input:
    {
        "sfzNo":{string},
    }

    output:
    [
        {
        "trainNoOnly", 
        "trainNo",
        "startDay",
        "startTime",
        "startStation",
        "endStation",
        "seatType",
        "ticketType",
        "ticketNo",
        "carriageNo",
        "seatNo",
        "sfzNo":,
        "ticketStatus",
        "ticketPrice",
        "passengerName",
        }, ...
    ]
    """


    # 1st to get the trainNoOnly, carriageNo, seatNo, startStation, endStation, ticketType, sfzNo, ticketNo
    conn_1, cursor_1 = newSqlSession()
    cursor_1.execute('''
    SELECT trainNoOnly,carriageNo,seatNo,startStation,endStation, ticketType, sfzNo, ticketNo
    FROM Trip
    WHERE sfzNo = %s
    ''', sfzNo)
    result = cursor_1.fetchall()


    # 2nd to get the seatType
    for i in range(len(result)):
        cursor_1.execute('''
        SELECT seatType
        FROM Seat
        WHERE carriageNo = %s AND trainNoOnly = %s AND seatNo = %s
        ''', (result[i]['carriageNo'], result[i]['trainNoOnly'], result[i]['seatNo']))
        result_2 = cursor_1.fetchone()
        result[i]['seatType'] = result_2['seatType']



    # 3rd to get the startDay, startTime
    for i in range(len(result)):
        cursor_1.execute('''
        SELECT DATE_FORMAT(trainDepartTime, '%%Y-%%m-%%d') as startDay, DATE_FORMAT(trainDepartTime, '%%H:%%i:%%s') as startTime
        FROM TrainStation
        WHERE trainNoOnly = %s AND stationName = %s
        ''', (result[i]['trainNoOnly'], result[i]['startStation']))
        result_3 = cursor_1.fetchone()
        result[i]['startDay'] = result_3['startDay']
        result[i]['startTime'] = result_3['startTime']


    # 4th to get the ticketPrice
    for i in range(len(result)):
        cursor_1.execute('''
        SELECT ticketPrice
        FROM Price
        WHERE trainNoOnly = %s AND startStation = %s AND endStation = %s AND seatType = %s
        ''', (result[i]['trainNoOnly'], result[i]['startStation'], result[i]['endStation'], result[i]['seatType']))
        result_4 = cursor_1.fetchone()
        result[i]['ticketPrice'] = float(result_4['ticketPrice'])

    
    # 5th to get the passengerName
    # ATTENTION: One user can buy tickets for other users, thus the passengerName must be corresponding to the sfzNo of each ticket
    for i in range(len(result)):
        cursor_1.execute('''
        SELECT name
        FROM Passenger
        WHERE sfzNo = %s
        ''', result[i]['sfzNo'])
        result_5 = cursor_1.fetchone()
        result[i]['passengerName'] = result_5['name']

    cursor_1.close()
    conn_1.close()

    return result



if __name__ == "__main__":
    _sfzno = "238460163186803776"
    print(queryTicket(_sfzno))