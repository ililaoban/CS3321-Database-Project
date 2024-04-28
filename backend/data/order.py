import json
import hashlib

def hash_string_to_four_digits(input_string):
    # Using hashlib to create a md5 hash of the input string
    hash_object = hashlib.md5(input_string.encode())
    # Take the integer value of the first 8 characters of the hash
    # Use modulo operation to make sure it's a number between 0000 and 9999
    short_hash = int(hash_object.hexdigest()[:8], base=16) % 10000
    # Return as a 4-digit string, padding with zeroes if necessary
    return f"{short_hash:04d}"


def order_cities():
    with open("./data/cities.json", "r", encoding="utf-8") as f:
        Eight_Crossing_Lines = json.load(f)

    cities=set()
    for row_col_list in Eight_Crossing_Lines:
        for roads in Eight_Crossing_Lines[row_col_list]:
            for station in roads:
                road_cities=roads[station]
                print(station)
                for city in road_cities:
                    cities.add(city)
    Eight_Crossing_Lines['cities']=list(cities)
    with open("./data/cities.json", "w", encoding="utf-8") as f:
        json.dump(Eight_Crossing_Lines, f, ensure_ascii=False, indent=4)

                
def order_trains():
    with open("./data/cities.json", "r", encoding="utf-8") as f:
        Eight_Crossing_Lines = json.load(f)

    rol_and_col=["八横","八纵"]
        
    for i in rol_and_col:
        roads=Eight_Crossing_Lines[i]
        for road in roads:
            for key in road.keys():
                if (not key.endswith("通道")):
                    continue
                trainNo='G'+hash_string_to_four_digits(key)
            
                road["trainNoOnly"]=[trainNo+"_1",trainNo+"_2"]
    
    with open("./data/cities.json", "w", encoding="utf-8") as f:
        json.dump(Eight_Crossing_Lines, f, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    order_trains()
    