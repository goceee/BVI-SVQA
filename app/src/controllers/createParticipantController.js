const fs = require('fs');
const { default: swal } = require('sweetalert2');
const { app } = require('electron');

const { prepareParticipantForm } = require('../Forms/participantForm');
const {
  lastExperimentNotFoundMessage,
} = require('../utils/alert/alertMessages');

const appPath = app.getAppPath();
document.getElementById('submitInformation').onclick = () => {
  if (!fs.existsSync(`${appPath}/../Experiments/Experiment.last`)) {
    swal.fire(lastExperimentNotFoundMessage);
  } else {
    prepareParticipantForm();
  }
};
