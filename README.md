# Matrix Calculator

## How to execute?

### `npm install`

Is to be executed only once after the clone.\
Installs necessary packages.


### `npm start`

Starts the Web-App; connect to 127.0.0.1:8000.


## Random Info and Facts:

Only numbers allowed yet.\
Error-Messages are React-Errors.\
If you change the dimensions of a matrix, it itself changes, but it keeps the old version in mind, which means, that if you shrink an array and resize it bigger, the old info will be kept:\
1 1 1 1\
1 1 1 1\
1 1 1 1\
1 1 1 1\
change dimensions from 4x4 to 3x4:\
1 1 1 1\
1 1 1 1\
1 1 1 1\
change dimensions from 3x4 to 5x4:\
1 1 1 1\
1 1 1 1\
1 1 1 1\
1 1 1 1 <= old info\
0 0 0 0 <= new empty cells = 0\

The calculation input below the Operator/1st Matrix/2nd Matrix, can take any calculation possible: Important is: AT = Transpose of A; AI = Inverse of A\
Press  the enter key for the result.
more complicated  problems are the inaccuracy of floats: take a random (invetable) Matrix and try: M/M. the outcome will be close to the identity matrix, but nor quite it; this will be solved with a fraction-system i'll build in later
