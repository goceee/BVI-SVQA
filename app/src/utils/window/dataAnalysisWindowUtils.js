exports.disableElements = (
  disabled,
  numberOfCodecs = 0,
  selectedMetric = undefined,
) => {
  document.getElementById('exportData').disabled = disabled;
  document.getElementById('plotData').disabled = disabled;
  document.getElementById('videosList').disabled = disabled;
  document.getElementById('confirmPlots').disabled = disabled;
  document.getElementById('compare').disabled = true;
  document.getElementById('browseBitratesField').disabled = disabled;
  document.getElementById('confirmExtractData').disabled = disabled;
  document.querySelector('.customInput').classList.toggle('disabled', disabled);
  document.querySelector('.browseBut').classList.toggle('disabled', disabled);
  document
    .querySelectorAll('.radioButton')
    .forEach((element) => element.classList.toggle('disabled', disabled));
  // eslint-disable-next-line no-unused-expressions
  numberOfCodecs > 1 &&
    selectedMetric !== 'DMOS,VMAF' &&
    (document.getElementById('compare').disabled = false);
};
