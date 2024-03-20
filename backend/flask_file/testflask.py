from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app,supports_credentials=True)
app.config['JSON_AS_ASCII'] = False







@app.route("/", methods=["POST"])
def hello(id):
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

    # DB query 待实现
    dic = [{
        "trainNoOnly":"1234",
        "trainNo": "G101",
        "startStation": "北京",
        "endStation": "上海",
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
        "secondSleeper": "400",
        "secondSleeperAndHardSleeper": "700",
        "softSeat": "400",
        #"hardSeat": "200",
        "noSeat": "100",
        "avaliable":True
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
    startDay = request.form["startDay"]
    trainNo = request.form["trainNo"]
    startTime = request.form["startTime"]
    startStation = request.form["startStation"]
    endStation = request.form["endStation"]
    seatType = request.form["seatType"]
    ticketType = request.form["ticketType"]
    userId = request.form["userId"]

    # 购票操作 待实现

    # 返回购票结果
    result = True
    ticketNo = "123456789"
    carriageNo = "1"
    seatNo = "12"

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
            "passengerName":"汤师爷",
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
    data=request.json
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

# 场景五实现:查询车次信息
@app.route("/trainNo/initialLaunchTime", methods=["POST"])
def queryInitialLaunchTime():
    data=request.get_json()

    

#     站序	站名	到站时间	出发时间	停留时间
# 01	上海	01:57	01:57	----
# 02	苏州	02:51	02:56	5分钟
# 03	无锡	03:24	03:30	6分钟
# 04	常州	03:57	04:02	5分钟
# 05	南京	06:08	06:19	11分钟
# 06	镇江	08:31	08:34	3分钟
# 07	淮安	09:30	09:33	3分钟
# 08	连云港	11:45	12:18	33分钟

    dic = [
        {
            "trainNo": "G101",
            "initialLaunchTime": "08:00",
            "stations": [
                {
                    "stationNo": "01",
                    "stationName": "上海",
                    "arrivalTime": "01:57",
                    "departureTime": "01:57",
                    "stopTime": "----"
                },
                {
                    "stationNo": "02",
                    "stationName": "苏州",
                    "arrivalTime": "02:51",
                    "departureTime": "02:56",
                    "stopTime": "5分钟"
                },
                {
                    "stationNo": "03",
                    "stationName": "无锡",
                    "arrivalTime": "03:24",
                    "departureTime": "03:30",
                    "stopTime": "6分钟"
                },
                {
                    "stationNo": "04",
                    "stationName": "常州",
                    "arrivalTime": "03:57",
                    "departureTime": "04:02",
                    "stopTime": "5分钟"
                },
                {
                    "stationNo": "05",
                    "stationName": "南京",
                    "arrivalTime": "06:08",
                    "departureTime": "06:19",
                    "stopTime": "11分钟"
                },
                {
                    "stationNo": "06",
                    "stationName": "镇江",
                    "arrivalTime": "08:31",
                    "departureTime": "08:34",
                    "stopTime": "3分钟"
                },
                {
                    "stationNo": "07",
                    "stationName": "淮安",
                    "arrivalTime": "09:30",
                    "departureTime": "09:33",
                    "stopTime": "3分钟"
                },
                {
                    "stationNo": "08",
                    "stationName": "连云港",
                    "arrivalTime": "11:45",
                    "departureTime": "12:18",
                    "stopTime": "33分钟"
                }
            ]
        }
    ]
    return jsonify(dic)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8963, debug=True)
