from flask import Flask,render_template,request,jsonify

app = Flask(__name__)

@app.route("/refund",methods=['POST'])
def refund():
    # 获取Post请求正文body用request.form
    userId = request.form['id']
    ticketNo = request.form['ticketNo']
    # 退票操作
    dic = {"result":True, "userId":userId, "ticketNo":ticketNo}
    #将字典转化成json
    return jsonify(dic) 


@app.route("/train/<int:id>",methods=['POST','GET'])
def queryTrain(id):
    # 获取path中的参数
    dic = {"result":True, "userId":id}
    return jsonify(dic)


@app.route("/train",methods=['GET'])
def queryTrain2():
    # 获取query_string中的参数
    id = request.args['id']
    dic = {"result":True, "userId":id}
    return jsonify(dic)




if __name__ == '__main__':
    app.run()