from src import queryTicket, buy, query, initialLaunchTime_1, initialLaunchTime_2, cityStationList, passengerInformation, availableTicketQuery




# # buy test
# trainNoOnly = 'G1228_2'
# startStation = '天津西站'
# endStation = '上海虹桥站'
# seatType = '二等座'
# sfzNo = '367042679626300864'
# buy(trainNoOnly, startStation, endStation, seatType, sfzNo)


# queryTicket test
print('queryTicket test')
_sfzno = "367042679626300864"
print(queryTicket(_sfzno))
print()




# # query test
print('query test')
startStation = '天津西站'
endStation = '上海虹桥站'
startDay = '2024-04-08'
print(query(startStation, endStation, startDay))
print()


# # initialLaunchTime_1 test
print('initialLaunchTime_1 test')
trainNoOnly = 'G1228_2'
print(initialLaunchTime_1(trainNoOnly))
print()


# # initialLaunchTime_2 test
print('initialLaunchTime_2 test')
trainNoOnly = 'G1228_2'
print(initialLaunchTime_2(trainNoOnly))
print()


# # cityStationList test

print('cityStationList test')
print(cityStationList())
print()


# # passengerInformation test
print('passengerInformation test')
sfzNo = '238460163186803776'
print(passengerInformation(sfzNo))
print()


# # availableTicketQuery test
print('availableTicketQuery test')
trainNoOnly = 'G1228_2'
startStation = '天津西站'
endStation = '上海虹桥站'
print(availableTicketQuery(trainNoOnly, startStation, endStation))
print()
