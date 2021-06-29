const elements = {
  text: document.querySelector('#text'),
  detail: document.querySelector('#detail'),
  progressBarContainer: document.querySelector('#progressBarContainer'),
  progressBar: null,
};

exports.createProgressBar = (settings, message) => {
  elements.detail.innerHTML = message;
  if (settings.indeterminate) {
    const progressBar = document.createElement('div');
    progressBar.setAttribute('id', 'progressBar');
    progressBar.setAttribute('indeterminate', 't');

    const progressBarValue = document.createElement('div');
    progressBarValue.setAttribute('id', 'progressBarValue');
    progressBar.appendChild(progressBarValue);

    elements.progressBar = progressBar;
    elements.progressBarContainer.appendChild(elements.progressBar);
  } else {
    const progressBar = document.createElement('progress');
    progressBar.setAttribute('id', 'progressBar');
    progressBar.max = settings.maxValue;

    elements.progressBar = progressBar;
    elements.progressBarContainer.appendChild(elements.progressBar);
  }
  elements.text.innerHTML = 'Please wait...';
};

exports.getCurrentProgressValue = () => elements.progressBar.value;

exports.updateProgressBar = (value, message) => {
  elements.detail.innerHTML = message;
  elements.progressBar.value = value;
};
