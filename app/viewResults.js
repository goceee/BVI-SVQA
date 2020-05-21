const {PythonShell} =  require('python-shell');
var fs = require('fs');
var path = require('path');

var bitRateT = document.getElementById('up3');

var bitRate;
var bitratesPath;

var DistortedFileNames = [];
var OriginalFileNames = [];
var QParr = [];
var readObjmetric = [];
var vidCodecsList = [];
var psnrCArray = [];

//---------------Functions to get Files from a directory-----------------//
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
      if (fs.statSync(curFile).isFile() && curFile.indexOf('bitrates.csv') != -1) {
        filesToReturn.push(curFile.replace(dir, ''));
      } else if (fs.statSync(curFile).isDirectory()) {
        walkDir(curFile);
      }
    }
  }
  walkDir(dir);
  return filesToReturn; 
}
//----------------------------------------------------------------------//
//----------------------------------------------------------------------//


var directoriesList = getDirectories("../Experiments");
directoriesList.splice(directoriesList.indexOf('Saved'), 1);
var viewScores = document.getElementById("viewScores");
var viewPlots = document.getElementById("viewPlots");
var videoList = document.getElementById("videoList");

for (var i =0;i<directoriesList.length; i++) {
  viewScores.options[viewScores.options.length] = new Option(directoriesList[i], directoriesList[i]);
  viewPlots.options[viewPlots.options.length] = new Option(directoriesList[i], directoriesList[i]);
}

//--------------------Export data form change----------------------------------//
$('#viewScores').on('change', function() {
  $('#secondForm').removeClass('transitionBack');
  $('#secondForm').addClass('transitionEffect');
  document.getElementById('videoList').style.visibility = "hidden";
  document.getElementById("bitrateForm").style.visibility = "hidden";
  document.getElementById('viewPlots').selectedIndex = "0";
  document.getElementById("confirmPlots").style.visibility = "hidden";
  document.getElementById("exportall").style.visibility = "hidden";
  document.getElementById("compareB").style.visibility = "hidden";
  document.getElementById("secondCont").style.visibility = "hidden";
  $('input[name="plots"]').prop('checked', false);
  setTimeout(function() {
    document.getElementById("firstRadios").style.visibility = "visible";
  }, 1000);
});
//-------------------------------------------------------------//
//-------------------------------------------------------------//

//-----------------------------Read videos and check if QP is present---------------------------//
$('#videoList').on('change', function() {
  QParr = [];
  document.getElementById('secondCont').style.visibility = "visible";
  var readFiles = fs.readFileSync("../Experiments/" + viewPlots.value + "/" + viewPlots.value + '(config)' + ".csv", 'utf8');
  var FileListwName = readFiles.split('\n');
  DistortedFileNames = FileListwName[2].split(',');
  DistortedFileNames.splice(0,1);
  for (var j = 0;j<DistortedFileNames.length;j++) {
    if (DistortedFileNames[j].split('_')[0].includes((videoList.value).split('_')[0])) {
      if (DistortedFileNames[j].split('_')[6].includes('QP')) {
        QParr.push((DistortedFileNames[j].split('_')[6]).substr(2));
      }
    }
  }
});
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

//------Plots Experiment change----------
$('#viewPlots').on('change', function() {
  vidCodecsList = [];
  $('#secondForm').removeClass('transitionEffect');
  $('#secondForm').addClass('transitionBack');
  $('#buttonC').removeClass('transitionEffect');
  $('#buttonC').addClass('transitionBackBut');
  $('input[name="data"]').prop('checked', false);
  $('input[name="plots"]').prop('checked', false);
  document.getElementById('viewScores').selectedIndex = "0";
  document.getElementById("firstRadios").style.visibility = "hidden";
  document.getElementById("confirmData").style.visibility = "hidden";
  document.getElementById("videoList").style.visibility = "visible";
  document.getElementById("secondCont").style.visibility = "hidden";
  document.getElementById("bitrateForm").style.visibility = "hidden";
  document.getElementById("confirmPlots").style.visibility = "hidden";
  document.getElementById("exportall").style.visibility = "hidden";
  document.getElementById("compareB").style.visibility = "hidden";
  videoList.options.length = 0;
  videoList.options[videoList.options.length] = new Option("Choose...", "Choose...");
  $('#videoList option[value="Choose..."]').attr('disabled', 'true');
  var readFiles = fs.readFileSync("../Experiments/" + viewPlots.value + "/" + viewPlots.value + '(config)' + ".csv", 'utf8');
  var FileListwName = readFiles.split('\n');
  DistortedFileNames = FileListwName[2].split(',');
  OriginalFileNames = FileListwName[4].split(',');
  DistortedFileNames.splice(0,1);
  OriginalFileNames.splice(0,1);
  for (var i = 0;i<OriginalFileNames.length; i++) {
    for (var j = 0;j<DistortedFileNames.length;j++) {
      if (OriginalFileNames[i].split('_')[0].includes(DistortedFileNames[j].split('_')[0])) {
        if (DistortedFileNames[j].split('_')[7].includes('.')) {
          vidCodecsList.push((DistortedFileNames[j].split('_')[7]).slice(0,-4));
        } else {
          vidCodecsList.push((DistortedFileNames[j].split('_')[7]));
        }
        vidCodecsList = Array.from(new Set(vidCodecsList));
      }
    }
    for (var t = 0; t<vidCodecsList.length;t++) {
      if (OriginalFileNames[i].length > 1) {
        videoList.options[videoList.options.length] = new Option(OriginalFileNames[i].split('_')[0] + '_' + vidCodecsList[t], OriginalFileNames[i].split('_')[0] + '_' + vidCodecsList[t]);
      }
    }
  }
});
//--------------------------------------------------------------------------------------------//


