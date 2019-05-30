const {PythonShell} =  require('python-shell');
var fs = require('fs');
var path = require('path');
var DistortedFileNames = [];
var OriginalFileNames = [];
var bitRateT = document.getElementById('up3');
var bitRate;
var bitratesPath;
var QParr = []
var both;
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
      if (fs.statSync(curFile).isFile() && curFile.indexOf('bitrates.csv') != -1) {
        filesToReturn.push(curFile.replace(dir, ''));
      } else if (fs.statSync(curFile).isDirectory()) {
        walkDir(curFile);
      }
    }
  };
  walkDir(dir);
  return filesToReturn; 
}

var directoriesList = getDirectories("../Experiments");
directoriesList.splice( directoriesList.indexOf('Saved'), 1 );
console.log(directoriesList);

var viewScores = document.getElementById("viewScores");
var viewPlots = document.getElementById("viewPlots");
var videoList = document.getElementById("videoList");
for (var i =0;i<directoriesList.length; i++){
  viewScores.options[viewScores.options.length] = new Option(directoriesList[i], directoriesList[i]);
  viewPlots.options[viewPlots.options.length] = new Option(directoriesList[i], directoriesList[i]);
}
$('#viewScores').on('change', function() {
  $('#secondForm').removeClass('transitionBack');
  $('#secondForm').addClass('transitionEffect');
  document.getElementById('videoList').style.visibility = "hidden";
  document.getElementById("bitrateForm").style.visibility = "hidden";
  document.getElementById('viewPlots').selectedIndex = "0";
  document.getElementById("confirmPlots").style.visibility = "hidden";
  document.getElementById("compareB").style.visibility = "hidden";
  document.getElementById("secondCont").style.visibility = "hidden";
  $('input[name="plots"]').prop('checked', false);
  setTimeout(function(){
    document.getElementById("firstRadios").style.visibility = "visible";
  }, 1000)
})

$('#videoList').on('change', function() {
  QParr = [];
  document.getElementById('secondCont').style.visibility = "visible";
  var readFiles = fs.readFileSync("../Experiments/" + viewPlots.value + "/" + viewPlots.value + '(config)' + ".csv",'utf8');
  var FileListwName = readFiles.split('\n');
  DistortedFileNames = FileListwName[2].split(',');
  DistortedFileNames.splice(0,1);
  for (var j = 0;j<DistortedFileNames.length;j++){
    if(DistortedFileNames[j].split('_')[0].includes((videoList.value).split('_')[0])){
      if(DistortedFileNames[j].split('_')[6].includes('QP')){
        QParr.push( (DistortedFileNames[j].split('_')[6]).substr(2) )
      }
    }
  }
})

$('#viewPlots').on('change', function() {
  console.log("CHANGE")
  $('#secondForm').removeClass('transitionEffect');
  $('#secondForm').addClass('transitionBack');
  $('#buttonC').removeClass('transitionEffect');
  $('#buttonC').addClass('transitionBackBut');
  //$('#buttonC').addClass('transitionBackBut');
  $('input[name="data"]').prop('checked', false);
  $('input[name="plots"]').prop('checked', false);
  document.getElementById('viewScores').selectedIndex = "0";
  document.getElementById("firstRadios").style.visibility = "hidden";
  document.getElementById("confirmData").style.visibility = "hidden";
  document.getElementById("videoList").style.visibility = "visible";
  document.getElementById("secondCont").style.visibility = "hidden";
  document.getElementById("bitrateForm").style.visibility = "hidden";
  document.getElementById("confirmPlots").style.visibility = "hidden";
  document.getElementById("compareB").style.visibility = "hidden";
  var av1T = false;
  var hmT = false;
  videoList.options.length = 0;
  videoList.options[videoList.options.length] = new Option("Choose...", "Choose...");
  $('#videoList option[value="Choose..."]').attr('disabled', 'true');
  var readFiles = fs.readFileSync("../Experiments/" + viewPlots.value + "/" + viewPlots.value + '(config)' + ".csv",'utf8');
  var FileListwName = readFiles.split('\n');
  DistortedFileNames = FileListwName[2].split(',');
  OriginalFileNames = FileListwName[4].split(',');
  DistortedFileNames.splice(0,1);
  OriginalFileNames.splice(0,1);
  for (var i = 0;i<OriginalFileNames.length; i++){
    for (var j = 0;j<DistortedFileNames.length;j++){
      if( OriginalFileNames[i].split('_')[0].includes(DistortedFileNames[j].split('_')[0]) ){
        if(DistortedFileNames[j].split('_')[7].includes('AV1')){
          av1T = true;
        }
        else if(DistortedFileNames[j].split('_')[7].includes('HM')){
          hmT = true;
        }
      }
    }
    if(av1T == true && hmT == true){
      both = true;
      if(OriginalFileNames[i].length > 1){
        videoList.options[videoList.options.length] = new Option(OriginalFileNames[i].split('_')[0] + '_AV1', OriginalFileNames[i].split('_')[0] + '_AV1');
        videoList.options[videoList.options.length] = new Option(OriginalFileNames[i].split('_')[0] + '_HM', OriginalFileNames[i].split('_')[0] + '_HM');
      }
    }
    else if(av1T == true){
      both = false;
      if(OriginalFileNames[i].length > 1){
        videoList.options[videoList.options.length] = new Option(OriginalFileNames[i].split('_')[0] + '_AV1', OriginalFileNames[i].split('_')[0] + '_AV1');  
      }
    }
    else if(hmT == true){
      both = false;
      if(OriginalFileNames[i].length > 1){
        videoList.options[videoList.options.length] = new Option(OriginalFileNames[i].split('_')[0] + '_HM', OriginalFileNames[i].split('_')[0] + '_HM');
      }
    }
  }
});

