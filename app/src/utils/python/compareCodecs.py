import numpy as np
from matplotlib import pyplot as plt
import sys
import itertools
import json

metricData = np.array(json.loads(sys.argv[1]), dtype=np.float64)
rateParameterData = json.loads(sys.argv[2])
rateType = rateParameterData['type']
videoTitle = sys.argv[3]
metric = sys.argv[4]
codecsList = sys.argv[6].split(',')
plt.rc('font', size=12)
marker = itertools.cycle(('d', 'o', '*', 'X', 's'))
try:
    errorBar = json.loads(sys.argv[5])
except:
    errorBar = None

for i in range(0, len(codecsList)):
    if metric == "100-DMOS":
        metricData[i] = 100-metricData[i]
    try:
        rateData = np.array(rateParameterData['data'][i], dtype=int)
        if metric == "VMAF":
            ciHI = np.array(errorBar['CI95_HIGH'][i], dtype=np.float64)
            ciLO = np.array(errorBar['CI95_LOW'][i], dtype=np.float64)
            yerr = [metricData[i]-ciLO, ciHI-metricData[i]]
        elif metric.find('MOS') != -1:
            yerr = np.array(errorBar[i], dtype=np.float64)
        else:
            yerr = None
    except:
        rateData = np.array(rateParameterData['data'], dtype=int)
        yerr = None
    plt.errorbar(rateData, metricData[i], label=codecsList[i], marker=next(
        marker), yerr=yerr, fillstyle='none', markersize=10, capsize=5, capthick=2)


plt.grid(True)
bottom, top = plt.gca().get_ylim()
plt.title(videoTitle)
sys.stdout.flush()
if metric.find('MOS') != -1:
    plt.ylim(bottom, 110)
elif metric == 'VMAF':
    plt.ylim(bottom, 100)
elif metric == 'MS-SSIM':
    plt.ylim(bottom, 1)
else:
    plt.ylim(bottom, np.ceil(top))
plt.ylabel(metric)
plt.xlabel(rateType)
if metric == "100-DMOS":
    plt.legend(loc='upper right')
else:
    plt.legend(loc='lower right')

# plt.savefig('../' + vidTitle + '_' + metricN + '.png')
plt.show()
