from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app,supports_credentials=True)
app.config['JSON_AS_ASCII'] = False


@app.route("/train/<int:id>", methods=["POST"])
def queryTrain(id):
    # 获取path中的参数
    dic = {"result": True, "userId": id}
    return jsonify(dic)


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
    userId = request.form["userId"]
    ticketNo = request.form["ticketNo"]

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

if __name__ == "__main__":
    app.run()
