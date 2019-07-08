import subprocess
import sys
import re
import csv
import os
if sys.version_info[0] < 3:
    exception = OSError
else :
    exception = FileExistsError 
#originalV= ["Video1_1920x1080_60fps_8bit_420_300_R0.yuv", "Video2_1920x1080_60fps_8bit_420_300_R0.yuv"]
#distortedV= ["Video1_1920x1080_60fps_8bit_420_300_R1_HM.yuv", "Video1_1920x1080_60fps_8bit_420_300_R1_AV1.yuv", "Video1_1920x1080_60fps_8bit_420_300_R2_AV1.yuv", "Video1_1920x1080_60fps_8bit_420_300_R2_HM.yuv", "Video1_1920x1080_60fps_8bit_420_300_R3_AV1.yuv", "Video1_1920x1080_60fps_8bit_420_300_R3_HM.yuv", "Video2_1920x1080_60fps_8bit_420_300_R1_AV1.yuv", "Video2_1920x1080_60fps_8bit_420_300_R1_HM.yuv", "Video2_1920x1080_60fps_8bit_420_300_R2_AV1.yuv", "Video2_1920x1080_60fps_8bit_420_300_R2_HM.yuv", "Video2_1920x1080_60fps_8bit_420_300_R3_HM.yuv","Video2_1920x1080_60fps_8bit_420_300_R3_AV1.yuv"]
#path1 = "G:\\ForExperiment\\Distorted\\"
#path2 = "G:\\ForExperiment\\Originals\\"
#path = "G:\\NewTest"
#experimentName = "DSCQS"
originalV = sys.argv[1].split(',')
#originalV = [x for x in originalV if "train" not in x]
distortedV = sys.argv[2].split(',')
#distortedV = [x for x in distortedV if "train" not in x]
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
    print(resolution)
    sys.stdout.flush()
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
        out = subprocess.Popen(['vmaf/x64/Release/vmafossexec.exe', 'yuv' + orList[4] + pixFmt , resolution[0], resolution[1], path2 + '\\' + originalV[t], path1 + '\\' + videoList[i], 'vmaf/model/' + model, '--psnr', '--ms-ssim', '--ci'], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        stdout,stderr = out.communicate()
        vidNum = videoList[i].split('_')[6]
        vidNums.append(vidNum)
        psnr.append(float(((str(stdout)).split('\\r\\n')[7]).split()[3]))
        vmaf.append(float(((str(stdout)).split('\\r\\n')[2]).split()[3]))
        #ssim.append(float(((str(stdout)).split('\\r\\n')[7]).split()[3]))
        ms_ssim.append(float(((str(stdout)).split('\\r\\n')[8]).split()[3]))
        ci95_low.append(float(((str(stdout)).split('\\r\\n')[5]).split()[3]))
        ci95_high.append(float(((str(stdout)).split('\\r\\n')[6]).split()[3]))
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