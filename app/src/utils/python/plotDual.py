import numpy as np
from matplotlib import pyplot as plt
import sys
import json

metric1 = np.array(sys.argv[1].split(','), dtype=np.float64)
metric2 = np.array(sys.argv[2].split(','), dtype=np.float64)
rateParameterData = json.loads(sys.argv[3])
rateType = rateParameterData['type']
rateData = np.array(rateParameterData['data'], dtype=int)
videoName = sys.argv[4]
metricName = sys.argv[5].split(',')
videoCodec = sys.argv[6]

try:
    ci = json.loads(sys.argv[7])
    ciHI = np.array(ci['CI95_HIGH'], dtype=np.float64)
    ciLO = np.array(ci['CI95_LOW'], dtype=np.float64)
    yerr = [metric2-ciLO, ciHI-metric2]
    stdErr = np.array(sys.argv[8].split(','), dtype=np.float64)
except:
    yerr = None
    stdErr = None


fig = plt.figure()
ax1 = fig.add_subplot(111)
ax2 = ax1.twinx()

color = 'tab:red'
ax1.set_xlabel(rateType)
ax1.set_ylabel(metricName[0], color=color, fontsize=16)
ax1.set_ylim(0, 120)
ax1.errorbar(rateData, metric1, yerr=stdErr, color=color, capsize=5, capthick=2,
             label='DMOS', marker='o', fillstyle='none', markersize=10)

color = 'tab:blue'
ax2.set_ylim(0, 120)
ax2.set_ylabel(metricName[1], color=color, fontsize=16)
ax2.errorbar(rateData, metric2, yerr=yerr, color=color,
             label='VMAF', marker='x', markersize=10, capsize=5, capthick=2)

plt.title(videoName)
ax1.grid(True)
# plt.legend([p1,p2],[metricName])# loc='upper right')
plt.tight_layout()
# plt.savefig('../' + videoName + '_DMOS_VMAF.png')
plt.show()
