import numpy as np
import json
from matplotlib import pyplot as plt
import sys

metricData = np.array(sys.argv[1].split(','), dtype=np.float64)
rateParameterData = json.loads(sys.argv[2])
rateType = rateParameterData['type']
rateData = np.array(rateParameterData['data'], dtype=int)
videoName = sys.argv[3]
metric = sys.argv[4]
videoCodec = sys.argv[5]

if metric == '100-DMOS':
    metricData = 100 - metricData

try:
    errorBar = json.loads(sys.argv[6])
    if metric == "VMAF":
        ciHI = np.array(errorBar['CI95_HIGH'], dtype=np.float64)
        ciLO = np.array(errorBar['CI95_LOW'], dtype=np.float64)
        yerr = [metricData-ciLO, ciHI-metricData]
    elif metric.find('MOS') != -1:
        yerr = np.array(errorBar, dtype=np.float64)
    else:
        yerr = None
except:
    yerr = None


print(metricData)
print(rateData)
print(videoCodec)
print(yerr)
sys.stdout.flush()
yAxisMaxValue = max(metricData)
plt.title(videoName)
if metric == "VMAF":
    yAxisMaxValue = 100
if metric == "DMOS" or metric == "100-DMOS":
    yAxisMaxValue = 110
if metric == "MS-SSIM":
    yAxisMaxValue = 1

plt.errorbar(rateData, metricData, label=videoCodec, marker='o',
             yerr=yerr, fillstyle='none', markersize=10, capsize=5, capthick=2)

plt.grid(True)
bottom, top = plt.gca().get_ylim()
plt.ylim(bottom, np.ceil(yAxisMaxValue))
plt.ylabel(metric)
plt.xlabel(rateType)
if rateType == 'QP' or metric == '100-DMOS':
    plt.legend(loc='upper right')
else:
    plt.legend(loc='lower right')
plt.show()
#plt.savefig('../' + videoName + '_' + metric + '.png')
