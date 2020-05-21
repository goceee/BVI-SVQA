import subprocess
import sys
import re
import csv
import json
import os
from xml.dom import minidom
FNULL = open(os.devnull, 'w')


if sys.version_info[0] < 3:
    exception = OSError
else :
    exception = FileExistsError 

originalV = sys.argv[1].split(',')
distortedV = sys.argv[2].split(',')
experimentName = sys.argv[3]
path1 = sys.argv[4]
path2 = sys.argv[5]
distortedV.sort(key=lambda x:x[-6])

try:
    os.mkdir("../Experiments/" + experimentName + '/Objective_metrics/')
except exception:
    # directory already exists
    pass

psnr = []
vmaf = []
#ssim = []
ms_ssim = []
ci95_low = []
ci95_high = []
vidNums = []
psnrT = ["PSNR"]
#ssimT = ["SSIM"]
vmafT = ["VMAF"]
ms_ssimT = ["MS-SSIM"]
ci95_lowT = ["CI95_LOW"]
ci95_highT = ["CI95_HIGH"]
final = []
videoList = []

for t in range(0,len(originalV)):
    vidNums.append("")
    orList = originalV[t].split('_')
    bit = ''.join(re.findall(r'\d+', orList[3]))
    if int(bit) < 10:
        pixFmt = 'p'
    else:
        pixFmt = 'p' + bit + 'le'
    resolution = orList[1].split('x')

    if int(resolution[0]) > 1920:
        model = 'vmaf_4k_rb_v0.6.2/vmaf_4k_rb_v0.6.2.pkl'
    else:
        model = 'vmaf_rb_v0.6.2/vmaf_rb_v0.6.2.pkl'
    
    for c in range(0,len(distortedV)):
        if originalV[t].split('_')[0] not in distortedV[c]:
            continue
        else:
            videoList.append(distortedV[c])
            
    for i in range(0,len(videoList)):
        if sys.platform.startswith('win'):
            subprocess.call(['vmaf/vmafossexec.exe', 'yuv' + orList[4] + pixFmt , resolution[0], resolution[1], path2 + '\\' + originalV[t], path1 + '\\' + videoList[i], 'vmaf/model/' + model, '--log', '../Experiments/temp.xml', '--log-fmt', 'xml', '--psnr', '--ms-ssim', '--ci'], stdout=FNULL, stderr=subprocess.STDOUT, shell=False)

        elif sys.platform.startswith('linux'):
	        subprocess.call(['vmaf/vmafossexec_linux', 'yuv' + orList[4] + pixFmt , resolution[0], resolution[1], path2 + '/' + originalV[t], path1 + '/' + videoList[i], './vmaf/model/' + model, '--log', '../Experiments/temp.xml', '--log-fmt', 'xml', '--psnr', '--ms-ssim', '--ci'], stdout=FNULL, stderr=subprocess.STDOUT, shell=False)
        
        elif sys.platform.startswith('darwin'):
            subprocess.call(['vmaf/vmafossexec_mac', 'yuv' + orList[4] + pixFmt , resolution[0], resolution[1], path2 + '/' + originalV[t], path1 + '/' + videoList[i], './vmaf/model/' + model, '--log', '../Experiments/temp.xml', '--log-fmt', 'xml', '--psnr', '--ms-ssim', '--ci'], stdout=FNULL, stderr=subprocess.STDOUT, shell=False)

        xmldoc = minidom.parse('../Experiments/temp.xml')
        metrics = xmldoc.getElementsByTagName('fyi')
        os.remove('../Experiments/temp.xml')

        vidNum = videoList[i].split('_')[6]
        vidNums.append(vidNum)
        psnr.append(metrics[0].attributes['aggregatePSNR'].value)
        vmaf.append(metrics[0].attributes['aggregateVMAF'].value)
        ms_ssim.append(metrics[0].attributes['aggregateMS_SSIM'].value)
        ci95_low.append(metrics[0].attributes['aggregateCI95_low'].value)
        ci95_high.append(metrics[0].attributes['aggregateCI95_high'].value)
        fpsnr = psnrT + psnr
        fvmaf = vmafT + vmaf
        #fssim = ssimT + ssim
        fms_ssim = ms_ssimT + ms_ssim
        fci95_low = ci95_lowT + ci95_low
        fci95_high = ci95_highT + ci95_high
    
        if (i < len(videoList)-1):
    
            if (videoList[i].split('_')[-1])[:-4] != (videoList[i+1].split('_')[-1])[:-4]:
                final.append(vidNums)
                final.append(fvmaf)
                final.append(fpsnr)
                #final.append(fssim)
                final.append(fms_ssim)
                final.append(fci95_low)
                final.append(fci95_high)
    
                with open(('../Experiments/' + experimentName + '/Objective_metrics/' + originalV[t].split('_')[0]) + '_' + (videoList[i].split('_')[-1])[:-4] + '(objective_metrics).csv', 'w', newline='') as myfile: #python2, python3 is different.
                    wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
                    wr.writerows(final)
    
                vmaf = []
                vidNums = [""]
                psnr = []
                ms_ssim = []
                ci95_low = []
                ci95_high = [] 
                final = []
        else:
            final.append(vidNums)
            final.append(fvmaf)
            final.append(fpsnr)
            #final.append(fssim)
            final.append(fms_ssim)
            final.append(fci95_low)
            final.append(fci95_high)
    
            with open(('../Experiments/' + experimentName + '/Objective_metrics/' + originalV[t].split('_')[0]) + '_' + (videoList[i].split('_')[-1])[:-4] + '(objective_metrics).csv', 'w', newline='') as myfile: #python2, python3 is different.
                wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
                wr.writerows(final)
    
            vmaf = []
            vidNums = [""]
            psnr = []
            ms_ssim = [] 
            ci95_low = []
            ci95_high = [] 
            final = []      
    
    vidNums = []
    psnr = []
    vmaf = []
    #ssim = []
    ms_ssim = []
    ci95_low = []
    ci95_high = []
    final = []
    videoList = []
