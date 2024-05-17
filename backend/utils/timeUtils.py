# Utils for Occasion 11
def number_to_day_of_week(number):
    day_of_week = {
        1: "周一",
        2: "周二",
        3: "周三",
        4: "周四",
        5: "周五",
        6: "周六",
        7: "周日"
    }
    return day_of_week.get(number, "Invalid number")

# # 测试函数
# print(number_to_day_of_week(2))  # 输出：周二