const {PythonShell} =  require('python-shell');
var fs = require('fs');
const url = require('url');
const {BrowserWindow, shell} = require('electron').remote
const ipc = require('electron').ipcRenderer;


var selFormat;
var selCodec;
var setSettings;
var tVideos = [];
var tVideos2 = [];
var listT = [];
var trainCounter = 0;
var taskbarProgressValue = 0; 

$(".minimise-popup").click( () => {
  BrowserWindow.getAllWindows()[0].minimize();  
});

$(".close-popup.settings").click( () => {
  $('#container').css('filter', '');
  $('.settings-form-background').fadeOut();
});

$('#okcB').click(function () {
  if (!fs.existsSync("../Experiments/temporary.settings")) {
    selFormat = ".mov";
    selCodec = "prores_ks";
  } else {
    setSettings = (fs.readFileSync("../Experiments/temporary.settings", 'utf8')).split(',');
    selCodec = setSettings[1];
    selFormat = setSettings[0];
  }
  if (!fs.existsSync("../Experiments")) {
    swal.fire({
      title: 'DO NOT DELETE FILES USED RESTART THE PROGRAM!',
      icon: 'error',
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!'
    });
  } else {
    var expName = document.getElementById("experimentName").value;

    if (!fs.existsSync("../Experiments/temporary.scale")) {
      var getselMethod = document.querySelector('input[name="radio"]:checked');
      if (getselMethod != null) {
        selMethod = getselMethod.value;
      }
      else {
        selMethod = null;
      }
    } else {
      var selMethod = fs.readFileSync("../Experiments/temporary.scale", 'utf8');
    }
    
    
    var selDistVideos = names1.filter(a => !a.includes('train'));
    var DistTrainVideos = names1.filter(a => a.includes('train'));
    var selOrigVideos = names2.filter(a => !a.includes('train'));
    var OrigTrainVideos = names2.filter(a => a.includes('train'));
    var countTraining1 = 0;
    var countTraining2 = 0;
    trainCounter = 0;
    listT = [];
    if (DistTrainVideos != "") {
      var codec2 = DistTrainVideos[0].split('_')[7];
    }
    for (var i=0;i<OrigTrainVideos.length;i++) {
      for (var j=0;j<DistTrainVideos.length;j++) {
        if (DistTrainVideos[j].includes(OrigTrainVideos[i].split('_')[0])) {
          if (DistTrainVideos[j].split('_')[7] != codec2) {
            countTraining1 = countTraining1 + 1;
            trainCounter = trainCounter + 1;
          }
          else {
            countTraining2 = countTraining2 + 1;
            trainCounter = trainCounter + 1;
          }
        }
      }
      if ( countTraining1 < 2 && countTraining1 > 0 ) {
        tVideos.push(OrigTrainVideos[i]);
        tVideos.push(countTraining1);
        listT.push(tVideos);
      }
      if ( countTraining2 < 2 && countTraining2 > 0) {
        tVideos2.push(OrigTrainVideos[i]);
        tVideos2.push(countTraining2);
        listT.push(tVideos2);
      }
      tVideos = [];
      tVideos2 = [];
      countTraining1 = 0;
      countTraining2 = 0;
    }
    
    if (selMethod == "ACR(discrete)" || selMethod == "ACR(continuous)") { 
      if (expName == "") {
        swal.fire({
          title: 'Please enter experiment name!',
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        }); 
      }
      else if (fs.existsSync(`../Experiments/${expName}`)) {
        swal.fire({
          title: 'Experiment name exists, please choose a different one!',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      }
      else if (selMethod == null) {
        swal.fire({
          title: 'Please choose a presentation method!',
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      }
      else if (selDistVideos == "") {
        swal.fire({
          title: 'Please select distorted videos for ACR!',
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      }
      else if (DistTrainVideos == "") {
        swal.fire({
          title: 'Please select distorted training videos for ACR!',
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      } else if (selOrigVideos == "" && $('#objective').is(':checked') == true) {
        swal.fire({
          title: 'Please select original videos for ACR!',
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      } else if (OrigTrainVideos == "" && $('#objective').is(':checked') == true) {
        swal.fire({
          title: 'Please select original training videos for ACR!',
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      } else if (!fs.existsSync(`../Experiments/${expName}`) && selMethod != null && selDistVideos != "" && DistTrainVideos != "") {
        if ($('#objective').is(':checked') == false) {
          var expInfo = [
            ["Experiment name: ", expName],
            ["Presentation method: ", selMethod],
            ["Distorted Videos: ", selDistVideos],
            ["Distorted Training Videos: ", DistTrainVideos],
            ["Video format: ", selFormat],
            ["Video codec: ", selCodec]
          ];
        } else {
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
        }
        const csvString = toCsv(expInfo);
        swal.fire({
          title: 'Selected settings',
          html: `Experiment name: ${expName} <br> Presentation method: ${selMethod} <br> Format: ${selFormat} <br> Codec: ${selCodec}`,
          icon: 'info',
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
              console.error(err);
            }
            fs.mkdirSync(`../Experiments/${expName}`);
            fs.writeFileSync(`../Experiments/${expName}/${expName}(config).csv`, csvString, 'utf8');
            convert(selCodec, selFormat, expName);
          }
        });
      } else {
        alert("This should never happen!");
      }
    } else {
      if (expName == "") {
        swal.fire({
          title: 'Please enter experiment name!',
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      } else if (fs.existsSync(`../Experiments/${expName}`)) {
        swal.fire({
          title: 'Experiment name exists, please choose a different one!',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      }
      else if (selMethod == null) {
        swal.fire({
          title: 'Please choose a presentation method!',
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      }
      else if (selDistVideos == "") {
        var textD = `Please select distorted videos for ${selMethod}!`;
        swal.fire({
          title: textD,
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      } 
      else if (selOrigVideos == "") {
        textO = `Please select original videos for ${selMethod}!`;
        swal.fire({
          title: textO,
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      }
      else if (DistTrainVideos == "") {
        var textD = `Please select distorted training videos for ${selMethod}!`;
        swal.fire({
          title: textD,
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      } 
      else if (OrigTrainVideos == "") {
        textO = `Please select original training videos for ${selMethod}!`;
        swal.fire({
          title: textO,
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      }
      else if (zeroTest == 1 || fullcounter < selDistVideos.length) {
        swal.fire({
          title: 'Videos mismatch!',
          text: 'check your selected videos and try again',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      }
      else if (trainCounter < DistTrainVideos.length) {
        swal.fire({
          title: 'Training videos mismatch!',
          text: 'check your selected training videos and try again',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      }
      else if (!fs.existsSync(`../Experiments/${expName}`) && selMethod != null && selDistVideos != "" && selOrigVideos != "" && DistTrainVideos != "" && OrigTrainVideos != "") {
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
          html: `Experiment name: ${expName} <br> Presentation method: ${selMethod} <br> Format: ${selFormat} <br> Codec: ${selCodec}`,
          icon: 'info',
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK!', 
        }).then((result) => {
          if (result.value) {
            if (fs.existsSync("../Experiments/temporary.settings")) {
              try {
                fs.unlinkSync("../Experiments/temporary.settings");
                //file removed
              } catch(err) {
                console.error(err);
              }}
              fs.mkdirSync(`../Experiments/${expName}`);
              fs.writeFileSync(`../Experiments/${expName}/${expName}(config).csv`, csvString, 'utf8');
              convert(selCodec, selFormat, expName);
            }
          });
        } else {
          alert("This should never happen!");
        }
      }
    } 
    fs.writeFileSync("../Experiments/Experiment.last", expName, 'utf8');
    fs.writeFileSync(`../Experiments/Saved/${expName}.save`, expName, 'utf8');
  });
  
  function convert(selCodec, selFormat, nameExp) {
    let names2_copy = names2;  
    if (document.querySelector('input[name="radio"]:checked').value == "ACR") {
      names2 = [];
    };
    var options = {
      args : [path1, path2, names1, names2, selCodec, selFormat, nameExp]
    };
    var pyshell = new PythonShell('convert.py', options);
    ipc.send('info','stop-closing');
    if (names2.length < 1) {
      
      var maxVid = names1.length; // - trainS
      settings.indeterminate = false;
      settings.maxValue = maxVid;
      currentValue.detail = `Converting video ${currentValue.progress+1} out of ${settings.maxValue}`;
      createProgressBar(settings);
      BrowserWindow.getAllWindows()[0].setProgressBar(0);
      $('#container').css('filter', 'blur(2px)');
      $('.progress-bar-background').fadeIn();
      $('.progress-bar-background').click(function(e) {
        if(e.target !== this){
          return;
        }
        shell.beep();
      });        
      
      pyshell.on('message', function (message) {
        currentValue.progress += 1;
        currentValue.detail = `Converting video ${currentValue.progress+1} out of ${settings.maxValue}`;
        updateProgressBar(currentValue.progress,maxVid);
        BrowserWindow.getAllWindows()[0].setProgressBar(taskbarProgressValue);
        //THE PROGRESS BAR GETS RUN HERE AND IT INCREMENTS WHENEVER THE PYTHON SCRIPT SENDS A MESSAGE.
        console.log(message);
      });
      pyshell.end(function (err) {
        if (err) {
          throw err;
        }
        ipc.send('info','allow-closing');
        currentValue.detail = `Conversion complete!`;
        if (BrowserWindow.getAllWindows()[0].isMinimized() == true || BrowserWindow.getAllWindows()[0].isFocused() == false) {
          BrowserWindow.getAllWindows()[0].flashFrame(true);
        }
        setTimeout(function() {
          BrowserWindow.getAllWindows()[0].setProgressBar(-1);
          $('.progress-bar-background').fadeOut();
          $('#container').css('filter', '');
          $('#progressBar').remove();  
          swal.fire({
            title: 'Conversion complete!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
            onClose: getObjectiveMetrics,
            confirmButtonText: 'OK!'
          });
        }, 500);
        console.log('finished');
      });
    } else {
      
      var numAllvid = names1.length + names2.length;
      settings.indeterminate = false;
      settings.maxValue = numAllvid;
      currentValue.detail = `Converting video ${currentValue.progress+1} out of ${settings.maxValue}`;
      createProgressBar(settings);
      BrowserWindow.getAllWindows()[0].setProgressBar(0);
      $('#container').css('filter', 'blur(2px)');
      $('.progress-bar-background').fadeIn(); 
      $('.progress-bar-background').click(function(e) {
        if(e.target !== this){
          return;
        }
        shell.beep();
      });       
      
      pyshell.on('message', function (message) {
        currentValue.progress += 1;
        currentValue.detail = `Converting video ${currentValue.progress+1} out of ${settings.maxValue}`;
        updateProgressBar(currentValue.progress,numAllvid);
        BrowserWindow.getAllWindows()[0].setProgressBar(taskbarProgressValue);
        //THE PROGRESS BAR GETS RUN HERE AND IT INCREMENTS WHENEVER THE PYTHON SCRIPT SENDS A MESSAGE.
        console.log(message);
      });
      pyshell.end(function (err) {
        if (err) {
          throw err;
        }
        ipc.send('info','allow-closing');
        currentValue.detail = `Conversion complete!`;
        if (BrowserWindow.getAllWindows()[0].isMinimized() == true || BrowserWindow.getAllWindows()[0].isFocused() == false) {
          BrowserWindow.getAllWindows()[0].flashFrame(true);
        }
        setTimeout(function() {
          BrowserWindow.getAllWindows()[0].setProgressBar(-1);
          $('.progress-bar-background').fadeOut();
          $('#container').css('filter', '');
          $('#progressBar').remove();  
          swal.fire({
            title: 'Conversion complete!',
            icon: 'success',
            showCancelButton: false,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            onClose: getObjectiveMetrics,
            confirmButtonText: 'OK!'
          });
        }, 500);
        console.log('finished');
      });
    }
    names2 = names2_copy;
  }
  
  function getObjectiveMetrics() {
    
    if ($('#objective').is(':checked') == true) {
      var readExp = document.getElementById("experimentName").value;
      var readFiles = (fs.readFileSync(`../Experiments/${readExp}/${readExp}(config).csv`, 'utf8')).split('\n');
      var distortedV = readFiles[2].split(',');
      var originalV = readFiles[4].split(',');
      distortedV.splice(0,1);
      originalV.splice(0,1);
      var options = {
        args : [originalV, distortedV, readExp, path1, path2]
      };
      console.log(options.args);
      var pyshell = new PythonShell('getObjectiveM.py', options);
      ipc.send('info','stop-closing');
      settings.indeterminate = true;
      currentValue.detail = 'Calculating objective metrics';
      createProgressBar(settings);
      BrowserWindow.getAllWindows()[0].setProgressBar(2);
      $('#container').css('filter', 'blur(2px)');
      $('.progress-bar-background').fadeIn();
      $('.progress-bar-background').click(function(e) {
        if(e.target !== this){
          return;
        }
        shell.beep();
      });
      
      pyshell.on('message', function (message) {
        console.log(message);
      });
      
      pyshell.end(function (err) {
        if (err) {
          console.log(err);
        } 
        else {
          ipc.send('info','allow-closing');
          currentValue.detail = `Calculation complete!`;
          if (BrowserWindow.getAllWindows()[0].isMinimized() == true || BrowserWindow.getAllWindows()[0].isFocused() == false) {
            BrowserWindow.getAllWindows()[0].flashFrame(true);
          }
          setTimeout(function() {
            BrowserWindow.getAllWindows()[0].setProgressBar(-1);
            $('.progress-bar-background').fadeOut();
            $('#container').css('filter', '');
            swal.fire({
              title: 'All done!',
              icon: 'success',
              showCancelButton: false,
              allowOutsideClick: false,
              confirmButtonColor: '#3085d6',
              onClose: gotoMainScreen,
              confirmButtonText: 'OK!'
            });
          }, 500);
        }
      });
    } else {
      gotoMainScreen();
    }
    
  }
  
  function gotoMainScreen() {
    mainW.mainWindow();
    win.close();
  }
  
  function openSettings() {
    $('#container').css('filter', 'blur(2px)');
    $('.settings-form-background').fadeIn();
    $('.settings-form-background').click(function(e) {
      if(e.target !== this){
        return;
      }
      shell.beep();
    });
  }
  
  $('.container-settings').click(function () {
    $('#fileformat').prop('selectedIndex',0);
    $('#videocodec').prop('selectedIndex',0);
    swal.fire({
      title: 'Are you sure?',
      text: "Previous settings will go to default!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        openSettings();
        if (fs.existsSync("../Experiments/temporary.settings")) {
          try {
            fs.unlinkSync("../Experiments/temporary.settings");
            //file removed
          } catch(err) {
            console.error(err);
          }}    
        }
      });   
    });
    
    $('#confirmB').click(function() { // FOR SETTINGS!!!
      selFormat = $('#fileformat :selected').val();
      selCodec = $('#videocodec :selected').val();
      if (selFormat == "Choose...") {
        swal.fire({
          text: 'Please select format!',
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      }
      else if (selCodec == "Choose...") {
        swal.fire({
          text: 'Please select codec!',
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        });
      } else {
        var getSettings = [selFormat, selCodec];
        fs.writeFileSync("../Experiments/temporary.settings", getSettings, 'utf8');
        
        swal.fire({
          text: 'Settings confirmed!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          onClose: function() {
            $('#container').css('filter', '');
            $('.settings-form-background').fadeOut();
          },
          confirmButtonText: 'OK!'
        });
      }
    });
    ///////////////////////////////////////////
    
    //Disable pressing enter to submit does not have the same functionality as OK button//
    if (document.getElementById("nameForm") && document.getElementById("browseDistorted") && document.getElementById("browseOriginal") != null) {
      document.getElementById("nameForm").onkeypress = function (e) {
        var key = e.charCode || e.keyCode || 0;
        if (key == 13) {
          e.preventDefault();
        };
      }
      document.getElementById("browseDistorted").onkeypress = function (e) {
        var key = e.charCode || e.keyCode || 0;
        if (key == 13) {
          e.preventDefault();
        };
      }
      document.getElementById("browseOriginal").onkeypress = function (e) {
        var key = e.charCode || e.keyCode || 0;
        if (key == 13) {
          e.preventDefault();
        }
      };
    }
    
    const updateProgressBar = (value, maxValue) => {
      const percentage = (value * 100) / maxValue;
      
      // taskbar's progress bar must be a number between 0 and 1, e.g.:
      // 63% should be 0.63, 99% should be 0.99...
      taskbarProgressValue = parseFloat((percentage / 100).toFixed(2));
    };

    // Listen on alert event from main process
    ipc.on('alert' , function() { 
      swal.fire({
        title: 'Please wait until the process has finished!',
        icon: 'info',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
        confirmButtonText: 'OK!'
        });
      });