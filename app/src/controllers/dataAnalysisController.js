const { PythonShell } = require('python-shell');
const fs = require('fs');
const { default: swal } = require('sweetalert2');
const path = require('path');
const { app } = require('electron');

const { getDirectories, checkFile } = require('../utils/fileSystemUtils');
const {
  exportSuccessMessage,
  noOutliersMessage,
  noVideoSelectedMessage,
  missingRatesMessage,
  missingBitratesFileMessage,
  codecDataMismatchMessage,
  metricsMessage,
  errorMessage,
  bitRatesErrorMessage,
  metricDataMismatchMessage,
  notEnoughForComparisonMessage,
} = require('../utils/alert/alertMessages');
const {
  addTitleBarFunctionality,
  csvToObject,
} = require('../utils/commonUtils');
const { disableElements } = require('../utils/window/dataAnalysisWindowUtils');

const appPath = app.getAppPath();
let QParr = [];
let vidCodecsList = [];
addTitleBarFunctionality();
const directoriesList = getDirectories(`${appPath}/../Experiments`);
directoriesList.splice(directoriesList.indexOf('Saved'), 1);
const bitratesField = document.getElementById('browseBitratesField');
const exportData = document.getElementById('exportData');
const plotData = document.getElementById('plotData');
const videosList = document.getElementById('videosList');
const confirmPlotsButton = document.getElementById('confirmPlots');
const comparePlotsButton = document.getElementById('compare');
const bitrateBrowseContainer = document.getElementById(
  'bitrateBrowseContainer',
);

for (let i = 0; i < directoriesList.length; i += 1) {
  exportData.options[i + 1] = new Option(
    directoriesList[i],
    directoriesList[i],
  );
  plotData.options[i + 1] = new Option(directoriesList[i], directoriesList[i]);
}

exportData.onchange = () => {
  document.getElementById('exportDataRadioGroup').style.display = 'flex';
  plotData.selectedIndex = 0;
  videosList.style.display = 'none';
  document
    .querySelectorAll('input[type="radio"]:checked')
    .forEach((element) => {
      element.checked = false;
    });
  document.getElementById('plotsRadioGroup').style.display = 'none';
  bitrateBrowseContainer.style.display = 'none';
  document.getElementById('buttonsContainer').style.display = 'none';
  document.getElementById('extractDataButtonContainer').style.display = 'none';
};

document.querySelectorAll('input[name="export"]').forEach((element) => {
  element.onchange = () => {
    document.getElementById('extractDataButtonContainer').style.display =
      'flex';
  };
});

document.getElementById('confirmExtractData').onclick = () => {
  disableElements(true);
  const selectedExperiment = exportData.value;
  const readExperimentConfiguration = fs.readFileSync(
    `${appPath}/../Experiments/${selectedExperiment}/${selectedExperiment}(config).csv`,
    'utf8',
  );
  const experimentConfiguration = csvToObject(readExperimentConfiguration);
  const presentationMethod = experimentConfiguration['Presentation method'];
  if (document.querySelector('input[name="export"]:checked').value === 'raw') {
    const pyshell = new PythonShell(
      `${appPath}/src/utils/python/extractData.py`,
      {
        args: [selectedExperiment, presentationMethod],
      },
    );

    /* pyshell.on('message', function (message) {
      console.log(message);
    }); */

    pyshell.end((err) => {
      if (err) {
        swal.fire(errorMessage(err.message));
      } else {
        swal.fire(exportSuccessMessage);
      }
      disableElements(false);
    });
  } else if (
    document.querySelector('input[name="export"]:checked').value === 'processed'
  ) {
    swal.fire(noOutliersMessage);
  }
};

