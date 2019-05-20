var fs = require("fs");
var path = require('path');
var array1 = []
var array2 = []
var regex = /[+-]?\d+(\.\d+)?/g; // to get floats from string
var headers = ['Video name','Encoding time (s)','Decoding time (s)']
//console.log(textByLine)

function toCsv(input) {
    return input.map(row => row.join(',')).join('\n')
  }
  

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path+'/'+file).isDirectory();
    });
}

function getFilesFromDir(dir) {
    var filesToReturn = [];
    function walkDir(currentPath) {
        var files = fs.readdirSync(currentPath);
        for (var i in files) {
            var curFile = path.join(currentPath, files[i]);
            //console.log(curFile)      
            if (fs.statSync(curFile).isFile() && curFile.indexOf('.o') != -1) {
                filesToReturn.push(curFile.replace(dir, ''));
            } else if (fs.statSync(curFile).isDirectory()) {
                walkDir(curFile);
            }
        }
    };
    walkDir(dir);
    return filesToReturn; 
}

var allFiles = (getFilesFromDir('../logs'))
for (var i=0;i<allFiles.length;i++){
    var text = fs.readFileSync(allFiles[i], 'utf-8');
    var textByLine = text.split("\n")
    for (var j=0;j<textByLine.length;j++){
        if(textByLine[j].includes('Total Time')){
            array1.push( textByLine[j].match(regex).map(function(v) { return parseFloat(v); })[0] )
            //console.log(array1)
        }
    }
    array1.unshift( allFiles[i].split('\\')[2] )
    array2.push(array1)
    array1 = []
}
array2.unshift(headers)
//console.log(array2)
const csvStringu = toCsv(array2);
fs.writeFileSync("../timingsData.csv", csvStringu, 'utf8');
                        


