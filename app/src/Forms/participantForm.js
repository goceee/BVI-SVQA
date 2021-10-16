const fs = require('fs');
const { default: swal } = require('sweetalert2');
const remote = require('@electron/remote');

const openWindow = remote.require('./controllers/windowController');
const { addTitleBarFunctionality } = require('../utils/commonUtils');
const {
  enterNameMessage,
  nameExistsMessage,
  enterAgeMessage,
  selectGenderMessage,
  askForTrialMessage,
  askIfExpertMessage,
  startTrainingMessage,
  infoSavedMessage,
  errorMessage,
} = require('../utils/alert/alertMessages');
const { toCsv, csvToObject } = require('../utils/commonUtils');

const { app } = remote;
const appPath = app.getAppPath();
const currentWindow = remote.getCurrentWindow();
addTitleBarFunctionality();

exports.prepareParticipantForm = () => {
  const experimentName = fs.readFileSync(
    `${appPath}/../Experiments/Experiment.last`,
    'utf8',
  );
  const userName = document.getElementById('participantName').value.trim();
  const userAge = document.getElementById('participantAge').value.trim();
  const userGender = document.getElementById('genderSelect').value;
  const userFirstTime = document.getElementById('firstTimeSelect').value;
  const userExpert = document.getElementById('expertSelect').value;
  if (userName === '') {
    swal.fire(enterNameMessage);
  } else if (
    fs.existsSync(`${appPath}/../Experiments/${experimentName}/${userName}`)
  ) {
    swal.fire(nameExistsMessage);
  } else if (userAge === '') {
    swal.fire(enterAgeMessage);
  } else if (userGender === '') {
    swal.fire(selectGenderMessage);
  } else if (userFirstTime === '') {
    swal.fire(askForTrialMessage);
  } else if (userExpert === '') {
    swal.fire(askIfExpertMessage);
  } else {
    const subjectInfo = [
      ['Experiment name: ', experimentName],
      ['Name: ', userName],
      ['Age: ', userAge],
      ['Gender: ', userGender],
      ['Trial: ', userFirstTime],
      ['Expert: ', userExpert],
    ];
    const csvData = toCsv(subjectInfo);
    try {
      fs.mkdirSync(`${appPath}/../Experiments/${experimentName}/${userName}`);
      fs.writeFileSync(
        `${appPath}/../Experiments/${experimentName}/${userName}/${userName}(info).csv`,
        csvData,
        'utf8',
      );
      fs.writeFileSync(
        `${appPath}/../Experiments/${experimentName}/user.last`,
        userName,
        'utf8',
      );
      const experimentConfiguration = csvToObject(
        fs.readFileSync(
          `${appPath}/../Experiments/${experimentName}/${experimentName}(config).csv`,
          'utf8',
        ),
      );

      if (userFirstTime === 'Yes') {
        fs.writeFileSync(
          `${appPath}/../Experiments/${experimentName}/${userName}/${userName}.test`,
          'Trial',
          'utf8',
        );
        swal.fire({
          ...startTrainingMessage,
          willClose: () => {
            openWindow.presWindow(
              experimentConfiguration['Presentation method'],
            );
            currentWindow.close();
          },
        });
      } else {
        swal.fire({
          ...infoSavedMessage,
          willClose: () => {
            openWindow.presWindow(
              experimentConfiguration['Presentation method'],
            );
            currentWindow.close();
          },
        });
      }
    } catch (error) {
      console.log(error);
      swal.fire(errorMessage(error));
    }
  }
};

/* Only number chars allowed in Age Form */
// eslint-disable-next-line consistent-return
document.getElementById('participantAge').onkeydown = (e) => {
  if (
    e.key === '-' ||
    e.key === '=' ||
    e.key === '+' ||
    e.key === '.' ||
    e.key === 'e'
  ) {
    return false;
  }
};