//------------PLOTS CLICK------------------------
$('input[name="plots"]').on('change', function() {
  document.getElementById('confirmPlots').disabled = false;          
  document.getElementById('exportall').disabled = false;
  bitratesPath = getFilesFromDir("../Experiments/" + viewPlots.value);
  if (vidCodecsList.length > 1) {
    document.getElementById('compareB').disabled = false;
  } else {
    document.getElementById('compareB').disabled = true;
  }
  if (bitratesPath.length == 0 && QParr.length == 0) {
    $('#buttonC').addClass('transitionEffect');
    setTimeout(function() {
      document.getElementById('bitrateForm').style.visibility = "visible";
    }, 500);
  } else {
    $('#buttonC').removeClass('transitionEffect');
    $('#buttonC').addClass('transitionBackBut');
    document.getElementById('bitrateForm').style.visibility = "hidden";
  }
  document.getElementById("confirmPlots").style.visibility = "visible";
  document.getElementById("exportall").style.visibility = "visible";
  document.getElementById("compareB").style.visibility = "visible";
  if (document.querySelector('input[name="plots"]:checked').value == 'DMOS,VMAF') {
    document.getElementById('compareB').disabled = true;
  }
});
//------------PLOTS CLICK END--------------------

//------------EXPORT DATA------------------------
$('input[name="data"]').on('change', function() {
  document.getElementById("confirmData").style.visibility = "visible";
});

$('#confirmData').click(function() {
  var selExp = document.getElementById("viewScores").value;
  var readFiles = fs.readFileSync("../Experiments/" + selExp + "/" + selExp + '(config)' + ".csv", 'utf8');
  var presMethod = (readFiles.split('\n'))[1].split(',')[1];
  if (document.querySelector('input[name="data"]:checked').value == 'raw') {
    document.getElementById('confirmData').disabled = true;
    var options = {
      args : [selExp, presMethod]
    };
    var pyshell = new PythonShell('extractData.py', options);
    pyshell.on('message', function(message) {
      console.log(message);
    });
    pyshell.end(function (err) {
      document.getElementById('confirmData').disabled = false;
      if (err) {
        var errorP = err;
        if (String(errorP).includes("NO DATA FOUND")) {
          swal.fire({
            title: String(errorP),
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
            confirmButtonText: 'OK!'
          });  
        } else {
            alert(err);
        }
      } else {
        swal.fire({
          title: 'Complete!',
          text: 'Data sucessfully exported to experiment folder',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });  
      }
    });
  } else if (document.querySelector('input[name="data"]:checked').value == 'processed') {
    swal.fire({
      title: 'No outliers detected!',
      icon: 'info',
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!'
    });
  }
});
//-----------------------------------------------


