import os
import sys
import csv
import numpy
from scipy.stats import sem
import numpy as np, scipy.stats as st


expName = sys.argv[1]
presMethod = sys.argv[2]
if (presMethod == "ACR(discrete)" or presMethod == "ACR(continuous)"):
    videoNum = 1
    nameIndex = 0
else:
    videoNum = 4
    nameIndex = 2

dir_path = os.path.dirname('../Experiments/' + expName + '/') 
allScores = []
full = 0.00
finalS = []
headers = ["Video name"]
scoreNum = 0
videoLength = 0
for root, dirs, files in os.walk(dir_path): 
        for file in files:  
            if file.startswith('score.csv'): 
                with open(root+'/'+str(file)) as f:
                    scoreNum += 1
                    scoreN = "Score " + str(scoreNum)
                    headers.append(scoreN) 
                    test = list(csv.reader(f))
                    videoLength = len(test)
headers.append("MOS")
headers.append("Standard Deviation")
headers.append("Standard Error of the Mean")
headers.append("CI")
if videoLength != 0:
    for x in range(1,videoLength):
        full = 0.00
        allScores = []
        for root, dirs, files in os.walk(dir_path): 
            for file in files: 
                if file.startswith('score.csv'): 
                    with open(root+'/'+str(file)) as f:
                        test = list(csv.reader(f))
                        tempName = [test[x][nameIndex]]
                        tempScore = test[x][videoNum]
                        full = full + int(tempScore)
                        allScores.append(tempScore)      
        results = list(map(int, allScores))
        stddev = numpy.std(results)
        final = tempName + allScores + [round(full/len(allScores),2)] + [stddev] + [sem(results)] + [st.t.interval(0.95, len(results)-1, loc=np.mean(results), scale=st.sem(results))]
        finalS.append(final)
        finalF = [headers] + finalS
        if sys.version_info[0] < 3:
            with open('../Experiments/' + expName + '/rawdata.csv', 'wb') as myfile: #python2, python3 is different.
                wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
                wr.writerows(finalF)
        else :
            with open('../Experiments/' + expName + '/rawdata.csv', 'w', newline='') as myfile: #python2, python3 is different.
                wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
                wr.writerows(finalF)
else:
    sys.exit("NO DATA FOUND")