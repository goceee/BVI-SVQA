import numpy as np
from matplotlib import pyplot as plt
import matplotlib
import sys

bitRates = sys.argv[3].split(',')
psnrHM = sys.argv[1].split(',')
psnrAV1 = sys.argv[2].split(',')
bitRatesNum = [float(i)/1000 for i in bitRates]
psnrHMNum = [float(i) for i in psnrHM]
psnrAV1Num = [float(i) for i in psnrAV1]
vidTitle = sys.argv[4]
metric = sys.argv[5]
plt.rc('font', size=12)          # controls default text sizes


x = psnrHMNum
y = bitRatesNum
t = psnrAV1Num
k = bitRatesNum

plt.figure()
if metric == 'DMOS' or metric == '100-DMOS':
    errorHM = sys.argv[6].split(',')
    errorHMnum = [float(i) for i in errorHM]
    errorAV1 = sys.argv[7].split(',')
    errorAV1num = [float(i) for i in errorAV1]
    plt.errorbar(y, x,label='(HM)',color='C0', yerr=errorHMnum, fmt='o',capsize=5,capthick=2)
    plt.errorbar(k,t, label='(AV1)',color='C1',fmt='x',markersize=12, yerr=errorAV1num,capsize=5,capthick=2)
    plt.plot(y,x,color='C0')
    plt.plot(k,t,color='C1')
else:
    plt.plot(y,x, label='(HM)', marker='o', fillstyle='none', markersize=10, color='C0')
    plt.plot(k,t, label='(AV1)', marker='x', markersize=10, color='C1')



plt.grid(True)
plt.title(vidTitle)
plt.ylabel(metric)
plt.xlabel("bitrate(Mbps)")
#plt.yticks([70,75,80,85,90])
plt.xscale
plt.legend(loc='lower right')
plt.show()

""" #CAT ROBOT DATA PSNR
x = [33.129209,35.186037,36.998078,38.821897]
y = [950/1000,1500/1000,2100/1000,3100/1000]
t = [33.07398,35.137277,37.17845,39.100463]
k = [950/1000,1500/1000,2100/1000,3100/1000]
 """

""" #VMAF CAT ROBOT
x = [65.038499,75.85783,83.158667,88.665732]
y = [950/1000,1500/1000,2100/1000,3100/1000]
t = [67.525349,78.595882,84.88431,90.156409]
k = [950/1000,1500/1000,2100/1000,3100/1000] """

""" #MYANMAR DATA VMAF
x = [73.652773,82.058097,88.033251,91.535772]
y = [2050/1000,3500/1000,5500/1000,8100/1000]
t = [72.88364,81.007345,87.620851,91.482717]
k = [2050/1000,3500/1000,5500/1000,8100/1000] """

""" #MYANMAR DATA PSNR
x = [28.861188,31.145357,33.62754,35.852943]
y = [2050/1000,3500/1000,5500/1000,8100/1000]
t = [27.517681,30.666653,33.172109,35.508171]
k = [2050/1000,3500/1000,5500/1000,8100/1000] """

""" #TODDLER DATA PSNR
x = [26.589624,28.108804,30.088778,31.288953]
y = [3000/1000,6000/1000,13000/1000,20500/1000]
t = [26.75309,28.295341,30.333511,31.543246]
k = [3000/1000,6000/1000,13000/1000,20500/1000] """

""" #TODDLER DATA VMAF
x = [39.025123,53.94259,73.12267,83.310885]
y = [3000/1000,6000/1000,13000/1000,20500/1000]
t = [39.118149,55.409758,75.496436,85.478624]
k = [3000/1000,6000/1000,13000/1000,20500/1000] """

""" #DAYLIGHT DATA PSNR
x = [32.813414,34.417144,35.990362,38.085033]
y = [900/1000,1200/1000,1800/1000,3000/1000]
t = [32.612869,34.14682,36.017361,38.164066]
k = [900/1000,1200/1000,1800/1000,3000/1000]
 """
""" #DAYLIGHT DATA VMAF
x = [63.517951,73.261434,81.25151,89.299831]
y = [900/1000,1200/1000,1800/1000,3000/1000]
t = [64.747916,75.475112,83.164434,91.131705]
k = [900/1000,1200/1000,1800/1000,3000/1000]
 """