interface ProgressBarElements {
  text: HTMLDivElement | null;
  detail: HTMLDivElement | null;
  progressBarContainer: HTMLDivElement | null;
  progressBar: HTMLProgressElement | HTMLDivElement | null;
}

interface Settings {
  indeterminate: boolean;
  maxValue?: number;
}
const elements: ProgressBarElements = {
  text: document.querySelector('#text'),
  detail: document.querySelector('#detail'),
  progressBarContainer: document.querySelector('#progressBarContainer'),
  progressBar: null,
};

export const createProgressBar = (settings: Settings, message: string) => {
  if (elements.detail) {
    elements.detail.innerHTML = message;
  }
  if (settings.indeterminate) {
    const progressBar = document.createElement('div');
    progressBar.setAttribute('id', 'progressBar');
    progressBar.setAttribute('indeterminate', 't');

    const progressBarValue = document.createElement('div');
    progressBarValue.setAttribute('id', 'progressBarValue');
    progressBar.appendChild(progressBarValue);

    elements.progressBar = progressBar;
    if (elements.progressBarContainer) {
      elements.progressBarContainer.appendChild(elements.progressBar);
    }
  } else {
    const progressBar = document.createElement('progress');
    progressBar.setAttribute('id', 'progressBar');
    progressBar.max = settings.maxValue;
    elements.progressBar = progressBar;
    if (elements.progressBarContainer) {
      elements.progressBarContainer.appendChild(elements.progressBar);
    }
  }
  if (elements.text) {
    elements.text.innerHTML = 'Please wait...';
  }
};

export const getCurrentProgressValue = () =>
  elements.progressBar && elements.progressBar.value;

export const updateProgressBar = (value: number, message: string) => {
  if (elements.detail && elements.progressBar) {
    elements.detail.innerHTML = message;
    elements.progressBar.value = value;
  }
};
