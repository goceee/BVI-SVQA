const { spawnSync } = require('child_process');
const { ffplayData } = require('../staticData/playersData');

class FFplay {
  #opts;
  #playerPath;
  constructor(opts = ['-autoexit', '-fs']) {
    this.#opts = opts;
    this.#playerPath = ffplayData.path;
  }

  // eslint-disable-next-line class-methods-use-this
  start() {}

  load(file) {
    spawnSync(this.#playerPath, [file, ...this.#opts], {
      stdio: 'ignore',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  quit() {}
}

module.exports = FFplay;
