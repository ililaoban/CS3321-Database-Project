from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import random

### fake data
location=["北京","上海","南京","苏州","无锡","常州","镇江","淮安","连云港"]
passengername=['汤师爷','李白','杜甫','李清照','白居易','王安石','苏轼','辛弃疾','陆游','李煜']
trainNo=["G101","G102","G103","G104","G105","G106","G107","G108","G109","G110"]



app = Flask(__name__)
CORS(app,supports_credentials=True)
app.config['JSON_AS_ASCII'] = False



@app.route("/", methods=["POST", "GET"])
def hello():
    # 获取path中的参数
    return "hello world!"


@app.route("/train", methods=["GET"])
def queryTrain2():
    # 获取query_string中的参数
    id = request.args["id"]
    dic = {"result": True, "userId": id}
    return jsonify(dic)


# 场景一实现：查询火车票信息
@app.route("/query", methods=["POST"])
def queryBasedOnStartEndTime():
    # 预计请求正文格式：{"startStation":"北京","endStation":"上海","day”:"2019-01-01"}
    data = request.get_json()
    startStation = data["startStation"]
    endStation = data["endStation"]
    startDay = data["startDay"]

    # 预计返回格式：{"车次":"G101","出发站"："北京","到达站":"上海","出发时间":"2019-01-01 08:00","到达时间":"2019-01-01 12:00","历时":"4小时",
    # "特等座":"10000","商务座":"1000","一等座":"800","二等座":"500","二等包座":"500","高级软卧":"400","软卧":"400","一等卧":"400","动卧":"400","硬卧":"300","二等卧":"400","软座":"400","硬座":"200","无座":"100"}

    location=["北京","上海","南京","苏州","无锡","常州","镇江","淮安","连云港"]
    # DB query 待实现
    dic = [{
        "trainNoOnly":"1234",
        "trainNo": "G101",
        "startStation": location[random.randint(0,8)],
        "endStation": location[random.randint(0,8)],
        "startTime": "2019-01-01 08:00",
        "endTime": "2019-01-01 12:00",
        "duration": "4小时",
        "specialSeat": "10000",
        "businessSeat": "1000",
        "specialSeatAndBusinessSeat":"2000",
        "firstSeat": "800",
        "secondSeat": "500",
        "secondBoxSeat": "500",
        "secondSeatAndSecondBoxSeat": "1000",
        "superSoftSleeper": "400",
        "fistSleeper": "400",
        "softSleeperAndFirstSleeper": "800",
        "highSleeper": "400",
        "hardSleeper": "300",
        "secondSleeperAndHardSleeper": "700",
        "softSeat": "400",
        #"hardSeat": "200",
        "noSeat": "100",
        "available":True

    },{"trainNoOnly":"12345",
        "trainNo": "G1011",
        "startStation": location[random.randint(0,8)],
        "endStation": location[random.randint(0,8)],
        "startTime": "2019-01-01 08:00",
        "endTime": "2019-01-01 12:00",
        "duration": "4小时",
        "specialSeat": "10000",
        "businessSeat": "1000",
        "specialSeatAndBusinessSeat":"2000",
        "firstSeat": "800",
        "secondSeat": "500",
        "secondBoxSeat": "500",
        "secondSeatAndSecondBoxSeat": "1000",
        "superSoftSleeper": "400",
        "fistSleeper": "400",
        "softSleeperAndFirstSleeper": "800",
        "highSleeper": "400",
        "hardSleeper": "300",
        "secondSleeperAndHardSleeper": "700",
        "softSeat": "400",
        #"hardSeat": "200",
        "noSeat": "100",
        "available":True

    }]
    return jsonify(dic)


# 场景二实现：用户选定车次,上车时间， 上车站, 下车站, 座位类型等后购票
@app.route("/buy", methods=["POST"])
def buyTicket():
    # 预计请求
    """
    出发日期:2019-01-01
    车次:G101
    上车时间:08:00
    上车站：北京
    下车站：上海
    座位类型：二等座
    车票类型：成人票
    用户id:123
    """
    data=request.get_json()
        # startDay = request.form["startDay"]
        # trainNo = request.form["trainNo"]
        # startTime = request.form["startTime"]
        # startStation = request.form["startStation"]
        # endStation = request.form["endStation"]
        # seatType = request.form["seatType"]
        # ticketType = request.form["ticketType"]
        # userId = request.form["userId"]
    startDay = data["startDay"]
    trainNo = data["trainNo"]
    startTime = data["startTime"]
    startStation = data["startStation"]
    endStation = data["endStation"]
    seatType = data["seatType"]
    ticketType = data["ticketType"]
    userId = data["userId"]




    # 购票操作 待实现

    # 返回购票结果
    result = True
    ticketNo = ("%s" % random.randint(100000000, 999999999))
    carriageNo = "1"
    seatNo = ("%s" % random.randint(1, 100))

    dic = {
        "result": result,
        "ticketNo": ticketNo,
        "carriageNo": carriageNo,
        "seatNo": seatNo,
    }
    return jsonify(dic)


