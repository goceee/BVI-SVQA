import { SweetAlertOptions } from 'sweetalert2';
import { defaultAlertOptions } from './defaultAlertOptions';

export const notSelectedScoreMessage: SweetAlertOptions = {
  text: 'You have not selected a score, please select one to continue!',
  icon: 'error',
  ...defaultAlertOptions,
};

export const lastExperimentNotFoundMessage: SweetAlertOptions = {
  text: 'Cannot find last experiment, please restart the program and try again',
  icon: 'error',
  ...defaultAlertOptions,
};

export const lowDiskSpaceMessage: SweetAlertOptions = {
  title: 'You are running out of disk space!',
  icon: 'warning',
  ...defaultAlertOptions,
};

export const videoSettingsMessage: SweetAlertOptions = {
  title: 'Are you sure?',
  text: 'Previous settings will go to default!',
  icon: 'warning',
  ...defaultAlertOptions,
  showCancelButton: true,
  cancelButtonText: 'No',
  confirmButtonText: 'Yes',
};

export const settingsConfirmMessage: SweetAlertOptions = {
  text: 'Settings confirmed',
  icon: 'success',
  ...defaultAlertOptions,
};

export const selectCodecMessage: SweetAlertOptions = {
  text: 'Please select codec',
  icon: 'info',
  ...defaultAlertOptions,
};

export const selectFormatMessage: SweetAlertOptions = {
  text: 'Please select format',
  icon: 'info',
  ...defaultAlertOptions,
};

export const pleaseWaitMessage: SweetAlertOptions = {
  title: 'Please wait until the process has finished',
  icon: 'info',
  ...defaultAlertOptions,
};

export const videoFormatMessage: SweetAlertOptions = {
  text: 'Please use raw video format yuv',
  icon: 'warning',
  ...defaultAlertOptions,
};

export const missplacedDistortedVideoMessage: SweetAlertOptions = {
  text: 'You have an distorted video in the original section, please select accordingly',
  icon: 'warning',
  ...defaultAlertOptions,
};

export const missplacedOriginalVideoMessage: SweetAlertOptions = {
  text: 'You have an original video in the distorted section, please select accordingly',
  icon: 'warning',
  ...defaultAlertOptions,
};

export const originalFilenameInstructionsMessage: SweetAlertOptions = {
  html: '<h4>Please have your files prepared in the following way:</h4> <small>filename_resolution_fps_bitdepth_chroma_frames_ratepoint(0=original).yuv</small> <br> <small>(e.g.)S11AirAcrobatic_1920x1080_60fps_10bit_420_300_R0.yuv</small>',
  icon: 'info',
  ...defaultAlertOptions,
};

export const distortedFilenameInstructionsMessage: SweetAlertOptions = {
  html: '<h4>Please have your files prepared in the following way:</h4> <small>filename_resolution_fps_bitdepth_chroma_frames_ratepoint(>0=distorted)_ratio_codec.yuv</small> <br><small>(e.g.)S11AirAcrobatic_1920x1080_60fps_10bit_420_300_R2_ratio1.5_AV1.yuv</small>',
  icon: 'info',
  ...defaultAlertOptions,
};

/* createExpeirmentUtils Messages */

export const trainingVideosMismatchMessage: SweetAlertOptions = {
  text: 'Training videos mismatch. Please select accordingly',
  icon: 'error',
  ...defaultAlertOptions,
};

export const regularVideosMismatchMessage: SweetAlertOptions = {
  text: 'Regular videos mismatch. Please select accordingly',
  icon: 'error',
  ...defaultAlertOptions,
};

export const conversionCompleteMessage: SweetAlertOptions = {
  title: 'Conversion complete',
  icon: 'success',
  ...defaultAlertOptions,
};

export const objectiveMetricsCompleteMessage: SweetAlertOptions = {
  title: 'All done',
  icon: 'success',
  ...defaultAlertOptions,
};

/* participantForm Messages */
export const enterNameMessage: SweetAlertOptions = {
  text: 'Please enter your name',
  icon: 'info',
  ...defaultAlertOptions,
};

export const nameExistsMessage: SweetAlertOptions = {
  text: 'Name exists, please choose a different one',
  icon: 'warning',
  ...defaultAlertOptions,
};

export const enterAgeMessage: SweetAlertOptions = {
  text: 'Please enter your age',
  icon: 'info',
  ...defaultAlertOptions,
};

export const selectGenderMessage: SweetAlertOptions = {
  text: 'Please select gender',
  icon: 'info',
  ...defaultAlertOptions,
};

export const askForTrialMessage: SweetAlertOptions = {
  text: 'Tell us whether a trial run is needed',
  icon: 'info',
  ...defaultAlertOptions,
};

export const askIfExpertMessage: SweetAlertOptions = {
  text: 'Tell us whether you are an expert',
  icon: 'info',
  ...defaultAlertOptions,
};

export const startTrainingMessage: SweetAlertOptions = {
  title: 'Starting training, get ready',
  icon: 'success',
  ...defaultAlertOptions,
};

export const infoSavedMessage: SweetAlertOptions = {
  title: 'Info saved, get ready',
  icon: 'success',
  ...defaultAlertOptions,
};

