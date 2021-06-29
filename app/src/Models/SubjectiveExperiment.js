/* eslint-disable no-undef */
/* eslint-disable lines-between-class-members */
const { delay } = require('../utils/window/presentationWindowUtils');

class SubjectiveExperiment {
  #testName;
  #scoringNumber;
  #scaleType;
  #scaleLabels;
  #scaleNames;
  #startingVideoLabels;
  #ratingLabels;
  #buttons;
  #experimentOrder;
  #pairedPresentation;
  #presentationOrder;
  #shufflePresentationOrder;
  #scoreMetric;
  #scoreType;
  #scoredVideo;

  constructor(experiment, scaleType = 'Continuous') {
    this.#testName = experiment.testName;
    this.#scaleType = scaleType;
    this.#scoringNumber = experiment.scoringNumber;
    this.#scaleLabels = experiment.scaleLabels;
    this.#startingVideoLabels = experiment.startingVideoLabels;
    this.#ratingLabels = experiment.ratingLabels;
    this.#buttons = experiment.buttons;
    this.#experimentOrder = experiment.experimentOrder;
    this.#pairedPresentation = experiment.presentation.paired;
    this.#presentationOrder = experiment.presentation.order;
    this.#shufflePresentationOrder = experiment.presentation.shuffle;
    this.#scoreMetric = experiment.scoreMetric;
    this.#scoreType = experiment.scoreType;
    this.#scoredVideo = experiment.scoredVideo;
    this.#scaleNames = Array.from(
      new Set(
        experiment.experimentOrder
          .filter((element) => element.includes('VOTE'))
          .map((element) => element.split('_')[1]),
      ),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  #resetScoring() {
    document.querySelectorAll('input[type=range]').forEach((element) => {
      element.value = 50;
    });
    document.querySelectorAll('input[type="radio"]').forEach((element) => {
      element.checked = false;
    });
    document.querySelectorAll('.sliderValue').forEach((element) => {
      element.innerText = '';
    });
    document.querySelectorAll('.scaleQuestionContainer').forEach((element) => {
      element.style.display = 'none';
    });
  }