# 场景三实现:查询用户购票信息
@app.route("/queryTicket", methods=["POST"])
def queryTicket():
    # 预计请求
    """
    用户id:123
    """
    userId = request.get_json()["userId"]
    passengername=['汤师爷','李白','杜甫','李清照','白居易','王安石','苏轼','辛弃疾','陆游','李煜']
    # 查询购票信息 待实现
    # 返回购票信息
    ticketList = [
        {
            "trainNo": "G101",
            "startDay": "2019-01-01",
            "startTime": "08:00",
            "startStation": "北京",
            "endStation": "上海",
            "seatType": "二等座",
            "ticketType": "成人票",
            "ticketNo": "123456789",
            "carriageNo": "1",
            "seatNo": "2",
            "ticketStatus": "未出行",
            "passengerName": passengername[random.randint(0,9)],
            "sfzNo":"1345342134356",
            "ticketPrice": "597.0"
        }
    ]



    return jsonify(ticketList)


# 场景四实现:退票
@app.route("/refund", methods=["POST"])
def refund():
    # 预计请求
    """
    用户id:123
    车票号:123456789
    """
    #from body 
    data=request.get_json()
    userId = data["userId"]
    ticketNo = data["ticketNo"]
    # 退票操作 待实现

    # 返回退票结果
    result = True
    dic = {
        "result": result,
        "userId": userId,
        "ticketNo": ticketNo,
    }
    return jsonify(dic)

# 场景五_1实现:查询车次信息
@app.route("/trainNo/initialLaunchTime_1", methods=["POST"])
def queryInitialLaunchTime_1():
    data=request.get_json()
    trainNo=data['trainNo']
    initialLaunchTime=data['initialLaunchTime']
    

#     站序	站名	到站时间	出发时间	停留时间
# 01	上海	01:57	01:57	----
# 02	苏州	02:51	02:56	5分钟
# 03	无锡	03:24	03:30	6分钟
# 04	常州	03:57	04:02	5分钟
# 05	南京	06:08	06:19	11分钟
# 06	镇江	08:31	08:34	3分钟
# 07	淮安	09:30	09:33	3分钟
# 08	连云港	11:45	12:18	33分钟

    dic = {
            "trainNo": "G101",
            "initialLaunchTime": "08:00",
            "stations": [
                {
                    "stationOrder": "01",
                    "stationName": location[random.randint(0,8)],
                    "trainArriveTime": "01:57",
                    "trainDepartTime": "01:57",
                    "stopTime": "----"
                },
                {
                    "stationOrder": "02",
                    "stationName": "苏州",
                    "trainArriveTime": "02:51",
                    "trainDepartTime": "02:56",
                    "stopTime": "5分钟"
                },
                {
                    "stationOrder": "03",
                    "stationName": "无锡",
                    "trainArriveTime": "03:24",
                    "trainDepartTime": "03:30",
                    "stopTime": "6分钟"
                },
                {
                    "stationOrder": "04",
                    "stationName": "常州",
                    "trainArriveTime": "03:57",
                    "trainDepartTime": "04:02",
                    "stopTime": "5分钟"
                },
                {
                    "stationOrder": "05",
                    "stationName": "南京",
                    "trainArriveTime": "06:08",
                    "trainDepartTime": "06:19",
                    "stopTime": "11分钟"
                },
                {
                    "stationOrder": "06",
                    "stationName": "镇江",
                    "trainArriveTime": "08:31",
                    "trainDepartTime": "08:34",
                    "stopTime": "3分钟"
                },
                {
                    "stationOrder": "07",
                    "stationName": "淮安",
                    "trainArriveTime": "09:30",
                    "trainDepartTime": "09:33",
                    "stopTime": "3分钟"
                },
                {
                    "stationOrder": "08",
                    "stationName": "连云港",
                    "trainArriveTime": "11:45",
                    "trainDepartTime": "12:18",
                    "stopTime": "33分钟"
                }
            ]
        }
    
    return jsonify(dic)

