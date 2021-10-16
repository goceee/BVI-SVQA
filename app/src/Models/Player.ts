/* eslint-disable lines-between-class-members */
import MpvAPI, { NodeMpvOptions } from 'node-mpv';
import path from 'path';

import FFplay from './FFplay';
import { delay } from '../utils/window/presentationWindowUtils';
import { mpvData } from '../staticData/playersData';
import killProcessByName from '../utils/killProcessByName';

class Player {
  #player;
  #videosPath;
  #playerName;

  constructor(player: string, trial: boolean) {
    this.#playerName = player;
    this.#videosPath = trial
      ? path.join(__dirname, '../../../trainingSequences/')
      : path.join(__dirname, '../../../converted/');
    if (player === 'mpv') {
      this.#player = new MpvAPI(
        mpvData.wrapperSettings as NodeMpvOptions,
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

  async play(filename: string) {
    await this.#player.load(path.join(this.#videosPath, filename));
    if (this.#playerName === 'mpv') {
      const mpvPlayer = this.#player as MpvAPI;
      const duration = await mpvPlayer.getDuration();
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

export default Player;
