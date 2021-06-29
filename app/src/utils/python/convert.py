""" 
Change static paths to folders and to ffmpeg!!!!



!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 """


import os
import sys
import re
import subprocess
if sys.version_info[0] < 3:
    exception = OSError
else :
    exception = FileExistsError 
FNULL = open(os.devnull, 'w')

fileList1 = []
fileList2 = []
distortedTrain = []
originalTrain = []
distortedVideosPath = sys.argv[1]
originalVideosPath = sys.argv[2]
videoCodec = sys.argv[5]
videoFormat = sys.argv[6]

distPath = "../../converted/"
origPath = "../../converted/"
distTrainP = "../../trainingSequences/"
origTrainP = "../../trainingSequences/"


if not sys.argv[3]:
    numFiles1 = 0
else:
    try:
        os.mkdir(distPath)
    except exception:
        pass
    fileList1 = sys.argv[3].split(',') 
    distortedTrain = [x for x in fileList1 if "train" in x]
    fileList1 = [x for x in fileList1 if "train" not in x]
    numFiles1 = len(fileList1)
    numFiles3 = len(distortedTrain)

if not sys.argv[4]:
    numFiles2 = 0
else:
    try:
        os.mkdir(origPath)
    except exception:
        pass
    fileList2 = sys.argv[4].split(',') 
    originalTrain = [y for y in fileList2 if "train" in y]
    fileList2 = [y for y in fileList2 if "train" not in y]
    numFiles2 = len(fileList2)
    numFiles4 = len(originalTrain)

if not distortedTrain:
    numFiles3 = 0
else:
    try:
        os.mkdir(distTrainP)
    except exception:
        pass

if not originalTrain:
    numFiles4 = 0
else:
    try:
        os.mkdir(origTrainP)
    except exception:
        pass

#DISTORTED     
for x in range(0,numFiles1):
    extractInfo1 = fileList1[x].split('_')
    fileName1 = fileList1[x]
    fps1 = ''.join(re.findall(r'\d+', extractInfo1[2])) #r is for pylint not to give warnings
    bit1 = ''.join(re.findall(r'\d+', extractInfo1[3])) #r is for pylint not to give warnings
    if int(bit1) < 10:
        pixFmt = 'p'
    else:
        pixFmt = 'p' + bit1 + 'le'
    if sys.platform.startswith('win'):
        p = subprocess.call('../externalUtils/ffmpeg/bin/ffmpeg.exe -f rawvideo -s ' + extractInfo1[1] + ' -r ' + fps1 + ' -pix_fmt yuv' + extractInfo1[4] + pixFmt + ' -i ' + distortedVideosPath + '\\' + fileList1[x] + ' -n -c:v ' + videoCodec + ' -qscale:v 0 -r ' + fps1 + ' -pix_fmt yuv422' + pixFmt + ' ' + distPath + fileName1[:-4] + videoFormat, 
                                        stdout=FNULL, stderr=subprocess.STDOUT, shell=False)
    elif sys.platform.startswith('linux') or sys.platform.startswith('darwin'):
        subprocess.call(["ffmpeg", "-f", "rawvideo", "-s", extractInfo1[1], "-r", fps1, "-pix_fmt", "yuv" + extractInfo1[4] + pixFmt, "-i", distortedVideosPath + "/" + fileList1[x], "-n", "-c:v", videoCodec, "-qscale:v", "0", "-r", fps1, "-pix_fmt", "yuv422" + pixFmt, distPath + fileName1[:-4] + videoFormat], 
                                        stdout=FNULL, stderr=subprocess.STDOUT, shell=False)
    print ('Video number: ', x+1,' completed')
    sys.stdout.flush()
if numFiles2 > 0:
    #ORIGINAL
    for x in range(0,numFiles2):
        extractInfo2 = fileList2[x].split('_')
        fileName2 = fileList2[x]
        fps2 = ''.join(re.findall(r'\d+', extractInfo2[2])) #r is for pylint not to give warnings
        bit2 = ''.join(re.findall(r'\d+', extractInfo2[3])) #r is for pylint not to give warnings
        if int(bit2) < 10:
            pixFmt = 'p'
        else:
            pixFmt = 'p' + bit2 + 'le'
        if sys.platform.startswith('win'):
            subprocess.call('../externalUtils/ffmpeg/bin/ffmpeg.exe -f rawvideo -s ' + extractInfo2[1] + ' -r ' + fps2 + ' -pix_fmt yuv' + extractInfo2[4] + pixFmt + ' -i ' + originalVideosPath + '\\' + fileList2[x] + ' -n -c:v ' + videoCodec + ' -qscale:v 0 -r ' + fps2 + ' -pix_fmt yuv422' + pixFmt + ' ' + origPath + fileName2[:-4] + videoFormat, 
                                        stdout=FNULL, stderr=subprocess.STDOUT, shell=False)
        elif sys.platform.startswith('linux') or sys.platform.startswith('darwin'):
            subprocess.call(["ffmpeg", "-f", "rawvideo", "-s", extractInfo2[1], "-r", fps2, "-pix_fmt", "yuv" + extractInfo2[4] + pixFmt, "-i", originalVideosPath + "/" + fileList2[x], "-n", "-c:v", videoCodec, "-qscale:v", "0", "-r", fps2, "-pix_fmt", "yuv422" + pixFmt, origPath + fileName2[:-4] + videoFormat], 
                                        stdout=FNULL, stderr=subprocess.STDOUT, shell=False)
        print ('Video number: ', x+1,' completed')
        sys.stdout.flush()
