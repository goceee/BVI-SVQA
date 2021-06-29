const fs = require('fs');

///NEEDS FIXING....

const data = fs.readFileSync('../Experiments/myfile.csv', 'utf8').split('\r\n');

const rValue = 2; // DSCQS
// const rValue = 1 // All others

function kurtosis(data) {
  let sumDiff4 = 0;
  let sumDiff2 = 0;
  mosIndex = parseInt(numObservers, 10) + 1;
  for (let i = 1; i <= numObservers; i++) {
    const diff4 = Math.pow(
      parseFloat(data.split(',')[i]) - parseFloat(data.split(',')[mosIndex]),
      4,
    );
    const diff2 = Math.pow(
      parseFloat(data.split(',')[i]) - parseFloat(data.split(',')[mosIndex]),
      2,
    );
    sumDiff4 = sumDiff4 + diff4;
    sumDiff2 = sumDiff2 + diff2;
  }
  const m4 = sumDiff4 / numObservers;
  const m2 = Math.pow(sumDiff2 / numObservers, 2);
  return m4 / m2;
}

exports.beta2Test = (data, rValue) => {
  const numObservers = data[0][index + 6];
  const index = data[0].lastIndexOf('Score');
  const N = data.length - 2;

  for (var i = 1; i <= numObservers; i++) {
    const kurtosisVal = kurtosis(data[i]);
    const meanVal = parseFloat(data[i].split(',')[4]);
    const stdDevVal = parseFloat(data[i].split(',')[5]);
    for (let j = 1; j <= N; j++) {
      P = 0;
      Q = 0;
      if (kurtosisVal <= 4 && kurtosisVal >= 2) {
        if (parseFloat(data[i].split(',')[j]) >= meanVal + 2 * stdDevVal) {
          P = P + 1;
        } else if (
          parseFloat(data[i].split(',')[j]) <=
          meanVal - 2 * stdDevVal
        ) {
          Q = Q + 1;
        }
      } else {
        if (
          parseFloat(data[i].split(',')[j]) >=
          meanVal + Math.sqrt(20) * stdDevVal
        ) {
          P = P + 1;
        } else if (
          parseFloat(data[i].split(',')[j]) <=
          meanVal - Math.sqrt(20) * stdDevVal
        ) {
          Q = Q + 1;
        }
      }
    }
    if (((P + Q) / rValue) * N > 0.05 && Math.abs((P - Q) / (P + Q)) < 0.3) {
      console.log(`REJECT ${data[0].split(',')[i]}`);
    } else {
      console.log('NO');
    }
  }
};