//-----CONFIRM PLOTS-----------------
var pyshell1;
$('#confirmPlots').click(function() {
  bitratesPath = getFilesFromDir("../Experiments/" + viewPlots.value);
  document.getElementById('confirmPlots').disabled = true;
  document.getElementById('exportall').disabled = true;
  document.getElementById('compareB').disabled = true;
  if (document.getElementById("videoList").value == 'Choose...') {
    swal.fire({
      title: 'No video selected!',
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false,
      confirmButtonText: 'OK!'
    });  
  } else {
    if (bitRate != undefined || bitratesPath.length != 0 || QParr.length != 0) {
      if (bitratesPath.length != 0 || bitRate != undefined || QParr.length != 0) {
        if (bitratesPath.length != 0) {
          document.getElementById('bitrateForm').style.visibility = "hidden";
          $('#buttonC').removeClass('transitionEffect');
          $('#buttonC').addClass('transitionBackBut');
          var readBitRates = ((fs.readFileSync(bitratesPath[0], 'utf8'))).split('\n');
        } else if (QParr !=0) {
          document.getElementById('bitrateForm').style.visibility = "hidden";
          $('#buttonC').removeClass('transitionEffect');
          $('#buttonC').addClass('transitionBackBut');
        } else if (bitRate[0].name == 'bitrates.csv') {
          var readBitRates = ((fs.readFileSync(bitRate[0].path, 'utf8'))).split('\n');
        } else {
          swal.fire({
            title: 'bitrates.csv file not be found!',
            icon: 'error',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK!'
          });
        }
        var vidName = (document.getElementById("videoList").value).split('_')[0];
        var vidname2 = document.getElementById("videoList").value;
        if (QParr == 0 && (bitratesPath.length != 0 || bitRate[0].name == 'bitrates.csv')) {
          for (var i=0;i<readBitRates.length;i++) {
            if (vidName.indexOf(readBitRates[i].split(',')[0]) != -1) {
              indexBitrate = i;
              break;
            }
          }
          var bitRates = readBitRates[indexBitrate].split(',');
          bitRates.splice(0,1);
        } else {
          swal.fire({
            title: 'bitrates.csv file not present!',
            icon: 'error',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK!'
          });
          document.getElementById('confirmPlots').disabled = false;
          document.getElementById('compareB').disabled = false;
          document.getElementById('exportall').disabled = false;
        }
        if (bitRates.length < 3) {
          swal.fire({
            title: 'Bitrates for video could not be found!',
            icon: 'error',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK!'
          });
          document.getElementById('confirmPlots').disabled = false;
          document.getElementById('compareB').disabled = false;
          document.getElementById('exportall').disabled = false;
        } else {
          vidCodec = (document.getElementById("videoList").value).split('_')[1];
          
          //-----------------PSNR-START-----------------------------------------------
          if (document.querySelector('input[name="plots"]:checked').value == 'PSNR') {
            try {
              var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/Objective_metrics/" + videoList.value + '(objective_metrics).csv', 'utf8')).split('\n'));
              var remQPSNR = readData[2].replace(/"([^"]+(?="))"/g, '$1');
              var psnr = remQPSNR.split(',');
              psnr.splice(0,1);
              if (QParr.length == 0) {
                bitRates.length = psnr.length;
                options = {
                  args : [psnr, bitRates, vidName, 'PSNR(db)', vidCodec]
                };
              } else {
                var qpF = 1;
                options = {
                  args : [psnr, QParr, vidName, 'PSNR(db)', vidCodec, qpF]
                };
              }
            } catch(err) {
              swal.fire({
                title: 'Objective metrics for video could not be found!',
                icon: 'error',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK!'
              });
            } //-----------------PSNR-END-------------------------------------------------
          } else if (document.querySelector('input[name="plots"]:checked').value == 'VMAF') {
            try {
              var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/Objective_metrics/" + videoList.value + '(objective_metrics).csv', 'utf8')).split('\n'));
              var remQVMAF = readData[1].replace(/"([^"]+(?="))"/g, '$1');
              var vmaf = remQVMAF.split(',');
              vmaf.splice(0,1);
              var remQCIHI = readData[4].replace(/"([^"]+(?="))"/g, '$1');
              var remQCILO = readData[5].replace(/"([^"]+(?="))"/g, '$1');
              var cihi = remQCIHI.split(',');
              var cilo = remQCILO.split(',');
              cihi.splice(0,1);
              cilo.splice(0,1);
              if (QParr.length == 0) {
                bitRates.length = vmaf.length;
                options = {
                  args : [vmaf, bitRates, vidName, 'VMAF', vidCodec, cihi, cilo]
                };
              } else {
                var qpF = 1;
                options = {
                  args : [vmaf, QParr, vidName, 'VMAF', vidCodec, qpF, cihi, cilo]
                };
              }
            } catch(err) {
              swal.fire({
                title: 'Objective metrics for video could not be found!',
                icon: 'error',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK!'
              });
            } //----------------------VMAF-END------------------------------------------------
          } else if (document.querySelector('input[name="plots"]:checked').value == 'MS-SSIM') {
            try {
              var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/Objective_metrics/" + videoList.value + '(objective_metrics).csv','utf8')).split('\n'));
              var remQMSSSIM = readData[3].replace(/"([^"]+(?="))"/g, '$1');
              var msssim = remQMSSSIM.split(',');
              msssim.splice(0,1);
              if (QParr.length == 0) {
                bitRates.length = msssim.length;
                options = {
                  args : [msssim, bitRates, vidName, 'MS-SSIM', vidCodec]
                };
              } else {
                var qpF = 1;
                options = {
                  args : [msssim, QParr, vidName, 'MS-SSIM', vidCodec, qpF]
                };
              }
            } catch(err) {
              swal.fire({
                title: 'Objective metrics for video could not be found!',
                icon: 'error',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK!'
              });
            } //------------------------MS-SSIM-END---------------------------------------------
          } else if (document.querySelector('input[name="plots"]:checked').value == '100-DMOS') {
            var dmos = [];
            var errorA = [];
            if (fs.existsSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv')) {
              var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv','utf8')).split('\n'));
              for (var i=0;i<(readData[0].split(',')).length;i++) {
                if ((readData[0].split(',')[i]).replace(/"([^"]+(?="))"/g, '$1') == 'MOS') {
                  indexMOS = i;
                  break;
                }
              }
              for (var i=1;i<readData.length;i++) {
                if (readData[i].split(',')[0].indexOf(vidName) != -1 && readData[i].split(',')[0].indexOf(vidCodec) != -1) {
                  dmosM = (readData[i].split(',')[indexMOS]).replace(/"([^"]+(?="))"/g, '$1');
                  dmos.push(100-dmosM);
                  errorNum = (readData[i].split(',')[indexMOS+2]).replace(/"([^"]+(?="))"/g, '$1');
                  errorA.push(errorNum);
                }
              }
              if (QParr.length == 0) {
                bitRates.length = dmos.length;
                options = {
                  args : [dmos, bitRates, vidName, '100-DMOS', vidCodec, errorA]
                };
              } else {
                var qpF = 1;
                options = {
                  args : [dmos, QParr, vidName, '100-DMOS', vidCodec, qpF, errorA]
                };
              }
            } //---------------------100-DMOS-END----------------------------------------------
          } else if (document.querySelector('input[name="plots"]:checked').value == 'DMOS') {
            var dmos = [];
            var errorA = [];
            if (fs.existsSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv')) {
              var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv', 'utf8')).split('\n'));
              for (var i=0;i<(readData[0].split(',')).length;i++) {
                if ((readData[0].split(',')[i]).replace(/"([^"]+(?="))"/g, '$1') == 'MOS') {
                  indexMOS = i;
                  break;
                }
              }
              for (var i=1;i<readData.length;i++) {
                if (readData[i].split(',')[0].indexOf(vidName) != -1 && readData[i].split(',')[0].indexOf(vidCodec) != -1) {
                  dmosM = (readData[i].split(',')[indexMOS]).replace(/"([^"]+(?="))"/g, '$1');
                  dmos.push(dmosM);
                  errorNum = (readData[i].split(',')[indexMOS+2]).replace(/"([^"]+(?="))"/g, '$1');
                  errorA.push(errorNum);
                }
              }
              if (QParr.length == 0) {
                bitRates.length = dmos.length;
                options = {
                  args : [dmos, bitRates, vidName, 'DMOS', vidCodec, errorA]
                };
              } else {
                var qpF = 1;
                options = {
                  args : [dmos, QParr, vidName, 'DMOS', vidCodec, qpF, errorA]
                };
              } //----------------DMOS-END-------------------------------------------------
            }
            //----------------DUAL-PLOT---------------------------------------------------------
          } else if (document.querySelector('input[name="plots"]:checked').value == 'DMOS,VMAF') {
            var dmos = [];
            var errorA = [];
            if (fs.existsSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv') && fs.existsSync("../Experiments/" + viewPlots.value + "/Objective_metrics/" + videoList.value + '(objective_metrics).csv')) {
              var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv', 'utf8')).split('\n'));
              for (var i=0;i<(readData[0].split(',')).length;i++) {
                if ((readData[0].split(',')[i]).replace(/"([^"]+(?="))"/g, '$1') == 'MOS') {
                  indexMOS = i;
                  break;
                }
              }
              for (var i=1;i<readData.length;i++) {
                if (readData[i].split(',')[0].indexOf(vidName) != -1 && readData[i].split(',')[0].indexOf(vidCodec) != -1) {
                  dmosM = (readData[i].split(',')[indexMOS]).replace(/"([^"]+(?="))"/g, '$1');
                  dmos.push(dmosM);
                  errorNum = (readData[i].split(',')[indexMOS+2]).replace(/"([^"]+(?="))"/g, '$1');
                  errorA.push(errorNum);
                }
              }
              //-------------------------------DMOS STORED-------------------------------------------------
              var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/Objective_metrics/" + videoList.value + '(objective_metrics).csv', 'utf8')).split('\n')); 
              var remQVMAF = readData[1].replace(/"([^"]+(?="))"/g, '$1');
              var vmaf = remQVMAF.split(',');
              vmaf.splice(0,1);
              var remQCIHI = readData[4].replace(/"([^"]+(?="))"/g, '$1');
              var remQCILO = readData[5].replace(/"([^"]+(?="))"/g, '$1');
              var cihi = remQCIHI.split(',');
              var cilo = remQCILO.split(',');
              cihi.splice(0,1);
              cilo.splice(0,1);
              //--------------------------------VMAF STORED------------------------------------------------
              if (QParr.length == 0) {
                bitRates.length = dmos.length;
                options = {
                  args : [dmos, vmaf, bitRates, vidname2, vidCodec, cihi, cilo, errorA]
                };
              } else {
                var qpF = 1;
                options = {
                  args : [dmos, vmaf, QParr, vidname2, vidCodec, qpF, cihi, cilo, errorA]
                };
              }
            } else {
              swal.fire({
                title: 'No data to plot!',
                icon: 'error',
                showCancelButton: false,
                allowOutsideClick: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK!'
              });
              document.getElementById('confirmPlots').disabled = false;
              document.getElementById('exportall').disabled = false;
            }
          }
          //----------------DUAL-PLOT-END-----------------------------------------------------
        }
        
        if ((document.querySelector('input[name="plots"]:checked').value == 'DMOS' || document.querySelector('input[name="plots"]:checked').value == '100-DMOS' || document.querySelector('input[name="plots"]:checked').value == 'DMOS,VMAF') && !fs.existsSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv')) {
          swal.fire({
            title: 'No data to plot!',
            icon: 'error',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK!'
          });
          document.getElementById('confirmPlots').disabled = false;
          document.getElementById('exportall').disabled = false;
          if (!(document.querySelector('input[name="plots"]:checked').value == 'DMOS,VMAF')) {
            document.getElementById('compareB').disabled = false;
          }
        } else if ((document.querySelector('input[name="plots"]:checked').value == 'PSNR' || document.querySelector('input[name="plots"]:checked').value == 'VMAF' || document.querySelector('input[name="plots"]:checked').value == 'MS-SSIM' || document.querySelector('input[name="plots"]:checked').value == 'DMOS,VMAF') && !fs.existsSync("../Experiments/" + viewPlots.value + "/Objective_metrics/" + videoList.value + '(objective_metrics).csv')) {
          swal.fire({
            title: 'No objective data to plot!',
            icon: 'error',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK!'
          });
          document.getElementById('confirmPlots').disabled = false;
          document.getElementById('exportall').disabled = false;
          if (!(document.querySelector('input[name="plots"]:checked').value == 'DMOS,VMAF')) {
            document.getElementById('compareB').disabled = false;
          }
        } else {
          if (!(document.querySelector('input[name="plots"]:checked').value == 'DMOS,VMAF')) {
            pyshell1 = new PythonShell('plotSingle.py', options);
            pyshell1.on('message', function (message) {
              console.log(message);
            });
            pyshell1.end(function (err) {
              document.getElementById('confirmPlots').disabled = false;
              document.getElementById('exportall').disabled = false;
              document.getElementById('compareB').disabled = false;
              if (err) console.log(err);
            });
          } else {
            pyshell1 = new PythonShell('plotDual.py', options);
            pyshell1.on('message', function (message) {
              console.log(message);
            });
            pyshell1.end(function (err) {
              document.getElementById('confirmPlots').disabled = false;
              document.getElementById('exportall').disabled = false;
              if (err) console.log(err);
            });
          }
        }
      } else {
        swal.fire({
          title: 'Bitrates datafile is wrong!',
          text: 'Please ensure the file is named: bitrates.csv',
          icon: 'error',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK!'
        });
        document.getElementById('confirmPlots').disabled = false;
        document.getElementById('exportall').disabled = false;
        document.getElementById('compareB').disabled = false;
      }
    } else {
      swal.fire({
        title: 'Bitrates datafile is missing!',
        icon: 'error',
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK!'
      });
      document.getElementById('bitrateForm').style.visibility = "visible";
      $('#buttonC').addClass('transitionEffect');
      document.getElementById('confirmPlots').disabled = false;
      document.getElementById('exportall').disabled = false;
      document.getElementById('compareB').disabled = false;
    }
  }
});
//-------------------------------CONFIRM END-------------------------------


