import numpy as np
from matplotlib import pyplot as plt
from scipy.interpolate import spline
import sys
import matplotlib.ticker as ticker

dataStr = sys.argv[1].split(',')
vidTitle = sys.argv[3]
metric = sys.argv[4]
vidCodec = sys.argv[5]
QP = sys.argv[6]
dataStr2 = sys.argv[7].split(',')
print(QP)
sys.stdout.flush()
if(int(QP) != 1):
    bitRates = sys.argv[2].split(',')
    bitRatesNum = [float(i)/1000 for i in bitRates]
else:
    QPrates = sys.argv[2].split(',')
    QPratesnum = [float(i) for i in QPrates]
dataNum = [float(i) for i in dataStr]
dataNum2 = [float(i) for i in dataStr2]
y = np.array(QPratesnum)
x = np.array(dataNum)
x1 = np.array(dataNum2)
print(x)
print(x1)
sys.stdout.flush()
fig, ax1 = plt.subplots()
miny = ((min(min(x), min(x1))) - ((min(min(x), min(x1))) % 10)) -10
maxy = ((max(max(x), max(x1))) - ((max(max(x), max(x1))) % 10)) + 20
print (miny , ' ' , maxy)
color = 'tab:red'
ax1.set_xlabel('QP')
ax1.set_ylabel('DMOS', color=color)
ax1.set_ylim(miny,maxy)
p1, = ax1.plot(y, x, color=color, label='DMOS', marker='o',fillstyle='none', markersize=10)
start,end = ax1.get_ylim()
ax1.yaxis.set_ticks(np.arange(start, end, 10))
ax1.yaxis.set_major_formatter(ticker.FormatStrFormatter('%0d'))
#ax1.tick_params(axis='y', labelcolor=color)
ax2 = ax1.twinx()  # instantiate a second axes that shares the same x-axis

color = 'tab:blue'
ax2.set_ylim(miny,maxy)
ax2.yaxis.set_ticks(np.arange(start, end, 10))
ax2.yaxis.set_major_formatter(ticker.FormatStrFormatter('%0d'))
ax2.set_ylabel('VMAF', color=color)  # we already handled the x-label with ax1
p2, = ax2.plot(y, x1, color=color,label='VMAF',marker='x', markersize=10)
#ax2.tick_params(axis='y', labelcolor=color)
plt.title(vidTitle)

plt.legend([p1,p2],['DMOS','VMAF'])# loc='upper right')
#fig.tight_layout()  # otherwise the right y-label is slightly clipped
#plt.savefig('../' + vidTitle + '_' + metric + '_VMAF.png')
plt.show()


""" x = np.array(dataNum)
x1 = np.array(dataNum2) 
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
#plt.show()
plt.savefig('../' + vidTitle + '_' + metric + '.png')
 """