/* selectConfigurationController Messages */

export const experimentsFolderMissingMessage: SweetAlertOptions = {
  text: 'Experiments folder is missing, please restart the program and create an experiment configuration',
  icon: 'error',
  ...defaultAlertOptions,
};

export const experimentConfigMissingMessage: SweetAlertOptions = {
  text: 'Please create an experiment configuration to proceed',
  icon: 'error',
  ...defaultAlertOptions,
};

export const experimentNameMissingMessage: SweetAlertOptions = {
  text: 'Experiment name missing, create a new or use a different saved configuration',
  icon: 'error',
  ...defaultAlertOptions,
};

export const convertedFilesMissingMessage: SweetAlertOptions = {
  text: 'Converted files are missing, please create a new experiment to add the necessary files',
  icon: 'error',
  ...defaultAlertOptions,
};

export const convertedTrainingFilesMissingMessage: SweetAlertOptions = {
  text: 'Converted training files are missing, please create a new experiment to add the necessary files',
  icon: 'error',
  ...defaultAlertOptions,
};

/* experimentForm Messages */

export const enterExperimentNameMessage: SweetAlertOptions = {
  text: 'Please enter experiment name',
  icon: 'error',
  ...defaultAlertOptions,
};

export const experimentNameExistsMessage: SweetAlertOptions = {
  text: 'Experiment name exists, please choose a different one',
  icon: 'error',
  ...defaultAlertOptions,
};

export const selectPresentationMethodMessage: SweetAlertOptions = {
  text: 'Please select a presentation method',
  icon: 'error',
  ...defaultAlertOptions,
};

export const selectDistortedVideosMessage: SweetAlertOptions = {
  text: 'Please select distorted videos!',
  icon: 'error',
  ...defaultAlertOptions,
};

export const selectOriginalVideosMessage: SweetAlertOptions = {
  text: 'Please select original videos!',
  icon: 'error',
  ...defaultAlertOptions,
};

/* dataAnalysisController Messages */

export const exportSuccessMessage: SweetAlertOptions = {
  text: 'Data sucessfully exported to experiment folder',
  icon: 'success',
  ...defaultAlertOptions,
};

export const noOutliersMessage: SweetAlertOptions = {
  text: 'No outliers detected',
  icon: 'info',
  ...defaultAlertOptions,
};

export const noVideoSelectedMessage: SweetAlertOptions = {
  text: 'No video selected',
  icon: 'error',
  ...defaultAlertOptions,
};

export const missingRatesMessage: SweetAlertOptions = {
  text: 'Bitrates datafile or quantisation parameter missing',
  icon: 'error',
  ...defaultAlertOptions,
};

export const missingBitratesFileMessage: SweetAlertOptions = {
  text: 'bitrates.csv file not be found',
  icon: 'error',
  ...defaultAlertOptions,
};

export const codecDataMismatchMessage: SweetAlertOptions = {
  text: 'Metric data mismatch, please ensure all codecs have the same number of videos with objective/subjective data',
  icon: 'error',
  ...defaultAlertOptions,
};

export const metricDataMismatchMessage = (
  videoName: string,
): SweetAlertOptions => ({
  text: `Metric data mismatch, please ensure both metrics have the same number of objective/subjective data for ${videoName}`,
  icon: 'error',
  ...defaultAlertOptions,
});

export const metricsMessage = (
  type: string,
  videoName: string,
  error: string,
): SweetAlertOptions => ({
  text:
    error === 'missing'
      ? `${type} metrics data for ${videoName} are missing`
      : `Cannot read ${type} metrics data for ${videoName}`,
  icon: 'error',
  ...defaultAlertOptions,
});

export const bitRatesErrorMessage = (videoName: string): SweetAlertOptions => ({
  text: `Bitrates for ${videoName} could not be found or data mismatch, please ensure the filenames are correct and bitrates and metric data are equal in length!`,
  icon: 'error',
  ...defaultAlertOptions,
});

export const notEnoughForComparisonMessage = (
  videoName: string,
  length: number,
): SweetAlertOptions => ({
  text: `Subjective metrics data for ${videoName} are of length ${length} and not enough for comparison`,
  icon: 'error',
  ...defaultAlertOptions,
});

export const errorMessage = (error: Error): SweetAlertOptions => ({
  text: error.message,
  icon: 'error',
  ...defaultAlertOptions,
});

/* PresentationWindow */
export const finishTrainingMessage: SweetAlertOptions = {
  title:
    'Well done, you finished with the training. Are you ready for the testing phase?',
  text: 'If you click cancel your personal information will be deleted!',
  icon: 'info',
  ...defaultAlertOptions,
  showCancelButton: true,
  confirmButtonText: 'Start',
};

export const startTestingPhaseMessage: SweetAlertOptions = {
  title: 'Starting the testing phase, get ready',
  icon: 'info',
  ...defaultAlertOptions,
};

// PythonShell errors
export const pythonErrorMessage = (message: string): SweetAlertOptions => ({
  text: message,
  icon: 'error',
  ...defaultAlertOptions,
});