$('input[name="plots"]').on('change', function(){
  bitratesPath = getFilesFromDir("../Experiments/" + viewPlots.value);
  console.log(both)
  if(both == true){
    document.getElementById('compareB').disabled = false;
  } else{
    document.getElementById('compareB').disabled = true;
  }
  console.log(bitratesPath)
  if(bitratesPath.length == 0 && QParr.length == 0){
    $('#buttonC').addClass('transitionEffect');
    setTimeout(function(){
      document.getElementById('bitrateForm').style.visibility = "visible";
    },500)
  } else{
    $('#buttonC').removeClass('transitionEffect');
    $('#buttonC').addClass('transitionBackBut');
    document.getElementById('bitrateForm').style.visibility = "hidden";
  }
  var selVideo = document.getElementById("videoList");
  console.log(selVideo.value)
  document.getElementById("confirmPlots").style.visibility = "visible";
  document.getElementById("compareB").style.visibility = "visible";
  //document.getElementById("bitrateForm").style.visibility = "visible";
})

$('input[name="data"]').on('change', function(){
  document.getElementById("confirmData").style.visibility = "visible";
})

$('#confirmData').click(function() {
  var selExp = document.getElementById("viewScores").value;
  var readFiles = fs.readFileSync("../Experiments/" + selExp + "/" + selExp + '(config)' + ".csv",'utf8');
  var presMethod = (readFiles.split('\n'))[1].split(',')[1];
  if(document.querySelector('input[name="data"]:checked').value == 'raw'){
    document.getElementById('confirmData').disabled = true;
    var options = {
      args : [selExp,presMethod]
    };
    var pyshell = new PythonShell('extractData.py', options);
    
    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
      document.getElementById('confirmData').disabled = false;
      if (err){
        var errorP = err
        if(String(errorP).includes("NO DATA FOUND")){
          swal.fire({
            title: String(errorP),
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
            confirmButtonText: 'OK!'
          })  
        }else{
          alert(err)
        }
      }
      else{
        swal.fire({
          title: 'Complete!',
          text: 'Data sucessfully exported to experiment folder',
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })  
      }
    });
  }
  else if(document.querySelector('input[name="data"]:checked').value == 'processed') {
    swal.fire({
      title: 'No outliers detected!',
      type: 'info',
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!'
    })
  }
})
var pyshell1;
$('#confirmPlots').click(function(){
  bitratesPath = getFilesFromDir("../Experiments/" + viewPlots.value);
  document.getElementById('confirmPlots').disabled = true;
  document.getElementById('compareB').disabled = true;
  var indexBitrate;
  var options;
  var vidCodec;
  if(document.getElementById("videoList").value == 'Choose...'){
    swal.fire({
      title: 'No video selected!',
      type: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false,
      confirmButtonText: 'OK!'
    })  
  }else{
    //console.log(bitRate)
    if(bitRate != undefined || bitratesPath.length != 0 || QParr.length != 0){
      if(bitratesPath.length != 0 || bitRate != undefined || QParr.length != 0){
        
        if(bitratesPath.length != 0){
          document.getElementById('bitrateForm').style.visibility = "hidden";
          $('#buttonC').removeClass('transitionEffect');
          $('#buttonC').addClass('transitionBackBut');
          var readBitRates = ((fs.readFileSync(bitratesPath[0],'utf8'))).split('\n')//.split(',');
        }
        else if (QParr !=0){
          document.getElementById('bitrateForm').style.visibility = "hidden";
          $('#buttonC').removeClass('transitionEffect');
          $('#buttonC').addClass('transitionBackBut');
        }
        else if(bitRate[0].name == 'bitrates.csv'){
          var readBitRates = ((fs.readFileSync(bitRate[0].path,'utf8'))).split('\n')//.split(',');
        }
        var vidName = (document.getElementById("videoList").value).split('_')[0];
        if (QParr == 0){
          for (var i=0;i<readBitRates.length;i++){
            if(vidName.indexOf(readBitRates[i].split(',')[0]) != -1){
              indexBitrate = i;
              break;
            }
          }
          
          var bitRates = readBitRates[indexBitrate].split(',')
          bitRates.splice(0,1)
        }
        if ( (document.getElementById("videoList").value).split('_')[1] == "AV1" ){
          var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/Objective_metrics/" + videoList.value + '(objective_metrics).csv','utf8')).split('\n'))//.split(',');
          vidCodec = 'AV1'
        }
        else if((document.getElementById("videoList").value).split('_')[1] == "HM" ){
          var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/Objective_metrics/" + videoList.value + '(objective_metrics).csv','utf8')).split('\n'))//.split(',');
          vidCodec = 'HM'
        }
        //console.log(readData)
        
        if (document.querySelector('input[name="plots"]:checked').value == 'PSNR' ){
          var remQPSNR = readData[2].replace(/"([^"]+(?="))"/g, '$1')
          var psnr = remQPSNR.split(',')
          psnr.splice(0,1);
          // console.log(psnr)
          // console.log(bitRates)
          if (QParr.length == 0){
            bitRates.length = psnr.length;
            options = {
              args : [psnr,bitRates,vidName,'PSNR(db)',vidCodec]
            };
          }else{
            var qpF = 1;
            options = {
              args : [psnr,QParr,vidName,'PSNR(db)',vidCodec,qpF]
            };
          }
        }
        else if(document.querySelector('input[name="plots"]:checked').value == 'VMAF' ){
          var remQVMAF = readData[1].replace(/"([^"]+(?="))"/g, '$1')
          var vmaf = remQVMAF.split(',')
          vmaf.splice(0,1);
          if (QParr.length == 0){
            bitRates.length = vmaf.length;
            options = {
              args : [vmaf,bitRates,vidName,'VMAF',vidCodec]
            };
          }else{
            var qpF = 1;
            options = {
              args : [vmaf,QParr,vidName,'VMAF',vidCodec,qpF]
            };
          }
        }
        else if(document.querySelector('input[name="plots"]:checked').value == 'MS-SSIM' ){
          var remQMSSSIM = readData[3].replace(/"([^"]+(?="))"/g, '$1')
          var msssim = remQMSSSIM.split(',')
          msssim.splice(0,1);
          if(QParr.length == 0){
            bitRates.length = msssim.length;
            options = {
              args : [msssim,bitRates,vidName,'MS-SSIM',vidCodec]
            };
          }else{
            var qpF = 1;
            options = {
              args : [msssim,QParr,vidName,'MS-SSIM',vidCodec,qpF]
            };
          }
        }
        
        else if(document.querySelector('input[name="plots"]:checked').value == '100-DMOS' ){
          var dmos = []
          if (fs.existsSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv')){
            var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv','utf8')).split('\n'))
            for(var i=0;i<(readData[0].split(',')).length;i++){
              if( (readData[0].split(',')[i]).replace(/"([^"]+(?="))"/g, '$1') == 'MOS' ){
                indexMOS = i;
                break;
              }
            }
            console.log(readData.length)
            for(var i=1;i<readData.length;i++){
              if(readData[i].split(',')[0].indexOf(vidName) != -1 && readData[i].split(',')[0].indexOf(vidCodec) != -1){
                dmosM = (readData[i].split(',')[indexMOS]).replace(/"([^"]+(?="))"/g, '$1')
                dmos.push(100-dmosM)
              }
            }
            if(QParr.length == 0){
              bitRates.length = dmos.length;
              options = {
                args : [dmos,bitRates,vidName,'100-DMOS',vidCodec]
              };
            }
            else{
              var qpF = 1;
              options = {
                args : [dmos,QParr,vidName,'100-DMOS',vidCodec,qpF]
              };
            }
          }else{
            swal.fire({
              title: 'No data to plot!',
              type: 'error',
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK!'
            })
          }
        }
        
        else if(document.querySelector('input[name="plots"]:checked').value == 'DMOS' ){
          var dmos = []
          var remQVMAF = readData[1].replace(/"([^"]+(?="))"/g, '$1')
          var vmaf = remQVMAF.split(',')
          vmaf.splice(0,1);
          if (fs.existsSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv')){
            var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv','utf8')).split('\n'))
            for(var i=0;i<(readData[0].split(',')).length;i++){
              if( (readData[0].split(',')[i]).replace(/"([^"]+(?="))"/g, '$1') == 'MOS' ){
                indexMOS = i;
                break;
              }
            }
            console.log(readData.length)
            for(var i=1;i<readData.length;i++){
              if(readData[i].split(',')[0].indexOf(vidName) != -1 && readData[i].split(',')[0].indexOf(vidCodec) != -1){
                dmosM = (readData[i].split(',')[indexMOS]).replace(/"([^"]+(?="))"/g, '$1')
                dmos.push(dmosM)
              }
            }
            console.log(dmos)
            if(QParr.length == 0){
              bitRates.length = dmos.length;
              console.log(dmos)
              console.log(bitRates)
              options = {
                args : [dmos,bitRates,vidName,'DMOS',vidCodec]
              };
            }
            else{
              var qpF = 1;
              options = {
                args : [dmos,QParr,vidName,'DMOS',vidCodec,qpF,vmaf,'VMAF']
              };
            }
          }else{
            swal.fire({
              title: 'No data to plot!',
              type: 'error',
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK!'
            })
          }
        }
        
        pyshell1 = new PythonShell('plotSingle.py', options);
        pyshell1.on('message', function (message) {
          // received a message sent from the Python script (a simple "print" statement)
          console.log(message);
        });
        // end the input stream and allow the process to exit
        pyshell1.end(function (err) {
          document.getElementById('confirmPlots').disabled = false;
          if (err) alert(err);
        })
      }
      else{
        swal.fire({
          title: 'Bitrates datafile is wrong!',
          text: 'Please ensure the file is named: bitrates.csv',
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK!'
        })
        document.getElementById('confirmPlots').disabled = false;
        document.getElementById('compareB').disabled = false;
      }
    }
    else{
      swal.fire({
        title: 'Bitrates datafile is missing!',
        type: 'error',
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK!'
      })
      document.getElementById('bitrateForm').style.visibility = "visible";
      $('#buttonC').addClass('transitionEffect');
      document.getElementById('confirmPlots').disabled = false;
      document.getElementById('compareB').disabled = false;
    }
  }
})


