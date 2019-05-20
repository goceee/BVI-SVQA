import numpy as np
from matplotlib import pyplot as plt
from scipy.interpolate import spline
import sys

dataStr = sys.argv[1].split(',')
vidTitle = sys.argv[3]
metric = sys.argv[4]
vidCodec = sys.argv[5]
QP = sys.argv[6]
print(QP)
sys.stdout.flush()
if(int(QP) != 1):
    bitRates = sys.argv[2].split(',')
    bitRatesNum = [float(i)/1000 for i in bitRates]
else:
    QPrates = sys.argv[2].split(',')
    QPratesnum = [float(i) for i in QPrates]
dataNum = [float(i) for i in dataStr]


x = np.array(dataNum) 
if (int(QP) != 1):
    y = np.array(bitRatesNum)
else:
    y = np.array(QPratesnum)
plt.title(vidTitle)
plt.plot(y,x, label=vidCodec, marker='o', fillstyle='none', markersize=10)
#plt.plot(k,t, label='AV1', marker='x', markersize=10, color='r')
plt.grid(True)
plt.ylabel(metric)
if (int(QP) != 1):
    plt.xlabel("bitrate(Mbps)")
    plt.legend(loc='lower right')
else:
    plt.xlabel("QP")
    plt.legend(loc='upper right')
plt.show()
#plt.savefig('../' + vidTitle + '_' + metric + '.png')

