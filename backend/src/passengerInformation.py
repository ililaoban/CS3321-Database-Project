from utils import newSqlSession

# Occasion 7: get the passenger information

# input
# {
#     "sfzNo":{string}
# }

# output
# [
#     {
#         "passengerName",
#         "sfzNo",
#         "phoneNo",
#         "userID"
#         "discountQualification",
#     }, ...
# ]


# TODO(BobHuangC): In the 1st dev-stage, there's no userID, phoneNo

def passengerInformation(sfzNo):
    conn, cursor = newSqlSession()
    cursor.execute('''
    SELECT name as passengerName, sfzNo, discountQualification
    FROM Passenger
    WHERE sfzNo = %s
    ''', sfzNo)
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result