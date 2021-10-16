import { spawnSync } from 'child_process';
import { ffplayData } from '../staticData/playersData';

class FFplay {
  #opts;
  #playerPath;
  constructor(opts = ['-autoexit', '-fs']) {
    this.#opts = opts;
    this.#playerPath = ffplayData.path;
  }

  // eslint-disable-next-line class-methods-use-this
  start() {}

  load(file: string) {
    spawnSync(this.#playerPath, [file, ...this.#opts], {
      stdio: 'ignore',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  quit() {}
}

export default FFplay;
