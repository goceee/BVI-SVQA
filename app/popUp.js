//Pop up Window buttons
$('#cancel').click(function() {
  mainW.mainWindow();
  win.close();
});

$('#last').click(function() {
  if (!fs.existsSync("../Experiments")){
    // alert("DO NOT DELETE FILES USED RESTART THE PROGRAM!");
    swal.fire({
      title: 'DO NOT DELETE FILES USED RESTART THE PROGRAM!',
      type: 'error',
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!'
    })
  }
  else{
    if(!fs.existsSync("../Experiments/Experiment.last")){
      swal.fire({
        title: 'Please create an experiment configuration to proceed!',
        type: 'error',
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK!'
      })
    }else{
      var expp = fs.readFileSync("../Experiments/Experiment.last",'utf8');
      if(expp == ""){
        swal.fire({
          title: 'Experiment missing, create new or use a saved one',
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK!'
        })  
      }
      else{
        mainW.openWindow('startExperiment');
        win.close();
      }}}
    });
    
    $('#saved').click(function() {
      document.getElementById("savedConfig").click();
      $('#savedConfig').change(function(){
        var dataPath = document.getElementById("savedConfig").files[0];
        var expp = fs.readFileSync("../Experiments/Saved/" + dataPath.name,'utf8');
        var readFiles = fs.readFileSync("../Experiments/" + expp + "/" + expp + '(config)' + ".csv",'utf8');
        try{
        var dirs = fs.readdirSync('../converted/' + expp);
        console.log(dirs)}
        catch(err){
          alert("No such folder")
        }
        var presMethod = (readFiles.split('\n'))[1].split(',')[1];
        var readData = readFiles.split('\n');
        if (presMethod == 'ACR(discrete)' || presMethod == 'ACR(continuous)'){
          if(dirs[0] != 'DistortedVideos'){
            swal.fire({
              title: 'There is no folder named DistortedVideos!',
              text: 'Please create a new experiment',
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              allowOutsideClick: false,
              confirmButtonText: 'OK!'
            })
          } else {
            var distFilesconv = fs.readdirSync('../converted/' + expp + '/' + dirs[0])
            var distFilesconf = readData[2].split(',');
            distFilesconf.splice(0,1)
            distFilesconv.sort();
            distFilesconf.sort();
            console.log(distFilesconf + " GOCE " + distFilesconv)
            if(distFilesconv.length == distFilesconf.length){
              var testPass = 1;
              for (i=0;i<distFilesconf.length;i++){
                if(distFilesconf[i].split('.')[0] != distFilesconv[i].split('.')[0]){
                  testPass = 0;
                  swal.fire({
                    title: 'One or more distorted files do not match configuration!',
                    text: 'Please create a new experiment',
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false,
                    confirmButtonText: 'OK!'
                  })
                  break;
                }
              }
              if(testPass == 1){
                fs.writeFileSync("../Experiments/" + "Experiment.last", expp, 'utf8');
                mainW.openWindow('startExperiment');
                win.close();
              }
            } else{
              swal.fire({
                title: 'Distorted files are missing!',
                text: 'Please create a new experiment',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                confirmButtonText: 'OK!'
              })
            }
          }
        
        } else{
          if(dirs[0] != 'DistortedVideos' && dirs[1] != 'OriginalVideos'){
            swal.fire({
              title: 'There are no folders named DistortedVideos & OriginalVideos!',
              text: 'Please create a new experiment',
              type: 'error',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              allowOutsideClick: false,
              confirmButtonText: 'OK!'
            })
          } else {
            var distFilesconv = fs.readdirSync('../converted/' + expp + '/' + dirs[0])
            var distFilesconf = readData[2].split(',');
            distFilesconf.splice(0,1)
            distFilesconv.sort();
            distFilesconf.sort();
            console.log(distFilesconf.length + " GOCE " + distFilesconv.length)
            if(distFilesconv.length == distFilesconf.length){
              var testPass = 1;
              console.log(distFilesconv + " goooce " + distFilesconf);
              for (i=0;i<distFilesconf.length;i++){
                if(distFilesconf[i].split('.')[0] != distFilesconv[i].split('.')[0]){
                  testPass = 0;
                  swal.fire({
                    title: 'One or more distorted files do not match configuration!',
                    text: 'Please create a new experiment',
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false,
                    confirmButtonText: 'OK!'
                  })
                  break;
                }
              }
            } else{
              swal.fire({
                title: 'Distorted files are missing!',
                text: 'Please create a new experiment',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                confirmButtonText: 'OK!'
              })
            }
            var origFilesconv = fs.readdirSync('../converted/' + expp + '/' + dirs[1])
            var origFilesconf = readData[4].split(',');
            console.log(readData);
            origFilesconf.splice(0,1)
            origFilesconv.sort();
            origFilesconf.sort()
            console.log(origFilesconf.length + " G " + origFilesconv.length)
            if(origFilesconv.length == origFilesconf.length){
              var testPass2 = 1;
              for (i=0;i<origFilesconf.length;i++){
                if(origFilesconf[i].split('.')[0] != origFilesconv[i].split('.')[0]){
                  testPass2 = 0;
                  swal.fire({
                    title: 'One or more original files do not match configuration!',
                    text: 'Please create a new experiment',
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false,
                    confirmButtonText: 'OK!'
                  })
                  break;
                }
              }
            } else{
              swal.fire({
                title: 'Original files are missing!',
                text: 'Please create a new experiment',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                confirmButtonText: 'OK!'
              })
            }
            if(testPass == 1 && testPass2 == 1){
              fs.writeFileSync("../Experiments/" + "Experiment.last", expp, 'utf8');
              mainW.openWindow('startExperiment');
              win.close();
            }
          }
        }
      })
    });
    
    $('#new').click(function() {
      mainW.openWindow('createExperiment')
      win.close();
    });
    ////////////////////////////////////////////
