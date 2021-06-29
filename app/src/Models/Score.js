/* eslint-disable lines-between-class-members */
/* eslint-disable no-bitwise */
const { comparator } = require('../utils/commonUtils');

class Score {
  #type;
  #metric;
  #score;

  constructor(type, metric) {
    this.#type = type;
    this.#metric = metric;
    this.#score = [];
  }

  addScore(score) {
    // console.log(score);
    this.#score.push(score);
  }

  // TODO saveScore() method, that saves during breaks.

  finishScoring(paired, scaleType, scaleLabelsNumber) {
    let unsortedScore = [];
    let sortedScore = [];
    const finalScore = [];
    const maximumNumber = scaleType === 'Discrete' ? scaleLabelsNumber : 100;
    const dmosTitle = [
      'Original video',
      'Score',
      'Distorted Video',
      'Score',
      'Differential score',
    ];
    const mosTitle = ['Video name', 'Score'];
    console.log(this.#score);
    if (this.#metric === 'number' && this.#type === 'DMOS') {
      this.#score.forEach((score) => {
        if (paired) {
          const originalVideoIndex = score.findIndex((element) =>
            element[0].includes('R0'),
          );
          finalScore.push([
            score[originalVideoIndex][0],
            score[originalVideoIndex][1],
            score[~~!originalVideoIndex][0],
            score[~~!originalVideoIndex][1],
            score[~~!originalVideoIndex][1] -
              score[originalVideoIndex][1] +
              maximumNumber,
          ]);
        } else {
          const originalVideoIndex = this.#score.findIndex(
            (element) =>
              element[0].split('_')[0] === score[0].split('_')[0] &&
              element[0].includes('R0'),
          );
          if (!score[0].includes('R0'))
            finalScore.push([
              this.#score[originalVideoIndex][0],
              this.#score[originalVideoIndex][1],
              ...score,
              this.#score[originalVideoIndex][1] - score[1] + maximumNumber,
            ]);
        }
      });
      const presentationalScore = paired ? [...finalScore] : [...this.#score];
      unsortedScore = [
        paired ? [...dmosTitle] : [...mosTitle],
        ...presentationalScore,
      ];
      sortedScore = [[...dmosTitle], ...finalScore.sort(comparator)];
    } else {
      unsortedScore = [[...mosTitle], ...this.#score];
      sortedScore = [[...mosTitle], ...this.#score.sort()];
    }
    return {
      unsortedScore,
      sortedScore,
    };
  }
}

module.exports = Score;
