const fs = require('fs');
const { app } = require('electron');

const appPath = app.getAppPath();

module.exports = () => {
  if (!fs.existsSync(`${appPath}/../Experiments`)) {
    fs.mkdirSync(`${appPath}/../Experiments`);
  }
  if (!fs.existsSync(`${appPath}/../Experiments/Saved`)) {
    fs.mkdirSync(`${appPath}/../Experiments/Saved`);
  }
  if (!fs.existsSync(`${appPath}/../converted`)) {
    fs.mkdirSync(`${appPath}/../converted`);
  }
  if (!fs.existsSync(`${appPath}/../trainingSequences`)) {
    fs.mkdirSync(`${appPath}/../trainingSequences`);
  }
  //   if (!fs.existsSync('../../GazeData')) {
  //     fs.mkdirSync('../../GazeData');
  //   }
};
