from utils import newSqlSession

def refundTicket(ticketNo):
	"""
	Occasion 4: User Refund the ticket

	input:     
	{
        "userId":{string},
        "ticketNo":{string}
    }

	output:
    {    
        "result":{boolean}
    }
	"""

	conn, cursor = newSqlSession()
	cursor.execute('''
	SELECT trainNoOnly,carriageNo,seatNo,startStation,endStation
	FROM Trip
	WHERE ticketNo = %s
	''', ticketNo)
	result1 = cursor.fetchone()
	if (not result1):
		print("Ticket No.%d not FOUND"%(ticketNo))
		return {"result":False}

	trainNoOnly = result1['trainNoOnly']
	carriageNo = result1['carriageNo']
	seatNo = result1['seatNo']
	startStation = result1['startStation']
	endStation = result1['endStation']


	cursor.execute('''
		SELECT testbit
		FROM Price
		WHERE trainNoOnly=%s AND startStation=%s AND endStation=%s
		''', (trainNoOnly, startStation, endStation))
	result2 = cursor.fetchone()
	if (not result2):
		print("Train %s From %s to %s testbit not FOUND"%(trainNoOnly, startStation, endStation))
		return {"result":False}

	testbit = int.from_bytes(result2['testbit'], byteorder='big')
	#print(testbit)

	cursor.execute('''
	DELETE FROM Trip
	WHERE ticketNo=%s 
	''', ticketNo)
	#conn.commit()
	
	# Comment: sql delete won't cause error if satisfied tuple not found
	# But we need to know whether we did delete the tuple
	# cursor.rowcount return the number of rows affected by the last SQL statement
	# https://datascientest.com/en/sql-rowcount-everything-you-need-to-know-about-sql-formulas#:~:text=%40ROWCOUNT%20is%20an%20SQL%20query,%2C%20UPDATE%2C%20DELETE%2C%20SELECT%E2%80%A6
	if cursor.rowcount == 0:
		print(f"Ticket No.{ticketNo} not FOUND, perhaps it has already been refunded")
		return {"result":False}

	cursor.execute('''
	SELECT bitmap
	FROM Seat
	WHERE carriageNo=%s AND trainNoONly=%s AND seatNo=%s
	''',(carriageNo, trainNoOnly, seatNo))
	result3 = cursor.fetchone()
	if (not result3):
		print("Train %s Carriage %s  Seat %s bitmap not FOUND"%(trainNoOnly, carriageNo, seatNo))
		return {"result":False}

	bitmap = int.from_bytes(result3['bitmap'], byteorder='big')
	newbitmap = bitmap | testbit

	cursor.execute('''UPDATE Seat
	SET bitmap = %s
	WHERE carriageNo=%s AND trainNoONly=%s AND seatNo=%s''', (newbitmap, carriageNo, trainNoOnly, seatNo))
	#conn.commit()

	print('Success: Rund ticket No.', ticketNo)
	cursor.close()
	conn.close()
	return {"result":True}




if __name__ == '__main__':
	ticketNo = 7
	refundTicket(ticketNo)