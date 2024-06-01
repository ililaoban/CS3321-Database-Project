from utils import newSqlSession

# Occasion 6: render the city-station list

# input: None

# output:
# [
#   {
#      provinceName: '上海市',
#     children: [
#         {
#             cityName: '上海市',
#             children: [
#                 {
#                     stationName: '上海虹桥站',
#                 },
#                 {
#                     stationName: '上海南站',
#                 },
#                 {
#                     cityName: '上海市',
#                 }
#               ],
#           },
#       ],
#   },
# ...
# ]


# TODO(BobHuangC): There might be logic error
def cityStationList():
    conn, cursor = newSqlSession()
    cursor.execute('''
    SELECT provinceName, cityName, stationName
    FROM Station
    ORDER BY provinceName, cityName, stationName
    ''')
    result = cursor.fetchall()
    cursor.close()
    conn.close()

    res = []
    for i in result:
        if len(res) == 0 or res[-1]['provinceName'] != i['provinceName']:
            res.append({
                'provinceName': i['provinceName'],
                'children': [
                    {
                        'cityName': i['cityName'],
                        'children': [
                            {
                                'stationName': i['cityName'] + '市'
                            },{
                                'stationName': i['stationName']
                            }
                        ]
                    }
                ]
            })
        else:
            if res[-1]['children'][-1]['cityName'] == i['cityName']:
                res[-1]['children'][-1]['children'].append({
                    'stationName': i['stationName']
                })
            else:
                res[-1]['children'].append({
                    'cityName': i['cityName'],
                    'children': [
                        {
                                'stationName': i['cityName'] + '市'
                            },
                        {
                            'stationName': i['stationName']
                        }
                    ]
                })

    return res