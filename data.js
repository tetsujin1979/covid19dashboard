const data = [
  {date: new Date('2020-02-29'), cases: 1, deaths: 0},
  {date: new Date('2020-03-01'), cases: 0, deaths: 0},
  {date: new Date('2020-03-02'), cases: 0, deaths: 0},
  {date: new Date('2020-03-03'), cases: 1, deaths: 0},
  {date: new Date('2020-03-04'), cases: 4, deaths: 0},
  {date: new Date('2020-03-05'), cases: 7, deaths: 0},
  {date: new Date('2020-03-06'), cases: 5, deaths: 0},
  {date: new Date('2020-03-07'), cases: 1, deaths: 0},
  {date: new Date('2020-03-08'), cases: 2, deaths: 0},
  {date: new Date('2020-03-09'), cases: 3, deaths: 0},
  {date: new Date('2020-03-10'), cases: 10, deaths: 0},
  {date: new Date('2020-03-11'), cases: 9, deaths: 1},
  {date: new Date('2020-03-12'), cases: 27, deaths: 0},
  {date: new Date('2020-03-13'), cases: 20, deaths: 0},
  {date: new Date('2020-03-14'), cases: 39, deaths: 1},
  {date: new Date('2020-03-15'), cases: 40, deaths: 0},
  {date: new Date('2020-03-16'), cases: 50, deaths: 0},
  {date: new Date('2020-03-17'), cases: 69, deaths: 0},
  {date: new Date('2020-03-18'), cases: 70, deaths: 1},
  {date: new Date('2020-03-19'), positiveSwabs: 70, dailySwabs: 946, cases: 191, deaths: 0},
  {date: new Date('2020-03-20'), positiveSwabs: 105, dailySwabs: 1469, cases: 126, deaths: 0},
  {date: new Date('2020-03-21'), positiveSwabs: 55, dailySwabs: 1564, cases: 102, deaths: 1},
  {date: new Date('2020-03-22'), positiveSwabs: 119, dailySwabs: 978, cases: 121, deaths: 1},
  {date: new Date('2020-03-23'), positiveSwabs: 113, dailySwabs: 2581, cases: 200, deaths: 2},
  {date: new Date('2020-03-24'), positiveSwabs: 129, dailySwabs: 1566, cases: 200, deaths: 1},
  {date: new Date('2020-03-25'), positiveSwabs: 150, dailySwabs: 1775, cases: 229, deaths: 2},
  {date: new Date('2020-03-26'), positiveSwabs: 448, dailySwabs: 3376, cases: 240, deaths: 10},
  {date: new Date('2020-03-27'), positiveSwabs: 307, dailySwabs: 2941, cases: 302, deaths: 3},
  {date: new Date('2020-03-28'), positiveSwabs: 664, dailySwabs: 2206, cases: 282, deaths: 14},
  {date: new Date('2020-03-29'), positiveSwabs: 288, dailySwabs: 1616, cases: 200, deaths: 10},
  {date: new Date('2020-03-30'), positiveSwabs: 436, dailySwabs: 1397, cases: 290, deaths: 8},
  {date: new Date('2020-03-31'), positiveSwabs: 378, dailySwabs: 1928, cases: 300, deaths: 16},
  {date: new Date('2020-04-01'), positiveSwabs: 416, dailySwabs: 2009, cases: 216, deaths: 14},
  {date: new Date('2020-04-02'), positiveSwabs: 367, dailySwabs: 1975, cases: 401, deaths: 13},
  {date: new Date('2020-04-03'), positiveSwabs: 470, dailySwabs: 1857, cases: 400, deaths: 22},
  {date: new Date('2020-04-04'), positiveSwabs: 460, dailySwabs: 1849, cases: 331, deaths: 17},
  {date: new Date('2020-04-05'), positiveSwabs: 318, dailySwabs: 2831, cases: 500, deaths: 21},
  {date: new Date('2020-04-06'), positiveSwabs: 855, dailySwabs: 6117, cases: 711, deaths: 16},
  {date: new Date('2020-04-07'), positiveSwabs: 495, dailySwabs: 1853, cases: 349, deaths: 36},
  {date: new Date('2020-04-08'), positiveSwabs: 619, dailySwabs: 3728, cases: 460, deaths: 25},
  {date: new Date('2020-04-09'), positiveSwabs: 809, dailySwabs: 5487, cases: 670, deaths: 28},
  {date: new Date('2020-04-10'), positiveSwabs: 834, dailySwabs: 6959, cases: 671, deaths: 25},
  {date: new Date('2020-04-11'), positiveSwabs: 1219, dailySwabs: 6990, cases: 810, deaths: 32},
  {date: new Date('2020-04-12'), positiveSwabs: 917, dailySwabs: 5722, cases: 720, deaths: 14},
  {date: new Date('2020-04-13'), positiveSwabs: 1377, dailySwabs: 8427, cases: 991, deaths: 31},
  {date: new Date('2020-04-14'), positiveSwabs: 877, dailySwabs: 4275, cases: 831, deaths: 41},
  {date: new Date('2020-04-15'), positiveSwabs: 653, dailySwabs: 3036, cases: 1050, deaths: 38},
  {date: new Date('2020-04-16'), positiveSwabs: 725, dailySwabs: 3644, cases: 720, deaths: 42},
  {date: new Date('2020-04-17'), positiveSwabs: 909, dailySwabs: 4355, cases: 706, deaths: 44},
  {date: new Date('2020-04-18'), positiveSwabs: 438, dailySwabs: 2209, cases: 700, deaths: 41},
  {date: new Date('2020-04-19'), positiveSwabs: 374, dailySwabs: 2313, cases: 490, deaths: 39},
  {date: new Date('2020-04-20'), positiveSwabs: 232, dailySwabs: 1626, cases: 401, deaths: 77},
  {date: new Date('2020-04-21'), positiveSwabs: 707, dailySwabs: 3757, cases: 368, deaths: 43},
  {date: new Date('2020-04-22'), positiveSwabs: 1260, dailySwabs: 5363, cases: 620, deaths: 39},
  {date: new Date('2020-04-23'), positiveSwabs: 568, dailySwabs: 4871, cases: 900, deaths: 25},
  {date: new Date('2020-04-24'), positiveSwabs: 604, dailySwabs: 5580, cases: 567, deaths: 220},
  {date: new Date('2020-04-25'), positiveSwabs: 386, dailySwabs: 5632, cases: 370, deaths: 49},
  {date: new Date('2020-04-26'), positiveSwabs: 1093, dailySwabs: 8598, cases: 701, deaths: 24},
  {date: new Date('2020-04-27'), positiveSwabs: 357, dailySwabs: 5100, cases: 372, deaths: 15},
  {date: new Date('2020-04-28'), positiveSwabs: 367, dailySwabs: 6306, cases: 200, deaths: 57},
  {date: new Date('2020-04-29'), positiveSwabs: 420, dailySwabs: 8159, cases: 310, deaths: 31},
  {date: new Date('2020-04-30'), positiveSwabs: 300, dailySwabs: 8218, cases: 350, deaths: 42},
  {date: new Date('2020-05-01'), positiveSwabs: 262, dailySwabs: 7451, cases: 220, deaths: 33},
  {date: new Date('2020-05-02'), positiveSwabs: 447, dailySwabs: 12076, cases: 337, deaths: 21},
  {date: new Date('2020-05-03'), positiveSwabs: 324, dailySwabs: 9799, cases: 330, deaths: 17},
  {date: new Date('2020-05-04'), positiveSwabs: 327, dailySwabs: 8617, cases: 260, deaths: 16},
  {date: new Date('2020-05-05'), positiveSwabs: 204, dailySwabs: 7512, cases: 211, deaths: 20},
  {date: new Date('2020-05-06'), positiveSwabs: 279, dailySwabs: 7815, cases: 261, deaths: 36},
  {date: new Date('2020-05-07'), positiveSwabs: 201, dailySwabs: 5703, cases: 130, deaths: 28},
  {date: new Date('2020-05-08'), positiveSwabs: 163, dailySwabs: 4973, cases: 156, deaths: 26},
  {date: new Date('2020-05-09'), positiveSwabs: 197, dailySwabs: 7657, cases: 200, deaths: 17},
  {date: new Date('2020-05-10'), positiveSwabs: 325, dailySwabs: 6517, cases: 200, deaths: 12},
  {date: new Date('2020-05-11'), positiveSwabs: 165, dailySwabs: 5374, cases: 130, deaths: 9},
  {date: new Date('2020-05-12'), positiveSwabs: 136, dailySwabs: 6138, cases: 100, deaths: 21},
  {date: new Date('2020-05-13'), positiveSwabs: 211, dailySwabs: 4674, cases: 125, deaths: 9},
  {date: new Date('2020-05-14'), positiveSwabs: 219, dailySwabs: 6210, cases: 360, deaths: 9},
  {date: new Date('2020-05-15'), positiveSwabs: 108, dailySwabs: 5699, cases: 108, deaths: 12},
  {date: new Date('2020-05-16'), positiveSwabs: 112, dailySwabs: 6334, cases: 90, deaths: 15},
  {date: new Date('2020-05-17'), positiveSwabs: 126, dailySwabs: 6457, cases: 62, deaths: 10},
  {date: new Date('2020-05-18'), positiveSwabs: 81, dailySwabs: 3964, cases: 80, deaths: 4},
  {date: new Date('2020-05-19'), positiveSwabs: 59, dailySwabs: 3278, cases: 50, deaths: 14},
  {date: new Date('2020-05-20'), positiveSwabs: 94, dailySwabs: 4764, cases: 63, deaths: 10},
  {date: new Date('2020-05-21'), positiveSwabs: 126, dailySwabs: 5274, cases: 70, deaths: 12},
  {date: new Date('2020-05-22'), positiveSwabs: 112, dailySwabs: 5373, cases: 100, deaths: 9},
  {date: new Date('2020-05-23'), positiveSwabs: 78, dailySwabs: 4276, cases: 70, deaths: 12},
  {date: new Date('2020-05-24'), positiveSwabs: 57, dailySwabs: 3509, cases: 56, deaths: 2},
  {date: new Date('2020-05-25'), positiveSwabs: 98, dailySwabs: 3529, cases: 50, deaths: 0},
  {date: new Date('2020-05-26'), positiveSwabs: 67, dailySwabs: 3515, cases: 37, deaths: 9},
  {date: new Date('2020-05-27'), positiveSwabs: 67, dailySwabs: 3437, cases: 65, deaths: 16},
  {date: new Date('2020-05-28'), positiveSwabs: 44, dailySwabs: 3811, cases: 46, deaths: 8},
  {date: new Date('2020-05-29'), positiveSwabs: 72, dailySwabs: 4364, cases: 30, deaths: 6},
  {date: new Date('2020-05-30'), positiveSwabs: 70, dailySwabs: 3423, cases: 59, deaths: 3},
  {date: new Date('2020-05-31'), positiveSwabs: 70, dailySwabs: 3474, cases: 57, deaths: 1},
  {date: new Date('2020-06-01'), positiveSwabs: 42, dailySwabs: 2285, cases: 72, deaths: 1},
  {date: new Date('2020-06-02'), positiveSwabs: 24, dailySwabs: 1827, cases: 6, deaths: 6},
  {date: new Date('2020-06-03'), positiveSwabs: 40, dailySwabs: 2486, cases: 40, deaths: 3},
  {date: new Date('2020-06-04'), positiveSwabs: 33, dailySwabs: 3099, cases: 30, deaths: 5},
  {date: new Date('2020-06-05'), positiveSwabs: 36, dailySwabs: 3234, cases: 26, deaths: 6},
  {date: new Date('2020-06-06'), positiveSwabs: 27, dailySwabs: 3106, cases: 21, deaths: 8},
  {date: new Date('2020-06-07'), positiveSwabs: 21, dailySwabs: 2828, cases: 24, deaths: 2},
  {date: new Date('2020-06-08'), positiveSwabs: 9, dailySwabs: 1960, cases: 9, deaths: 3},
  {date: new Date('2020-06-09'), positiveSwabs: 19, dailySwabs: 2355, cases: 9, deaths: 8},
  {date: new Date('2020-06-10'), positiveSwabs: 19, dailySwabs: 2675, cases: 19, deaths: 4},
  {date: new Date('2020-06-11'), positiveSwabs: 29, dailySwabs: 4240, cases: 8, deaths: 8},
  {date: new Date('2020-06-12'), positiveSwabs: 44, dailySwabs: 3009, cases: 10, deaths: 2},
  {date: new Date('2020-06-13'), positiveSwabs: 16, dailySwabs: 2712, cases: 20, deaths: 0},
  {date: new Date('2020-06-14'), positiveSwabs: 13, dailySwabs: 2512, cases: 8, deaths: 1},
  {date: new Date('2020-06-15'), positiveSwabs: 21, dailySwabs: 1714, cases: 10, deaths: 0},
  {date: new Date('2020-06-16'), positiveSwabs: 5, dailySwabs: 2112, cases: 0, deaths: 3},
  {date: new Date('2020-06-17'), positiveSwabs: 22, dailySwabs: 3420, cases: 8, deaths: 1},
  {date: new Date('2020-06-18'), positiveSwabs: 13, dailySwabs: 3359, cases: 16, deaths: 4},
  {date: new Date('2020-06-19'), positiveSwabs: 29, dailySwabs: 3161, cases: 9, deaths: 0},
  {date: new Date('2020-06-20'), positiveSwabs: 14, dailySwabs: 2724, cases: 20, deaths: 1},
  {date: new Date('2020-06-21'), positiveSwabs: 9, dailySwabs: 2159, cases: 0, deaths: 0},
  {date: new Date('2020-06-22'), positiveSwabs: 6, dailySwabs: 1498, cases: 2, deaths: 2},
  {date: new Date('2020-06-23'), positiveSwabs: 6, dailySwabs: 2116, cases: 10, deaths: 3},
  {date: new Date('2020-06-24'), positiveSwabs: 22, dailySwabs: 3252, cases: 5, deaths: 6},
  {date: new Date('2020-06-25'), positiveSwabs: 12, dailySwabs: 2983, cases: 10, deaths: 1},
  {date: new Date('2020-06-26'), positiveSwabs: 37, dailySwabs: 3689, cases: 10, deaths: 3},
  {date: new Date('2020-06-27'), positiveSwabs: 4, dailySwabs: 4007, cases: 10, deaths: 4},
  {date: new Date('2020-06-28'), positiveSwabs: 4, dailySwabs: 2724, cases: 3, deaths: 1},
  {date: new Date('2020-06-29'), positiveSwabs: 28, dailySwabs: 3340, cases: 20, deaths: 0},
  {date: new Date('2020-06-30'), positiveSwabs: 7, dailySwabs: 4591, cases: 12, deaths: 1},
  {date: new Date('2020-07-01'), positiveSwabs: 22, dailySwabs: 4551, cases: 3, deaths: 2},
  {date: new Date('2020-07-02'), positiveSwabs: 8, dailySwabs: 3792, cases: 15, deaths: 0},
  {date: new Date('2020-07-03'), positiveSwabs: 10, dailySwabs: 8049, cases: 9, deaths: 2},
  {date: new Date('2020-07-04'), positiveSwabs: 29, dailySwabs: 8312, cases: 11, deaths: 1},
  {date: new Date('2020-07-05'), positiveSwabs: 8, dailySwabs: 7000, cases: 10, deaths: 0},
  {date: new Date('2020-07-06'), positiveSwabs: 20, dailySwabs: 6529, cases: 4, deaths: 0},
  {date: new Date('2020-07-07'), positiveSwabs: 11, dailySwabs: 6161, cases: 22, deaths: 1},
  {date: new Date('2020-07-08'), positiveSwabs: 20, dailySwabs: 4361, cases: 10, deaths: -4},
  {date: new Date('2020-07-09'), positiveSwabs: 27, dailySwabs: 3945, cases: 10, deaths: 5},
  {date: new Date('2020-07-10'), positiveSwabs: 21, dailySwabs: 9330, cases: 20, deaths: 1},
  {date: new Date('2020-07-11'), positiveSwabs: 41, dailySwabs: 8929, cases: 10, deaths: 2},
  {date: new Date('2020-07-12'), positiveSwabs: 14, dailySwabs: 8717, cases: 8, deaths: 0},
  {date: new Date('2020-07-13'), positiveSwabs: 19, dailySwabs: 7664, cases: 10, deaths: 0},
  {date: new Date('2020-07-14'), positiveSwabs: 15, dailySwabs: 6400, cases: 20, deaths: 0},
  {date: new Date('2020-07-15'), positiveSwabs: 17, dailySwabs: 4387, cases: 14, deaths: 2},
  {date: new Date('2020-07-16'), positiveSwabs: 24, dailySwabs: 4316, cases: 20, deaths: 1},
  {date: new Date('2020-07-17'), positiveSwabs: 26, dailySwabs: 9512, cases: 31, deaths: 3},
  {date: new Date('2020-07-18'), positiveSwabs: 14, dailySwabs: 9243, cases: 21, deaths: 1},
  {date: new Date('2020-07-19'), positiveSwabs: 13, dailySwabs: 8630, cases: 10, deaths: 0},
  {date: new Date('2020-07-20'), positiveSwabs: 31, dailySwabs: 8415, cases: 0, deaths: 0},
  {date: new Date('2020-07-21'), positiveSwabs: 13, dailySwabs: 6674, cases: 30, deaths: 0},
  {date: new Date('2020-07-22'), positiveSwabs: 18, dailySwabs: 4619, cases: 10, deaths: 1},
  {date: new Date('2020-07-23'), positiveSwabs: 12, dailySwabs: 4067, cases: 6, deaths: 9},
  {date: new Date('2020-07-24'), positiveSwabs: 16, dailySwabs: 8980, cases: 20, deaths: 0},
  {date: new Date('2020-07-25'), positiveSwabs: 31, dailySwabs: 8888, cases: 20, deaths: 1},
  {date: new Date('2020-07-26'), positiveSwabs: 24, dailySwabs: 8016, cases: 10, deaths: 0},
  {date: new Date('2020-07-27'), positiveSwabs: 30, dailySwabs: 5804, cases: 10, deaths: 0},
  {date: new Date('2020-07-28'), positiveSwabs: 16, dailySwabs: 4965, cases: 40, deaths: 0},
  {date: new Date('2020-07-29'), positiveSwabs: 46, dailySwabs: 4740, cases: 14, deaths: 0},
  {date: new Date('2020-07-30'), positiveSwabs: 56, dailySwabs: 4383, cases: 85, deaths: -1},
  {date: new Date('2020-07-31'), positiveSwabs: 29, dailySwabs: 3856, cases: 30, deaths: 0},
  {date: new Date('2020-08-01'), positiveSwabs: 53, dailySwabs: 3306, cases: 45, deaths: 0},
  {date: new Date('2020-08-02'), positiveSwabs: 54, dailySwabs: 3131, cases: 50, deaths: 0},
  {date: new Date('2020-08-03'), positiveSwabs: 76, dailySwabs: 3041, cases: 40, deaths: 0},
  {date: new Date('2020-08-04'), positiveSwabs: 6, dailySwabs: 1991, cases: 40, deaths: 0},
  {date: new Date('2020-08-05'), positiveSwabs: 52, dailySwabs: 3761, cases: 50, deaths: 0},
  {date: new Date('2020-08-06'), positiveSwabs: 73, dailySwabs: 4833, cases: 60, deaths: 5},
  {date: new Date('2020-08-07'), positiveSwabs: 94, dailySwabs: 4980, cases: 98, deaths: 4},
  {date: new Date('2020-08-08'), positiveSwabs: 137, dailySwabs: 4880, cases: 158, deaths: 0},
  {date: new Date('2020-08-09'), positiveSwabs: 55, dailySwabs: 4107, cases: 68, deaths: 0},
  {date: new Date('2020-08-10'), positiveSwabs: 60, dailySwabs: 3874, cases: 50, deaths: 0},
  {date: new Date('2020-08-11'), positiveSwabs: 53, dailySwabs: 4026, cases: 35, deaths: 1},
  {date: new Date('2020-08-12'), positiveSwabs: 80, dailySwabs: 5843, cases: 29, deaths: 1},
  {date: new Date('2020-08-13'), positiveSwabs: 63, dailySwabs: 7072, cases: 92, deaths: 0},
  {date: new Date('2020-08-14'), positiveSwabs: 138, dailySwabs: 11337, cases: 61, deaths: 0},
  {date: new Date('2020-08-15'), positiveSwabs: 122, dailySwabs: 10653, cases: 200, deaths: 0},
  {date: new Date('2020-08-16'), positiveSwabs: 89, dailySwabs: 10352, cases: 66, deaths: 0},
  {date: new Date('2020-08-17'), positiveSwabs: 170, dailySwabs: 5533, cases: 54, deaths: 0},
  {date: new Date('2020-08-18'), positiveSwabs: 31, dailySwabs: 4339, cases: 190, deaths: 1},
  {date: new Date('2020-08-19'), positiveSwabs: 90, dailySwabs: 6192, cases: 50, deaths: 0},
  {date: new Date('2020-08-20'), positiveSwabs: 142, dailySwabs: 11416, cases: 136, deaths: 1},
  {date: new Date('2020-08-21'), positiveSwabs: 94, dailySwabs: 13080, cases: 79, deaths: 0},
  {date: new Date('2020-08-22'), positiveSwabs: 157, dailySwabs: 6758, cases: 156, deaths: 1},
  {date: new Date('2020-08-23'), positiveSwabs: 123, dailySwabs: 5438, cases: 61, deaths: 0},
  {date: new Date('2020-08-24'), positiveSwabs: 92, dailySwabs: 4838, cases: 147, deaths: 0},
  {date: new Date('2020-08-25'), positiveSwabs: 101, dailySwabs: 5015, cases: 91, deaths: 0},
  {date: new Date('2020-08-26'), positiveSwabs: 105, dailySwabs: 7648, cases: 140, deaths: 0},
  {date: new Date('2020-08-27'), positiveSwabs: 129, dailySwabs: 12274, cases: 93, deaths: 0},
  {date: new Date('2020-08-28'), positiveSwabs: 107, dailySwabs: 12303, cases: 127, deaths: 0},
  {date: new Date('2020-08-29'), positiveSwabs: 113, dailySwabs: 9940, cases: 142, deaths: 0},
  {date: new Date('2020-08-30'), positiveSwabs: 49, dailySwabs: 5659, cases: 42, deaths: 0},
  {date: new Date('2020-08-31'), positiveSwabs: 159, dailySwabs: 9340, cases: 50, deaths: 0},
  {date: new Date('2020-09-01'), positiveSwabs: 90, dailySwabs: 4892, cases: 217, deaths: 0},
  {date: new Date('2020-09-02'), positiveSwabs: 105, dailySwabs: 7301, cases: 89, deaths: 0},
  {date: new Date('2020-09-03'), positiveSwabs: 137, dailySwabs: 12501, cases: 90, deaths: 0},
  {date: new Date('2020-09-04'), positiveSwabs: 155, dailySwabs: 14064, cases: 96, deaths: 0},
  {date: new Date('2020-09-05'), positiveSwabs: 154, dailySwabs: 11322, cases: 231, deaths: 0},
  {date: new Date('2020-09-06'), positiveSwabs: 174, dailySwabs: 10343, cases: 128, deaths: 0},
  {date: new Date('2020-09-07'), positiveSwabs: 232, dailySwabs: 6253, cases: 102, deaths: 0},
  {date: new Date('2020-09-08'), positiveSwabs: 119, dailySwabs: 6678, cases: 307, deaths: 1},
  {date: new Date('2020-09-09'), positiveSwabs: 156, dailySwabs: 10749, cases: 80, deaths: 3},
  {date: new Date('2020-09-10'), positiveSwabs: 122, dailySwabs: 12363, cases: 196, deaths: 0},
  {date: new Date('2020-09-11'), positiveSwabs: 227, dailySwabs: 13073, cases: 211, deaths: 0},
  {date: new Date('2020-09-12'), positiveSwabs: 248, dailySwabs: 12230, cases: 159, deaths: 2},
  {date: new Date('2020-09-13'), positiveSwabs: 217, dailySwabs: 9815, cases: 241, deaths: 1},
  {date: new Date('2020-09-14'), positiveSwabs: 261, dailySwabs: 9888, cases: 208, deaths: 0},
  {date: new Date('2020-09-15'), positiveSwabs: 311, dailySwabs: 8120, cases: 357, deaths: 3},
  {date: new Date('2020-09-16'), positiveSwabs: 271, dailySwabs: 12241, cases: 254, deaths: 1},
  {date: new Date('2020-09-17'), positiveSwabs: 248, dailySwabs: 14663, cases: 220, deaths: 1},
  {date: new Date('2020-09-18'), positiveSwabs: 288, dailySwabs: 14506, cases: 250, deaths: 3},
  {date: new Date('2020-09-19'), positiveSwabs: 197, dailySwabs: 14380, cases: 270, deaths: 0},
  {date: new Date('2020-09-20'), positiveSwabs: 392, dailySwabs: 12138, cases: 396, deaths: 0},
  {date: new Date('2020-09-21'), positiveSwabs: 254, dailySwabs: 10031, cases: 188, deaths: 0},
  {date: new Date('2020-09-22'), positiveSwabs: 299, dailySwabs: 12583, cases: 334, deaths: 0},
  {date: new Date('2020-09-23'), positiveSwabs: 316, dailySwabs: 12671, cases: 234, deaths: 2},
  {date: new Date('2020-09-24'), positiveSwabs: 383, dailySwabs: 14356, cases: 324, deaths: 3},
  {date: new Date('2020-09-25'), positiveSwabs: 430, dailySwabs: 14538, cases: 326, deaths: 0},
  {date: new Date('2020-09-26'), positiveSwabs: 402, dailySwabs: 11808, cases: 248, deaths: 5},
  {date: new Date('2020-09-27'), positiveSwabs: 382, dailySwabs: 11878, cases: 430, deaths: 0},
  {date: new Date('2020-09-28'), positiveSwabs: 289, dailySwabs: 9866, cases: 390, deaths: 0},
  {date: new Date('2020-09-29'), positiveSwabs: 279, dailySwabs: 12673, cases: 363, deaths: 1},
  {date: new Date('2020-09-30'), positiveSwabs: 440, dailySwabs: 13247, cases: 418, deaths: 1},
  {date: new Date('2020-10-01'), positiveSwabs: 511, dailySwabs: 14524, cases: 442, deaths: 2},
  {date: new Date('2020-10-02'), positiveSwabs: 458, dailySwabs: 12673, cases: 470, deaths: -5},
  {date: new Date('2020-10-03'), positiveSwabs: 610, dailySwabs: 13621, cases: 613, deaths: 9},
  {date: new Date('2020-10-04'), positiveSwabs: 425, dailySwabs: 11295, cases: 354, deaths: 0},
  {date: new Date('2020-10-05'), positiveSwabs: 503, dailySwabs: 12166, cases: 518, deaths: 0},
  {date: new Date('2020-10-06'), positiveSwabs: 516, dailySwabs: 11646, cases: 432, deaths: 1},
  {date: new Date('2020-10-07'), positiveSwabs: 625, dailySwabs: 14542, cases: 611, deaths: 5},
  {date: new Date('2020-10-08'), positiveSwabs: 753, dailySwabs: 15880, cases: 506, deaths: 1},
  {date: new Date('2020-10-09'), positiveSwabs: 857, dailySwabs: 16522, cases: 617, deaths: 4},
  {date: new Date('2020-10-10'), positiveSwabs: 947, dailySwabs: 15634, cases: 1012, deaths: 3},
  {date: new Date('2020-10-11'), positiveSwabs: 582, dailySwabs: 7998, cases: 814, deaths: 2},
  {date: new Date('2020-10-12'), positiveSwabs: 998, dailySwabs: 13988, cases: 813, deaths: 1},
  {date: new Date('2020-10-13'), positiveSwabs: 889, dailySwabs: 15305, cases: 811, deaths: 3},
  {date: new Date('2020-10-14'), positiveSwabs: 1271, dailySwabs: 16255, cases: 1090, deaths: 5},
  {date: new Date('2020-10-15'), positiveSwabs: 966, dailySwabs: 13428, cases: 1200, deaths: 3},
  {date: new Date('2020-10-16'), positiveSwabs: 1376, dailySwabs: 17758, cases: 1000, deaths: 3},
  {date: new Date('2020-10-17'), positiveSwabs: 1507, dailySwabs: 19040, cases: 1276, deaths: 8},
  {date: new Date('2020-10-18'), positiveSwabs: 1151, dailySwabs: 16140, cases: 1283, deaths: 3},
  {date: new Date('2020-10-19'), positiveSwabs: 970, dailySwabs: 14391, cases: 1031, deaths: 0},
  {date: new Date('2020-10-20'), positiveSwabs: 905, dailySwabs: 14676, cases: 1268, deaths: 13},
  {date: new Date('2020-10-21'), positiveSwabs: 1112, dailySwabs: 16779, cases: 1137, deaths: 3},
  {date: new Date('2020-10-22'), positiveSwabs: 1035, dailySwabs: 17834, cases: 1066, deaths: 3},
  {date: new Date('2020-10-23'), positiveSwabs: 1036, dailySwabs: 17712, cases: 770, deaths: 7},
  {date: new Date('2020-10-24'), positiveSwabs: 975, dailySwabs: 17906, cases: 859, deaths: 4},
  {date: new Date('2020-10-25'), positiveSwabs: 922, dailySwabs: 15772, cases: 1020, deaths: 0},
  {date: new Date('2020-10-26'), positiveSwabs: 738, dailySwabs: 14264, cases: 939, deaths: 3},
  {date: new Date('2020-10-27'), positiveSwabs: 535, dailySwabs: 11435, cases: 720, deaths: 5},
  {date: new Date('2020-10-28'), positiveSwabs: 657, dailySwabs: 11170, cases: 675, deaths: 6},
  {date: new Date('2020-10-29'), positiveSwabs: 783, dailySwabs: 15316, cases: 866, deaths: 6},
  {date: new Date('2020-10-30'), positiveSwabs: 684, dailySwabs: 13801, cases: 772, deaths: 6},
  {date: new Date('2020-10-31'), positiveSwabs: 674, dailySwabs: 14296, cases: 416, deaths: 5},
  {date: new Date('2020-11-01'), positiveSwabs: 539, dailySwabs: 11068, cases: 552, deaths: 2},
  {date: new Date('2020-11-02'), positiveSwabs: 394, dailySwabs: 11074, cases: 767, deaths: 2},
  {date: new Date('2020-11-03'), positiveSwabs: 391, dailySwabs: 10500, cases: 322, deaths: 5},
  {date: new Date('2020-11-04'), positiveSwabs: 617, dailySwabs: 12592, cases: 440, deaths: 8},
  {date: new Date('2020-11-05'), positiveSwabs: 450, dailySwabs: 11846, cases: 591, deaths: 3},
  {date: new Date('2020-11-06'), positiveSwabs: 502, dailySwabs: 11815, cases: 499, deaths: 7},
  {date: new Date('2020-11-07'), positiveSwabs: 428, dailySwabs: 12172, cases: 331, deaths: 5},
  {date: new Date('2020-11-08'), positiveSwabs: 447, dailySwabs: 9576, cases: 542, deaths: 2},
  {date: new Date('2020-11-09'), positiveSwabs: 327, dailySwabs: 9912, cases: 270, deaths: 1},
  {date: new Date('2020-11-10'), positiveSwabs: 284, dailySwabs: 10407, cases: 270, deaths: 15},
  {date: new Date('2020-11-11'), positiveSwabs: 418, dailySwabs: 10790, cases: 362, deaths: 2},
  {date: new Date('2020-11-12'), positiveSwabs: 423, dailySwabs: 13058, cases: 385, deaths: 0},
  {date: new Date('2020-11-13'), positiveSwabs: 523, dailySwabs: 11612, cases: 482, deaths: 7},
  {date: new Date('2020-11-14'), positiveSwabs: 388, dailySwabs: 9801, cases: 456, deaths: 6},
  {date: new Date('2020-11-15'), positiveSwabs: 374, dailySwabs: 9184, cases: 378, deaths: 1},
  {date: new Date('2020-11-16'), positiveSwabs: 491, dailySwabs: 11106, cases: 456, deaths: 5},
  {date: new Date('2020-11-17'), positiveSwabs: 364, dailySwabs: 9977, cases: 366, deaths: 11},
  {date: new Date('2020-11-18'), positiveSwabs: 389, dailySwabs: 12562, cases: 369, deaths: 11},
  {date: new Date('2020-11-19'), positiveSwabs: 332, dailySwabs: 12640, cases: 429, deaths: 4},
  {date: new Date('2020-11-20'), positiveSwabs: 388, dailySwabs: 12829, cases: 330, deaths: 8},
  {date: new Date('2020-11-21'), positiveSwabs: 246, dailySwabs: 10444, cases: 340, deaths: 4},
  {date: new Date('2020-11-22'), positiveSwabs: 301, dailySwabs: 9563, cases: 318, deaths: 1},
  {date: new Date('2020-11-23'), positiveSwabs: 293, dailySwabs: 9834, cases: 252, deaths: -1},
  {date: new Date('2020-11-24'), positiveSwabs: 190, dailySwabs: 10089, cases: 226, deaths: 6},
  {date: new Date('2020-11-25'), positiveSwabs: 363, dailySwabs: 12442, cases: 269, deaths: 5},
  {date: new Date('2020-11-26'), positiveSwabs: 270, dailySwabs: 12456, cases: 335, deaths: 3},
  {date: new Date('2020-11-27'), positiveSwabs: 318, dailySwabs: 10778, cases: 206, deaths: 7},
  {date: new Date('2020-11-28'), positiveSwabs: 355, dailySwabs: 11339, cases: 243, deaths: 7},
  {date: new Date('2020-11-29'), positiveSwabs: 338, dailySwabs: 9443, cases: 300, deaths: 2},
  {date: new Date('2020-11-30'), positiveSwabs: 190, dailySwabs: 9057, cases: 306, deaths: 1},
  {date: new Date('2020-12-01'), positiveSwabs: 199, dailySwabs: 9786, cases: 269, deaths: 16},
  {date: new Date('2020-12-02'), positiveSwabs: 334, dailySwabs: 11934, cases: 270, deaths: 5},
  {date: new Date('2020-12-03'), positiveSwabs: 253, dailySwabs: 12047, cases: 180, deaths: 6},
  {date: new Date('2020-12-04'), positiveSwabs: 277, dailySwabs: 11856, cases: 265, deaths: 6},
  {date: new Date('2020-12-05'), positiveSwabs: 322, dailySwabs: 11456, cases: 456, deaths: 13},
  {date: new Date('2020-12-06'), positiveSwabs: 292, dailySwabs: 9413, cases: 301, deaths: 0},
  {date: new Date('2020-12-07'), positiveSwabs: 234, dailySwabs: 9623, cases: 242, deaths: 0},
  {date: new Date('2020-12-08'), positiveSwabs: 224, dailySwabs: 10424, cases: 215, deaths: -2},
  {date: new Date('2020-12-09'), positiveSwabs: 274, dailySwabs: 12203, cases: 220, deaths: 5},
  {date: new Date('2020-12-10'), positiveSwabs: 284, dailySwabs: 12688, cases: 310, deaths: 15},
  {date: new Date('2020-12-11'), positiveSwabs: 325, dailySwabs: 12618, cases: 313, deaths: 3},
  {date: new Date('2020-12-12'), positiveSwabs: 336, dailySwabs: 12850, cases: 248, deaths: 3},
  {date: new Date('2020-12-13'), positiveSwabs: 355, dailySwabs: 10728, cases: 429, deaths: 1},
  {date: new Date('2020-12-14'), positiveSwabs: 292, dailySwabs: 10251, cases: 264, deaths: 2},
  {date: new Date('2020-12-15'), positiveSwabs: 356, dailySwabs: 10847, cases: 329, deaths: 8},
  {date: new Date('2020-12-16'), positiveSwabs: 474, dailySwabs: 13120, cases: 431, deaths: 6},
  {date: new Date('2020-12-17'), positiveSwabs: 521, dailySwabs: 13219, cases: 484, deaths: 3},
  {date: new Date('2020-12-18'), positiveSwabs: 637, dailySwabs: 14093, cases: 582, deaths: 6},
  {date: new Date('2020-12-19'), positiveSwabs: 703, dailySwabs: 13941, cases: 527, deaths: 5},
  {date: new Date('2020-12-20'), positiveSwabs: 746, dailySwabs: 13458, cases: 764, deaths: 4},
  {date: new Date('2020-12-21'), positiveSwabs: 757, dailySwabs: 12804, cases: 727, deaths: 0},
  {date: new Date('2020-12-22'), positiveSwabs: 698, dailySwabs: 13225, cases: 970, deaths: 13},
  {date: new Date('2020-12-23'), positiveSwabs: 1077, dailySwabs: 20662, cases: 938, deaths: 13},
  {date: new Date('2020-12-24'), positiveSwabs: 1269, dailySwabs: 22876, cases: 922, deaths: 8},
  {date: new Date('2020-12-25'), positiveSwabs: 1644, dailySwabs: 21423, cases: 1025, deaths: 2},
  {date: new Date('2020-12-26'), positiveSwabs: 1207, dailySwabs: 11999, cases: 1296, deaths: 6},
  {date: new Date('2020-12-27'), positiveSwabs: 343, dailySwabs: 3536, cases: 744, deaths: 4},
  {date: new Date('2020-12-28'), positiveSwabs: 1178, dailySwabs: 9405, cases: 765, deaths: 1},
  {date: new Date('2020-12-29'), positiveSwabs: 2007, dailySwabs: 13805, cases: 1546, deaths: 9, firstDose: 100},
  {date: new Date('2020-12-30'), positiveSwabs: 2867, dailySwabs: 17489, cases: 1718, deaths: 11, firstDose: 850},
  {date: new Date('2020-12-31'), positiveSwabs: 4372, dailySwabs: 26312, cases: 1620, deaths: 12, firstDose: 850},
  {date: new Date('2021-01-01'), positiveSwabs: 5621, dailySwabs: 27389, cases: 1754, deaths: 11, firstDose: 550},
  {date: new Date('2021-01-02'), positiveSwabs: 4554, dailySwabs: 20846, cases: 3394, deaths: 4, firstDose: 550},
  {date: new Date('2021-01-03'), positiveSwabs: 6489, dailySwabs: 28543, cases: 4962, deaths: 7, firstDose: 550},
  {date: new Date('2021-01-04'), positiveSwabs: 5199, dailySwabs: 20571, cases: 6110, deaths: 6, firstDose: 550},
  {date: new Date('2021-01-05'), positiveSwabs: 4416, dailySwabs: 19908, cases: 5325, deaths: 17, firstDose: 3771},
  {date: new Date('2021-01-06'), positiveSwabs: 6865, dailySwabs: 28370, cases: 7836, deaths: 17, firstDose: 3771},
  {date: new Date('2021-01-07'), positiveSwabs: 6368, dailySwabs: 28610, cases: 6521, deaths: 8, firstDose: 3772},
  {date: new Date('2021-01-08'), positiveSwabs: 5156, dailySwabs: 27319, cases: 8248, deaths: 20, firstDose: 10331},
  {date: new Date('2021-01-09'), positiveSwabs: 5099, dailySwabs: 29972, cases: 4824, deaths: 9, firstDose: 10332},
  {date: new Date('2021-01-10'), positiveSwabs: 4188, dailySwabs: 24485, cases: 6888, deaths: 8, firstDose: 10331},
  {date: new Date('2021-01-11'), positiveSwabs: 2922, dailySwabs: 19794, cases: 4929, deaths: 8, firstDose: 10332},
  {date: new Date('2021-01-12'), positiveSwabs: 2521, dailySwabs: 18945, cases: 3086, deaths: 45, firstDose: 10331},
  {date: new Date('2021-01-13'), positiveSwabs: 3932, dailySwabs: 24583, cases: 3569, deaths: 63, firstDose: 10332},
  {date: new Date('2021-01-14'), positiveSwabs: 3854, dailySwabs: 28178, cases: 3955, deaths: 28, firstDose: 4174},
  {date: new Date('2021-01-15'), positiveSwabs: 3416, dailySwabs: 23033, cases: 3498, deaths: 48, firstDose: 4174},
  {date: new Date('2021-01-16'), positiveSwabs: 3110, dailySwabs: 26663, cases: 3231, deaths: 59, firstDose: 4174},
  {date: new Date('2021-01-17'), positiveSwabs: 2868, dailySwabs: 21441, cases: 2944, deaths: 13, firstDose: 4175},
  {date: new Date('2021-01-18'), positiveSwabs: 1877, dailySwabs: 18191, cases: 2121, deaths: 8, firstDose: 9300},
  {date: new Date('2021-01-19'), positiveSwabs: 1784, dailySwabs: 19218, cases: 2001, deaths: 92, firstDose: 9300},
  {date: new Date('2021-01-20'), positiveSwabs: 2786, dailySwabs: 24296, cases: 2488, deaths: 60, firstDose: 9300},
  {date: new Date('2021-01-21'), positiveSwabs: 2318, dailySwabs: 23196, cases: 2608, deaths: 50, firstDose: 5275},
  {date: new Date('2021-01-22'), positiveSwabs: 2084, dailySwabs: 24189, cases: 2371, deaths: 52, firstDose: 5275},
  {date: new Date('2021-01-23'), positiveSwabs: 1926, dailySwabs: 21492, cases: 1910, deaths: 77, firstDose: 5275},
  {date: new Date('2021-01-24'), positiveSwabs: 1529, dailySwabs: 19593, cases: 1378, deaths: 23, firstDose: 5275},
  {date: new Date('2021-01-25'), positiveSwabs: 1085, dailySwabs: 14884, cases: 1372, deaths: 7, firstDose: 1566},
  {date: new Date('2021-01-26'), positiveSwabs: 953, dailySwabs: 16665, cases: 928, deaths: 89, firstDose: 1566},
  {date: new Date('2021-01-27'), positiveSwabs: 1668, dailySwabs: 22387, cases: 1335, deaths: 54, firstDose: 1568, secondDose: 13800},
  {date: new Date('2021-01-28'), positiveSwabs: 1587, dailySwabs: 21780, cases: 1466, deaths: 47, firstDose: 700, secondDose: 8875},
  {date: new Date('2021-01-29'), positiveSwabs: 1483, dailySwabs: 21943, cases: 1254, deaths: 47, firstDose: 700, secondDose: 8875},
  {date: new Date('2021-01-30'), positiveSwabs: 1421, dailySwabs: 21598, cases: 1414, deaths: 78, firstDose: 700, secondDose: 8875},
  {date: new Date('2021-01-31'), positiveSwabs: 1153, dailySwabs: 17649, cases: 1247, deaths: 15, firstDose: 700, secondDose: 8875},
  {date: new Date('2021-02-01'), positiveSwabs: 831, dailySwabs: 15047, cases: 1062, deaths: 10, firstDose: 142, secondDose: 5900},
  {date: new Date('2021-02-02'), positiveSwabs: 969, dailySwabs: 16329, cases: 879, deaths: 101, firstDose: 142, secondDose: 5900},
  {date: new Date('2021-02-03'), positiveSwabs: 1203, dailySwabs: 18352, cases: 1013, deaths: 94, firstDose: 142, secondDose: 5900},
  {date: new Date('2021-02-04'), positiveSwabs: 1283, dailySwabs: 20214, cases: 1318, deaths: 74, firstDose: 142, secondDose: 6277},
  {date: new Date('2021-02-05'), positiveSwabs: 1010, dailySwabs: 20278, cases: 1047, deaths: 35, firstDose: 144, secondDose: 6277},
  {date: new Date('2021-02-06'), positiveSwabs: 1075, dailySwabs: 19355, cases: 827, deaths: 53, firstDose: 1440, secondDose: 4790},
  {date: new Date('2021-02-07'), positiveSwabs: 956, dailySwabs: 15377, cases: 1024, deaths: 12, firstDose: 1002, secondDose: 2489},
  {date: new Date('2021-02-08'), positiveSwabs: 780, dailySwabs: 12697, cases: 829, deaths: 1, firstDose: 1246, secondDose: 1620},
  {date: new Date('2021-02-09'), positiveSwabs: 816, dailySwabs: 15126, cases: 556, deaths: 65, firstDose: 4004, secondDose: 927},
  {date: new Date('2021-02-10'), positiveSwabs: 1096, dailySwabs: 18213, cases: 1006, deaths: 42, firstDose: 7959, secondDose: 438},
  {date: new Date('2021-02-11'), positiveSwabs: 861, dailySwabs: 17207, cases: 866, deaths: 52, firstDose: 4376, secondDose: 16},
  {date: new Date('2021-02-12'), positiveSwabs: 986, dailySwabs: 18841, cases: 921, deaths: 19, firstDose: 3999, secondDose: 165},
  {date: new Date('2021-02-13'), positiveSwabs: 1009, dailySwabs: 16414, cases: 1078, deaths: 65, firstDose: 1688, secondDose: 1626},
  {date: new Date('2021-02-14'), positiveSwabs: 752, dailySwabs: 14400, cases: 788, deaths: 16, firstDose: 3266, secondDose: 125},
  {date: new Date('2021-02-15'), positiveSwabs: 645, dailySwabs: 11452, cases: 821, deaths: 0, firstDose: 2001, secondDose: 6638},
  {date: new Date('2021-02-16'), positiveSwabs: 771, dailySwabs: 13119, cases: 744, deaths: 34, firstDose: 5700, secondDose: 7471},
  {date: new Date('2021-02-17'), positiveSwabs: 938, dailySwabs: 17104, cases: 650, deaths: 56, firstDose: 9716, secondDose: 7432},
  {date: new Date('2021-02-18'), positiveSwabs: 816, dailySwabs: 15499, cases: 901, deaths: 46, firstDose: 8346, secondDose: 7229},
  {date: new Date('2021-02-19'), positiveSwabs: 836, dailySwabs: 17036, cases: 763, deaths: 27, firstDose: 8429, secondDose: 5800},
  {date: new Date('2021-02-20'), positiveSwabs: 843, dailySwabs: 15122, cases: 988, deaths: 26, firstDose: 5515, secondDose: 4103},
  {date: new Date('2021-02-21'), positiveSwabs: 764, dailySwabs: 14901, cases: 679, deaths: 1, firstDose: 2174, secondDose: 1475},
  {date: new Date('2021-02-22'), positiveSwabs: 609, dailySwabs: 11828, cases: 686, deaths: 1, firstDose: 4218, secondDose: 1427},
  {date: new Date('2021-02-23'), positiveSwabs: 645, dailySwabs: 13842, cases: 575, deaths: 44, firstDose: 12550, secondDose: 1114},
  {date: new Date('2021-02-24'), positiveSwabs: 714, dailySwabs: 16520, cases: 574, deaths: 56, firstDose: 16107, secondDose: 1968},
  {date: new Date('2021-02-25'), positiveSwabs: 745, dailySwabs: 18205, cases: 613, deaths: 34, firstDose: 16646, secondDose: 1528},
  {date: new Date('2021-02-26'), positiveSwabs: 798, dailySwabs: 19169, cases: 779, deaths: 29, firstDose: 14186, secondDose: 2355},
  {date: new Date('2021-02-27'), positiveSwabs: 692, dailySwabs: 18008, cases: 738, deaths: 13, firstDose: 8770, secondDose: 1055},
  {date: new Date('2021-02-28'), positiveSwabs: 663, dailySwabs: 13102, cases: 612, deaths: 6, firstDose: 3349, secondDose: 538},
  {date: new Date('2021-03-01'), positiveSwabs: 506, dailySwabs: 12210, cases: 687, deaths: 0, firstDose: 5651, secondDose: 1041},
  {date: new Date('2021-03-02'), positiveSwabs: 423, dailySwabs: 11650, cases: 359, deaths: 14, firstDose: 12506, secondDose: 1657},
  {date: new Date('2021-03-03'), positiveSwabs: 673, dailySwabs: 15277, cases: 566, deaths: 24, firstDose: 12542, secondDose: 1466},
  {date: new Date('2021-03-04'), positiveSwabs: 552, dailySwabs: 14244, cases: 462, deaths: 39, firstDose: 17658, secondDose: 1570},
  {date: new Date('2021-03-05'), positiveSwabs: 615, dailySwabs: 16640, cases: 522, deaths: 9, firstDose: 17345, secondDose: 2104},
  {date: new Date('2021-03-06'), positiveSwabs: 460, dailySwabs: 12862, cases: 539, deaths: 14, firstDose: 9548, secondDose: 199},
  {date: new Date('2021-03-07'), positiveSwabs: 445, dailySwabs: 13741, cases: 525, deaths: 3, firstDose: 2372, secondDose: 327},
  {date: new Date('2021-03-08'), positiveSwabs: 464, dailySwabs: 10675, cases: 437, deaths: 0, firstDose: 7007, secondDose: 3842},
  {date: new Date('2021-03-09'), positiveSwabs: 414, dailySwabs: 12330, cases: 311, deaths: 30},
  {date: new Date('2021-03-10'), positiveSwabs: 600, dailySwabs: 15278, cases: 631, deaths: 47}  
];
