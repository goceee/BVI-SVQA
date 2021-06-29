const fs = require('fs');
const path = require('path');

// eslint-disable-next-line no-shadow
exports.getDirectories = (path) =>
  fs
    .readdirSync(path)
    .filter((file) => fs.statSync(`${path}/${file}`).isDirectory());

exports.checkFile = (dir, fileName) => {
  try {
    const bitRatesPath = path.join(dir, fileName);
    return { exists: fs.statSync(bitRatesPath).isFile(), path: bitRatesPath };
  } catch (e) {
    return { exists: false, path: e.message };
  }
};
