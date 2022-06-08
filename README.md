# shoes_box

## Interactive diagram:
https://www.geogebra.org/m/bckavsdb
(move point F)

## Input:
Width, length, height, toe measurements (in mm) and the name of ***one*** particular shoes size.
![Shoes parameters](/shoes.png "Shoes parameters")

There are 17 shoes sizes in total, namely 6, 6T, 7, 7T, ..., 12, 12T, 13, 14, 15, meaning that there is no half size for 13, 14, 15.  
The parameters of the other 16 shoes sizes will have to be calculated on the grounds that each half size is adjusted as follows:
* Width increases by 1.5mm
* Length increases by 5mm
* Height increases by 1.7mm
* Toe increases by 0.4mm

## Output:
A table of ***4 or 5*** box types, each with a matching range of shoes sizes that will ***minimize*** the ***total weight*** of a typical order (which includes various shoes sizes, ***normal distributed***). E.g:

Sizes | Box type
:-:|-
6|B16
6T - 9T|B18
10 - 11|B19
11T - 12T|B20
13 - 15|B21

## Contraints:
The weights of each box type is as following stated:

Box type|Length|Width|Height|Weight
-|-|-|-|-
B1 |181|111|70 |73.71
B2 |195|130|75 |87.89
B3 |251|121|90 |107.73
B4 |300|130|100|141.75
B5 |324|140|111|164.43
B7 |370|160|130|240.98
B9 |325|151|106|170.10
B10|356|171|116|201.29
B11|311|171|116|198.45
B12|365|205|130|252.31
B13|225|160|90 |121.91
B14|286|181|100|167.27
B16|321|200|111|215.46
C18|330|225|116|240.00
B19|349|230|121|252.32
B20|370|235|130|283.50
B21|390|241|140|326.03
N4 |375|290|135|340.00
N5 |435|335|150|470.0

Note that the shoes is fitted into the corresponding box on the following conditions:
![Box condition](/box.png "Box condition")
