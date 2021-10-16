const fs = require('fs');

const createAppFolders = () => {
  if (!fs.existsSync('../../Experiments')) {
    fs.mkdirSync('../../Experiments');
  }
  if (!fs.existsSync('../../Experiments/Saved')) {
    fs.mkdirSync('../../Experiments/Saved');
  }
  if (!fs.existsSync('../../converted')) {
    fs.mkdirSync('../../converted');
  }
  if (!fs.existsSync('../../trainingSequences')) {
    fs.mkdirSync('../../trainingSequences');
  }
  //   if (!fs.existsSync('../../GazeData')) {
  //     fs.mkdirSync('../../GazeData');
  //   }
};

export default createAppFolders;
