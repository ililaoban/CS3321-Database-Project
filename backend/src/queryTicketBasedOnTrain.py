from utils import newSqlSession

# ###
# Input:{
#     //列车唯一识别码
#     "trainNoOnly":{string}
#     //乘客出发站
#     "startStation": {string},
#     //乘客到达站
#     "endStation": {string},
# }
# Output:{"priceInfo":[
#         {
#             'seatType':{string},
#             'availableSeats':{string},
#             'ticketPrice':{string},
#         }, ...
#     ]   }
# ###

def queryTicketBasedOnTrain(trainNoOnly, startStation, endStation):
    
    conn_1, cursor_1 = newSqlSession()
    cursor_1.execute('''
    SELECT trainNoOnly,startStation,endStation,seatType,ticketPrice
    FROM Price
    WHERE trainNoOnly = %s AND startStation = %s AND endStation = %s
    ''', (trainNoOnly, startStation, endStation))
    result = cursor_1.fetchall()


  

    cursor_1.close()
    conn_1.close()

    return result
