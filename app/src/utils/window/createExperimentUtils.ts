import { BrowserWindow, shell } from '@electron/remote';
import { ipcRenderer as ipc } from 'electron';
import { PythonShell } from 'python-shell';
import Swal from 'sweetalert2';
import fs from 'fs';
import path from 'path';

const pythonCodePath = path.join(process.cwd(), 'utils/python/');

import {
  createProgressBar,
  getCurrentProgressValue,
  updateProgressBar,
} from '../progressbar';
import { updateProgressTaskBar } from '../commonUtils';
import { defaultAlertOptions } from '../alert/defaultAlertOptions';
import {
  trainingVideosMismatchMessage,
  regularVideosMismatchMessage,
  conversionCompleteMessage,
  objectiveMetricsCompleteMessage,
  pythonErrorMessage,
} from '../alert/alertMessages';

// eslint-disable-next-line no-unused-vars
export const openPopup = (
  type: unknown,
  popupWindow: HTMLDivElement,
  parentWindow: HTMLDivElement,
  method: unknown,
) => {
  parentWindow.style.filter = 'blur(2px)';
  popupWindow.style.display = 'flex';
  popupWindow.onclick = function popup(e) {
    if (e.target !== this) {
      return;
    }
    shell.beep();
  };
};

export const hidePopup = (
  popupWindow: HTMLDivElement,
  parentWindow: HTMLDivElement,
) => {
  parentWindow.style.filter = '';
  popupWindow.style.display = '';
};

const hideBrowseOriginalField = (hide: boolean) => {
  if (hide) {
    document.getElementById('browseOriginal').style.visibility = 'hidden';
    document.getElementById('dName').style.visibility = 'hidden';
  } else {
    document.getElementById('browseOriginal').style.visibility = 'visible';
    document.getElementById('dName').style.visibility = 'visible';
  }
};

export const resetBrowseFiles = () => {
  const emptyFile = document.createElement('input');
  emptyFile.type = 'file';
  return emptyFile.files;
};

export const prepareFields = (selectedMethod: string) => {
  const calculateObjectiveMetrics = document.getElementById('objective');
  document.getElementById('browseDistortedField').files =
    this.resetBrowseFiles();
  document.getElementById('browseTextOriginal').value = '';
  document.getElementById('browseTextDistorted').value = '';
  document.getElementById('browseOriginalField').files =
    this.resetBrowseFiles();
  document.getElementById('browseDistorted').style.visibility = 'visible';
  document.getElementById('browseOriginal').style.visibility = 'visible';
  document.getElementById('vName').style.visibility = 'visible';
  document.getElementById('dName').style.visibility = 'visible';
  document.getElementById('submitExperiment').style.visibility = 'visible';
  document.querySelector('.container-checkbox').style.visibility = 'visible';
  hideBrowseOriginalField(
    !calculateObjectiveMetrics.checked && selectedMethod === 'ACR',
  );

  calculateObjectiveMetrics.onchange = () =>
    hideBrowseOriginalField(
      !calculateObjectiveMetrics.checked && selectedMethod === 'ACR',
    );
};

const sortByCodec = (a: string, b: string) =>
  a.split('_')[7].localeCompare(b.split('_')[7]);

const sortByName = (a: string, b: string) =>
  a.split('_')[0].localeCompare(b.split('_')[0]);

const countDistortions = (
  distortedVideos: string[],
  originalVideos: string[],
) => {
  let minRecommendedDistortionsCounter = 0;
  const videoSetup = {
    error: false,
    mismatch: false,
    videos: {},
  };
  while (originalVideos.length > 0) {
    let codec = '';
    let distortionsCounter = 0;
    minRecommendedDistortionsCounter = 0;
    while (distortedVideos.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      if (codec === '') codec = distortedVideos[0].split('_')[7];
      if (originalVideos[0].includes(distortedVideos[0].split('_')[0])) {
        if (codec !== distortedVideos[0].split('_')[7]) {
          // eslint-disable-next-line prefer-destructuring
          codec = distortedVideos[0].split('_')[7];
          if (distortionsCounter < 4) {
            minRecommendedDistortionsCounter += 1;
            videoSetup.error = true;
            videoSetup.videos = {
              ...videoSetup.videos,
              [originalVideos[0]]: minRecommendedDistortionsCounter,
            };
          }
          distortionsCounter = 1;
        } else {
          distortionsCounter += 1;
        }
        distortedVideos.splice(0, 1);
      } else break;
    }
    if (distortionsCounter > 0 && distortionsCounter < 4) {
      minRecommendedDistortionsCounter += 1;
      videoSetup.videos = {
        ...videoSetup.videos,
        [originalVideos[0]]: minRecommendedDistortionsCounter,
      };
      videoSetup.error = true;
    }
    distortionsCounter = 0;
    originalVideos.splice(0, 1);
    if (distortedVideos.length === 0) break;
  }
  if (distortedVideos.length > 0 || originalVideos.length > 0) {
    videoSetup.error = true;
    videoSetup.mismatch = true;
  }
  return videoSetup;
};

