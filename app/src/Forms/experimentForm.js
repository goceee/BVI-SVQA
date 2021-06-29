/* eslint-disable no-nested-ternary */
const { default: swal } = require('sweetalert2');
const path = require('path');
const fs = require('fs');

const defaultVideoFormat = '.mov';
const defaultVideoCodec = 'prores_ks';

const { defaultAlertOptions } = require('../utils/alert/defaultAlertOptions');
const {
  enterExperimentNameMessage,
  experimentNameExistsMessage,
  selectPresentationMethodMessage,
  selectDistortedVideosMessage,
  selectOriginalVideosMessage,
} = require('../utils/alert/alertMessages');
const { toCsv } = require('../utils/commonUtils');
const { convert } = require('../utils/window/createExperimentUtils');

exports.prepareExperimentForm = async () => {
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

  const trainingDistortedVideos = [];
  const distortedVideos = Array.from(distortedVideoFiles)
    .map((video) => video.name)
    .filter((name) => {
      if (!name.includes('train')) return true;
      trainingDistortedVideos.push(name);
      return false;
    });

  const trainingOriginalVideos = [];
  const originalVideos = Array.from(originalVideoFiles)
    .map((video) => video.name)
    .filter((name) => {
      if (!name.includes('train')) return true;
      trainingOriginalVideos.push(name);
      return false;
    });

  const checkExperimentDataFields =
    experimentName.trim() === ''
      ? swal.fire(enterExperimentNameMessage)
      : fs.existsSync(`../../Experiments/${experimentName}`)
      ? swal.fire(experimentNameExistsMessage)
      : selectedPresentationMethod === ''
      ? swal.fire(selectPresentationMethodMessage)
      : distortedVideos.length === 0
      ? swal.fire(selectDistortedVideosMessage)
      : (originalVideos.length === 0 &&
          document.querySelector('input[name="presentationMethod"]:checked')
            .value !== 'ACR') ||
        (originalVideos.length === 0 &&
          document.querySelector('input[name="presentationMethod"]:checked')
            .value === 'ACR' &&
          objectiveMetricsCheckBox.checked)
      ? swal.fire(selectOriginalVideosMessage)
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
    const result = await swal.fire({
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
