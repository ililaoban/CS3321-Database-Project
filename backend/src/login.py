from utils import newSqlSession
# 场景9 ：用户登陆
# * 请求：
# {
#     'userId':{string}
#     'password':{string}
# }
# ```
# * 响应:
# {
#     'result':{boolean}
# }
# ```

def login(userId, passwd):
    conn, cursor = newSqlSession()
    cursor.execute('''
        SELECT * 
        FROM Passenger
        WHERE sfzNo=%s AND password=%s
        ''', (userId, passwd))
    ##print(cursor.fetchall())
    result = len(cursor.fetchall()) != 0
    print(result)
    conn.close()
    return {"result":result}


if __name__ == '__main__':
    print(login("test001", "123"))
