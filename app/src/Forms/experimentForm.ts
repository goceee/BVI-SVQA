/* eslint-disable no-nested-ternary */
import Swal from 'sweetalert2';
import path from 'path';
import fs from 'fs';
import { defaultAlertOptions } from '../utils/alert/defaultAlertOptions';
import {
  enterExperimentNameMessage,
  experimentNameExistsMessage,
  selectPresentationMethodMessage,
  selectDistortedVideosMessage,
  selectOriginalVideosMessage,
} from '../utils/alert/alertMessages';
import { toCsv } from '../utils/commonUtils';
import { convert } from '../utils/window/createExperimentUtils';

const defaultVideoFormat = '.mov';
const defaultVideoCodec = 'prores_ks';

export const prepareExperimentForm = async () => {
  const experimentName = document.getElementById('experimentName').value;
  const selectedFormat =
    document.querySelector('#fileformat').value || defaultVideoFormat;
  const selectedCodec =
    document.querySelector('#videocodec').value || defaultVideoCodec;
  const selectedPresentationMethod =
    document.querySelector('input[name="presentationMethod"]:checked')?.value ||
    '';
  const selectedScoringType =
    document.querySelector('input[name="scale"]:checked')?.value ||
    'Continuous';
  const objectiveMetricsCheckBox = document.getElementById('objective');
  const distortedVideoFiles = document.getElementById(
    'browseDistortedField',
  ).files;
  const originalVideoFiles = document.getElementById(
    'browseOriginalField',
  ).files;

  const originalVideosPath =
    originalVideoFiles.length > 0
      ? path.dirname(originalVideoFiles[0].path)
      : '';

  const trainingDistortedVideos: string[] = [];
  const trainingOriginalVideos: string[] = [];

  const distortedVideos = Array.from(distortedVideoFiles)
    .map((video) => video.name)
    .filter((name) => {
      if (!name.includes('train')) return true;
      trainingDistortedVideos.push(name);
      return false;
    });

  const originalVideos = Array.from(originalVideoFiles)
    .map((video) => video.name)
    .filter((name) => {
      if (!name.includes('train')) return true;
      trainingOriginalVideos.push(name);
      return false;
    });

  const checkExperimentDataFields =
    experimentName.trim() === ''
      ? Swal.fire(enterExperimentNameMessage)
      : fs.existsSync(`../../Experiments/${experimentName}`)
      ? Swal.fire(experimentNameExistsMessage)
      : selectedPresentationMethod === ''
      ? Swal.fire(selectPresentationMethodMessage)
      : distortedVideos.length === 0
      ? Swal.fire(selectDistortedVideosMessage)
      : (originalVideos.length === 0 &&
          document.querySelector('input[name="presentationMethod"]:checked')
            .value !== 'ACR') ||
        (originalVideos.length === 0 &&
          document.querySelector('input[name="presentationMethod"]:checked')
            .value === 'ACR' &&
          objectiveMetricsCheckBox.checked)
      ? Swal.fire(selectOriginalVideosMessage)
      : true;

  if (checkExperimentDataFields === true) {
    const csvExperimentData = toCsv([
      ['Experiment name: ', experimentName.trim()],
      ['Presentation method: ', selectedPresentationMethod],
      ['Scoring method: ', selectedScoringType],
      ['Distorted Videos: ', distortedVideos],
      ['Distorted Training Videos: ', trainingDistortedVideos],
      ['Original Videos: ', originalVideos],
      [
        'Original Training Videos: ',
        selectedPresentationMethod === 'ACR' && objectiveMetricsCheckBox.checked
          ? 'Not Applicable'
          : trainingOriginalVideos,
      ],
      ['Video format: ', selectedFormat],
      ['Video codec: ', selectedCodec],
    ]);
    const result = await Swal.fire({
      html: `<h3> Selected settings: </h3> <br> Experiment name: ${experimentName} <br> Presentation method: ${selectedPresentationMethod} <br> Scoring type: ${selectedScoringType} <br> Format: ${selectedFormat}<br> Codec: ${selectedCodec}`,
      icon: 'info',
      ...defaultAlertOptions,
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      convert(
        experimentName,
        path.dirname(distortedVideoFiles[0].path),
        originalVideosPath,
        [...distortedVideos, ...trainingDistortedVideos],
        [...originalVideos, ...trainingOriginalVideos],
        selectedCodec,
        selectedFormat,
        objectiveMetricsCheckBox.checked,
      );
      fs.mkdirSync(`../../Experiments/${experimentName}`);
      fs.writeFileSync(
        `../../Experiments/${experimentName}/${experimentName}(config).csv`,
        csvExperimentData,
        'utf8',
      );
    }
  }
};
