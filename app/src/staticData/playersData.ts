import os from 'os';
import path from 'path';

export const mpvData = {
  wrapperSettings: {
    binary:
      os.platform() === 'win32'
        ? path.join(__dirname, '../../externalUtils/mpv/mpv')
        : null,
    // debug: true,
    // verbose: true,
  },
  commandLineSettings: [
    '--fullscreen',
    '--fps=60',
    '--ontop',
    '--osc=no',
    '--no-input-default-bindings',
    '--framedrop=no',
    '--hwdec=yes',
  ],
};

export const ffplayData = {
  path:
    os.platform() === 'win32'
      ? path.join(__dirname, '../../externalUtils/ffmpeg/bin/ffplay')
      : 'ffplay',
};
