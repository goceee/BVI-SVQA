import { execSync } from 'child_process';

const killProcessByName = (programName: string) => {
  try {
    // eslint-disable-next-line no-unused-expressions
    process.platform === 'win32'
      ? execSync(`taskkill /F /IM ${programName}.exe /T`, { stdio: 'ignore' })
      : execSync(`pkill -f ${programName}`, { stdio: 'ignore' });
  } catch (e) {
    // console.log(e.message);
  }
};

export default killProcessByName;
