import pymysql
import random
import json
from faker import Faker
import hashlib
from tqdm import tqdm

from .sqlUtils import newSqlSession
from .basicConfigs import sqlConfig

data_path = "./data/"
fake = Faker("zh_CN")
rol_and_col = ["八横", "八纵"]
station_suffix = [["东站", "西站"], ["南站", "北站"]]
carriageLimit = 15  # 5 一等座，10 二等座
seatLineLimit = 15  # 每节车厢15排


###
# This script is used to insert data into the database
###


def hash_string_to_four_digits(input_string):
    # Using hashlib to create a md5 hash of the input string
    hash_object = hashlib.md5(input_string.encode())
    # Take the integer value of the first 8 characters of the hash
    # Use modulo operation to make sure it's a number between 0000 and 9999
    short_hash = int(hash_object.hexdigest()[:8], base=16) % 10000
    # Return as a 4-digit string, padding with zeroes if necessary
    return f"{short_hash:04d}"


def generate_testbit(start, end):
    testbit = 0b00000000000000000000
    for i in range(start, end):
        testbit += 1 << i
    return testbit


def insertPassengerInfo(num=0):
    conn, cursor = newSqlSession()
    batch_size = 1000  # Set a batch size for batch insertion

    records_to_insert = []

    # create fake sfz no like '210941510164028864'
    sfzNos = random.sample(range(100000000000000000, 999999999999999999), num)

    if num == 0:
        print(
            "To avoid too mucu data generated during testing, no passenger data shall be inserted without specifying the number of passengers"
        )

    for i in sfzNos:
        records_to_insert.append((i, fake.name(), "成人票"))
        if len(records_to_insert) >= batch_size:
            cursor.executemany(
                """
                INSERT INTO Passenger (sfzNo, name, discountQualification)
                VALUES (%s, %s, %s)
            """,
                records_to_insert,
            )
            conn.commit()
            records_to_insert = []
    if records_to_insert:
        cursor.executemany(
            """
            INSERT INTO Passenger (sfzNo, name, discountQualification)
            VALUES (%s, %s, %s)
        """,
            records_to_insert,
        )
        conn.commit()

    conn.close()
    cursor.close()


def insertStationInfo():
    conn, cursor = newSqlSession()
    with open(data_path + "cities.json", "r", encoding="utf-8") as f:
        Eight_Crossing_Lines = json.load(f)
    cities = Eight_Crossing_Lines["cities"]

    for index, city in enumerate(cities):
        for suffix in station_suffix[index % 2]:
            station_name = city[0] + suffix
            city_name = city[0]
            province_name = city[1]

            cursor.execute(
                """
            INSERT  INTO Station (stationName, cityName, provinceName)
            VALUES (%s,%s,%s)
            on duplicate key update stationName=VALUES(stationName),cityName=VALUES(cityName),provinceName=VALUES(provinceName)
            """,
                (station_name, city_name, province_name),
            )

    conn.close()
    cursor.close()


def insertTrainInfo():
    ### 填写Train表
    conn, cursor = newSqlSession()

    ### 暂时就只考虑八横八纵线

    with open(data_path + "cities.json", "r", encoding="utf-8") as f:
        Eight_Crossing_Lines = json.load(f)

    for i in rol_and_col:
        roads = Eight_Crossing_Lines[i]
        for road in roads:
            for key in road.keys():
                trainNo = "G" + hash_string_to_four_digits(key)
            for suffix in ["_1", "_2"]:
                trainNoOnly = trainNo + suffix
                cursor.execute(
                    """
                INSERT  INTO Train (trainNoOnly)
                VALUES (%s)
                on duplicate key update trainNoOnly=VALUES(trainNoOnly)
                """,
                    (trainNoOnly),
                )

    conn.close()
    cursor.close()


def insertTrainStationInfo():
    conn, cursor = newSqlSession()

    with open(data_path + "cities.json", "r", encoding="utf-8") as f:
        Eight_Crossing_Lines = json.load(f)

    cities = Eight_Crossing_Lines["cities"]
    cities = [i[0] for i in cities]

    ### 1:升序 2:降序
    for roads in rol_and_col:
        # 确定八纵还是八横
        for road in tqdm(Eight_Crossing_Lines[roads]):
            # 确定是哪一条通道
            stations = []
            # 这个循环是为了确定存了通道沿路城市的列表
            for key in road.keys():
                if not key.endswith("通道"):
                    continue
                # 找到了通道，开始确认车站
                current_cities = road[key]
                # 车站分为东西站和南北站,这个是由静态城市数据决定的，所以要在cities里找
                # 然后根据车站在本通道的顺序，确定东or西，南or北

                stations = [
                    i + station_suffix[(cities.index(i) % 2)][index % 2]
                    for index, i in enumerate(current_cities)
                ]

            for trainNoOnly in road["trainNoOnly"]:
                # 确定是上行还是下行
                stations_with_order = (
                    stations if trainNoOnly.endswith("_1") else stations[::-1]
                )
                for index, station in enumerate(stations_with_order):
                    cursor.execute(
                        """
                    INSERT  INTO TrainStation (trainNoOnly, stationName, stationOrder,trainNo,trainArriveTime,trainDepartTime)
                    VALUES (%s,%s,%s,%s,now(),now())
                    on duplicate key update trainNoOnly=VALUES(trainNoOnly),stationName=VALUES(stationName),stationOrder=VALUES(stationOrder),trainNo=VALUES(trainNo),trainArriveTime=VALUES(trainArriveTime),trainDepartTime=VALUES(trainDepartTime)
                                        """,
                        (
                            trainNoOnly,
                            station,
                            index + 1,
                            trainNoOnly[:-2],
                            
                        ),
                    )
                # 时间暂时不管

    conn.close()
    cursor.close()


