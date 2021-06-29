const os = require('os');
const path = require('path');

module.exports = {
  mpvData: {
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
  },
  ffplayData: {
    path:
      os.platform() === 'win32'
        ? path.join(__dirname, '../../externalUtils/ffmpeg/bin/ffplay')
        : 'ffplay',
  },
};
