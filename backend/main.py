from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import random

import src
from src import *
from utils import *

app = Flask(__name__)
CORS(app,supports_credentials=True)
app.config['JSON_AS_ASCII'] = False



@app.route("/", methods=["POST", "GET"])
def hello():
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

    ###虽然第一阶段开发只考虑一个唯一车次，但是为了前后端统一，这里暂定返回相同的内容
    results = query2(startStation, endStation, startDay)
    # for result in results:
    #     result["trainNo"]=result["trainNoOnly"]
    
    return jsonify(results)


# 场景二实现：用户选定车次,上车时间， 上车站, 下车站, 座位类型等后购票
@app.route("/buy", methods=["POST"])
def buyTicket():
    # 预计请求
    """
    唯一车次:G101
    上车站：北京
    下车站：上海
    座位类型：二等座
    车票类型：成人票
    sfz:123
    """
    data=request.get_json()
    trainNoOnly = data["trainNoOnly"]
    startStation = data["startStation"]
    endStation = data["endStation"]
    seatType = data["seatType"]
    #ticketType = data["ticketType"]
    sfzNo = data["sfzNo"]

    # 购票操作
    result = src.buy(trainNoOnly, startStation, endStation, seatType, sfzNo)

    return jsonify(result)


# 场景三实现:查询用户购票信息
@app.route("/queryTicket", methods=["POST"])
def queryTicket():
    # 预计请求
    """
    用户id:123
    """
    userId = request.get_json()["userId"]

    results = src.queryTicket(userId)

    # for result in results:
    #     result["trainNo"]=result["trainNoOnly"]
        

    return jsonify(results)


# 场景四实现:退票
@app.route("/refund", methods=["POST"])
def refund():
    # 预计请求
    """
    用户id:123
    车票号:123456789
    """
    data=request.get_json()
    #userId = data["userId"]
    ticketNo = data["ticketNo"]
    # 退票操作
    result = src.refundTicket(ticketNo)
    return result



# 场景五_1实现:查询时刻表信息
@app.route("/trainNo/initialLaunchTime_1", methods=["POST"])
def queryInitialLaunchTime_1():
    data=request.get_json()
    trainNo=data['trainNo']

    result = initialLaunchTime_1(trainNo)

    return jsonify(result)

# 场景五_2实现:查询时刻表信息
@app.route("/trainNo/initialLaunchTime_2", methods=["POST"])
def queryInitialLaunchTime_2():
    data=request.get_json()
    trainNoOnly=data['trainNoOnly']
    result = initialLaunchTime_2(trainNoOnly)
    result["trainNo"]=result["trainNoOnly"]
    return jsonify(result)


#场景六实现：提供城市-火车站列表
@app.route("/cityStationList", methods=["POST"])
def cityStation():
    return jsonify(src.cityStationList())


#场景七实现： 获取乘客信息列表
@app.route("/passengerInformation", methods=["POST"])
def passengerInformation():
    data=request.get_json()
    userId=data['userId']
    results = src.passengerInformation(userId)
    return jsonify(results)


#场景八实现： 用户注册
@app.route("/register", methods=["POST"])
def register():
    data=request.get_json()
    userId=data['userId']
    password=data['password']
    passengerName = data['passengerName']

    dic=src.register(userId,password, passengerName)
    return jsonify(dic)


#场景九实现： 用户登录
@app.route("/login", methods=["POST"])
def login():
    data=request.get_json()
    userId=data['userId']
    password=data['password']
    dic=src.login(userId, password)
    return jsonify(dic)



#场景十实现： 用户信息填写 暂时废弃
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

#场景11实现： 余票信息查询
@app.route("/queryTicketBasedOnTrain", methods=["POST"])
def queryTicketBasedOnTrain():
    data=request.get_json()
    trainNoOnly=data['trainNoOnly']
    startStation=data['startStation']
    endStation=data['endStation']
    results = src.availableTicketQuery(trainNoOnly, startStation, endStation)
    return jsonify(results)

    
if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
