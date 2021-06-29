/* eslint-disable lines-between-class-members */
const MpvAPI = require('node-mpv');
const path = require('path');

const FFplay = require('./FFplay');
const { delay } = require('../utils/window/presentationWindowUtils');
const { mpvData } = require('../staticData/playersData');
const killProcessByName = require('../utils/killProcessByName');

class Player {
  #player;
  #videosPath;
  #playerName;

  constructor(player, trial) {
    this.#playerName = player;
    this.#videosPath = trial
      ? path.join(__dirname, '../../../trainingSequences/')
      : path.join(__dirname, '../../../converted/');
    if (player === 'mpv') {
      this.#player = new MpvAPI(
        mpvData.wrapperSettings,
        mpvData.commandLineSettings,
      );
    } else if (player === 'ffplay') {
      this.#player = new FFplay();
    } else {
      throw new Error('Player not supported');
    }
  }

  async init() {
    await this.#player.start();
  }

  async play(filename) {
    await this.#player.load(path.join(this.#videosPath, filename));
    if (this.#playerName === 'mpv') {
      const duration = await this.#player.getDuration();
      await delay(duration * 1000);
    }
  }

  async quit() {
    try {
      await this.#player.quit();
    } catch {
      killProcessByName('mpv');
    }
  }
}

module.exports = Player;
