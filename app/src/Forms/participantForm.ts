import fs from 'fs';
import Swal from 'sweetalert2';
import remote from '@electron/remote';

const openWindow = remote.require('./controllers/windowController');
import { addTitleBarFunctionality } from '../utils/commonUtils';
import {
  enterNameMessage,
  nameExistsMessage,
  enterAgeMessage,
  selectGenderMessage,
  askForTrialMessage,
  askIfExpertMessage,
  startTrainingMessage,
  infoSavedMessage,
  errorMessage,
} from '../utils/alert/alertMessages';
import { toCsv, csvToObject } from '../utils/commonUtils';

const currentWindow = remote.getCurrentWindow();
addTitleBarFunctionality();

export const prepareParticipantForm = () => {
  const experimentName = fs.readFileSync(
    '../../Experiments/Experiment.last',
    'utf8',
  );
  const userName = document.getElementById('participantName').value.trim();
  const userAge = document.getElementById('participantAge').value.trim();
  const userGender = document.getElementById('genderSelect').value;
  const userFirstTime = document.getElementById('firstTimeSelect').value;
  const userExpert = document.getElementById('expertSelect').value;
  if (userName === '') {
    Swal.fire(enterNameMessage);
  } else if (fs.existsSync(`../../Experiments/${experimentName}/${userName}`)) {
    Swal.fire(nameExistsMessage);
  } else if (userAge === '') {
    Swal.fire(enterAgeMessage);
  } else if (userGender === '') {
    Swal.fire(selectGenderMessage);
  } else if (userFirstTime === '') {
    Swal.fire(askForTrialMessage);
  } else if (userExpert === '') {
    Swal.fire(askIfExpertMessage);
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
      fs.mkdirSync(`../../Experiments/${experimentName}/${userName}`);
      fs.writeFileSync(
        `../../Experiments/${experimentName}/${userName}/${userName}(info).csv`,
        csvData,
        'utf8',
      );
      fs.writeFileSync(
        `../../Experiments/${experimentName}/user.last`,
        userName,
        'utf8',
      );
      const experimentConfiguration = csvToObject(
        fs.readFileSync(
          `../../Experiments/${experimentName}/${experimentName}(config).csv`,
          'utf8',
        ),
      );

      if (userFirstTime === 'Yes') {
        fs.writeFileSync(
          `../../Experiments/${experimentName}/${userName}/${userName}.test`,
          'Trial',
          'utf8',
        );
        Swal.fire({
          ...startTrainingMessage,
          willClose: () => {
            openWindow.presWindow(
              experimentConfiguration['Presentation method'],
            );
            currentWindow.close();
          },
        });
      } else {
        Swal.fire({
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
      Swal.fire(errorMessage(error as string));
    }
  }
};

// THIS SHOULD GO IN THE FUNCTION????
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