$(document).on('click', '#compareB', function() {
  bitratesPath = getFilesFromDir("../Experiments/" + viewPlots.value);
  document.getElementById('confirmPlots').disabled = true;
  document.getElementById('compareB').disabled = true;
  var indexBitrate;
  var options;
  var vidCodecHM = 'HM';
  var vidCodecAV1 = 'AV1';
  if(document.getElementById("videoList").value == 'Choose...'){
    swal.fire({
      title: 'No video selected!',
      type: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false,
      confirmButtonText: 'OK!'
    })  
  }else{
    //console.log(bitRate)
    if(bitRate != undefined || bitratesPath.length != 0){
      if(bitratesPath.length != 0 || bitRate[0].name == 'bitrates.csv'){
        
        if(bitratesPath.length != 0){
          document.getElementById('bitrateForm').style.visibility = "hidden";
          $('#buttonC').removeClass('transitionEffect');
          $('#buttonC').addClass('transitionBackBut');
          var readBitRates = ((fs.readFileSync(bitratesPath[0],'utf8'))).split('\n')//.split(',');
        }
        else if(bitRate[0].name == 'bitrates.csv'){
          var readBitRates = ((fs.readFileSync(bitRate[0].path,'utf8'))).split('\n')//.split(',');
        }
        var vidName = (document.getElementById("videoList").value).split('_')[0];
        for (var i=0;i<readBitRates.length;i++){
          if(vidName.indexOf(readBitRates[i].split(',')[0]) != -1){
            indexBitrate = i;
            break;
          }
        }
        var bitRates = readBitRates[indexBitrate].split(',')
        bitRates.splice(0,1)
        var readHM = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/" + vidName + '_HM(objective_metrics).csv','utf8')).split('\n'))//.split(',');
        var readAV1 = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/" + vidName + '_AV1(objective_metrics).csv','utf8')).split('\n'))//.split(',');
        if (document.querySelector('input[name="plots"]:checked').value == 'PSNR' ){
          var remHMPSNR = readHM[2].replace(/"([^"]+(?="))"/g, '$1')
          var psnrHM = remHMPSNR.split(',')
          psnrHM.splice(0,1);
          var remAV1PSNR = readAV1[2].replace(/"([^"]+(?="))"/g, '$1')
          var psnrAV1 = remAV1PSNR.split(',')
          psnrAV1.splice(0,1);
          bitRates.length = psnrHM.length;
          //console.log(psnrHM)
          //console.log(psnrAV1)
          //console.log(bitRates)
          options = {
            args : [psnrHM,psnrAV1,bitRates,vidName,'PSNR(db)']
          };
        }
        else if (document.querySelector('input[name="plots"]:checked').value == 'VMAF' ){
          var remHMVMAF = readHM[1].replace(/"([^"]+(?="))"/g, '$1')
          var VMAFHM = remHMVMAF.split(',')
          VMAFHM.splice(0,1);
          var remAV1VMAF = readAV1[1].replace(/"([^"]+(?="))"/g, '$1')
          var VMAFAV1 = remAV1VMAF.split(',')
          VMAFAV1.splice(0,1);
          bitRates.length = VMAFHM.length;
          //console.log(psnrHM)
          //console.log(psnrAV1)
          //console.log(bitRates)
          options = {
            args : [VMAFHM,VMAFAV1,bitRates,vidName,'VMAF']
          };
        }
        else if (document.querySelector('input[name="plots"]:checked').value == 'MS-SSIM' ){
          var remHMSSIM = readHM[3].replace(/"([^"]+(?="))"/g, '$1')
          var SSIMHM = remHMSSIM.split(',')
          SSIMHM.splice(0,1);
          var remAV1SSIM = readAV1[3].replace(/"([^"]+(?="))"/g, '$1')
          var SSIMAV1 = remAV1SSIM.split(',')
          SSIMAV1.splice(0,1);
          bitRates.length = SSIMHM.length;
          //console.log(psnrHM)
          //console.log(psnrAV1)
          //console.log(bitRates)
          options = {
            args : [SSIMHM,SSIMAV1,bitRates,vidName,'SSIM']
          };
        }
        else if(document.querySelector('input[name="plots"]:checked').value == '100-DMOS' ){
          var dmosHM = []
          var errorHM = []
          var errorAV1 = []
          var dmosAV1 = []
          var indexMOS;
          if (fs.existsSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv')){
            var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv','utf8')).split('\n'))
            for(var i=0;i<(readData[0].split(',')).length;i++){
              if( (readData[0].split(',')[i]).replace(/"([^"]+(?="))"/g, '$1') == 'MOS' ){
                indexMOS = i;
                break;
              }
            }
            console.log(readData.length)
            for(var i=1;i<readData.length;i++){
              if(readData[i].split(',')[0].indexOf(vidName) != -1 && readData[i].split(',')[0].indexOf(vidCodecHM) != -1){
                dmosH = (readData[i].split(',')[indexMOS]).replace(/"([^"]+(?="))"/g, '$1')
                errorH = (readData[i].split(',')[indexMOS+2]).replace(/"([^"]+(?="))"/g, '$1')
                errorHM.push(errorH)
                dmosHM.push(100-dmosH)
              }
              else if (readData[i].split(',')[0].indexOf(vidName) != -1 && readData[i].split(',')[0].indexOf(vidCodecAV1) != -1){
                dmosA = (readData[i].split(',')[indexMOS]).replace(/"([^"]+(?="))"/g, '$1')
                errorA = (readData[i].split(',')[indexMOS+2]).replace(/"([^"]+(?="))"/g, '$1')
                errorAV1.push(errorA)
                dmosAV1.push(100-dmosA)
              }
            }
            bitRates.length = dmosHM.length;
            //console.log(dmos)
            //console.log(bitRates)
            options = {
              args : [dmosHM,dmosAV1,bitRates,vidName,'100-DMOS',errorHM,errorAV1]
            };
          }else{
            swal.fire({
              title: 'No data to plot!',
              type: 'error',
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK!'
            })
          }
        }
        else if(document.querySelector('input[name="plots"]:checked').value == 'DMOS' ){
          var dmosHM = []
          var errorHM = []
          var errorAV1 = []
          var dmosAV1 = []
          var indexMOS;
          if (fs.existsSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv')){
            var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv','utf8')).split('\n'))
            for(var i=0;i<(readData[0].split(',')).length;i++){
              if( (readData[0].split(',')[i]).replace(/"([^"]+(?="))"/g, '$1') == 'MOS' ){
                indexMOS = i;
                break;
              }
            }
            console.log(readData.length)
            for(var i=1;i<readData.length;i++){
              if(readData[i].split(',')[0].indexOf(vidName) != -1 && readData[i].split(',')[0].indexOf(vidCodecHM) != -1){
                dmosH = (readData[i].split(',')[indexMOS]).replace(/"([^"]+(?="))"/g, '$1')
                errorH = (readData[i].split(',')[indexMOS+2]).replace(/"([^"]+(?="))"/g, '$1')
                errorHM.push(errorH)
                dmosHM.push(dmosH)
              }
              else if (readData[i].split(',')[0].indexOf(vidName) != -1 && readData[i].split(',')[0].indexOf(vidCodecAV1) != -1){
                dmosA = (readData[i].split(',')[indexMOS]).replace(/"([^"]+(?="))"/g, '$1')
                errorA = (readData[i].split(',')[indexMOS+2]).replace(/"([^"]+(?="))"/g, '$1')
                errorAV1.push(errorA)
                dmosAV1.push(dmosA)
              }
            }
            bitRates.length = dmosHM.length;
            //console.log(dmos)
            console.log(bitRates)
            options = {
              args : [dmosHM,dmosAV1,bitRates,vidName,'DMOS',errorHM,errorAV1]
            };
          }
        }else{
          swal.fire({
            title: 'No data to plot!',
            type: 'error',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK!'
          })
        }
        
        document.getElementById('compareB').disabled = true;
        if(pyshell1 != undefined){
          pyshell1.terminate();
        }
        
        var pyshell = new PythonShell('compareCodecs.py', options);
        setTimeout(function(){
          document.getElementById('confirmPlots').disabled = true;
        },50)
        // end the input stream and allow the process to exit
        pyshell.end(function (err) {
          document.getElementById('confirmPlots').disabled = false;
          document.getElementById('compareB').disabled = false;
          if (err) alert(err);
        }) 
      }
      else{
        swal.fire({
          title: 'Bitrates datafile is wrong!',
          text: 'Please ensure the file is named: bitrates.csv',
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK!'
        })
        document.getElementById('confirmPlots').disabled = false;
        document.getElementById('compareB').disabled = false;
      }
    }
    else{
      swal.fire({
        title: 'Bitrates datafile is missing!',
        type: 'error',
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK!'
      })
      document.getElementById('confirmPlots').disabled = false;
      $('#buttonC').addClass('transitionEffect');
      document.getElementById('compareB').disabled = false;
      document.getElementById('bitrateForm').style.visibility = "visible";
    }
  }
})

$(document).on('change','#up3', function(){
  bitRate = document.getElementById('up3').files;
  console.log(bitRate)
  $(this).closest('.form-group').find('.form-control').attr("value",bitRate[0].name);
  bitRateT.title = bitRate[0].name
});