//---------COMPARE BUTTON------------------------
$(document).on('click', '#compareB', function() {
  bitratesPath = getFilesFromDir("../Experiments/" + viewPlots.value);
  document.getElementById('confirmPlots').disabled = true;
  document.getElementById('exportall').disabled = true;
  document.getElementById('compareB').disabled = true;
  var indexBitrate;
  var options;
  var vidCodec;
  if (document.getElementById("videoList").value == 'Choose...') {
    swal.fire({
      title: 'No video selected!',
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false,
      confirmButtonText: 'OK!'
    });  
  } else {
    if (bitRate != undefined || bitratesPath.length != 0 || QParr.length != 0) {
      if (bitratesPath.length != 0 || bitRate != undefined || QParr.length != 0) {
        if (bitratesPath.length != 0) {
          document.getElementById('bitrateForm').style.visibility = "hidden";
          $('#buttonC').removeClass('transitionEffect');
          $('#buttonC').addClass('transitionBackBut');
          var readBitRates = ((fs.readFileSync(bitratesPath[0], 'utf8'))).split('\n');
        } else if (QParr != 0) {
          document.getElementById('bitrateForm').style.visibility = "hidden";
          $('#buttonC').removeClass('transitionEffect');
          $('#buttonC').addClass('transitionBackBut');
        } else if (bitRate[0].name == 'bitrates.csv') {
          var readBitRates = ((fs.readFileSync(bitRate[0].path, 'utf8'))).split('\n');
        }
        var vidName = (document.getElementById("videoList").value).split('_')[0];
        if (QParr == 0) {
          for (var i=0;i<readBitRates.length;i++) {
            if (vidName.indexOf(readBitRates[i].split(',')[0]) != -1) {
              indexBitrate = i;
              break;
            }
          }
          var bitRates = readBitRates[indexBitrate].split(',');
          bitRates.splice(0,1);
        }
        
        if (document.querySelector('input[name="plots"]:checked').value == 'PSNR') {
          psnrCArray = [];
          readObjmetric = [];
          try {
            for (var c = 0;c<vidCodecsList.length;c++) {
              readObjmetric.push((fs.readFileSync("../Experiments/" + viewPlots.value + "/Objective_metrics/" + vidName + '_' + vidCodecsList[c] + '(objective_metrics).csv', 'utf8')).split('\n'));
            }
            for (var c = 0;c<vidCodecsList.length;c++) {
              var remPSNR = readObjmetric[c][2].replace(/"([^"]+(?="))"/g, '$1');
              var resultP = remPSNR.split(',');
              resultP.splice(0,1);
              resultP.unshift(vidCodecsList[c]);
              psnrCArray.push(resultP); 
            }
            bitRates.length = psnrCArray[0].length-1;
            options = {
              args : [psnrCArray, bitRates, vidName, 'PSNR(db)']
            };
          } catch(err) {
            swal.fire({
              title: 'Objective metrics for video could not be found!',
              icon: 'error',
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK!'
            });
          }
        } else if (document.querySelector('input[name="plots"]:checked').value == 'VMAF') {
          vmafCArray = [];
          resultCIlo = [];
          resultCIhi = [];
          readObjmetric = [];
          try {
            for (var c = 0;c<vidCodecsList.length;c++) {
              readObjmetric.push((fs.readFileSync("../Experiments/" + viewPlots.value + "/Objective_metrics/" + vidName + '_' + vidCodecsList[c] + '(objective_metrics).csv', 'utf8')).split('\n'));
            }
            for (var c = 0;c<vidCodecsList.length;c++) {
              var remVMAF = readObjmetric[c][1].replace(/"([^"]+(?="))"/g, '$1');
              var resultV = remVMAF.split(',');
              resultV.splice(0,1);
              var remQCIHI = readObjmetric[c][4].replace(/"([^"]+(?="))"/g, '$1');
              var remQCILO = readObjmetric[c][5].replace(/"([^"]+(?="))"/g, '$1');
              var cihi = remQCIHI.split(',');
              var cilo = remQCILO.split(',');
              cihi.splice(0,1);
              cilo.splice(0,1);
              resultCIlo.push(vidCodecsList[c]);
              resultCIlo.push(cilo);
              resultCIhi.push(vidCodecsList[c]);
              resultCIhi.push(cihi);
              resultV.unshift(vidCodecsList[c]);
              vmafCArray.push(resultV); 
            }
            bitRates.length = vmafCArray[0].length-1;
            options = {
              args : [vmafCArray, bitRates, vidName, 'VMAF', resultCIlo, resultCIhi]
            };
          } catch(err) {
            swal.fire({
              title: 'Objective metrics for video could not be found!',
              icon: 'error',
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK!'
            });
          }
        } else if (document.querySelector('input[name="plots"]:checked').value == 'MS-SSIM') {
          mssimCArray = [];
          readObjmetric = [];
          try {
            for (var c = 0;c<vidCodecsList.length;c++) {
              readObjmetric.push((fs.readFileSync("../Experiments/" + viewPlots.value + "/Objective_metrics/" + vidName + '_' + vidCodecsList[c] + '(objective_metrics).csv', 'utf8')).split('\n'));
            }
            for (var c = 0;c<vidCodecsList.length;c++) {
              var remMSSIM = readObjmetric[c][3].replace(/"([^"]+(?="))"/g, '$1');
              var resultM = remMSSIM.split(',');
              resultM.splice(0,1);
              resultM.unshift(vidCodecsList[c]);
              mssimCArray.push(resultM);
            }
            bitRates.length = mssimCArray[0].length-1;
            options = {
              args : [mssimCArray, bitRates, vidName, 'MS-SSIM']
            };
          } catch(err) {
            swal.fire({
              title: 'Objective metrics for video could not be found!',
              icon: 'error',
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK!'
            });
          }
        } else if (document.querySelector('input[name="plots"]:checked').value == '100-DMOS') {
          var dmosCarray = [];
          var dmosCarrayS = [];
          var tempArray = [];
          var indexDMOS;
          if (fs.existsSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv')) {
            var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv', 'utf8')).split('\n'));
            for (var i=0;i<(readData[0].split(',')).length;i++) {
              if ((readData[0].split(',')[i]).replace(/"([^"]+(?="))"/g, '$1') == 'MOS') {
                indexDMOS = i;
                break;
              }
            }
            for (var i=1;i<readData.length;i++) {
              if (readData[i].split(',')[0].indexOf(vidName) != -1) {
                dmosNum = readData[i].split(',')[indexDMOS].replace(/"([^"]+(?="))"/g, '$1');
                dmosName = readData[i].split(',')[0].replace(/"([^"]+(?="))"/g, '$1');
                errorNum = (readData[i].split(',')[indexDMOS+2]).replace(/"([^"]+(?="))"/g, '$1');
                tempArray.push(dmosName.split('_')[(dmosName.split('_')).length-1]);
                tempArray.push(100-dmosNum);
                tempArray.push(errorNum);
                dmosCarray.push(tempArray);
                tempArray = [];
              }
            }
            for (var i=0;i<vidCodecsList.length;i++) {
              for (var j=0;j<dmosCarray.length;j++) {
                if (dmosCarray[j][0] == vidCodecsList[i]) {
                  dmosCarrayS.push(dmosCarray[j]);
                }
              }
            }
            var secondtempA = [];
            var thirdA = [];
            var errorTempA = [];
            for (var i = 0; i<dmosCarrayS.length;i++) {
              if (i < dmosCarrayS.length-1) {
                if (dmosCarrayS[i][0] == dmosCarrayS[i+1][0]) {
                  secondtempA.push(dmosCarrayS[i][1]);
                  errorTempA.push(dmosCarrayS[i][2]);
                } else {
                  errorTempA.push(dmosCarrayS[i][2]);
                  secondtempA.push(dmosCarrayS[i][1]);
                  secondtempA.unshift(dmosCarrayS[i][0]);
                  secondtempA = secondtempA.concat(errorTempA);
                  thirdA.push(secondtempA);
                  errorTempA = [];
                  secondtempA = [];
                }
              } else {
                errorTempA.push(dmosCarrayS[i][2]);
                secondtempA.push(dmosCarrayS[i][1]);
              }
            }
            secondtempA.unshift(dmosCarrayS[dmosCarray.length-1][0]);
            secondtempA = secondtempA.concat(errorTempA);
            thirdA.push(secondtempA);
            dmosCarrayS = thirdA;
            bitRates.length = (dmosCarrayS[0].length-1)/2;
            options = {
              args : [dmosCarrayS, bitRates, vidName, '100-DMOS']
            };
          } else {
            swal.fire({
              title: 'No data to plot!',
              icon: 'error',
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK!'
            });
            document.getElementById('confirmPlots').disabled = false;
            document.getElementById('exportall').disabled = false;
            document.getElementById('compareB').disabled = false;
          }
        } else if (document.querySelector('input[name="plots"]:checked').value == 'DMOS') {
          var dmosCarray = [];
          var dmosCarrayS = [];
          var tempArray = [];
          var indexDMOS;
          if (fs.existsSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv')) {
            var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv', 'utf8')).split('\n'));
            for (var i=0;i<(readData[0].split(',')).length;i++) {
              if ((readData[0].split(',')[i]).replace(/"([^"]+(?="))"/g, '$1') == 'MOS') {
                indexDMOS = i;
                break;
              }
            }
            for (var i=1;i<readData.length;i++) {
              if (readData[i].split(',')[0].indexOf(vidName) != -1) {
                dmosNum = readData[i].split(',')[indexDMOS].replace(/"([^"]+(?="))"/g, '$1');
                dmosName = readData[i].split(',')[0].replace(/"([^"]+(?="))"/g, '$1');
                errorNum = (readData[i].split(',')[indexDMOS+2]).replace(/"([^"]+(?="))"/g, '$1');
                tempArray.push(dmosName.split('_')[(dmosName.split('_')).length-1]);
                tempArray.push(dmosNum);
                tempArray.push(errorNum);
                dmosCarray.push(tempArray);
                tempArray = [];
              }
            }
            for (var i=0;i<vidCodecsList.length;i++) {
              for (var j=0;j<dmosCarray.length;j++) {
                if (dmosCarray[j][0] == vidCodecsList[i]) {
                  dmosCarrayS.push(dmosCarray[j]);
                }
              }
            }
            var secondtempA = [];
            var thirdA = [];
            var errorTempA = [];
            for (var i = 0; i<dmosCarray.length;i++) {
              if (i < dmosCarrayS.length-1) {
                if (dmosCarrayS[i][0] == dmosCarrayS[i+1][0]) {
                  secondtempA.push(dmosCarrayS[i][1]);
                  errorTempA.push(dmosCarrayS[i][2]);
                } else {
                  errorTempA.push(dmosCarrayS[i][2]);
                  secondtempA.push(dmosCarrayS[i][1]);
                  secondtempA.unshift(dmosCarrayS[i][0]);
                  secondtempA = secondtempA.concat(errorTempA);
                  thirdA.push(secondtempA);
                  errorTempA = [];
                  secondtempA = [];
                }
              } else {
                errorTempA.push(dmosCarrayS[i][2]);
                secondtempA.push(dmosCarrayS[i][1]);
              }
            }
            secondtempA.unshift(dmosCarrayS[dmosCarrayS.length-1][0]);
            secondtempA = secondtempA.concat(errorTempA);
            thirdA.push(secondtempA);
            dmosCarrayS = thirdA;
            bitRates.length = (dmosCarrayS[0].length-1)/2;
            options = {
              args : [dmosCarrayS, bitRates, vidName, 'DMOS']
            };
          }
        } else {
          swal.fire({
            title: 'No data to plot!',
            icon: 'error',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK!'
          });
          document.getElementById('confirmPlots').disabled = false;
          document.getElementById('exportall').disabled = false;
          document.getElementById('compareB').disabled = false;
        }
        
        document.getElementById('compareB').disabled = true;
        if (pyshell1 != undefined) {
          pyshell1.terminate();
        }
        if ((document.querySelector('input[name="plots"]:checked').value == 'DMOS' || document.querySelector('input[name="plots"]:checked').value == '100-DMOS') && !fs.existsSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv')) {
          swal.fire({
            title: 'No data to plot!',
            icon: 'error',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK!'
          });
          document.getElementById('confirmPlots').disabled = false;
          document.getElementById('compareB').disabled = false;
          document.getElementById('exportall').disabled = false;
        } else if ((document.querySelector('input[name="plots"]:checked').value == 'PSNR' || document.querySelector('input[name="plots"]:checked').value == 'VMAF' || document.querySelector('input[name="plots"]:checked').value == 'MS-SSIM') && !fs.existsSync("../Experiments/" + viewPlots.value + "/Objective_metrics/" + videoList.value + '(objective_metrics).csv')) {
          swal.fire({
            title: 'No objective data to plot!',
            icon: 'error',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK!'
          });
          document.getElementById('confirmPlots').disabled = false;
          document.getElementById('exportall').disabled = false;
          document.getElementById('compareB').disabled = false;
        } else {
          var pyshell = new PythonShell('compareCodecs.py', options);
          setTimeout(function() {
            document.getElementById('confirmPlots').disabled = true;
            document.getElementById('exportall').disabled = true;
          }, 50);
          pyshell.on('message', function (message) {
            console.log(message);
          });
          pyshell.end(function (err) {
            document.getElementById('confirmPlots').disabled = false;
            document.getElementById('compareB').disabled = false;
            document.getElementById('exportall').disabled = false;
            if (err) console.log(err);
          }); 
        }
      } else {
        swal.fire({
          title: 'Bitrates datafile is wrong!',
          text: 'Please ensure the file is named: bitrates.csv',
          icon: 'error',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK!'
        });
        document.getElementById('confirmPlots').disabled = false;
        document.getElementById('compareB').disabled = false;
        document.getElementById('exportall').disabled = false;
      }
    } else {
      swal.fire({
        title: 'Bitrates datafile is missing!',
        icon: 'error',
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK!'
      });
      document.getElementById('confirmPlots').disabled = false;
      document.getElementById('exportall').disabled = false;
      $('#buttonC').addClass('transitionEffect');
      document.getElementById('compareB').disabled = false;
      document.getElementById('bitrateForm').style.visibility = "visible";
    }
  }
});
//-----------------------END COMPARE BUTTON------------------------------//
//-----------------------------------------------------------------------//


//------------------------SET BITRATE FORM-------------------//
$(document).on('change', '#up3', function() {
  bitRate = document.getElementById('up3').files;
  $(this).closest('.form-group').find('.form-control').attr("value", bitRate[0].name);
  bitRateT.title = bitRate[0].name;
});
//-----------------------------------------------------------//