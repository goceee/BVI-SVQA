const { nativeImage } = require('electron');
const path = require('path');

const createNativeImage = (imageDir: string, imageName: string) =>
  nativeImage.createFromPath(path.join(imageDir, imageName));

export default createNativeImage;
