/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
const fs = require('fs');
const { default: swal } = require('sweetalert2');
const { app } = require('electron');

const { csvToObject, shuffle } = require('../utils/commonUtils');
const { notSelectedScoreMessage } = require('../utils/alert/alertMessages');
const {
  getNumberOfBreaks,
  createPresentationPair,
  getRatingValue,
  exportScores,
  finishExperiment,
  disableRatingInputs,
} = require('../utils/window/presentationWindowUtils');
const SubjectiveExperiment = require('../Models/SubjectiveExperiment');
const Player = require('../Models/Player');
const Score = require('../Models/Score');
const subjectiveExperiments = require('../staticData/subjectiveExperimentsData');

const appPath = app.getAppPath();
const experimentName = fs.readFileSync(
  `${appPath}/../Experiments/Experiment.last`,
  'utf8',
);
const readConfiguration = fs.readFileSync(
  `${appPath}/../Experiments/${experimentName}/${experimentName}(config).csv`,
  'utf8',
);
const subjectName = fs.readFileSync(
  `${appPath}/../Experiments/${experimentName}/user.last`,
  'utf8',
);
const trial = fs.existsSync(
  `${appPath}/../Experiments/${experimentName}/${subjectName}/${subjectName}.test`,
);
const experimentConfiguration = csvToObject(readConfiguration);
const videoFormat = experimentConfiguration['Video format'].trim();
const presentationMethod =
  experimentConfiguration['Presentation method'].trim();
const scoringMethod = experimentConfiguration['Scoring method'].trim();
const distortedTrainingVideos =
  experimentConfiguration['Distorted Training Videos']?.map((video) =>
    video.split('.')[0].concat(videoFormat),
  ) || [];
const originalTrainingVideos =
  experimentConfiguration['Original Training Videos']?.map((video) =>
    video.split('.')[0].concat(videoFormat),
  ) || [];
const distortedVideos =
  experimentConfiguration['Distorted Videos']?.map((video) =>
    video.split('.')[0].concat(videoFormat),
  ) || [];
const originalVideos =
  experimentConfiguration['Original Videos']?.map((video) =>
    video.split('.')[0].concat(videoFormat),
  ) || [];

const experiment = new SubjectiveExperiment(
  subjectiveExperiments[presentationMethod],
  scoringMethod,
);
const player = new Player('mpv', trial);
const {
  scoringData,
  presentationOrder,
  scaleLabelsNumber,
  isPairedPresentation,
  shouldShuffle,
  scaleType,
  scaleNames,
} = experiment;

const scoringSystem = new Score(scoringData.type, scoringData.metric);
const showingVideosCount = experiment.schedule.filter((video) =>
  video.includes('VIDEO'),
).length;
// eslint-disable-next-line no-nested-ternary
const experimentVideos = trial
  ? isPairedPresentation
    ? shuffle(distortedTrainingVideos)
    : shuffle([...distortedTrainingVideos, ...originalTrainingVideos])
  : isPairedPresentation
  ? shuffle(distortedVideos)
  : shuffle([...distortedVideos, ...originalVideos]);
const originalExperimentVideos = trial
  ? [...originalTrainingVideos]
  : [...originalVideos];
let videoNum = 1;
let presentationPair = [];

if (presentationOrder) {
  presentationPair = createPresentationPair(
    experimentVideos,
    originalExperimentVideos,
    0,
    shouldShuffle,
  );
  if (presentationOrder[0].includes('Distorted') && !shouldShuffle) {
    presentationPair.reverse();
  }
}

const scoredVideoNumber = experiment.scoredVideoNumber(presentationPair);
const numberOfBreaks = getNumberOfBreaks(
  experimentVideos,
  isPairedPresentation ? showingVideosCount : showingVideosCount,
);

experiment.create();
const continueButton = document.getElementById('continue');
const replayButton = document.getElementById('replay');

