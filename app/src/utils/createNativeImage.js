const { nativeImage } = require('electron');
const path = require('path');

module.exports = (imageDir, imageName) =>
  nativeImage.createFromPath(path.join(imageDir, imageName));
