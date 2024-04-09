import pymysql


trainNoOnly = 'K666_1'
startStation = '天津西站'
endStation = '沈阳北站'
seatType = '硬座'
sfzNo = '346618157274899520'


conn = pymysql.connect(host='47.120.3.221',
                    port=3306,
                    user='dmsTest',
                    passwd='Ecs@123456',
                    db='hi',  
                    charset='utf8mb4',
                cursorclass = pymysql.cursors.DictCursor)

'''
查询站序
'''
def queryStationOrder(trainNoOnly, station) ->int:
    cursor =conn.cursor()
    cursor.execute('''
            SELECT stationOrder 
            FROM TrainStation
            WHERE trainNoOnly = %s AND stationName = %s
            ''', (trainNoOnly, station))
    result = cursor.fetchone()['stationOrder']
    cursor.close()
    return (result)


'''
生成testbit
'''
def testBitGenerate(trainNoOnly, startStation, endStation)  -> int:
    startIndex = queryStationOrder(trainNoOnly, startStation)
    endIndex = queryStationOrder(trainNoOnly, endStation)
    result = ((0b1 << (endIndex-startIndex)) - 1)
    result  <<= (startIndex -1)
    return result



#废弃，后面的代码没用了
testBit = (testBitGenerate(trainNoOnly, startStation, endStation))
cursor = conn.cursor()
cursor.execute('''SELECT carriageNo,trainNoOnly,seatNo,bitmap 
               FROM Seat 
               WHERE seatType = %s AND bitmap& %s = %s ''', 
               (seatType, testBit, testBit))
result = cursor.fetchone()
cursor.close()

if (result):
    print(result)
    carriageNo = result['carriageNo']
    seatNo = result['seatNo']
    bitmap = int.from_bytes(result['bitmap'], byteorder='big')
    try:
        with conn.cursor() as cursor:
            sql_insert_query = '''
            INSERT INTO Trip (trainNoOnly,carriageNo,seatNo,startStation,endStation, sfzNo, testbit) 
            VALUES (%s,%s,%s,%s,%s,%s,%s)
            '''
            cursor.execute(sql_insert_query, (trainNoOnly, carriageNo, seatNo, startStation, endStation,sfzNo, testBit))
            # 尝试提交更改
            conn.commit()
            print("Book Ticket successful.")
            print("-------------------------")
            print("Updating seatInfo")
            newBit = bitmap & ~ testBit
            cursor.execute('''
                        UPDATE Seat
                        SET bitmap = %s
                        WHERE (carriageNo,trainNoOnly,seatNo) = (%s,%s,%s)
                        ''',(newBit, carriageNo, trainNoOnly, seatNo))
            conn.commit()
            print("Success!")
            cursor.execute('''
                            SELECT ticketPrice 
                            FROM Price
                            WHERE trainNoOnly =%s AND startStation = %s
                           AND endStation = %s AND seatType = %s
                        ''', (trainNoOnly, startStation, endStation, seatType))
            ticketPrice = cursor.fetchone()['ticketPrice'] or '0'

            print("------------------------")
            print(startStation, "--", trainNoOnly, "->", endStation)
            print(carriageNo, '车 ', seatNo, '号  ', seatType)
            print("票价：", ticketPrice)
            print("身份证号:", sfzNo)
            print("------------------------")

    except pymysql.MySQLError as e:
        # 如果执行SQL语句时出错，回滚更改
        print(f"Error during transaction, rolling back changes: {e}")
        conn.rollback()
    finally:

        conn.close()

else:
    print("No enough ticket!")