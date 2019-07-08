const {PythonShell} =  require('python-shell');
var fs = require('fs');
var path = require('path');
var DistortedFileNames = [];
var OriginalFileNames = [];
var bitRateT = document.getElementById('up3');
var bitRate;
var bitratesPath;
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
//----------------------------------------------------------------------//
//----------------------------------------------------------------------//


var directoriesList = getDirectories("../Experiments");
directoriesList.splice( directoriesList.indexOf('Saved'), 1 );
var viewScores = document.getElementById("viewScores");
var viewPlots = document.getElementById("viewPlots");
var videoList = document.getElementById("videoList");

for (var i =0;i<directoriesList.length; i++){
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
  setTimeout(function(){
    document.getElementById("firstRadios").style.visibility = "visible";
  }, 1000)
})
//-------------------------------------------------------------//
//-------------------------------------------------------------//

//-----------------------------Read videos and check if QP is present---------------------------//
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
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

//----------------------Plots Experiment change-------------------------------------------//
$('#viewPlots').on('change', function() {
  vidCodecsList = [];
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
  document.getElementById("exportall").style.visibility = "hidden";
  document.getElementById("compareB").style.visibility = "hidden";
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
        //-------------CHANGED-----------------//
        if(DistortedFileNames[j].split('_')[7].includes('.')){
          vidCodecsList.push((DistortedFileNames[j].split('_')[7]).slice(0,-4));
        } else{
          vidCodecsList.push((DistortedFileNames[j].split('_')[7]));
        }
        vidCodecsList = Array.from(new Set(vidCodecsList));
      }
    }
    for(var t = 0; t<vidCodecsList.length;t++){
      if(OriginalFileNames[i].length > 1){
        videoList.options[videoList.options.length] = new Option(OriginalFileNames[i].split('_')[0] + '_' + vidCodecsList[t], OriginalFileNames[i].split('_')[0] + '_' + vidCodecsList[t]);
      }
    }
    //--------------CHANGE ENDS HERE--------------------//
  }
});
//--------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------//

//PLOTS CLICK!!!
//-----------------------------------------//
$('input[name="plots"]').on('change', function(){
  document.getElementById('confirmPlots').disabled = false;          
  document.getElementById('exportall').disabled = false;
  bitratesPath = getFilesFromDir("../Experiments/" + viewPlots.value);
  console.log(vidCodecsList.length)
  if(vidCodecsList.length > 1){
    document.getElementById('compareB').disabled = false;
  } else{
    document.getElementById('compareB').disabled = true;
  }
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
  document.getElementById("confirmPlots").style.visibility = "visible";
  document.getElementById("exportall").style.visibility = "visible";
  document.getElementById("compareB").style.visibility = "visible";
})
//-------------PLOTS CLICK END------------------------------------//
//---------------------------------------------------------------//

//--------------------EXPORT DATA STUFF--------------------------//
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
//----------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------//


