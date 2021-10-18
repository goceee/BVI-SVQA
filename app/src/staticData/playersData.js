const os = require('os');
const remote = require('@electron/remote');

const { app } = remote;
const appPath = app.getAppPath();

//needs fixing for macOS
module.exports = {
  mpvData: {
    wrapperSettings: {
      binary:
        os.platform() === 'win32'
          ? `${appPath}/../externalUtils/mpv/mpv`
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
      '--macos-fs-animation-duration=0',
      '--hwdec=yes',
    ],
  },
  ffplayData: {
    path:
      os.platform() === 'win32'
        ? `${appPath}/../externalUtils/ffmpeg/bin/ffplay`
        : 'ffplay',
  },
};
