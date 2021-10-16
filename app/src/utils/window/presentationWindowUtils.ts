import remote from '@electron/remote';
import fs from 'fs';
import Swal from 'sweetalert2';
import { shuffle } from '../commonUtils';
import { toCsv } from '../commonUtils';
import {
  finishTrainingMessage,
  startTestingPhaseMessage,
} from '../alert/alertMessages';

const openWindow = remote.require('./controllers/windowController');

export const getNumberOfBreaks = (
  videosList: string[],
  videosCount: number,
) => {
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

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const createPresentationPair = (
  experimentVideos: string[],
  originalVideos: string[],
  videoNumber: number,
  shouldShuffle: boolean,
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

export const getRatingValue = (
  inputNumber: number,
  breakTime: boolean,
  scaleType: string,
) => {
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

export const exportScores = (
  data: { sortedScore: any; unsortedScore: any },
  experimentName: string,
  userName: string,
) => {
  const { sortedScore, unsortedScore } = data;
  // console.log(sortedScore);
  // console.log(unsortedScore);
  fs.writeFileSync(
    `../../Experiments/${experimentName}/${userName}/score(presOrder).csv`,
    toCsv(unsortedScore),
    'utf8',
  );
  fs.writeFileSync(
    `../../Experiments/${experimentName}/${userName}/score.csv`,
    toCsv(sortedScore),
    'utf8',
  );
};

export const finishExperiment = async (
  trial: boolean,
  experimentName: string,
  userName: string,
) => {
  if (trial) {
    const result = await Swal.fire(finishTrainingMessage);
    if (result.isConfirmed) {
      await Swal.fire({
        ...startTestingPhaseMessage,
        willClose: () => {
          openWindow.presWindow();
          remote.getCurrentWindow().close();
        },
      });
      return;
    }
    // UNLINK PERSONAL INFORMATION!
    fs.rmdirSync(`../../Experiments/${experimentName}/${userName}`, {
      recursive: true,
    });
  }
  openWindow.mainWindow();
  remote.getCurrentWindow().close();
};

export const disableRatingInputs = (ratingInput: string, disable: string) => {
  document
    .querySelectorAll(
      `input[type="range"],input[name=range_${ratingInput}],.ratingsTextContainer,.sliderValue,.scaleQuestion.${ratingInput}`,
    )
    .forEach((element) => element.setAttribute('disabled', disable));
};
