const fs = require('fs');
const { default: swal } = require('sweetalert2');

const { prepareParticipantForm } = require('../Forms/participantForm');
const {
  lastExperimentNotFoundMessage,
} = require('../utils/alert/alertMessages');

document.getElementById('submitInformation').onclick = () => {
  if (!fs.existsSync('../../Experiments/Experiment.last')) {
    swal.fire(lastExperimentNotFoundMessage);
  } else {
    prepareParticipantForm();
  }
};