export const checkSelectedVideos = (
  distortedVideos: string[],
  originalVideos: string[],
) => {
  const trainingDistortedVideos: string[] = [];
  const trainingOriginalVideos: string[] = [];
  const experimentDistortedVideos = distortedVideos
    .filter((video) => {
      if (!video.includes('train')) return true;

      trainingDistortedVideos.push(video);
      return false;
    })
    .sort()
    .sort(sortByCodec)
    .sort(sortByName);
  const experimentOriginalVideos = originalVideos
    .filter((video) => {
      if (!video.includes('train')) return true;

      trainingOriginalVideos.push(video);
      return false;
    })
    .sort();
  trainingOriginalVideos.sort();
  trainingDistortedVideos.sort().sort(sortByCodec).sort(sortByName);
  const trainingVideosTest = countDistortions(
    trainingDistortedVideos,
    trainingOriginalVideos,
  );
  const experimentVideosTest = countDistortions(
    experimentDistortedVideos,
    experimentOriginalVideos,
  );
  // RESET BROWSE TO START OVER!!!
  if (trainingVideosTest.error) {
    if (trainingVideosTest.mismatch) {
      Swal.fire(trainingVideosMismatchMessage);
      return false;
    }
    Swal.fire({
      text: `The following training videos have less than the recommended distortions: ${JSON.stringify(
        trainingVideosTest.videos,
        null,
        2,
      )}, proceed cautiously!`,
      icon: 'info',
      ...defaultAlertOptions,
    });
  }
  if (experimentVideosTest.error) {
    if (experimentVideosTest.mismatch) {
      Swal.fire(regularVideosMismatchMessage);
      return false;
    }
    Swal.fire({
      text: `The following experiment videos have less than the recommended distortions: ${JSON.stringify(
        experimentVideosTest.videos,
        null,
        2,
      )}, proceed cautiously!`,
      icon: 'info',
      ...defaultAlertOptions,
    });
    return true;
  }
  return true;
};

// eslint-disable-next-line import/order
import remote from '@electron/remote';

const openWindow = remote.require('./controllers/windowController.js');

const getObjectiveMetrics = (
  experimentName: string,
  distortedVideos: string[],
  originalVideos: string[],
  distortedVideosPath: string,
  originalVideosPath: string,
) => {
  const objectiveMetricsCalculation = new PythonShell(
    `${pythonCodePath}getObjectiveM.py`,
    {
      args: [
        originalVideos,
        distortedVideos,
        experimentName,
        distortedVideosPath,
        originalVideosPath,
      ],
    },
  );
  ipc.send('info', 'stop-closing');
  createProgressBar({ indeterminate: true }, 'Calculating objective metrics');
  BrowserWindow.getAllWindows()[0].setProgressBar(2);
  openPopup(
    'progress-bar',
    document.querySelector('.progress-bar-background') as HTMLDivElement,
    document.getElementById(
      'createExperimentWindowContainer',
    ) as HTMLDivElement,
    null,
  );

  // eslint-disable-next-line no-unused-vars
  // objectiveMetricsCalculation.on('message', (message) => {
  // console.log(message);
  // });

  objectiveMetricsCalculation.end(async (err) => {
    if (err) {
      ipc.send('info', 'allow-closing');
      await Swal.fire(pythonErrorMessage(err.message));
      openWindow.mainWindow();
      remote.getCurrentWindow().close();
    } else {
      ipc.send('info', 'allow-closing');
      updateProgressBar(0, 'Conversion complete');
      fs.writeFileSync(
        '../../Experiments/Experiment.last',
        experimentName,
        'utf8',
      );
      fs.writeFileSync(
        `../../Experiments/Saved/${experimentName}.save`,
        experimentName,
        'utf8',
      );
      if (
        BrowserWindow.getAllWindows()[0].isMinimized() === true ||
        BrowserWindow.getAllWindows()[0].isFocused() === false
      ) {
        BrowserWindow.getAllWindows()[0].flashFrame(true);
      }
      setTimeout(() => {
        BrowserWindow.getAllWindows()[0].setProgressBar(-1);
        this.hidePopup(
          document.querySelector('.progress-bar-background'),
          document.getElementById('createExperimentWindowContainer'),
        );
        Swal.fire({
          ...objectiveMetricsCompleteMessage,
          willClose: () => {
            openWindow.mainWindow();
            remote.getCurrentWindow().close();
          },
        });
      }, 500);
    }
  });
};

