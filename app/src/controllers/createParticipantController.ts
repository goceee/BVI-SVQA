import fs from 'fs';
import Swal from 'sweetalert2';

import { prepareParticipantForm } from '../Forms/participantForm';
import { lastExperimentNotFoundMessage } from '../utils/alert/alertMessages';

const submitButton = document.getElementById(
  'submitInformation',
) as HTMLButtonElement;

submitButton.onclick = () => {
  if (!fs.existsSync('../../Experiments/Experiment.last')) {
    Swal.fire(lastExperimentNotFoundMessage);
  } else {
    prepareParticipantForm();
  }
};
