export const toCsv = (input: any) =>
  input.map((row: any) => row.join(',')).join('\n');

export const shuffle = (array: any[]) => {
  const newArray = [...array];
  let i = newArray.length;
  if (i === 0) return newArray;
  // eslint-disable-next-line no-plusplus
  while (--i) {
    const j = Math.floor(Math.random() * (i + 1));
    const tempi = newArray[i];
    const tempj = newArray[j];
    newArray[i] = tempj;
    newArray[j] = tempi;
  }
  return newArray;
};

export const comparator = (a: any[], b: any[]) => {
  if (a[2] <= b[2]) return -1;
  if (a[2] > b[2]) return 1;
  return 0;
};

export const addTitleBarFunctionality = () => {
  // eslint-disable-next-line global-require
  const remote = require('@electron/remote');
  const openWindow = remote.require('./controllers/windowController');

  const minimise = document.querySelector('.minimise') as HTMLDivElement;
  const maximise = document.getElementById('maximise') as HTMLDivElement;
  const closeProgram = document.getElementById('close') as HTMLDivElement;
  const back = document.getElementById('back') as HTMLDivElement;

  const currentWindow = remote.getCurrentWindow();
  let MaximiseFlag = false;

  if (closeProgram !== null) closeProgram.onclick = () => currentWindow.close();

  if (minimise !== null) {
    minimise.onclick = () => {
      currentWindow.minimize();
    };
  }

  if (maximise !== null) {
    maximise.onclick = () => {
      if (MaximiseFlag === false) {
        MaximiseFlag = true;
        maximise.innerHTML = '&#xE923;';
        // currentWindow.maximize();
      } else {
        MaximiseFlag = false;
        maximise.innerHTML = '&#xE922;';
        // currentWindow.unmaximize();
      }
    };
  }

  if (back !== null) {
    back.onclick = () => {
      openWindow.mainWindow();
      currentWindow.close();
    };
  }
};

export const updateProgressTaskBar = (value: number, maxValue: number) => {
  /* taskbar's progress bar must be a number between 0 and 1, e.g.:
  63% should be 0.63, 99% should be 0.99... */

  const percentage = (value * 100) / maxValue;
  return parseFloat((percentage / 100).toFixed(2));
};

// check this function
// const removeA = (arr: any) => {
//   let what;
//   let ax;
//   // eslint-disable-next-line no-undef
//   const a = arguments;
//   let L = a.length;

//   while (L > 1 && arr.length) {
//     // eslint-disable-next-line no-plusplus
//     what = a[--L];
//     // eslint-disable-next-line no-cond-assign
//     while ((ax = arr.indexOf(what)) !== -1) {
//       arr.splice(ax, 1);
//     }
//   }
//   return arr;
// };

// export const splitScores = (scores: any[]) => {
//   const distortedV = scores.slice();
//   const originalV = [];
//   for (let i = 0; i < scores.length; i += 1) {
//     const index = scores[i][0].indexOf('R0');
//     if (index > 0) {
//       const element = scores.slice(i, i + 1);
//       removeA(distortedV, element[0]);
//       // eslint-disable-next-line prefer-spread
//       const result = [].concat.apply([], element);
//       originalV.push(result);
//     }
//   }
//   return { distortedV, originalV };
// };

// check this
export const csvToObject = (data: string) => {
  const dataArray = data.replace(/"/g, '').split(/\r\n|\n|\r/);
  const obj: any = {};
  dataArray.forEach((element: any) => {
    if (element.length > 0) {
      let arrayElement: any = element.split(':');
      arrayElement =
        arrayElement.length === 1 ? element.split(',') : arrayElement;
      const elementData: any =
        arrayElement.length <= 2
          ? arrayElement[1].replace(',', ' ').trim().split(',')
          : arrayElement.slice(1);
      obj[arrayElement[0].trim()] =
        elementData.length === 1 && !arrayElement[0].includes('Videos')
          ? elementData[0]
          : elementData;
    }
  });
  return obj;
};
