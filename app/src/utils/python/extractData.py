import os
import sys
import csv
import numpy as np
import scipy.stats as st

experimentName = sys.argv[1]
presentationMethod = sys.argv[2]
if (presentationMethod == "ACR(discrete)" or presentationMethod == "ACR(continuous)"):
    videoNum = 1
    nameIndex = 0
else:
    videoNum = 4
    nameIndex = 2

dir_path = os.path.dirname('../../Experiments/' + experimentName + '/')
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
    for x in range(1, videoLength):
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
        stddev = np.std(results)
        lo, hi = st.t.interval(0.95, len(results)-1,
                               loc=np.mean(results), scale=st.sem(results))
        final = tempName + allScores + [round(full/len(allScores), 2)] + [stddev] + [
            st.sem(results)] + [str(lo) + '-' + str(hi)]
        finalS.append(final)
        finalF = np.array([headers] + finalS).T

        if sys.version_info[0] < 3:
            with open('../../Experiments/' + experimentName + '/rawdata.csv', 'wb') as myfile:  # python2
                wr = csv.writer(myfile, quoting=csv.QUOTE_NONE)
                wr.writerows(finalF)
        else:
            with open('../../Experiments/' + experimentName + '/rawdata.csv', 'w', newline='') as myfile:  # python3
                wr = csv.writer(myfile, quoting=csv.QUOTE_NONE)
                wr.writerows(finalF)
else:
    sys.exit("NO DATA FOUND")