def insertSeatInfo():
    conn, cursor = newSqlSession()

    batch_size = 1000  # Set a batch size for batch insertion

    with open(data_path + "cities.json", "r", encoding="utf-8") as f:
        Eight_Crossing_Lines = json.load(f)

    # List to store batch records
    records_to_insert = []
    for roads in rol_and_col:
        for road in tqdm(Eight_Crossing_Lines[roads]):
            for trainNoOnly in road["trainNoOnly"]:
                for carriageNo in range(1, carriageLimit + 1):
                    for seatLine in range(1, seatLineLimit + 1):
                        for seatNo in ["A", "B", "C", "D", "F"]:
                            seatType = "一等座" if carriageNo <= 5 else "二等座"
                            # Append record to the list
                            records_to_insert.append(
                                (
                                    carriageNo,
                                    trainNoOnly,
                                    str(seatLine) + seatNo,
                                    seatType,
                                    0b11111111111111111111,
                                )
                            )

                            # If we've reached our batch size, execute the insertion
                            if len(records_to_insert) >= batch_size:
                                cursor.executemany(
                                    """
                                    INSERT  INTO Seat (carriageNo, trainNoOnly, seatNo, seatType, bitmap)
                                    VALUES (%s, %s, %s, %s, %s)
                                    on duplicate key update carriageNo=VALUES(carriageNo),trainNoOnly=VALUES(trainNoOnly),seatNo=VALUES(seatNo),seatType=VALUES(seatType),bitmap=VALUES(bitmap)
                                    
                                """,
                                    records_to_insert,
                                )
                                conn.commit()  # Commit after each batch
                                records_to_insert = (
                                    []
                                )  # Clear the list for the next batch

    # Insert any records left after the final batch
    if records_to_insert:
        cursor.executemany(
            """
            INSERT INTO Seat (carriageNo, trainNoOnly, seatNo, seatType, bitmap)
            VALUES (%s, %s, %s, %s, %s)
            on duplicate key update carriageNo=VALUES(carriageNo),trainNoOnly=VALUES(trainNoOnly),seatNo=VALUES(seatNo),seatType=VALUES(seatType),bitmap=VALUES(bitmap)
        """,
            records_to_insert,
        )
        conn.commit()

    # Close the connection and cursor
    conn.close()
    cursor.close()


def insertPriceInfo():
    conn, cursor = newSqlSession()
    records_to_insert = []
    batch_size = 1000 # Set a batch size for batch insertion
    random.seed(0)

    with open(data_path + "cities.json", "r", encoding="utf-8") as f:
        Eight_Crossing_Lines = json.load(f)

    cities = Eight_Crossing_Lines["cities"]
    cities = [i[0] for i in cities]

    for roads in rol_and_col:
        for road in tqdm(Eight_Crossing_Lines[roads]):
            stations = []
            prices = []
            for key in road.keys():
                if not key.endswith("通道"):
                    continue
                # 找到了通道，开始确认车站
                current_cities = road[key]
                # 车站分为东西站和南北站,这个是由静态城市数据决定的，所以要在cities里找
                # 然后根据车站在本通道的顺序，确定东or西，南or北

                stations = [
                    i + station_suffix[(cities.index(i) % 2)][index % 2]
                    for index, i in enumerate(current_cities)
                ]
                prices = [random.randint(100, 500) for i in range(len(stations) - 1)]

            for trainNoOnly in road["trainNoOnly"]:
                stations_with_order = (
                    stations if trainNoOnly.endswith("_1") else stations[::-1]
                )
                prices_with_order = (
                    prices if trainNoOnly.endswith("_1") else prices[::-1]
                )
                for start, start_station in enumerate(stations_with_order[:-1]):
                    for end, end_station in enumerate(stations_with_order[start + 1 :]):
                        end=end+start+1
                        testbit = generate_testbit(start, end)
                        price = sum(prices_with_order[start:end])
                        records_to_insert.append(
                            (
                                trainNoOnly,
                                start_station,
                                end_station,
                                "一等座",
                                testbit,
                                price + 200,
                            
                              
                            )
                        )
                        records_to_insert.append(
                            (
                                trainNoOnly,
                                start_station,
                                end_station,
                                "二等座",
                                testbit,
                                price,
                                
                               
                            )
                        )

                        if len(records_to_insert) >= batch_size:
                            cursor.executemany(
                                """
                                INSERT   INTO Price (trainNoOnly, startStation, endStation, seatType, testbit, ticketPrice)
                                VALUES (%s, %s, %s, %s, %s, %s)
                                on duplicate key update testbit=VALUES(testbit),ticketPrice=VALUES(ticketPrice)
                                """,
                                records_to_insert,
                            )
                            conn.commit()
                            records_to_insert = []
    if records_to_insert:
        cursor.executemany(
            """
            INSERT  INTO Price (trainNoOnly, startStation, endStation, seatType, testbit, ticketPrice)
            VALUES (%s, %s, %s, %s, %s, %s)
            on duplicate key update testbit=VALUES(testbit),ticketPrice=VALUES(ticketPrice)
            """,
            records_to_insert,
        )
        conn.commit()

    conn.close()
    cursor.close()
