from utils import newSqlSession
# 场景8 ：用户注册
# * 请求：
# {
#     'userId':{string}
#     'password':{string}
#     'passengerName':{string} //0528新增
# }
# ```
# * 响应:
# {
#     'result':{boolean}
# }
# ```

def register(userId, passwd, passengerName):
    conn, cursor = newSqlSession(False)
    try:
        cursor.execute('''
        INSERT INTO Passenger
        (sfzNo, password, name)
        VALUES
        (%s, %s, %s)
        ''', (userId, passwd, passengerName))
        conn.commit()
        result = True
    except:
        result = False
    finally:
        conn.close()
    return {"result":result}


if __name__ == '__main__':
    print(register("test001", "123", "sz"))
