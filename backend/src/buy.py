from utils import newSqlSession

def buy(trainNoOnly, startStation, endStation, seatType, sfzNo):
    conn, cursor = newSqlSession()

    #查Price表 获得testbit和票价
    cursor.execute(
        '''
        SELECT testbit,ticketPrice
        FROM Price
        WHERE trainNoOnly=%s AND startStation=%s AND endStation=%s AND seatType=%s
    ''',(trainNoOnly, startStation, endStation, seatType))
    result1 = cursor.fetchone()
    if not result1:
        print("Price INFO not found")
        return
    testbit = int.from_bytes(result1['testbit'], byteorder='big')
    ticketPrice = result1['ticketPrice']

    #查Seat表，获得一个空余的座位
    cursor.execute('''SELECT carriageNo,trainNoOnly,seatNo,bitmap 
               FROM Seat 
               WHERE seatType = %s AND bitmap& %s = %s ''', 
               (seatType, testbit, testbit))
    result2 = cursor.fetchone()
    if not result2:
        print("No available seat!")
        return
    carriageNo = result2['carriageNo']
    seatNo = result2['seatNo']
    bitmap = int.from_bytes(result2['bitmap'], byteorder='big')
    sql_insert_query = '''
    INSERT INTO Trip (trainNoOnly,carriageNo,seatNo,startStation,endStation, sfzNo) 
    VALUES (%s,%s,%s,%s,%s,%s)
    '''
    cursor.execute(sql_insert_query, (trainNoOnly, carriageNo, seatNo, startStation, endStation,sfzNo))
    # 尝试提交更改
    #conn.commit()

    print("Book Ticket successful.")
    print("-------------------------")
    print("Updating seatInfo")
    #修改座位的bitmap
    newBit = bitmap & ~ testbit
    cursor.execute('''
                UPDATE Seat
                SET bitmap = %s
                WHERE (carriageNo,trainNoOnly,seatNo) = (%s,%s,%s)
                ''',(newBit, carriageNo, trainNoOnly, seatNo))
    #conn.commit()
    print("Success!")


    print("------------------------")
    print("%s -%s-> %s"%(startStation, trainNoOnly, endStation))
    print("%s车 %s号     %s"%(carriageNo, seatNo, seatType))
    print("票价：%d元"%ticketPrice)
    print("身份证号:", sfzNo)
    print("------------------------")
    cursor.close()
    conn.close()



if __name__ == '__main__':
    trainNoOnly = 'K666_1'
    startStation = '上海虹桥站'
    endStation = '天津西站'
    seatType = '硬座'
    sfzNo = '346618157274899520'
    buy(trainNoOnly, startStation, endStation, seatType, sfzNo)