//Pop up Window buttons
$('.cancel').click(function() {
  mainW.mainWindow();
  win.close();
});

$('.last').click(function() {
  if (!fs.existsSync("../Experiments")) {
    swal.fire({
      title: 'DO NOT DELETE USED FILES, PLEASE RESTART THE PROGRAM!',
      icon: 'error',
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!'
    });
  } else {
    if (!fs.existsSync("../Experiments/Experiment.last")) {
      swal.fire({
        title: 'Please create an experiment configuration to proceed!',
        icon: 'error',
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK!'
      });
    } else {
      var expp = fs.readFileSync("../Experiments/Experiment.last",'utf8');
      if (expp == "") {
        swal.fire({
          title: 'Experiment missing, create new or use a saved one',
          icon: 'error',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK!'
        });
      } else {
        mainW.openWindow('startExperiment');
        win.close();
      }
    }
  }
});

var testPass = 0;
var testPass2 = 0;

$('.saved').click(function() {
  document.getElementById("savedConfig").click(function(e) {
    e.target.files[0].path;
  });
  $('#savedConfig').change(function() {
    var dataPath = document.getElementById("savedConfig").files[0];
    var expp = fs.readFileSync(`../Experiments/Saved/${dataPath.name}`, 'utf8');
    var readFiles = fs.readFileSync(`../Experiments/${expp}/${expp}(config).csv`, 'utf8');
    var readData = readFiles.split('\n');
    distTrain = readData[3].split(',');
    distTrain.splice(0,1);
    distVids = readData[2].split(',');
    distVids.splice(0,1);
    
    if (!readData[1].split(',')[1].includes('ACR')) {
      origVids = readData[4].split(',');
      origVids.splice(0,1);
      origTrain = readData[5].split(',');
      origTrain.splice(0,1);
      allVideos = origVids.concat(distVids);
      allTrainVideos = origTrain.concat(distTrain);
    } else {
      allVideos = distVids;
      allTrainVideos = distTrain;
    }
    
    var convVids = (fs.readdirSync('../converted/')).sort();
    var convTrainVids = (fs.readdirSync('../trainingSequences/')).sort();
    
    for (i=0;i<allVideos.length;i++) {
      for (j=0;j<convVids.length;j++) {
        if (convVids[j].split('.')[0] == allVideos[i].split('.')[0]) {
          testPass = 1;
          break;
        } else {
          testPass = 0;
        }
      }
      if (testPass != 1) {
        break;
      }
    }
    
    for (i=0;i<allTrainVideos.length;i++) {
      for (j=0;j<convTrainVids.length;j++) {
        if (convTrainVids[j].split('.')[0] == allTrainVideos[i].split('.')[0]) {
          testPass2 = 1;
          break;
        } else {
          testPass2 = 0;
        }
      }
      if (testPass2 != 1) {
        break;
      }
    }
    
    if (testPass == 1 && testPass2 == 1) {
      fs.writeFileSync("../Experiments/Experiment.last", expp, 'utf8');
      mainW.openWindow('startExperiment');
      win.close();
    } else if (testPass == 0) {
      swal.fire({
        title: 'Converted files are missing!',
        text: 'Please create a new experiment or add the files',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
        confirmButtonText: 'OK!'
      });
    } else if (testPass2 == 0) {
      swal.fire({
        title: 'Converted training files are missing!',
        text: 'Please create a new experiment or add the files',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
        confirmButtonText: 'OK!'
      });
    }
  });
});

$('.new').click(function() {
  mainW.openWindow('createExperiment');
  win.close();
});
////////////////////////////////////////////
