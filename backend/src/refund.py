from utils import newSqlSession

def refundTicket(ticketNo):
	conn, cursor = newSqlSession()
	cursor.execute('''
	SELECT trainNoOnly,carriageNo,seatNo,startStation,endStation
	FROM Trip
	WHERE ticketNo = %s
	''', ticketNo)
	result1 = cursor.fetchone()
	if (not result1):
			print("Ticket No.%d not FOUND"%(ticketNo))
			return

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
	if (not result1):
			print("Train %s From %s to %s testbit not FOUND"%(trainNoOnly, startStation, endStation))
			return

	testbit = int.from_bytes(result2['testbit'], byteorder='big')
	#print(testbit)

	cursor.execute('''
	DELETE FROM Trip
	WHERE ticketNo=%s 
	''', ticketNo)
	#conn.commit()

	cursor.execute('''
	SELECT bitmap
	FROM Seat
	WHERE carriageNo=%s AND trainNoONly=%s AND seatNo=%s
	''',(carriageNo, trainNoOnly, seatNo))
	result3 = cursor.fetchone()
	if (not result3):
			print("Train %s Carriage %s  Seat %s bitmap not FOUND"%(trainNoOnly, carriageNo, seatNo))
			return

	bitmap = int.from_bytes(result3['bitmap'], byteorder='big')
	newbitmap = bitmap | testbit

	cursor.execute('''UPDATE Seat
	SET bitmap = %s
	WHERE carriageNo=%s AND trainNoONly=%s AND seatNo=%s''', (newbitmap, carriageNo, trainNoOnly, seatNo))
	#conn.commit()

	print('Success: Rund ticket No.', ticketNo)
	cursor.close()
	conn.close()



if __name__ == '__main__':
	ticketNo = 7
	refundTicket(ticketNo)