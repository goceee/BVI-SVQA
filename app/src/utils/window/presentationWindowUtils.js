const remote = require('@electron/remote');
const fs = require('fs');
const { default: swal } = require('sweetalert2');
const { shuffle } = require('../commonUtils');
const { toCsv } = require('../commonUtils');
const {
  finishTrainingMessage,
  startTestingPhaseMessage,
} = require('../alert/alertMessages');

const openWindow = remote.require('./controllers/windowController');
const { app, BrowserWindow } = remote;
const appPath = app.getAppPath();

exports.getNumberOfBreaks = (videosList, videosCount) => {
  let totalExperimentTime = 0;
  videosList.forEach((video) => {
    totalExperimentTime =
      totalExperimentTime +
      videosCount * 4 +
      (videosCount * parseInt(video.split('_')[5], 10)) /
        parseInt(video.split('_')[2], 10);
  });
  totalExperimentTime /= 60;
  return totalExperimentTime < 30 ? 0 : Math.round(totalExperimentTime / 30);
};

exports.delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.createPresentationPair = (
  experimentVideos,
  originalVideos,
  videoNumber,
  shouldShuffle,
) => {
  const originalVideo =
    originalVideos[
      originalVideos.findIndex((video) =>
        video.includes(experimentVideos[videoNumber].split('_')[0]),
      )
    ];
  const pair = [originalVideo, experimentVideos[videoNumber]];
  return shouldShuffle ? shuffle(pair) : pair;
};

exports.getRatingValue = (inputNumber, breakTime, scaleType) => {
  if (breakTime) return 'break';

  let selectedValue = document.querySelector(
    `input[name=range_${inputNumber}]:checked`,
  )?.value;

  if (scaleType === 'Continuous') {
    selectedValue = document.querySelector(
      `.sliderValue.${inputNumber}`,
    )?.innerText;
  }

  return parseInt(selectedValue, 10) || selectedValue;
};

exports.exportScores = (data, experimentName, userName) => {
  const { sortedScore, unsortedScore } = data;
  // console.log(sortedScore);
  // console.log(unsortedScore);
  fs.writeFileSync(
    `${appPath}/../Experiments/${experimentName}/${userName}/score(presOrder).csv`,
    toCsv(unsortedScore),
    'utf8',
  );
  fs.writeFileSync(
    `${appPath}/../Experiments/${experimentName}/${userName}/score.csv`,
    toCsv(sortedScore),
    'utf8',
  );
};

exports.finishExperiment = async (trial, experimentName, userName) => {
  if (trial) {
    const result = await swal.fire(finishTrainingMessage);
    if (result.isConfirmed) {
      await swal.fire({
        ...startTestingPhaseMessage,
        willClose: () => {
          openWindow.presWindow();
          remote.getCurrentWindow().close();
        },
      });
      return;
    }
    // UNLINK PERSONAL INFORMATION!
    fs.rmdirSync(`${appPath}/../Experiments/${experimentName}/${userName}`, {
      recursive: true,
    });
  }
  openWindow.mainWindow();
  remote.getCurrentWindow().close();
};

exports.disableRatingInputs = (ratingInput, disable) => {
  document
    .querySelectorAll(
      `input[type="range"],input[name=range_${ratingInput}],.ratingsTextContainer,.sliderValue,.scaleQuestion.${ratingInput}`,
    )
    .forEach((element) => element.setAttribute('disabled', disable));
};
