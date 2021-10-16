const fs = require('fs');
const { default: swal } = require('sweetalert2');
const remote = require('@electron/remote');

const { prepareParticipantForm } = require('../Forms/participantForm');
const {
  lastExperimentNotFoundMessage,
} = require('../utils/alert/alertMessages');

const { app } = remote;
const appPath = app.getAppPath();
document.getElementById('submitInformation').onclick = () => {
  if (!fs.existsSync(`${appPath}/../Experiments/Experiment.last`)) {
    swal.fire(lastExperimentNotFoundMessage);
  } else {
    prepareParticipantForm();
  }
};