plotData.onchange = () => {
  document.getElementById('exportDataRadioGroup').style.display = 'none';
  document.getElementById('extractDataButtonContainer').style.display = 'none';
  bitrateBrowseContainer.style.display = 'none';
  document.getElementById('buttonsContainer').style.display = 'none';
  document.getElementById('plotsRadioGroup').style.display = 'none';
  document
    .querySelectorAll('input[type="radio"]:checked')
    .forEach((element) => {
      element.checked = false;
    });
  exportData.selectedIndex = 0;
  videosList.selectedIndex = 0;
  videosList.options.length = 1;
  const readExperimentConfiguration = fs.readFileSync(
    `${appPath}/../Experiments/${plotData.value}/${plotData.value}(config).csv`,
    'utf8',
  );
  const experimentConfiguration = csvToObject(readExperimentConfiguration);

  if (experimentConfiguration['Presentation method'].split('(')[0] === 'ACR') {
    document.getElementById('100MinusLabel').innerText = '100-MOS';
    document.getElementById('plot100Minus').innerText = '100-MOS';
    document.getElementById('dmosLabel').innerText = 'MOS';
    document.getElementById('plotDMOS').innerText = 'MOS';
    document.getElementById('dmosVmafLabel').innerText = 'MOS & VMAF';
    document.getElementById('plotDMOSVMAF').innerText = 'MOS & VMAF';
  }

  const DistortedVideos = experimentConfiguration['Distorted Videos'].sort();
  const OriginalVideos = experimentConfiguration['Original Videos'].sort();
  vidCodecsList = [];
  for (let i = 0; i < OriginalVideos.length; i += 1) {
    while (DistortedVideos.length > 0) {
      if (
        OriginalVideos[i].split('_')[0] === DistortedVideos[0].split('_')[0]
      ) {
        vidCodecsList.push(DistortedVideos[0].split('.')[0].split('_').pop());
        vidCodecsList = Array.from(new Set(vidCodecsList));
        DistortedVideos.splice(DistortedVideos[0], 1);
      } else {
        break;
      }
    }
    for (let j = 0; j < vidCodecsList.length; j += 1) {
      if (OriginalVideos[i].length > 1) {
        videosList.options[videosList.options.length] = new Option(
          `${OriginalVideos[i].split('_')[0]}_${vidCodecsList[j]}`,
          `${OriginalVideos[i].split('_')[0]}_${vidCodecsList[j]}`,
        );
      }
    }
    videosList.style.display = 'flex';
  }
};

videosList.onchange = () => {
  QParr = [];
  document.getElementById('plotsRadioGroup').style.display = 'flex';
  bitrateBrowseContainer.style.display = 'none';
  document.getElementById('buttonsContainer').style.display = 'none';
  document
    .querySelectorAll('input[type="radio"]:checked')
    .forEach((element) => {
      element.checked = false;
    });
  const readExperimentConfiguration = fs.readFileSync(
    `../../Experiments/${plotData.value}/${plotData.value}(config).csv`,
    'utf8',
  );
  const experimentConfiguration = csvToObject(readExperimentConfiguration);
  const DistortedVideos = experimentConfiguration['Distorted Videos'].sort();

  for (let j = 0; j < DistortedVideos.length; j += 1) {
    if (DistortedVideos[j].split('_')[0] === videosList.value.split('_')[0]) {
      const qpIndex = DistortedVideos[j]
        .split('_')
        .findIndex((element) => element.includes('QP'));

      // eslint-disable-next-line no-unused-expressions
      qpIndex >= 0
        ? QParr.push(DistortedVideos[j].split('_')[qpIndex].substr(2))
        : null;
    }
  }
};

document.querySelectorAll('input[name="plots"]').forEach((element) => {
  element.onchange = () => {
    document.getElementById('buttonsContainer').style.display = 'flex';
    const bitrates = checkFile(
      `../../Experiments/${plotData.value}`,
      'bitrates.csv',
    );

    if (vidCodecsList.length > 1) {
      comparePlotsButton.disabled = false;
      if (
        document.querySelector('input[name="plots"]:checked').value ===
        'DMOS,VMAF'
      ) {
        comparePlotsButton.disabled = true;
      }
    } else {
      comparePlotsButton.disabled = true;
    }
    if (bitrates.exists === false && QParr.length === 0) {
      bitrateBrowseContainer.style.display = 'flex';
    } else {
      bitrateBrowseContainer.style.display = 'none';
    }
  };
});

