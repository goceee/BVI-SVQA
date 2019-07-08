import numpy as np
from matplotlib import pyplot as plt
import matplotlib
import re
import sys
import itertools

bitRates = sys.argv[2].split(',')
Fmetric = sys.argv[1].split('\r')[:-1]
bitRatesNum = [float(i)/1000 for i in bitRates]
vidTitle = sys.argv[3]
metricN = sys.argv[4]
plt.rc('font', size=12)          # controls default text sizes
marker = itertools.cycle(('d', 'o', '*', 'X', 's')) 

y = bitRatesNum

plt.figure()
if metricN == 'DMOS' or metricN == '100-DMOS':
    Fmetric = sys.argv[1].split(',')
    codecslist = [item for item in Fmetric if not item[:1].isdigit() and item[:1] != '-' ]
    numParray = int(len(Fmetric)/len(codecslist))
    SplitByMetric = [Fmetric[i:i+numParray] for i in range(0, len(Fmetric), numParray)]
    for t in range(0,len(SplitByMetric)):
        metric = SplitByMetric[t][1:]
        metricValues = metric[:len(metric)//2] 
        errorValues = metric[len(metric)//2:]
        metricNum = [float(i) for i in metricValues]
        errorNum = [float(i) for i in errorValues]
        x = metricNum
        plt.errorbar(y, x,label='(' + codecslist[t]  + ')', yerr=errorNum, marker=next(marker),capsize=5,capthick=2)
else:
    for i in range(0,len(Fmetric)):
        metric = Fmetric[i].split(',')[1:]
        metric = [item for item in metric if not item.isalpha()]
        metricC = Fmetric[i].split(',')
        for codecs in metricC:
            try:
                test = float(codecs)
            except:
                codec = codecs
        metricNum = [float(x) for x in metric]
        x = metricNum
        plt.plot(y,x, label='(' + codec  + ')', marker=next(marker), fillstyle='none', markersize=10)
plt.grid(True)
plt.title(vidTitle)
plt.ylabel(metricN)
plt.xlabel("bitrate(Mbps)")
plt.xscale
plt.legend(loc='lower right')
plt.show()