const { defaultAlertOptions } = require('./defaultAlertOptions');

exports.notSelectedScoreMessage = {
  text: 'You have not selected a score, please select one to continue!',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.lastExperimentNotFoundMessage = {
  text: 'Cannot find last experiment, please restart the program and try again',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.lowDiskSpaceMessage = {
  title: 'You are running out of disk space!',
  icon: 'warning',
  ...defaultAlertOptions,
};

exports.videoSettingsMessage = {
  title: 'Are you sure?',
  text: 'Previous settings will go to default!',
  icon: 'warning',
  ...defaultAlertOptions,
  showCancelButton: true,
  cancelButtonText: 'No',
  confirmButtonText: 'Yes',
};

exports.settingsConfirmMessage = {
  text: 'Settings confirmed',
  icon: 'success',
  ...defaultAlertOptions,
};

exports.selectCodecMessage = {
  text: 'Please select codec',
  icon: 'info',
  ...defaultAlertOptions,
};

exports.selectFormatMessage = {
  text: 'Please select format',
  icon: 'info',
  ...defaultAlertOptions,
};

exports.pleaseWaitMessage = {
  title: 'Please wait until the process has finished',
  icon: 'info',
  ...defaultAlertOptions,
};

exports.videoFormatMessage = {
  text: 'Please use raw video format yuv',
  icon: 'warning',
  ...defaultAlertOptions,
};

exports.missplacedDistortedVideoMessage = {
  text: 'You have an distorted video in the original section, please select accordingly',
  icon: 'warning',
  ...defaultAlertOptions,
};

exports.missplacedOriginalVideoMessage = {
  text: 'You have an original video in the distorted section, please select accordingly',
  icon: 'warning',
  ...defaultAlertOptions,
};

exports.originalFilenameInstructionsMessage = {
  html: '<h4>Please have your files prepared in the following way:</h4> <small>filename_resolution_fps_bitdepth_chroma_frames_ratepoint(0=original).yuv</small> <br> <small>(e.g.)S11AirAcrobatic_1920x1080_60fps_10bit_420_300_R0.yuv</small>',
  icon: 'info',
  ...defaultAlertOptions,
};

exports.distortedFilenameInstructionsMessage = {
  html: '<h4>Please have your files prepared in the following way:</h4> <small>filename_resolution_fps_bitdepth_chroma_frames_ratepoint(>0=distorted)_ratio_codec.yuv</small> <br><small>(e.g.)S11AirAcrobatic_1920x1080_60fps_10bit_420_300_R2_ratio1.5_AV1.yuv</small>',
  icon: 'info',
  ...defaultAlertOptions,
};

/* createExpeirmentUtils Messages */

exports.trainingVideosMismatchMessage = {
  text: 'Training videos mismatch. Please select accordingly',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.regularVideosMismatchMessage = {
  text: 'Regular videos mismatch. Please select accordingly',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.conversionCompleteMessage = {
  title: 'Conversion complete',
  icon: 'success',
  ...defaultAlertOptions,
};

exports.objectiveMetricsCompleteMessage = {
  title: 'All done',
  icon: 'success',
  ...defaultAlertOptions,
};

/* participantForm Messages */
exports.enterNameMessage = {
  text: 'Please enter your name',
  icon: 'info',
  ...defaultAlertOptions,
};

exports.nameExistsMessage = {
  text: 'Name exists, please choose a different one',
  icon: 'warning',
  ...defaultAlertOptions,
};

exports.enterAgeMessage = {
  text: 'Please enter your age',
  icon: 'info',
  ...defaultAlertOptions,
};

exports.selectGenderMessage = {
  text: 'Please select gender',
  icon: 'info',
  ...defaultAlertOptions,
};

exports.askForTrialMessage = {
  text: 'Tell us whether a trial run is needed',
  icon: 'info',
  ...defaultAlertOptions,
};

exports.askIfExpertMessage = {
  text: 'Tell us whether you are an expert',
  icon: 'info',
  ...defaultAlertOptions,
};

exports.startTrainingMessage = {
  title: 'Starting training, get ready',
  icon: 'success',
  ...defaultAlertOptions,
};

exports.infoSavedMessage = {
  title: 'Info saved, get ready',
  icon: 'success',
  ...defaultAlertOptions,
};

/* selectConfigurationController Messages */

exports.experimentsFolderMissingMessage = {
  text: 'Experiments folder is missing, please restart the program and create an experiment configuration',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.experimentConfigMissingMessage = {
  text: 'Please create an experiment configuration to proceed',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.experimentNameMissingMessage = {
  text: 'Experiment name missing, create a new or use a different saved configuration',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.convertedFilesMissingMessage = {
  text: 'Converted files are missing, please create a new experiment to add the necessary files',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.convertedTrainingFilesMissingMessage = {
  text: 'Converted training files are missing, please create a new experiment to add the necessary files',
  icon: 'error',
  ...defaultAlertOptions,
};

/* experimentForm Messages */

exports.enterExperimentNameMessage = {
  text: 'Please enter experiment name',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.experimentNameExistsMessage = {
  text: 'Experiment name exists, please choose a different one',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.selectPresentationMethodMessage = {
  text: 'Please select a presentation method',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.selectDistortedVideosMessage = {
  text: 'Please select distorted videos!',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.selectOriginalVideosMessage = {
  text: 'Please select original videos!',
  icon: 'error',
  ...defaultAlertOptions,
};

/* dataAnalysisController Messages */

exports.exportSuccessMessage = {
  text: 'Data sucessfully exported to experiment folder',
  icon: 'success',
  ...defaultAlertOptions,
};

exports.noOutliersMessage = {
  text: 'No outliers detected',
  icon: 'info',
  ...defaultAlertOptions,
};

exports.noVideoSelectedMessage = {
  text: 'No video selected',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.missingRatesMessage = {
  text: 'Bitrates datafile or quantisation parameter missing',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.missingBitratesFileMessage = {
  text: 'bitrates.csv file not be found',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.codecDataMismatchMessage = {
  text: 'Metric data mismatch, please ensure all codecs have the same number of videos with objective/subjective data',
  icon: 'error',
  ...defaultAlertOptions,
};

exports.metricDataMismatchMessage = (videoName) => ({
  text: `Metric data mismatch, please ensure both metrics have the same number of objective/subjective data for ${videoName}`,
  icon: 'error',
  ...defaultAlertOptions,
});

exports.metricsMessage = (type, videoName, error) => ({
  text:
    error === 'missing'
      ? `${type} metrics data for ${videoName} are missing`
      : `Cannot read ${type} metrics data for ${videoName}`,
  icon: 'error',
  ...defaultAlertOptions,
});

exports.bitRatesErrorMessage = (videoName) => ({
  text: `Bitrates for ${videoName} could not be found or data mismatch, please ensure the filenames are correct and bitrates and metric data are equal in length!`,
  icon: 'error',
  ...defaultAlertOptions,
});

exports.notEnoughForComparisonMessage = (videoName, length) => ({
  text: `Subjective metrics data for ${videoName} are of length ${length} and not enough for comparison`,
  icon: 'error',
  ...defaultAlertOptions,
});

exports.errorMessage = (error) => ({
  text: error,
  icon: 'error',
  ...defaultAlertOptions,
});

/* PresentationWindow */
exports.finishTrainingMessage = {
  title:
    'Well done, you finished with the training. Are you ready for the testing phase?',
  text: 'If you click cancel your personal information will be deleted!',
  icon: 'info',
  ...defaultAlertOptions,
  showCancelButton: true,
  confirmButtonText: 'Start',
};

exports.startTestingPhaseMessage = {
  title: 'Starting the testing phase, get ready',
  icon: 'info',
  ...defaultAlertOptions,
};

// PythonShell errors
exports.pythonErrorMessage = (message) => ({
  text: message,
  icon: 'error',
  ...defaultAlertOptions,
});
