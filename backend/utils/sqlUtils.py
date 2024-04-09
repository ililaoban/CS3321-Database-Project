from basicConfigs import sqlConfig
import pymysql

def createBotDataDb():
    mydb = pymysql.connect(**sqlConfig)
    mycursor = mydb.cursor()
    mydb.autocommit = True
    # mycursor.execute("""
    # create database if not exists `BOT_DATA_%d`
    # """%BOT_SELF_QQ)

def newSqlSession(autocommit:bool=True):
    mydb = pymysql.connect(charset='utf8mb4',cursorclass = pymysql.cursors.DictCursor,**sqlConfig)
    mydb.autocommit = autocommit
    mycursor = mydb.cursor()
    #mycursor.execute('use `BOT_DATA_%d`'%BOT_SELF_QQ)
    return mydb, mycursor

if __name__ == "__main__":
    newSqlSession()