if numFiles3 > 0:
    #DISTORTED TRAIN
    for x in range(0,numFiles3):
        extractInfo3 = distortedTrain[x].split('_')
        fileName3 = distortedTrain[x]
        fps3 = ''.join(re.findall(r'\d+', extractInfo3[2])) #r is for pylint not to give warnings
        bit3 = ''.join(re.findall(r'\d+', extractInfo3[3])) #r is for pylint not to give warnings
        if int(bit3) < 10:
            pixFmt = 'p'
        else:
            pixFmt = 'p' + bit3 + 'le'

        if sys.platform.startswith('win'):
            subprocess.call('../externalUtils/ffmpeg/bin/ffmpeg.exe -f rawvideo -s ' + extractInfo3[1] + ' -r ' + fps3 + ' -pix_fmt yuv' + extractInfo3[4] + pixFmt + ' -i ' + distortedVideosPath + '\\' + distortedTrain[x] + ' -n -c:v ' + videoCodec + ' -qscale:v 0 -r ' + fps3 + ' -pix_fmt yuv422' + pixFmt + ' ' + distTrainP + fileName3[:-4] + videoFormat, 
                                        stdout=FNULL, stderr=subprocess.STDOUT, shell=False)
        elif sys.platform.startswith('linux') or sys.platform.startswith('darwin'):
            subprocess.call(["ffmpeg", "-f", "rawvideo", "-s", extractInfo3[1], "-r", fps3, "-pix_fmt", "yuv" + extractInfo3[4] + pixFmt, "-i", distortedVideosPath + "/" + distortedTrain[x], "-n", "-c:v", videoCodec, "-qscale:v", "0", "-r", fps3, "-pix_fmt", "yuv422" + pixFmt, distTrainP + fileName3[:-4] + videoFormat], 
                                        stdout=FNULL, stderr=subprocess.STDOUT, shell=False) 
        print ('Video number: ', x+1,' completed')
        sys.stdout.flush()
if numFiles4 > 0:
    #ORIGINAL TRAIN
    for x in range(0,numFiles4):
        extractInfo4 = originalTrain[x].split('_')
        fileName4 = originalTrain[x]
        fps4 = ''.join(re.findall(r'\d+', extractInfo4[2])) #r is for pylint not to give warnings
        bit4 = ''.join(re.findall(r'\d+', extractInfo4[3])) #r is for pylint not to give warnings
        if int(bit4) < 10:
            pixFmt = 'p'
        else:
            pixFmt = 'p' + bit4 + 'le'

        if sys.platform.startswith('win'):
            subprocess.call('../externalUtils/ffmpeg/bin/ffmpeg.exe -f rawvideo -s ' + extractInfo4[1] + ' -r ' + fps4 + ' -pix_fmt yuv' + extractInfo4[4] + pixFmt + ' -i ' + originalVideosPath + '\\' + originalTrain[x] + ' -n -c:v ' + videoCodec + ' -qscale:v 0 -r ' + fps4 + ' -pix_fmt yuv422' + pixFmt + ' ' + origTrainP + fileName4[:-4] + videoFormat, 
                                        stdout=FNULL, stderr=subprocess.STDOUT, shell=False)
        elif sys.platform.startswith('linux') or sys.platform.startswith('darwin'):
            subprocess.call(["ffmpeg", "-f", "rawvideo", "-s", extractInfo4[1], "-r", fps4, "-pix_fmt", "yuv" + extractInfo4[4] + pixFmt, "-i", originalVideosPath + "/" + originalTrain[x], "-n", "-c:v", videoCodec, "-qscale:v", "0", "-r", fps4, "-pix_fmt", "yuv422" + pixFmt, origTrainP + fileName4[:-4] + videoFormat], 
                                        stdout=FNULL, stderr=subprocess.STDOUT, shell=False)       
        print ('Video number: ', x+1,' completed')
        sys.stdout.flush()