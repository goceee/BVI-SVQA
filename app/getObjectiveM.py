import subprocess
import sys
import re
import csv

#originalV= ["S03Myanmar4_1920x1080_60fps_10bit_420_300_R0.yuv"]
#distortedV= ["S03Myanmar4_1920x1080_60fps_10bit_420_300_R1_HM_ratio1.yuv", "S03Myanmar4_1920x1080_60fps_10bit_420_300_R2_HM_ratio1.yuv"]
#path1 = "G:\\ForExperiment\\Distorted\\"
#path2 = "G:\\ForExperiment\\Originals\\"
#experimentName = "DSCQS"
originalV = sys.argv[1].split(',')
#originalV = [x for x in originalV if "train" not in x]
distortedV = sys.argv[2].split(',')
#distortedV = [x for x in distortedV if "train" not in x]
experimentName = sys.argv[3]
path1 = sys.argv[4]
path2 = sys.argv[5]
distortedV.sort()
psnrA = []
psnrH = []
vmafA = []
vmafH = []
#ssimA = []
#ssimH = []
ms_ssimA = []
ms_ssimH = []
vidNums = []
vidNums2 = []
psnr = ["PSNR"]
#ssim = ["SSIM"]
vmaf = ["VMAF"]
ms_ssim = ["MS-SSIM"]
finalA = []
finalH = []
count = 1
count2 = 1
for t in range(0,len(originalV)):
    vidNums.append("")
    vidNums2.append("")
    orList = originalV[t].split('_')
    bit = ''.join(re.findall(r'\d+', orList[3]))
    if int(bit) < 10:
        pixFmt = 'p'
    else:
        pixFmt = 'p' + bit + 'le'
    resolution = orList[1].split('x')
    for c in range(0,len(distortedV)):
        if originalV[t].split('_')[0] not in distortedV[c]:
            #print("NOT")
            #sys.stdout.flush()
            continue
        else:
            out = subprocess.Popen(['vmaf/x64/Release/vmafossexec.exe', 'yuv' + orList[4] + pixFmt , resolution[0], resolution[1], path2 + '\\' + originalV[t], path1 + '\\' + distortedV[c], 'vmaf/model/vmaf_v0.6.1.pkl', '--psnr', '--ms-ssim'], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
            stdout,stderr = out.communicate()
            if "AV1" in distortedV[c].split('_')[7]:
                vidNum = distortedV[c].split('_')[6]
                count = count + 1
                vidNums.append(vidNum)
                #print((str(stdout)).split('\\r\\n'))
                psnrA.append(float(((str(stdout)).split('\\r\\n')[3]).split()[3]))
                vmafA.append(float(((str(stdout)).split('\\r\\n')[2]).split()[3]))
                #ssimA.append(float(((str(stdout)).split('\\r\\n')[4]).split()[3]))
                ms_ssimA.append(float(((str(stdout)).split('\\r\\n')[4]).split()[3]))
                fpsnr = psnr + psnrA
                fvmaf = vmaf + vmafA
                #fssim = ssim + ssimA
                fms_ssim = ms_ssim + ms_ssimA
                print("DONE A")
                sys.stdout.flush()
            elif "HM" in distortedV[c].split('_')[7]:
                vidNum2 = distortedV[c].split('_')[6]
                count2 = count2 + 1
                vidNums2.append(vidNum2)
                psnrH.append(float(((str(stdout)).split('\\r\\n')[3]).split()[3]))
                vmafH.append(float(((str(stdout)).split('\\r\\n')[2]).split()[3]))
                #ssimH.append(float(((str(stdout)).split('\\r\\n')[4]).split()[3]))
                ms_ssimH.append(float(((str(stdout)).split('\\r\\n')[4]).split()[3]))
                fpsnrH = psnr + psnrH
                fvmafH = vmaf + vmafH
                #fssimH = ssim + ssimH
                fms_ssimH = ms_ssim + ms_ssimH
                print("DONE H")
                sys.stdout.flush()
    if psnrA != []:
        finalA.append(vidNums)
        finalA.append(fvmaf)
        finalA.append(fpsnr)
        #finalA.append(fssim)
        finalA.append(fms_ssim)
        with open(('../Experiments/' + experimentName + '/' + originalV[t].split('_')[0]) + '_AV1(objective_metrics).csv', 'w', newline='') as myfile: #python2, python3 is different.
            wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
            wr.writerows(finalA)
    if psnrH != []:
        finalH.append(vidNums2)
        finalH.append(fvmafH)
        finalH.append(fpsnrH)
        #finalH.append(fssimH)
        finalH.append(fms_ssimH)
        with open(('../Experiments/' + experimentName + '/' + originalV[t].split('_')[0]) + '_HM(objective_metrics).csv', 'w', newline='') as myfile: #python2, python3 is different.
            wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
            wr.writerows(finalH)
    vidNums = []
    vidNums2 = []
    psnrA = []
    psnrH = []
    vmafA = []
    vmafH = []
    #ssimA = []
    ms_ssimA = []
    ms_ssimH = []
    finalA = []
    finalH = []
    count = 1
    count2 = 1