confirmPlotsButton.onclick = () => {
  disableElements(true);
  const readSelectedMetric = document.querySelector(
    'input[name="plots"]:checked',
  ).value;
  if (videosList.value === 'Choose...') {
    swal.fire(noVideoSelectedMessage);
    disableElements(false, vidCodecsList.length, readSelectedMetric);
    return;
  }

  let rateParameter = { type: '', data: [] };
  let selectedMetric = readSelectedMetric.split(',');
  selectedMetric =
    selectedMetric.length > 1 ? selectedMetric : selectedMetric[0];
  const selectedVideo = videosList.value;
  const [selectedVideoName, selectedVideoCodec] = selectedVideo.split('_');
  const bitrates = checkFile(
    `../../Experiments/${plotData.value}`,
    'bitrates.csv',
  );
  const objectiveMetrics = checkFile(
    `../../Experiments/${plotData.value}/Objective_metrics`,
    `${videosList.value}(objective_metrics).csv`,
  );

  const subjectiveMetrics = checkFile(
    `../../Experiments/${plotData.value}`,
    'rawdata.csv',
  );

  if (
    !bitrates.exists &&
    bitratesField.files.length === 0 &&
    QParr.length === 0
  ) {
    swal.fire(missingRatesMessage);
    disableElements(false, vidCodecsList.length, readSelectedMetric);
    bitrateBrowseContainer.style.display = 'flex';
    return;
  }

  const metricData = [];
  let dataRates = [];
  if (
    selectedMetric === 'PSNR' ||
    selectedMetric === 'MS-SSIM' ||
    selectedMetric.includes('VMAF')
  ) {
    if (!objectiveMetrics.exists) {
      swal.fire(metricsMessage('Objective', selectedVideoName, 'missing'));
      disableElements(false, vidCodecsList.length, readSelectedMetric);
      return;
    }
    try {
      const readObjectiveMetrics = fs.readFileSync(
        objectiveMetrics.path,
        'utf8',
      );
      const metric =
        typeof selectedMetric === 'string' ? selectedMetric : selectedMetric[1];
      const objectiveMetricsData = csvToObject(readObjectiveMetrics);
      dataRates = [...objectiveMetricsData.Rates];
      metricData.unshift({
        [metric]: [...objectiveMetricsData[metric]],
        errorBar: {
          CI95_HIGH: [...(objectiveMetricsData.CI95_HIGH || [])],
          CI95_LOW: [...(objectiveMetricsData.CI95_LOW || [])],
        },
      });
    } catch {
      swal.fire(metricsMessage('objective', selectedVideoName, 'read'));
      disableElements(false, vidCodecsList.length, readSelectedMetric);
      return;
    }
  }
  if (selectedMetric.includes('DMOS')) {
    if (!subjectiveMetrics.exists) {
      swal.fire(metricsMessage('Subjective', selectedVideoName, 'missing'));
      disableElements(false, vidCodecsList.length, readSelectedMetric);
      return;
    }
    try {
      const readSubjectiveMetrics = fs.readFileSync(
        subjectiveMetrics.path,
        'utf8',
      );
      const subjectiveMetricsData = csvToObject(readSubjectiveMetrics);
      const metric =
        typeof selectedMetric === 'string' ? selectedMetric : selectedMetric[0];
      const videoNamesList = subjectiveMetricsData['Video name']
        .filter((video) => video.includes(selectedVideoName))
        .filter((video) => video.includes(selectedVideoCodec));
      dataRates = videoNamesList.map((video) => video.split('_')[6]);
      const data = { [metric]: [], errorBar: [] };
      videoNamesList.forEach((videoName) => {
        data[metric].push(
          subjectiveMetricsData.MOS[
            subjectiveMetricsData['Video name'].indexOf(videoName)
          ],
        );
        data.errorBar.push(
          subjectiveMetricsData['Standard Error of the Mean'][
            subjectiveMetricsData['Video name'].indexOf(videoName)
          ],
        );
      });
      metricData.unshift({ ...data });
    } catch {
      swal.fire(metricsMessage('subjective', selectedVideoName, 'read'));
      disableElements(false, vidCodecsList.length, readSelectedMetric);
      return;
    }
  }
  if (QParr.length === 0) {
    const bitRatesPath = bitrates.exists
      ? { exists: true, path: bitrates.path }
      : checkFile(
          path.dirname(bitratesField.files[0].path),
          bitratesField.files[0].name,
        );
    const readBitRates = bitRatesPath.exists
      ? fs.readFileSync(bitRatesPath.path, 'utf8')
      : null;
    if (readBitRates === null) {
      swal.fire(missingBitratesFileMessage);
      disableElements(false, vidCodecsList.length, readSelectedMetric);
      return;
    }
    const bitRatesData = csvToObject(readBitRates);
    const selectedVideoBitrates = dataRates.map(
      (rate) =>
        bitRatesData[selectedVideoName][bitRatesData.Rates.indexOf(rate)],
    );
    const metric =
      typeof selectedMetric === 'string' ? selectedMetric : selectedMetric[0];
    if (selectedVideoBitrates.length !== metricData[0][metric].length) {
      swal.fire(missingRatesMessage(selectedVideoName));
      disableElements(false, vidCodecsList.length, readSelectedMetric);
      return;
    }
    rateParameter = {
      type: 'Bitrates(kbps)',
      data: [...selectedVideoBitrates],
    };
  } else {
    rateParameter = { type: 'QP', data: [...QParr] };
  }

  const options = {
    args: [
      JSON.stringify(rateParameter),
      selectedVideo,
      selectedMetric,
      selectedVideoCodec,
    ],
  };
  let plotType = '';
  if (typeof selectedMetric === 'string') {
    options.args.unshift(metricData[0][selectedMetric]);
    options.args.push(JSON.stringify(metricData[0].errorBar));
    plotType = `${appPath}/src/utils/python/plotSingle.py`;
  } else {
    if (
      metricData[0][selectedMetric[0]].length !==
      metricData[1][selectedMetric[1]].length
    ) {
      swal.fire(metricDataMismatchMessage(selectedVideoName));
      disableElements(false, vidCodecsList.length, selectedMetric);
      return;
    }
    options.args.unshift(metricData[1][selectedMetric[1]]);
    options.args.unshift(metricData[0][selectedMetric[0]]);
    options.args.push(JSON.stringify(metricData[1].errorBar));
    options.args.push(metricData[0].errorBar);
    plotType = `${appPath}/src/utils/python/plotDual.py`;
  }
  const pythonPlotData = new PythonShell(plotType, options);
  // pythonPlotData.on('message', (message) => console.log(message));
  pythonPlotData.end((err) => {
    if (err) {
      swal.fire(errorMessage(err.message));
    }
    disableElements(false, vidCodecsList.length, readSelectedMetric);
  });
};

