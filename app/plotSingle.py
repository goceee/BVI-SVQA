import numpy as np
from matplotlib import pyplot as plt
import sys

dataStr = sys.argv[1].split(',')
vidTitle = sys.argv[3]
metric = sys.argv[4]
vidCodec = sys.argv[5]

try:
    QP = int(sys.argv[6])
    if metric == "VMAF":
        cihi = sys.argv[7].split(',')
        cilo = sys.argv[8].split(',')
        cihiNum = [float(i) for i in cihi]
        ciloNum = [float(i) for i in cilo]
    elif metric == ("DMOS" or "100-DMOS"):
        errorA = sys.argv[7].split(',')
        errorNum = [float(i) for i in errorA]

except:
    QP = 0
    if metric == "VMAF":
        cihi = sys.argv[6].split(',')
        cilo = sys.argv[7].split(',')
        cihiNum = [float(i) for i in cihi]
        ciloNum = [float(i) for i in cilo]
    elif metric == ("DMOS" or "100-DMOS"):
        print(metric)
        sys.stdout.flush()
        errorA = sys.argv[6].split(',')
        errorNum = [float(i) for i in errorA]

print(QP)
sys.stdout.flush()
if(QP != 1):
    bitRates = sys.argv[2].split(',')
    print(bitRates)
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
if metric == "VMAF":
    plt.errorbar(y,x, label=vidCodec, marker='o', yerr=[x-ciloNum,cihiNum-x], fillstyle='none', markersize=10,capsize=5,capthick=2)
elif metric == ("DMOS" or "100-DMOS"):
    plt.errorbar(y,x, label=vidCodec, marker='o', yerr=errorNum, fillstyle='none', markersize=10,capsize=5,capthick=2)
else:
    plt.errorbar(y,x, label=vidCodec, marker='o', fillstyle='none', markersize=10)
#plt.plot(k,t, label='AV1', marker='x', markersize=10, color='r')
plt.grid(True)
if metric == 'DMOS':
    metric = '100-DMOS'
    plt.ylim(0,120)
elif metric == '100-DMOS':
    metric = 'DMOS'
    plt.ylim(0,120)
plt.ylabel(metric)
if (int(QP) != 1):
    plt.xlabel("bitrate(Mbps)")
    plt.legend(loc='lower right')
else:
    plt.xlabel("QP")
    plt.legend(loc='upper right')
plt.show()
#plt.savefig('../' + vidTitle + '_' + metric + '.png')