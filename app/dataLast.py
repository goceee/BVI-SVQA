import time
import tobii_research as tr
import subprocess
import sys
import os
import csv

videoName = sys.argv[1]
videoTime = int(sys.argv[2])
userName = sys.argv[3]

listCoordinates = []
allCoordinates = []
found_eyetrackers = tr.find_all_eyetrackers()
while len(found_eyetrackers) < 1:
	found_eyetrackers = tr.find_all_eyetrackers()
eyetracker = found_eyetrackers[0]
def gaze_data_callback(gaze_data):
# Print gaze points of left and right eye
	right_gaze_data = gaze_data['right_gaze_point_on_display_area']
	left_gaze_data = gaze_data['left_gaze_point_on_display_area']
	real_gaze_x = (right_gaze_data[0] + left_gaze_data[0])/2.0*1920
	real_gaze_y = (right_gaze_data[1] + left_gaze_data[1])/2.0*1080
	system_time_stamp = tr.get_system_time_stamp()
	listCoordinates = []
	listCoordinates.append(real_gaze_x)
	listCoordinates.append(real_gaze_y)
	listCoordinates.append(system_time_stamp)
	allCoordinates.append(listCoordinates)

eyetracker.subscribe_to(tr.EYETRACKER_GAZE_DATA, gaze_data_callback, as_dictionary=True)
time.sleep(videoTime)
eyetracker.unsubscribe_from(tr.EYETRACKER_GAZE_DATA, gaze_data_callback)
with open('../GazeData/' + userName + '/' + videoName + '.csv', 'w', newline='') as myfile: #python2, python3 is different.
	wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
	wr.writerows(allCoordinates)