comparePlotsButton.onclick = () => {
  disableElements(true);
  const selectedMetric = document.querySelector(
    'input[name="plots"]:checked',
  ).value;
  if (videosList.value === 'Choose...') {
    swal.fire(noVideoSelectedMessage);
    // CHECK SECOND PARAMETER!!!!!
    disableElements(false, vidCodecsList.length, selectedMetric);
    return;
  }

  let rateParameter = { type: '', data: [] };
  const selectedVideo = videosList.value;
  const selectedVideoName = selectedVideo.split('_')[0];
  const bitrates = checkFile(
    `${appPath}/../Experiments/${plotData.value}`,
    'bitrates.csv',
  );
  const objectiveMetrics = vidCodecsList.map((codec) =>
    checkFile(
      `${appPath}/../Experiments/${plotData.value}/Objective_metrics`,
      `${selectedVideoName}_${codec}(objective_metrics).csv`,
    ),
  );

  const subjectiveMetrics = checkFile(
    `${appPath}/../Experiments/${plotData.value}`,
    'rawdata.csv',
  );

  if (
    !bitrates.exists &&
    bitratesField.files.length === 0 &&
    QParr.length === 0
  ) {
    swal.fire(missingRatesMessage);
    disableElements(false, vidCodecsList.length, selectedMetric);
    bitrateBrowseContainer.style.display = 'flex';
    return;
  }

  let metricData = {};
  let dataRates = [];

  if (
    selectedMetric === 'PSNR' ||
    selectedMetric === 'MS-SSIM' ||
    selectedMetric === 'VMAF'
  ) {
    if (objectiveMetrics.some((codec) => codec.exists === false)) {
      swal.fire(metricsMessage('Objective', selectedVideoName, 'missing'));
      disableElements(false, vidCodecsList.length, selectedMetric);
      return;
    }
    try {
      const readObjectiveMetrics = objectiveMetrics.map((codec) =>
        fs.readFileSync(codec.path, 'utf8'),
      );
      const objectiveMetricsData = readObjectiveMetrics.map((codec) =>
        csvToObject(codec),
      );
      dataRates = objectiveMetricsData.map((codec) => codec.Rates);
      const selectedMetricArrayData = objectiveMetricsData.map(
        (codec) => codec[selectedMetric],
      );
      const confidenceIntervalHigh = objectiveMetricsData.map(
        (codec) => codec.CI95_HIGH,
      );
      const confidenceIntervalLow = objectiveMetricsData.map(
        (codec) => codec.CI95_LOW,
      );
      metricData = {
        [selectedMetric]: [...selectedMetricArrayData],
        errorBar: {
          CI95_HIGH: [...(confidenceIntervalHigh || [])],
          CI95_LOW: [...(confidenceIntervalLow || [])],
        },
      };
    } catch {
      // console.log(e);
      swal.fire(metricsMessage('objective', selectedVideoName, 'read'));
      disableElements(false, vidCodecsList.length, selectedMetric);
      return;
    }
  }

  if (selectedMetric.includes('DMOS')) {
    const listOfAllExperimentVideos = [...videosList.options];
    const videosForComparison = listOfAllExperimentVideos
      .filter((video) => video.value.includes(selectedVideoName))
      .map((video) => video.value);
    if (videosForComparison.length < 1) {
      swal.fire(
        notEnoughForComparisonMessage(
          selectedVideoName,
          videosForComparison.length,
        ),
      );
      disableElements(false, vidCodecsList.length, selectedMetric);
      return;
    }
    try {
      const readSubjectiveMetrics = fs.readFileSync(
        subjectiveMetrics.path,
        'utf8',
      );
      const subjectiveMetricsData = csvToObject(readSubjectiveMetrics);
      const videoNamesList = subjectiveMetricsData['Video name'].filter(
        (video) => video.includes(selectedVideoName),
      );
      const data = { [selectedMetric]: [], errorBar: [] };

      vidCodecsList.forEach((codec) => {
        const codecVideoList = videoNamesList.filter((videoName) =>
          videoName.includes(codec),
        );
        dataRates.push(codecVideoList.map((video) => video.split('_')[6]));
        const tempArrayMOS = [];
        const tempArraystdError = [];
        codecVideoList.forEach((video) => {
          tempArrayMOS.push(
            subjectiveMetricsData.MOS[
              subjectiveMetricsData['Video name'].indexOf(video)
            ],
          );
          tempArraystdError.push(
            subjectiveMetricsData['Standard Error of the Mean'][
              subjectiveMetricsData['Video name'].indexOf(video)
            ],
          );
        });
        data[selectedMetric].push(tempArrayMOS);
        data.errorBar.push(tempArraystdError);
      });
      metricData = { ...data };
    } catch {
      swal.fire(metricsMessage('subjective', selectedVideoName, 'read'));
      disableElements(false, vidCodecsList.length, selectedMetric);
      return;
    }
  }

  if (QParr.length === 0) {
    const bitRatesPath = bitrates.exists
      ? { exists: true, path: bitrates.path }
      : checkFile(
          path.dirname(bitratesField.files[0].path),
          bitratesField.files[0].name,
        );
    const readBitRates = bitRatesPath.exists
      ? fs.readFileSync(bitRatesPath.path, 'utf8')
      : null;
    if (readBitRates === null) {
      swal.fire(missingBitratesFileMessage);
      disableElements(false, vidCodecsList.length, selectedMetric);
      return;
    }
    const bitRatesData = csvToObject(readBitRates);
    const selectedVideoBitrates = dataRates.map((codec) =>
      codec.map(
        (rate) =>
          bitRatesData[selectedVideoName][bitRatesData.Rates.indexOf(rate)],
      ),
    );
    const ratesLength = selectedVideoBitrates[0].length;
    const bitRatesEqualityCheck = selectedVideoBitrates.every(
      (array) => array.length === ratesLength,
    );
    const metricDataLength = metricData[selectedMetric][0];
    const metricDataEqualityCheck = metricData[selectedMetric].every(
      (array) => array.length === metricDataLength,
    );
    if (
      !bitRatesEqualityCheck &&
      !metricDataEqualityCheck &&
      selectedVideoBitrates[0].length !== metricData[selectedMetric][0].length
    ) {
      swal.fire(bitRatesErrorMessage(selectedVideoName));
      disableElements(false, vidCodecsList.length, selectedMetric);
      return;
    }
    rateParameter = {
      type: 'Bitrates(kbps)',
      data: [...selectedVideoBitrates],
    };
  } else {
    rateParameter = { type: 'QP', data: [...QParr] };
  }
  // eslint-disable-next-line prefer-destructuring
  const length = metricData[selectedMetric][0].length;
  const arrayEqualityCheck = metricData[selectedMetric].every(
    (array) => array.length === length,
  );

  if (!arrayEqualityCheck) {
    swal.fire(codecDataMismatchMessage);
    disableElements(false, vidCodecsList.length, selectedMetric);
    return;
  }
  const compareCodecs = new PythonShell(
    `${appPath}/src/utils/python/compareCodecs.py`,
    {
      args: [
        JSON.stringify(metricData[selectedMetric]),
        JSON.stringify(rateParameter),
        selectedVideo,
        selectedMetric,
        JSON.stringify(metricData.errorBar),
        vidCodecsList,
      ],
    },
  );
  /* compareCodecs.on('message', function (message) {
    console.log(message);
  }); */
  compareCodecs.end((err) => {
    if (err) {
      swal.fire(errorMessage(err.message));
      // console.log(err);
    }
    disableElements(false, vidCodecsList.length, selectedMetric);
  });
};
// -----------------------END COMPARE BUTTON------------------------------ //

bitratesField.onchange = (e) => {
  document.getElementById('browseTextBitrates').value = e.target.files[0].name;
};