  create() {
    const title = document.createElement('h1');
    const mainContent = document.createElement('div');
    const ratingInputsContainer = document.createElement('div');

    title.innerText = this.#testName;
    document.body.appendChild(title);

    title.id = 'titleText';
    mainContent.id = 'mainContent';
    ratingInputsContainer.id = 'ratingInputsContainer';
    for (let i = 1; i <= this.#scoringNumber; i += 1) {
      const scaleContainer = document.createElement('div');
      scaleContainer.className = `scaleContainer ${this.#scaleNames[i - 1]}`;
      scaleContainer.tabIndex = -1;
      if (this.#scaleType === 'Discrete') {
        mainContent.style.padding = '80px 60px';
        const labels = [...this.#scaleLabels];
        labels.reverse().forEach((element) => {
          const labelText = element[0];
          const labelValue = element[1];
          const label = document.createElement('label');
          const input = document.createElement('input');
          input.type = 'radio';
          input.name = `range_${this.#scaleNames[i - 1]}`;
          input.className = 'button';
          input.value = labelValue;
          const box = document.createElement('div');
          box.className = 'box';
          const span = document.createElement('span');
          span.innerText = labelText;
          box.appendChild(span);
          label.appendChild(input);
          label.appendChild(box);
          scaleContainer.appendChild(label);
        });
      } else {
        const sliderValue = document.createElement('div');
        sliderValue.className = `sliderValue ${this.#scaleNames[i - 1]}`;
        const sliderTextContainer = document.createElement('div');
        sliderTextContainer.className = `ratingsTextContainer ${
          this.#scaleNames[i - 1]
        }`;
        const linesContainer = document.createElement('div');
        linesContainer.className = 'rangeLines';
        this.#scaleLabels.forEach((label) => {
          const textLabel = document.createElement('span');
          textLabel.className = 'scaleText';
          const line = document.createElement('div');
          line.className = 'line';
          // eslint-disable-next-line prefer-destructuring
          textLabel.innerText = label[0];
          sliderTextContainer.appendChild(textLabel);
          linesContainer.appendChild(line);
        });
        const line = document.createElement('div');
        line.className = 'line';
        linesContainer.appendChild(line);
        const slider = document.createElement('div');
        slider.className = 'sliderContainer';
        const inputSliderContainer = document.createElement('div');
        inputSliderContainer.className = 'rangeSlider';
        const inputSlider = document.createElement('input');
        inputSlider.type = 'range';
        inputSlider.name = `range_${this.#scaleNames[i - 1]}`;
        inputSlider.setAttribute('disabled', 'true');
        inputSlider.oninput = (e) => {
          sliderValue.innerText = e.target.value;
        };
        inputSliderContainer.appendChild(inputSlider);
        inputSliderContainer.appendChild(linesContainer);
        slider.appendChild(sliderTextContainer);
        slider.appendChild(inputSliderContainer);

        scaleContainer.appendChild(sliderValue);
        scaleContainer.appendChild(slider);
        if (i % 2 === 0) {
          scaleContainer.classList.add('reverse');
          sliderValue.classList.add('reverse');
          sliderTextContainer.classList.add('reverse');
          inputSliderContainer.classList.add('reverse');
        }
      }
      const scaleQuestionContainer = document.createElement('div');
      scaleQuestionContainer.className = `scaleQuestionContainer ${
        this.#scaleNames[i - 1]
      }`;
      const scaleQuestion = document.createElement('h2');
      scaleQuestion.className = `scaleQuestion ${this.#scaleNames[i - 1]}`;
      scaleQuestion.innerText = this.#ratingLabels[i - 1];
      scaleQuestionContainer.appendChild(scaleQuestion);
      scaleQuestionContainer.appendChild(scaleContainer);
      ratingInputsContainer.appendChild(scaleQuestionContainer);
    }
    mainContent.appendChild(ratingInputsContainer);
    document.body.appendChild(mainContent);
    const buttonsContainer = document.createElement('div');
    buttonsContainer.id = 'buttonsContainer';
    this.#buttons.forEach((buttonText) => {
      const button = document.createElement('button');
      button.innerText = buttonText;
      button.id = buttonText.toLowerCase();
      if (this.#scaleType === 'Continuous')
        document.querySelectorAll('input[type=range]').forEach((input) => {
          input.addEventListener('keyup', (e) => {
            if (buttonText === 'Continue' && e.key === 'Enter') button.click();
            if (buttonText === 'Replay' && e.key === 'Backspace')
              button.click();
          });
        });
      else
        document.querySelectorAll('.scaleContainer').forEach((input) => {
          input.addEventListener('keyup', (e) => {
            if (buttonText === 'Continue' && e.key === 'Enter') button.click();
            if (buttonText === 'Replay' && e.key === 'Backspace')
              button.click();
          });
        });
      buttonsContainer.appendChild(button);
    });
    mainContent.appendChild(buttonsContainer);
    return this;
  }

  showStarting(trial) {
    if (trial)
      document.getElementById('titleText').innerText =
        'Training phase is starting now, get ready!';
    else
      document.getElementById('titleText').innerText =
        'Testing phase is starting now, get ready!';
    return this;
  }

  async *start(current, last, replay = false, presentationPair) {
    if (current === 1 && replay === false) {
      await delay(2);
    }
    if (replay === false) {
      this.#resetScoring();
    }
    if (this.#pairedPresentation) {
      this.showStartingVideoPair(current, last);
      await delay(2);
    }
    let playingVideoNum = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const currentSchedule of this.#experimentOrder) {
      current = this.#pairedPresentation
        ? currentSchedule.split('_')[1]
        : current;
      if (currentSchedule.includes('VOTE')) {
        const rangeName = this.#pairedPresentation
          ? current
          : this.#scaleNames[0];
        current = this.#pairedPresentation ? `.${current}` : '';
        const inputSelector = document.querySelectorAll(
          `input[name=range_${rangeName}]`,
        );
        inputSelector.forEach((element) => {
          element.disabled = false;
        });
        const scaleSelector = document.querySelector(
          `.scaleContainer.${rangeName}`,
        );

        setTimeout(() => {
          if (this.#scaleType === 'Continuous') inputSelector[0].focus();
          else scaleSelector.focus();
        }, 0); // BUG needs setTimeout for focus to work??

        if (this.#scaleType === 'Continuous') {
          document
            .querySelector(`.ratingsTextContainer${current}`)
            .removeAttribute('disabled');
          document
            .querySelector(`.sliderValue${current}`)
            .removeAttribute('disabled');
        }
        document
          .querySelector(`.scaleQuestion${current}`)
          .removeAttribute('disabled');
        document.querySelector(
          `.scaleQuestionContainer${current}`,
        ).style.display = 'flex';
        document.querySelector(`.scaleQuestionContainer`).style.display =
          'flex';
        titleText.style.display = 'none';
        mainContent.style.display = 'flex';
        yield currentSchedule.split('_')[1];
      } else {
        titleText.style.display = '';
        mainContent.style.display = 'none';
        this.showStartingVideo(current, last); // check this was experiment.showStartingVideo(current, last)
        // eslint-disable-next-line no-await-in-loop
        await delay(2);
        yield currentSchedule;
        playingVideoNum += 1;
        playingVideoNum =
          playingVideoNum > presentationPair.length - 1 ? 0 : playingVideoNum;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  stop(reason, trial) {
    let titleText = '';
    if (reason === 'break')
      titleText =
        'Time for a break\r\n Please press continue when ready to start evaluating the remaining videos!';
    else if (reason === 'finish')
      if (trial)
        titleText =
          'End of training, please press continue to proceed to testing!';
      else titleText = 'End of experiment, please press continue to finish!';
    const title = document.getElementById('titleText');
    title.innerText = titleText;
    title.style.display = '';
    document.getElementById('mainContent').style.display = 'flex';
    document.getElementById('ratingInputsContainer').style.display = 'none';
    const replayButton = document.getElementById('replay');
    if (replayButton) replayButton.style.display = 'none';
    document.getElementById('continue').focus();
  }

  showStartingVideoPair(current, last) {
    document.getElementById('titleText').style.display = '';
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('titleText').innerText = `${
      this.#startingVideoLabels[0]
    } ${current} of ${last}`;
  }

  showStartingVideo(current, last) {
    document.getElementById('ratingInputsContainer').style.display = '';
    if (this.#pairedPresentation === false) {
      document.getElementById('titleText').innerText = `${
        this.#startingVideoLabels[0]
      } ${current} of ${last}`;
    } else {
      const message = this.#startingVideoLabels.filter(
        (label) => label.split(' ')[2] === current,
      )[0];
      document.getElementById('titleText').innerText = `${message}`;
    }
  }

  scoredVideoNumber(videoPair) {
    if (this.#scoredVideo === 'Distorted') {
      const videoIndex = videoPair.findIndex(
        (element) => !element.includes('R0'),
      );
      return videoIndex;
    }
    return undefined;
  }

  get startingVideoLabels() {
    return this.#startingVideoLabels;
  }

  get schedule() {
    return [...this.#experimentOrder];
  }

  get isPairedPresentation() {
    return this.#pairedPresentation;
  }

  get presentationOrder() {
    return this.#presentationOrder;
  }

  get scaleNames() {
    return this.#scaleNames;
  }

  get scaleLabelsNumber() {
    return this.#scaleLabels.length;
  }

  get scaleType() {
    return this.#scaleType;
  }

  get scoringData() {
    return { type: this.#scoreType, metric: this.#scoreMetric };
  }

  get shouldShuffle() {
    return this.#shufflePresentationOrder;
  }
}

module.exports = SubjectiveExperiment;
