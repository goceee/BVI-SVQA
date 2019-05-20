const {PythonShell} =  require('python-shell');
var fs = require('fs');
const url = require('url');
const ProgressBar = remote.require('electron-progressbar');
var selFormat;
var selCodec;
var setSettings;
var tVideos = [];
var tVideos2 = [];
var listT = [];
var trainCounter = 0;

$('#okcB').click(function () {
  console.log(fullcounter)
  if (!fs.existsSync("../Experiments/temporary.settings")){
    selFormat = ".mov";
    selCodec = "prores_ks";
  }else{
    setSettings = (fs.readFileSync("../Experiments/temporary.settings",'utf8')).split(',');
    selCodec = setSettings[1];
    selFormat = setSettings[0];
  }
  if (!fs.existsSync("../Experiments")){
    swal.fire({
      title: 'DO NOT DELETE FILES USED RESTART THE PROGRAM!',
      type: 'error',
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!'
    })
  }else{
    var expName = document.getElementById("experimentName").value;
    fs.writeFileSync("../Experiments/" + "Experiment.last", expName, 'utf8');
    fs.writeFileSync("../Experiments/Saved/" + expName + ".save", expName, 'utf8');
    if (!fs.existsSync("../Experiments/temporary.scale")){
      var getselMethod = document.querySelector('input[name="radio"]:checked');
      if (getselMethod != null) {
        selMethod = getselMethod.value;
      }
      else {
        selMethod = null;
      }
    } else {
      var selMethod = fs.readFileSync("../Experiments/temporary.scale",'utf8')
    }
    
    
    var selDistVideos = names1.filter(a => !a.includes('train'));
    var DistTrainVideos = names1.filter(a => a.includes('train'));
    var selOrigVideos = names2.filter(a => !a.includes('train'));
    var OrigTrainVideos = names2.filter(a => a.includes('train'));
    console.log(DistTrainVideos);
    var countTraining1 = 0; ///TUKA ZAVRSIV SITE TRAINING DALI IMAT PAROVI!! NAJMALKU 2!!!
    var countTraining2 = 0;
    trainCounter = 0;
    listT = [];
    if (DistTrainVideos != ""){
    var codec2 = DistTrainVideos[0].split('_')[7];
    }
    for (var i=0;i<OrigTrainVideos.length;i++){
      for (var j=0;j<DistTrainVideos.length;j++){
        if(DistTrainVideos[j].includes(OrigTrainVideos[i].split('_')[0])){
          if(DistTrainVideos[j].split('_')[7] != codec2){
            countTraining1 = countTraining1 + 1;
            trainCounter = trainCounter + 1;
          }
          else{
            countTraining2 = countTraining2 + 1;
            trainCounter = trainCounter + 1;
          }
        }
      }
      if ( countTraining1 < 2 && countTraining1 > 0 ){
        tVideos.push(OrigTrainVideos[i])
        tVideos.push(countTraining1)
        listT.push(tVideos)
      }
      if ( countTraining2 < 2 && countTraining2 > 0){
        tVideos2.push(OrigTrainVideos[i])
        tVideos2.push(countTraining2)
        listT.push(tVideos2)
      }
      tVideos = []
      tVideos2 = []
      countTraining1 = 0;
      countTraining2 = 0;
    }
    console.log(listT);
    
    if (selMethod == "ACR(discrete)" || selMethod == "ACR(continuous)"){ 
      if(expName == ""){
        swal.fire({
          title: 'Please enter experiment name!',
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })  
      }
      else if(fs.existsSync("../Experiments/" + expName)) {
        swal.fire({
          title: 'Experiment name exists, please choose a different one!',
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      }
      else if(selMethod == null){
        swal.fire({
          title: 'Please choose a presentation method!',
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      }
      else if(selDistVideos == ""){
        swal.fire({
          title: 'Please select distorted videos for ACR!',
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      }
      else if(DistTrainVideos == ""){
        swal.fire({
          title: 'Please select distorted training videos for ACR!',
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      }
      else if (!fs.existsSync("../Experiments/" + expName) && selMethod != null && (selDistVideos != "")) {
        var expInfo = [
          ["Experiment name: ", expName],
          ["Presentation method: ", selMethod],
          ["Distorted Videos: ", selDistVideos],
          ["Distorted Training Videos: ", DistTrainVideos],
          ["Video format: ", selFormat],
          ["Video codec: ", selCodec]
        ];
        const csvString = toCsv(expInfo);
        swal.fire({
          title: 'Selected settings',
          html: "Experiment name: " + expName + "<br>" + "Presentation method: " + selMethod + "<br>" + "Format: " + selFormat + "<br>" + "Codec: " + selCodec,
          type: 'info',
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK!',
        }).then((result) => {
          if (result.value) {
            try {
              fs.unlinkSync("../Experiments/temporary.scale");
              //file removed
            } catch(err) {
              console.error(err)
            }
            fs.mkdirSync("../Experiments/" + expName);
            fs.writeFileSync("../Experiments/" + expName + "/" + expName + '(config)' + ".csv", csvString, 'utf8');
            $('#container').addClass('blurEffect');
            convert(selCodec, selFormat, expName);
          }
        })
      }
      else{
        alert("This should never happen!");
      }
    }else{
      if(expName == ""){
        swal.fire({
          title: 'Please enter experiment name!',
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      }
      else if(fs.existsSync("../Experiments/" + expName)) {
        swal.fire({
          title: 'Experiment name exists, please choose a different one!',
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      }
      else if(selMethod == null){
        swal.fire({
          title: 'Please choose a presentation method!',
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      }
      else if(selDistVideos == ""){
        var textD = "Please select distorted videos for " + selMethod + "!";
        swal.fire({
          title: textD,
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      } 
      else if(selOrigVideos == ""){
        textO ="Please select original videos for " + selMethod + "!";
        swal.fire({
          title: textO,
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      }
      else if(DistTrainVideos == ""){
        var textD = "Please select distorted training videos for " + selMethod + "!";
        swal.fire({
          title: textD,
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      } 
      else if(OrigTrainVideos == ""){
        textO ="Please select original training videos for " + selMethod + "!";
        swal.fire({
          title: textO,
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      }
      else if(zeroTest == 1 || fullcounter < selDistVideos.length){
        swal.fire({
          title: 'Videos mismatch!',
          text: 'check your selected videos and try again',
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      }
      //else if(listT.length == 0 || trainCounter < DistTrainVideos.length){
        else if(trainCounter < DistTrainVideos.length){
        console.log(listT.length)
        console.log(trainCounter)
        console.log(DistTrainVideos.length)
        swal.fire({
          title: 'Training videos mismatch!',
          text: 'check your selected training videos and try again',
          type: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      }
      else if (!fs.existsSync("../Experiments/" + expName) && selMethod != null && selDistVideos != "" && selOrigVideos != "") {
        var expInfo = [
          ["Experiment name: ", expName],
          ["Presentation method: ", selMethod],
          ["Distorted Videos: ", selDistVideos],
          ["Distorted Training Videos: ", DistTrainVideos],
          ["Original Videos: ", selOrigVideos],
          ["Original Training Videos: ", OrigTrainVideos],
          ["Video format: ", selFormat],
          ["Video codec: ", selCodec]
        ];
        const csvString = toCsv(expInfo);
        swal.fire({
          title: 'Selected settings',
          html: "Experiment name: " + expName + "<br>" + "Presentation method: " + selMethod + "<br>" + "Format: " + selFormat + "<br>" + "Codec: " + selCodec,
          type: 'info',
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK!', 
        }).then((result) => {
          if (result.value) {
            if (fs.existsSync("../Experiments/temporary.settings")){
              try {
                fs.unlinkSync("../Experiments/temporary.settings");
                //file removed
              } catch(err) {
                console.error(err)
              }}
              fs.mkdirSync("../Experiments/" + expName);
              fs.writeFileSync("../Experiments/" + expName + "/" + expName + '(config)' + ".csv", csvString, 'utf8');
              $('#container').addClass('blurEffect');
              convert(selCodec, selFormat, expName);
            }
          })
        }
        else{
          alert("This should never happen!");
        }
      }
    } 
  })
  
  function convert(selCodec, selFormat, nameExp){
    var position = win.getPosition();
    var options = {
      args : [path1, path2, names1, names2, selCodec, selFormat, nameExp]
    };
    var pyshell = new PythonShell('convert.py', options);
    
    
    if (names2.length < 1) {
      var trainS = 0;
      for (var i=0;i<names1.length;i++){
        if(names1[i].includes("train")){
          trainS = trainS + 1;
        }
      }
      var maxVid = names1.length// - trainS
      console.log(maxVid)
      var progressBar = new ProgressBar({
        indeterminate: false,
        text: 'Please wait...',
        detail: 'Converting video 1 out of ' + maxVid + '...',
        maxValue: maxVid,
        style: {
          text: {'font-size': '100%'}
        },
        browserWindow: {
          parent: win, 
          modal: true,
          frame: false,
          x: position[0]+1,
          y: position[1]+162,
          width: 347,
          backgroundColor: '#E6E6E6'
        }
      });
      progressBar
      .on('completed', function() {
        console.info(`completed...`);
        progressBar.detail = 'Conversion completed.';
      })
      .on('aborted', function(value) {
        console.info(`aborted... ${value}`);
      })
      .on('progress', function(value) {
        progressBar.detail = `Converting video ${value+1} out of ${progressBar.getOptions().maxValue}...`;
      });
      pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        progressBar.value += 1;
        //THE PROGRESS BAR GETS RUN HERE AND IT INCREMENTS WHENEVER THE PYTHON SCRIPT SENDS A MESSAGE.
        console.log(message);
      });
      pyshell.end(function (err) {
        if (err){
          throw err;
        };
        setTimeout(function(){
          swal.fire({
            title: 'Conversion complete!',
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
            onClose: gotoMainScreen,
            confirmButtonText: 'OK!'
          })
        }, 500);
        console.log('finished');
      });
    }
    else{
      var numAllvid = names1.length + names2.length;
      var trainS = 0;
      for (var i=0;i<names1.length;i++){
        if(names1[i].includes("train")){
          trainS = trainS + 1;
        }
      }
      for (var i=0;i<names2.length;i++){
        if(names2[i].includes("train")){
          trainS = trainS + 1;
        }
      }
      var maxVid = numAllvid// - trainS;
      console.log(maxVid)
      var progressBar = new ProgressBar({
        indeterminate: false,
        text: 'Please wait...',
        detail: 'Converting video 1 out of ' + maxVid + '...',
        maxValue: maxVid,
        style: {
          text: {'font-size': '100%'}
        },
        browserWindow: {
          parent: win, 
          modal: true,
          frame: false,
          x: position[0]+1,
          y: position[1]+162,
          width: 347,
          backgroundColor: '#E6E6E6'
        }
      });
      progressBar
      .on('completed', function() {
        console.info(`completed...`);
        progressBar.detail = 'Conversion completed.';
      })
      .on('aborted', function(value) {
        console.info(`aborted... ${value}`);
      })
      .on('progress', function(value) {
        progressBar.detail = `Converting video ${value+1} out of ${progressBar.getOptions().maxValue}...`;
      });
      pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        progressBar.value += 1;
        //THE PROGRESS BAR GETS RUN HERE AND IT INCREMENTS WHENEVER THE PYTHON SCRIPT SENDS A MESSAGE.
        console.log(message);
      });
      pyshell.end(function (err) {
        if (err){
          throw err;
        };
        setTimeout(function(){
          swal.fire({
            title: 'Conversion complete!',
            type: 'success',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            onClose: getObjectiveMetrics,
            confirmButtonText: 'OK!'
          })
        }, 500);
        console.log('finished');
      });
    }
    
  }
  
  function getObjectiveMetrics(){
    $('#container').addClass('blurEffect');
    var position = win.getPosition();
    var readExp = document.getElementById("experimentName").value
    var readFiles = (fs.readFileSync("../Experiments/" + readExp + "/" + readExp + '(config)' + ".csv",'utf8')).split('\n');
    var distortedV = readFiles[2].split(',');
    var originalV = readFiles[4].split(',');
    distortedV.splice(0,1);
    originalV.splice(0,1);
    console.log(path1)
    var options = {
      args : [originalV,distortedV,readExp,path1,path2]
    };
    var pyshell = new PythonShell('getObjectiveM.py', options);
    
    var progressBar = new ProgressBar({
      text: 'Please wait...',
      detail: 'Calculating objective metrics',
      style: {
        text: {'font-size': '100%'}
      },
      browserWindow: {
        parent: win, 
        modal: true,
        frame: false,
        x: position[0]+1,
        y: position[1]+162,
        width: 347,
        backgroundColor: '#E6E6E6'
      }
    });
    progressBar
    .on('completed', function() {
      console.info(`completed...`);
      progressBar.detail = 'Calculation completed.';
    })
    .on('aborted', function(value) {
      console.info(`aborted... ${value}`);
    });
    pyshell.on('message', function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      console.log(message);
    });
    
    // end the input stream and allow the process to exit
    pyshell.end(function (err) {
      if (err){
        alert(err);
      } 
      else {
        progressBar.setCompleted();
        setTimeout(function(){
          swal.fire({
            title: 'All done!',
            type: 'success',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            onClose: gotoMainScreen,
            confirmButtonText: 'OK!'
          })
        }, 500);
      }
    });
  }
  
  function gotoMainScreen(){
    mainW.mainWindow();
    win.close();
  }
  
  function openSettings(){
    var position = win.getPosition();
    let settings = new remote.BrowserWindow({
      parent: win,
      modal: true,
      frame: false,
      resizable: false,
      transparent: true,
      x: position[0],
      y: position[1]+135,
      height: 320,
      width: 345,
    })
    
    settings.loadURL(url.format({
      pathname: 'settings.html',
      slashes: true
    }))
  }
  
  $('#setB').click(function () {
    swal.fire({
      title: 'Are you sure?',
      text: "Previous settings will go to default!",
      type: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        openSettings();
        remote.getCurrentWindow().setAlwaysOnTop(true);
        $('#container').addClass('blurEffect');
        if (fs.existsSync("../Experiments/temporary.settings")){
          try {
            fs.unlinkSync("../Experiments/temporary.settings");
            //file removed
          } catch(err) {
            console.error(err)
          }}    
        }
      })    
    })
    
    $('#confirmB').click(function(){ // FOR SETTINGS!!!
      selFormat = $('#fileformat :selected').val();
      selCodec = $('#videocodec :selected').val();
      if(selFormat == "Choose..."){
        swal.fire({
          text: 'Please select format!',
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      }
      else if(selCodec == "Choose..."){
        swal.fire({
          text: 'Please select codec!',
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
      }else{
        var getSettings = [selFormat, selCodec];
        fs.writeFileSync("../Experiments/temporary.settings", getSettings, 'utf8');
        swal.fire({
          text: 'Settings confirmed!',
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          onClose: closeWindow,
          confirmButtonText: 'OK!'
        })
      }
    })
    
    function closeWindow(){
      win.close()
    }
    //IF FILE GETS CREATED SET ALWAYS ON TOP TO FALSE AFTER 300ms ELSE WHEN CLICKED ON SETTINGS IT IS TRUE. WHEN CLICKED ON SETTINGS REMOVE THE FILE.
    
    //remove blur when focused/////////////////
    win.on('focus', () => {
      if ($('#container').hasClass('blurEffect') == true){
        $('#container').removeClass('blurEffect');}
        if (fs.existsSync("../Experiments/temporary.settings")){
          remote.getCurrentWindow().setAlwaysOnTop(false);
        }
      })
      ///////////////////////////////////////////
      
      //Disable pressing enter to submit does not have the same functionality as OK button//
      if (document.getElementById("nameForm") && document.getElementById("browseDistorted") && document.getElementById("browseOriginal") != null){
        document.getElementById("nameForm").onkeypress = function (e) {
          var key = e.charCode || e.keyCode || 0;
          if (key == 13) {
            e.preventDefault();
          }
        }
        document.getElementById("browseDistorted").onkeypress = function (e) {
          var key = e.charCode || e.keyCode || 0;
          if (key == 13) {
            e.preventDefault();
          }
        }
        document.getElementById("browseOriginal").onkeypress = function (e) {
          var key = e.charCode || e.keyCode || 0;
          if (key == 13) {
            e.preventDefault();
          }
        }}
        