//--------------------------------CONFIRM PLOTS BUTTON------------------------------//
var pyshell1;
$('#confirmPlots').click(function(){
  bitratesPath = getFilesFromDir("../Experiments/" + viewPlots.value);
  console.log(bitratesPath)
  document.getElementById('confirmPlots').disabled = true;
  document.getElementById('exportall').disabled = true;
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
    
    if(bitRate != undefined || bitratesPath.length != 0 || QParr.length != 0){
      if(bitratesPath.length != 0 || bitRate != undefined || QParr.length != 0){
        
        if(bitratesPath.length != 0){
          document.getElementById('bitrateForm').style.visibility = "hidden";
          $('#buttonC').removeClass('transitionEffect');
          $('#buttonC').addClass('transitionBackBut');
          var readBitRates = ((fs.readFileSync(bitratesPath[0],'utf8'))).split('\n')//.split(',');
          console.log(readBitRates)
        }
        else if (QParr !=0){
          document.getElementById('bitrateForm').style.visibility = "hidden";
          $('#buttonC').removeClass('transitionEffect');
          $('#buttonC').addClass('transitionBackBut');
        }
        else if(bitRate[0].name == 'bitrates.csv'){
          var readBitRates = ((fs.readFileSync(bitRate[0].path,'utf8'))).split('\n')//.split(',');
          console.log(readBitRates)
        }
        var vidName = (document.getElementById("videoList").value).split('_')[0];
        console.log(vidName)
        if (QParr == 0){
          for (var i=0;i<readBitRates.length;i++){
            if(vidName.indexOf(readBitRates[i].split(',')[0]) != -1){
              console.log("ENTAAH")
              indexBitrate = i;
              break;
            }
          }
          var bitRates = readBitRates[indexBitrate].split(',')
          console.log(bitRates)
          console.log(readBitRates)
          bitRates.splice(0,1)
        }
        if(bitRates.length < 3){
          swal.fire({
            title: 'Bitrates for video could not be found!',
            type: 'error',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK!'
          })
          document.getElementById('confirmPlots').disabled = false;
          document.getElementById('compareB').disabled = false;
          document.getElementById('exportall').disabled = false;
        }else{
          //------------------CHANGED-------------------------//
          var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/Objective_metrics/" + videoList.value + '(objective_metrics).csv','utf8')).split('\n'))//.split(',');
          vidCodec = (document.getElementById("videoList").value).split('_')[1]
          //----------------CHANGE ENDS HERE------------------//
          
          if (document.querySelector('input[name="plots"]:checked').value == 'PSNR' ){
            var remQPSNR = readData[2].replace(/"([^"]+(?="))"/g, '$1')
            var psnr = remQPSNR.split(',')
            psnr.splice(0,1);
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
            console.log(readData)
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
              for(var i=1;i<readData.length;i++){
                if(readData[i].split(',')[0].indexOf(vidName) != -1 && readData[i].split(',')[0].indexOf(vidCodec) != -1){
                  dmosM = (readData[i].split(',')[indexMOS]).replace(/"([^"]+(?="))"/g, '$1')
                  dmos.push(dmosM)
                }
              }
              if(QParr.length == 0){
                bitRates.length = dmos.length;
                options = {
                  args : [dmos,bitRates,vidName,'DMOS',vidCodec]
                };
              }
              else{
                var qpF = 1;
                options = {
                  args : [dmos,QParr,vidName,'DMOS',vidCodec,qpF]
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
          //END OF IFFFFFFFF
          
          pyshell1 = new PythonShell('plotSingle.py', options);
          pyshell1.on('message', function (message) {
            // received a message sent from the Python script (a simple "print" statement)
            console.log(message);
          });
          // end the input stream and allow the process to exit
          pyshell1.end(function (err) {
            document.getElementById('confirmPlots').disabled = false;
            document.getElementById('exportall').disabled = false;
            document.getElementById('compareB').disabled = false;
            //if (err) alert(err);
          })
        }
      }
      //END OF SECOND IF----------------------------------------------------------
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
        document.getElementById('exportall').disabled = false;
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
      document.getElementById('exportall').disabled = false;
      document.getElementById('compareB').disabled = false;
    }
    
  }
})
//-------------------------------CONFIRM END-------------------------------//
//------------------------------THIS IS GOOD-------------------------------//


//------------------------------COMPARE BUTTON-----------------------------//
//----------------------------- THIS NEEDS CHANGE -------------------------//
$(document).on('click', '#compareB', function() {
  bitratesPath = getFilesFromDir("../Experiments/" + viewPlots.value);
  document.getElementById('confirmPlots').disabled = true;
  document.getElementById('exportall').disabled = true;
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
    if(bitRate != undefined || bitratesPath.length != 0 || QParr.length != 0){
      if(bitratesPath.length != 0 || bitRate != undefined || QParr.length != 0){
        if(bitratesPath.length != 0){
          document.getElementById('bitrateForm').style.visibility = "hidden";
          $('#buttonC').removeClass('transitionEffect');
          $('#buttonC').addClass('transitionBackBut');
          var readBitRates = ((fs.readFileSync(bitratesPath[0],'utf8'))).split('\n')//.split(',');
        }
        else if (QParr != 0){
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
        readObjmetric = [];
        for (var c = 0;c<vidCodecsList.length;c++){
          readObjmetric.push((fs.readFileSync("../Experiments/" + viewPlots.value + "/Objective_metrics/" + vidName + '_' + vidCodecsList[c] + '(objective_metrics).csv','utf8')).split('\n'))
        }
        if (document.querySelector('input[name="plots"]:checked').value == 'PSNR' ){
          psnrCArray = [];
          for(var c = 0;c<vidCodecsList.length;c++){
            var remPSNR = readObjmetric[c][2].replace(/"([^"]+(?="))"/g, '$1');
            var resultP = remPSNR.split(',');
            resultP.splice(0,1)
            resultP.unshift(vidCodecsList[c])
            psnrCArray.push(resultP); 
          }
          bitRates.length = psnrCArray[0].length-1;
          options = {
            args : [psnrCArray,bitRates,vidName,'PSNR(db)']
          };
        }
        else if (document.querySelector('input[name="plots"]:checked').value == 'VMAF' ){
          vmafCArray = [];
          for(var c = 0;c<vidCodecsList.length;c++){
            var remVMAF = readObjmetric[c][1].replace(/"([^"]+(?="))"/g, '$1');
            var resultV = remVMAF.split(',');
            resultV.splice(0,1)
            resultV.unshift(vidCodecsList[c])
            vmafCArray.push(resultV); 
          }
          bitRates.length = vmafCArray[0].length-1;
          options = {
            args : [vmafCArray,bitRates,vidName,'VMAF']
          };
        }
        else if (document.querySelector('input[name="plots"]:checked').value == 'MS-SSIM' ){
          mssimCArray = [];
          for(var c = 0;c<vidCodecsList.length;c++){
            var remMSSIM = readObjmetric[c][3].replace(/"([^"]+(?="))"/g, '$1');
            var resultM = remMSSIM.split(',');
            resultM.splice(0,1)
            resultM.unshift(vidCodecsList[c])
            mssimCArray.push(resultM);
          }console.log(mssimCArray)
          bitRates.length = mssimCArray[0].length-1;
          options = {
            args : [mssimCArray,bitRates,vidName,'MS-SSIM']
          };
        }
        else if(document.querySelector('input[name="plots"]:checked').value == '100-DMOS' ){
          var dmosCarray = []
          var tempArray = []
          var indexDMOS;
          if (fs.existsSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv')){
            var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv','utf8')).split('\n'))
            for(var i=0;i<(readData[0].split(',')).length;i++){
              if( (readData[0].split(',')[i]).replace(/"([^"]+(?="))"/g, '$1') == 'MOS' ){
                indexDMOS = i;
                break;
              }
            }
            
            for(var i=1;i<readData.length;i++){
              if(readData[i].split(',')[0].indexOf(vidName) != -1){
                dmosNum = readData[i].split(',')[indexDMOS].replace(/"([^"]+(?="))"/g, '$1')
                dmosName = readData[i].split(',')[0].replace(/"([^"]+(?="))"/g, '$1')
                errorNum = (readData[i].split(',')[indexDMOS+2]).replace(/"([^"]+(?="))"/g, '$1')
                tempArray.push(dmosName.split('_')[(dmosName.split('_')).length-1])
                tempArray.push(100-dmosNum)
                tempArray.push(errorNum)
                dmosCarray.push(tempArray)
                tempArray = []
              }
            }
            dmosCarray.sort(specialComparator);
            var secondtempA = [];
            var thirdA = []
            var errorTempA = []
            for (var i = 0; i<dmosCarray.length;i++){
              if(i < dmosCarray.length-1){
                if(dmosCarray[i][0] == dmosCarray[i+1][0]){
                  secondtempA.push(dmosCarray[i][1])
                  errorTempA.push(dmosCarray[i][2])
                }else{
                  errorTempA.push(dmosCarray[i][2])
                  secondtempA.push(dmosCarray[i][1])
                  secondtempA.unshift(dmosCarray[i][0])
                  secondtempA = secondtempA.concat(errorTempA)
                  thirdA.push(secondtempA)
                  errorTempA = []
                  secondtempA = []
                }
              } else{
                errorTempA.push(dmosCarray[i][2])
                secondtempA.push(dmosCarray[i][1])
              }
            }
            secondtempA.unshift(dmosCarray[dmosCarray.length-1][0])
            secondtempA = secondtempA.concat(errorTempA)
            thirdA.push(secondtempA)
            dmosCarray = thirdA
            bitRates.length = (dmosCarray[0].length-1)/2;
            options = {
              args : [dmosCarray,bitRates,vidName,'100-DMOS']
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
          var dmosCarray = []
          var tempArray = []
          var indexDMOS;
          if (fs.existsSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv')){
            var readData = ((fs.readFileSync("../Experiments/" + viewPlots.value + "/" + 'rawdata.csv','utf8')).split('\n'))
            for(var i=0;i<(readData[0].split(',')).length;i++){
              if( (readData[0].split(',')[i]).replace(/"([^"]+(?="))"/g, '$1') == 'MOS' ){
                indexDMOS = i;
                break;
              }
            }

            for(var i=1;i<readData.length;i++){
              if(readData[i].split(',')[0].indexOf(vidName) != -1){
                dmosNum = readData[i].split(',')[indexDMOS].replace(/"([^"]+(?="))"/g, '$1')
                dmosName = readData[i].split(',')[0].replace(/"([^"]+(?="))"/g, '$1')
                errorNum = (readData[i].split(',')[indexDMOS+2]).replace(/"([^"]+(?="))"/g, '$1')
                tempArray.push(dmosName.split('_')[(dmosName.split('_')).length-1])
                tempArray.push(dmosNum)
                tempArray.push(errorNum)
                dmosCarray.push(tempArray)
                tempArray = []
              }
            }
            dmosCarray.sort(specialComparator);
            var secondtempA = [];
            var thirdA = []
            var errorTempA = []
            for (var i = 0; i<dmosCarray.length;i++){
              if(i < dmosCarray.length-1){
                if(dmosCarray[i][0] == dmosCarray[i+1][0]){
                  secondtempA.push(dmosCarray[i][1])
                  errorTempA.push(dmosCarray[i][2])
                }else{
                  errorTempA.push(dmosCarray[i][2])
                  secondtempA.push(dmosCarray[i][1])
                  secondtempA.unshift(dmosCarray[i][0])
                  secondtempA = secondtempA.concat(errorTempA)
                  thirdA.push(secondtempA)
                  errorTempA = []
                  secondtempA = []
                }
              } else{
                errorTempA.push(dmosCarray[i][2])
                secondtempA.push(dmosCarray[i][1])
              }
            }
            secondtempA.unshift(dmosCarray[dmosCarray.length-1][0])
            secondtempA = secondtempA.concat(errorTempA)
            thirdA.push(secondtempA)
            dmosCarray = thirdA
            bitRates.length = (dmosCarray[0].length-1)/2;
            options = {
              args : [dmosCarray,bitRates,vidName,'DMOS']
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
          document.getElementById('exportall').disabled = true;
        },50)
        pyshell.on('message', function (message) {
          // received a message sent from the Python script (a simple "print" statement)
          console.log(message);
        });
        // end the input stream and allow the process to exit
        pyshell.end(function (err) {
          document.getElementById('confirmPlots').disabled = false;
          document.getElementById('compareB').disabled = false;
          document.getElementById('exportall').disabled = false;
          if (err) console.log(err);
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
        document.getElementById('exportall').disabled = false;
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
      document.getElementById('exportall').disabled = false;
      $('#buttonC').addClass('transitionEffect');
      document.getElementById('compareB').disabled = false;
      document.getElementById('bitrateForm').style.visibility = "visible";
    }
  }
})
//-----------------------END COMPARE BUTTON------------------------------//
//-----------------------------------------------------------------------//


//------------------------SET BITRATE FORM-------------------//
$(document).on('change','#up3', function(){
  bitRate = document.getElementById('up3').files;
  console.log(bitRate)
  $(this).closest('.form-group').find('.form-control').attr("value",bitRate[0].name);
  bitRateT.title = bitRate[0].name
});
//-----------------------------------------------------------//

//--------------COMPARATOR--------------//
function specialComparator(a,b) {
  if (a[0].split('_')[ (a[0].split('_')).length-1 ] < b[0].split('_')[(b[0].split('_')).length-1]) return -1;
  if (a[0].split('_')[(a[0].split('_')).length-1] > b[0].split('_')[(b[0].split('_')).length-1]) return 1;
  return 0;
}
//-------------------------------------//