from PIL import Image
from sys import argv
import os

def check_green(image_in_ques):
    packed = 0
    highway = 0
    greennopop = 0
    water = 0
    road = 0
    total = 0
    img = Image.open(image_in_ques)
    data_array = []
    pix = img.load()
    for i in range(img.size[0]):
        for j in range(img.size[1]):
            x, y, z, q = pix[i, j]
            total = total + 1
            if x == 235:
                packed = packed + 1
            elif x == 246:
                highway = highway + 1
            elif x == 178:
                greennopop = greennopop + 1
            elif x == 172:
                water = water + 1
            elif x == 255:
                road = road + 1
    packed = str(packed / total * 100)
    highway = str(highway / total * 100)
    greennopop = str(greennopop / total * 100)
    water = str(water / total * 100)
    road = str(road / total * 100)
    print(packed, highway, greennopop, water, road)
    with open("high_den.csv", 'a') as outfile:
        outfile.write(packed+", "+highway+", "+greennopop+", "+water+", " +road+", "+ str(0)+"\n")


if __name__ == "__main__":
    for files in os.listdir("."):
        check_green(files)