export const convert = (
  experimentName: string,
  distortedVideosPath: string,
  originalVideosPath: string,
  distortedVideos: string[],
  originalVideos: string[],
  selectedCodec: string,
  selectedFormat: string,
  objectiveMetricsCalculation: boolean,
) => {
  const videosCount = distortedVideos.length + originalVideos.length;
  ipc.send('info', 'stop-closing');
  createProgressBar(
    { indeterminate: false, maxValue: videosCount },
    `Converting video 1 out of ${videosCount}`,
  );
  BrowserWindow.getAllWindows()[0].setProgressBar(0);
  openPopup(
    'progress-bar',
    document.querySelector('.progress-bar-background') as HTMLDivElement,
    document.getElementById(
      'createExperimentWindowContainer',
    ) as HTMLDivElement,
    null,
  );
  // To stop PythonShell from blocking the view.
  setTimeout(() => {
    const videoConversion = new PythonShell(`${pythonCodePath}convert.py`, {
      args: [
        distortedVideosPath,
        originalVideosPath,
        distortedVideos,
        originalVideos,
        selectedCodec,
        selectedFormat,
      ],
    });

    // eslint-disable-next-line no-unused-vars
    videoConversion.on('message', (message) => {
      const currentValue = getCurrentProgressValue() + 1;
      updateProgressBar(
        currentValue,
        `Converting video ${currentValue + 1} out of ${videosCount}`,
      );
      const taskbarProgressValue = updateProgressTaskBar(
        currentValue,
        videosCount,
      );
      BrowserWindow.getAllWindows()[0].setProgressBar(taskbarProgressValue);
    });
    videoConversion.end(async (err) => {
      if (err) {
        ipc.send('info', 'allow-closing');
        await Swal.fire(pythonErrorMessage(err.message));
        openWindow.mainWindow();
        remote.getCurrentWindow().close();
      } else {
        ipc.send('info', 'allow-closing');
        updateProgressBar(videosCount, 'Conversion complete');
        if (
          BrowserWindow.getAllWindows()[0].isMinimized() === true ||
          BrowserWindow.getAllWindows()[0].isFocused() === false
        ) {
          BrowserWindow.getAllWindows()[0].flashFrame(true);
        }
        setTimeout(() => {
          BrowserWindow.getAllWindows()[0].setProgressBar(-1);
          this.hidePopup(
            document.querySelector('.progress-bar-background'),
            document.getElementById('createExperimentWindowContainer'),
          );
          document.getElementById('progressBar').remove();
          Swal.fire({
            ...conversionCompleteMessage,
            willClose: objectiveMetricsCalculation
              ? () =>
                  getObjectiveMetrics(
                    experimentName,
                    distortedVideos,
                    originalVideos,
                    distortedVideosPath,
                    originalVideosPath,
                  )
              : () => {
                  fs.writeFileSync(
                    '../../Experiments/Experiment.last',
                    experimentName,
                    'utf8',
                  );
                  fs.writeFileSync(
                    `../../Experiments/Saved/${experimentName}.save`,
                    experimentName,
                    'utf8',
                  );
                  openWindow.mainWindow();
                  remote.getCurrentWindow().close();
                },
          });
        }, 500);
        // console.log('finished');
      }
    });
  }, 300);
};
