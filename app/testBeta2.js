var fs = require('fs');
var allData = (fs.readFileSync("../Experiments/myfile.csv",'utf8')).split('\r\n');
var index = allData[0].lastIndexOf("Score");
var R = 2; //DSCQS
// var R = 1 //All others
//console.log(allData[0])
//console.log(index);
var numObservers = allData[0][index+6]
var N = allData.length-2;


function kurtosis(allData){
var final = 0;
var sumDiff4 = 0;
var sumDiff2 = 0;
mosIndex = parseInt(numObservers)+1
for (var i=1;i<=numObservers;i++){
    var diff4 = Math.pow(parseFloat(allData.split(',')[i]) - parseFloat(allData.split(',')[mosIndex]),4);
    var diff2 = Math.pow(parseFloat(allData.split(',')[i]) - parseFloat(allData.split(',')[mosIndex]),2);
    sumDiff4 = sumDiff4 + diff4;
    sumDiff2 = sumDiff2 + diff2;
}
var m4 = sumDiff4/numObservers;
var m2 = Math.pow(sumDiff2/numObservers,2)
final = m4/m2
console.log(final)
return final
}

for (var i=1;i<=numObservers;i++){
    var kurtosisVal = kurtosis(allData[i])
    var meanVal = parseFloat(allData[i].split(',')[4])
    var stdDevVal = parseFloat(allData[i].split(',')[5])
    for(var j=1;j<=N;j++){
        P = 0;
        Q = 0;
        if(kurtosisVal<=4 && kurtosisVal>=2){
            if(parseFloat(allData[i].split(',')[j])>= meanVal + 2 * stdDevVal){
                P = P+1;
            }
            else if(parseFloat(allData[i].split(',')[j]) <= meanVal - 2 * stdDevVal){
                Q = Q+1;
            }
        }
        else{
            if(parseFloat(allData[i].split(',')[j])>= meanVal + Math.sqrt(20) * stdDevVal){
                P = P+1;
            }
            else if(parseFloat(allData[i].split(',')[j]) <= meanVal - Math.sqrt(20) * stdDevVal){
                Q = Q+1;
            }
        }
    }
    if( ((P + Q)/R*N)> 0.05 && Math.abs( (P-Q)/(P+Q) ) < 0.3){
        console.log("REJECT " + allData[0].split(',')[j])
    }
    else{
        console.log("PA NEMA")
    }
}
