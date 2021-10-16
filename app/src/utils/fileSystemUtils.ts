import fs from 'fs';
import path from 'path';

// eslint-disable-next-line no-shadow
export const getDirectories = (path: string) =>
  fs
    .readdirSync(path)
    .filter((file: string) => fs.statSync(`${path}/${file}`).isDirectory());

export const checkFile = (dir: string, fileName: string) => {
  try {
    const bitRatesPath = path.join(dir, fileName);
    return { exists: fs.statSync(bitRatesPath).isFile(), path: bitRatesPath };
  } catch (e: any) {
    return { exists: false, path: e.message };
  }
};
