/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { app } = require('electron');
// CHECK THIS FOR DIFFERENT EXPERIMENTS AND MORE CONVERTED FILES!!!
const { csvToObject } = require('../commonUtils');
const appPath = app.getAppPath();

exports.checkConvertedFiles = (experimentName) => {
  const test = { regular: false, training: false };
  const convertedVideos = fs.readdirSync(`${appPath}/../converted/`).sort();
  const convertedTrainingVideos = fs
    .readdirSync(`${appPath}/../trainingSequences/`)
    .sort();

  const readExperimentConfigData = fs.readFileSync(
    `${appPath}/../Experiments/${experimentName}/${experimentName}(config).csv`,
    'utf8',
  );
  const data = csvToObject(readExperimentConfigData);
  const configVideos = [
    ...data['Original Videos'],
    ...data['Distorted Videos'],
  ].sort();

  const configTrainingVideos = [
    ...data['Original Training Videos'],
    ...data['Distorted Training Videos'],
  ].sort();

  for (const configVideo of configVideos) {
    for (const convertedVideo of convertedVideos) {
      if (convertedVideo.split('.')[0] === configVideo.split('.')[0]) {
        test.regular = true;
        break;
      } else test.regular = false;
    }
    if (test.regular !== true) break;
  }

  for (const configTrainingVideo of configTrainingVideos) {
    for (const convertedTrainingVideo of convertedTrainingVideos) {
      if (
        convertedTrainingVideo.split('.')[0] ===
        configTrainingVideo.split('.')[0]
      ) {
        test.training = true;
        break;
      } else test.training = false;
    }
    if (test.training !== true) break;
  }

  return test;
};
