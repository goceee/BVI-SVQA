import numpy as np
from matplotlib import pyplot as plt
import sys
import matplotlib.ticker as ticker

dataStr = sys.argv[1].split(',') #DMOS
dataStr2 = sys.argv[2].split(',') #VMAF
vidTitle = sys.argv[4] #VIDEO TITLE
vidCodec = sys.argv[5] #CODECS LIST


try:
    QP = sys.argv[6]
    cihi = sys.argv[7].split(',')
    cilo = sys.argv[8].split(',')
    cihiNum = [float(i) for i in cihi]
    ciloNum = [float(i) for i in cilo]
    stdErrA = sys.argv[9].split(',')
    stdErr = [float(i) for i in stdErrA]

except:
    QP = 0
    cihi = sys.argv[6].split(',')
    cilo = sys.argv[7].split(',')
    cihiNum = [float(i) for i in cihi]
    ciloNum = [float(i) for i in cilo]
    stdErrA = sys.argv[8].split(',') 
    stdErr = [float(i) for i in stdErrA]

if(int(QP) != 1):
    bitRates = sys.argv[3].split(',')
    bitRatesNum = [float(i)/1000 for i in bitRates]
    y = bitRatesNum
else:
    QPrates = sys.argv[3].split(',')
    QPratesnum = [float(i) for i in QPrates]
    y = np.array(QPratesnum)
dataNum = [float(i) for i in dataStr]
dataNum2 = [float(i) for i in dataStr2]

x = np.array(dataNum)
x1 = np.array(dataNum2)

fig = plt.figure()
ax1 = fig.add_subplot(111)
ax2 = ax1.twinx()

color = 'tab:red'
ax1.set_xlabel('bitrate(Mbps)')
ax1.set_ylabel('100-DMOS', color=color, fontsize=16)
ax1.set_ylim(0,120)
ax1.errorbar(y, x, yerr=stdErr, color=color,capsize=5,capthick=2, label='100-DMOS', marker='o',fillstyle='none', markersize=10)

color = 'tab:blue'
ax2.set_ylim(0,120)
ax2.set_ylabel('VMAF', color=color, fontsize=16)
ax2.errorbar(y, x1, yerr=[x1-ciloNum,cihiNum-x1], color=color,label='VMAF',marker='x', markersize=10,capsize=5,capthick=2)

plt.title(vidTitle)
ax1.grid(True)
#plt.legend([p1,p2],['DMOS','VMAF'])# loc='upper right')
plt.tight_layout()
plt.savefig('../' + vidTitle + '_DMOS_VMAF.png')
#plt.show()