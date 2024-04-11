from utils import newSqlSession

# Occasion 11: Query the available tickets

# input:
# {
#     "trainNoOnly":{string},
#     "startStation":{string},
#     "endStation":{string},
#  }

# output:
# {
#     "priceinfo" : [
#         {
#             "seatType",
#             "availableSeat": {true or false},
#             "ticketPrice"
#         }, ...
#     ]
# }


def availableTicketQuery(trainNoOnly, startStation, endStation):
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
            result[i]['availableSeat'] = False
        else:
            result[i]['availableSeat'] = True

    cursor.close()
    conn.close()
    
    # drop the testbit key
    for i in range(len(result)):
        result[i].pop('testbit')

    result = dict(priceinfo = result)

    return result