// Initial Experiment setup
const breakAt = Math.round(experimentVideos.length / (numberOfBreaks + 1));
let breakTime = false;
let ratingInput = scaleNames[0];
let test = {};
let presentationPairNumber = 0;
let score = [];
let finished = false;
let videoToPlay = '';
(async () => {
  try {
    await player.init();
    test = experiment
      .showStarting(trial)
      .start(videoNum, experimentVideos.length, false, presentationPair);
    t = await test.next();
    while (t.value.includes('VIDEO')) {
      if (isPairedPresentation) {
        videoToPlay = presentationPair[presentationPairNumber];
        presentationPairNumber += 1;
        presentationPairNumber =
          presentationPairNumber > 1 ? 0 : presentationPairNumber;
      } else {
        videoToPlay = experimentVideos[videoNum - 1];
      }
      console.log(videoToPlay);
      // await player.play(videoToPlay);
      t = await test.next();
    }
    presentationPairNumber = 0;
  } catch (e) {
    console.log(e);
  }
})();

continueButton.onclick = async () => {
  if (finished) {
    if (trial)
      try {
        fs.unlinkSync(
          `${appPath}/../Experiments/${experimentName}/${subjectName}/${subjectName}.test`,
        );
      } catch (e) {
        console.log(e);
      }
    await finishExperiment(trial, experimentName, subjectName);
    return;
  }
  const scoreValue = getRatingValue(ratingInput, breakTime, scaleType);
  if (!scoreValue) {
    swal.fire(notSelectedScoreMessage);
    return;
  }

  console.log([videoToPlay, scoreValue]);
  if (isPairedPresentation) {
    if (scoredVideoNumber) {
      presentationPairNumber = scoredVideoNumber;
    }
    // score.push([presentationPair[presentationPairNumber], scoreValue]);
    score.push([videoToPlay, scoreValue]);
    presentationPairNumber += 1;
  } else {
    // score.push(experimentVideos[videoNum - 1], scoreValue);
    score.push(videoToPlay, scoreValue);
  }
  disableRatingInputs(ratingInput, true);
  t = await test.next();
  if (t.value) {
    while (t.value.includes('VIDEO')) {
      if (isPairedPresentation) {
        videoToPlay = presentationPair[presentationPairNumber];
        presentationPairNumber += 1;
        presentationPairNumber =
          presentationPairNumber > 1 ? 0 : presentationPairNumber;
      } else {
        videoToPlay = experimentVideos[videoNum - 1];
      }
      console.log(videoToPlay);
      // await player.play(videoToPlay);
      t = await test.next();
    }
  }
  // presentationPairNumber = 0;
  ratingInput = t.value;
  if (t.done === true) {
    if (scoreValue !== 'break') scoringSystem.addScore(score);
    score = [];
    if (videoNum === experimentVideos.length) {
      experiment.stop('finish', trial);
      if (!trial) {
        const data = scoringSystem.finishScoring(
          isPairedPresentation,
          scaleType,
          scaleLabelsNumber,
        );
        exportScores(data, experimentName, subjectName);
      }
      finished = true;
      await player.quit();
      return;
    }
    if (
      videoNum % breakAt === 0 &&
      breakTime === false &&
      videoNum !== experimentVideos.length
    ) {
      breakTime = true;
      experiment.stop('break', trial);
      return;
    }
    breakTime = false;
    if (isPairedPresentation) {
      presentationPairNumber = 0;
      presentationPair = createPresentationPair(
        experimentVideos,
        originalExperimentVideos,
        videoNum,
        shouldShuffle,
      );
    }
    videoNum += 1;
    test = experiment.start(
      videoNum,
      experimentVideos.length,
      false,
      presentationPair,
    );
    t = await test.next();
    while (t.value.includes('VIDEO')) {
      if (isPairedPresentation) {
        videoToPlay = presentationPair[presentationPairNumber];
        presentationPairNumber += 1;
        presentationPairNumber =
          presentationPairNumber > 1 ? 0 : presentationPairNumber;
      } else {
        videoToPlay = experimentVideos[videoNum - 1];
      }
      // await player.play(videoToPlay);
      t = await test.next();
    }
    presentationPairNumber = 0;
    ratingInput = t.value;
  }
};

if (replayButton) {
  replayButton.onclick = async () => {
    test = experiment.start(
      videoNum,
      experimentVideos.length,
      true,
      presentationPair,
    );
    t = await test.next();
    // await player.play(experimentVideos[videoNum - 1]);
    t = await test.next();
  };
}