# 场景五_2实现:查询车次信息
@app.route("/trainNo/initialLaunchTime_2", methods=["POST"])
def queryInitialLaunchTime_2():
    data=request.get_json()
    trainNoOnly=data['trainNoOnly']

    

#     站序	站名	到站时间	出发时间	停留时间
# 01	上海	01:57	01:57	----
# 02	苏州	02:51	02:56	5分钟
# 03	无锡	03:24	03:30	6分钟
# 04	常州	03:57	04:02	5分钟
# 05	南京	06:08	06:19	11分钟
# 06	镇江	08:31	08:34	3分钟
# 07	淮安	09:30	09:33	3分钟
# 08	连云港	11:45	12:18	33分钟

    dic = {
            "trainNoOnly": "G101_2024.01.01",
           
            "stations": [
                {
                    "stationOrder": "01",
                    "stationName": location[random.randint(0,8)],
                    "trainArriveTime": "01:57",
                    "trainDepartTime": "01:57",
                    "stopTime": "----"
                },
                {
                    "stationOrder": "02",
                    "stationName": "苏州",
                    "trainArriveTime": "02:51",
                    "trainDepartTime": "02:56",
                    "stopTime": "5分钟"
                },
                {
                    "stationOrder": "03",
                    "stationName": "无锡",
                    "trainArriveTime": "03:24",
                    "trainDepartTime": "03:30",
                    "stopTime": "6分钟"
                },
                {
                    "stationOrder": "04",
                    "stationName": "常州",
                    "trainArriveTime": "03:57",
                    "trainDepartTime": "04:02",
                    "stopTime": "5分钟"
                },
                {
                    "stationOrder": "05",
                    "stationName": "南京",
                    "trainArriveTime": "06:08",
                    "trainDepartTime": "06:19",
                    "stopTime": "11分钟"
                },
                {
                    "stationOrder": "06",
                    "stationName": "镇江",
                    "trainArriveTime": "08:31",
                    "trainDepartTime": "08:34",
                    "stopTime": "3分钟"
                },
                {
                    "stationOrder": "07",
                    "stationName": "淮安",
                    "trainArriveTime": "09:30",
                    "trainDepartTime": "09:33",
                    "stopTime": "3分钟"
                },
                {
                    "stationOrder": "08",
                    "stationName": "连云港",
                    "trainArriveTime": "11:45",
                    "trainDepartTime": "12:18",
                    "stopTime": "33分钟"
                }
            ]
        }
    
    return jsonify(dic)



#场景六实现：提供城市-火车站列表
@app.route("/cityStationList", methods=["POST"])
def cityStation():
    ###fake data
    list=[
    {
        "provinceName": '上海市',
        "children": [
            {
                'cityName': '上海市',
                "children": [
                    {
                        'stationName': '上海虹桥站',
                    },
                    {
                        'stationName': '上海南站',
                    },
                    {
                        'cityName': '上海市',
                    }
                ],
            },
        ],
    },
    {
        'provinceName': '江苏省',
        "children": [
            {
                'cityName': '南京市',
                "children": [
                    {
                        'stationName': '南京南',
                    },
                    {
                        'cityName': '南京市',
                    }
                ],
            },
        ],
    },
    ]
    return jsonify(list)


#场景七实现： 获取乘客信息列表
@app.route("/passengerInformation", methods=["POST"])
def passengerInformation():
    data=request.get_json()
    userId=data['userId']
    fake_data={
            "passengerName": passengername[random.randint(0,9)],
            "sfzNo": "1345342134356",
            "phoneNo": "123456789",
            "userId": userId
        }
        
    return jsonify(fake_data)

#场景八实现： 用户注册
@app.route("/register", methods=["POST"])
def register():
    data=request.get_json()
    userId=data['userId']
    password=data['password']

    dic={
        "result":True
    }
    return jsonify(dic)


#场景九实现： 用户登录
@app.route("/login", methods=["POST"])
def login():
    data=request.get_json()
    userId=data['userId']
    password=data['password']

    dic={
        "result":True
    }
    return jsonify(dic)



#场景十实现： 用户信息填写
@app.route("/userInfoChange", methods=["POST"])
def userInfoChange():
    data=request.get_json()
    userId=data['userId']
    passengerName=data['passengerName']
    sfzNo=data['sfzNo']
    phoneNo=data['phoneNo']
    dic={
        "result":True
    }
    return jsonify(dic)

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
