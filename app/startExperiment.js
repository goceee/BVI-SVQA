var expName = fs.readFileSync("../Experiments/Experiment.last",'utf8');
$('#oksB').click(function () {
  var userName = document.getElementById("inputName").value;
  if (!fs.existsSync("../Experiments")){
    swal.fire({
      title: 'DO NOT DELETE FILES USED, PLEASE RESTART THE PROGRAM!',
      type: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!'
    })
  }
  else if (document.getElementById("inputName").value == ""){
    swal.fire({
      title: 'Please enter your name!',
      type: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false,
      confirmButtonText: 'OK!'
    })  
  }
  else if(fs.existsSync("../Experiments/" + expName + "/" + userName)) {
    swal.fire({
      title: 'Name exists, please choose a different one!',
      type: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false,
      confirmButtonText: 'OK!'
    })
  }
  else if (document.getElementById("inputAge").value == ""){
    swal.fire({
      title: 'Please enter your age!',
      type: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false,
      confirmButtonText: 'OK!'
    }) 
  }
  else if ($('#inputGender :selected').text() == "Choose..."){
    swal.fire({
      title: 'Please select gender!',
      type: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false,
      confirmButtonText: 'OK!'
    }) 
  }
  else if ($('#inputTest :selected').text() == "Choose..."){
    swal.fire({
      title: 'Tell us whether a trial run is needed!',
      type: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false,
      confirmButtonText: 'OK!'
    }) 
  }
  else if ($('#inputExpert :selected').text() == "Choose..."){
    swal.fire({
      title: 'Are you an expert?',
      type: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false,
      confirmButtonText: 'OK!'
    }) 
  }
  else{
    var selAge = document.getElementById("inputAge").value;
    var selGender = $('#inputGender :selected').text();
    var selTrial = $('#inputTest :selected').text();
    var selExpert = $('#inputExpert :selected').text();
    var subjInfo = [
      ["Experiment name: ", expName],
      ["Name: ", userName],
      ["Age: ", selAge],
      ["Gender: ", selGender],
      ["Trial: ", selTrial],
      ["Expert: ", selExpert]
    ];
    const csvData = toCsv(subjInfo);
    try{
      fs.mkdirSync("../Experiments/" + expName + "/" + userName);
    }catch(err){
      swal.fire({
        title: 'No such experiment',
        text: 'Please create new or choose from saved',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
        confirmButtonText: 'OK!'
      })
    }
    fs.writeFileSync("../Experiments/" + expName + "/" + userName + "/" + userName + '(info)' + ".csv", csvData, 'utf8');
    fs.writeFileSync("../Experiments/" + expName + "/user.last", userName, 'utf8');
    var readConfig = fs.readFileSync("../Experiments/" + expName + "/" + expName + '(config)' + ".csv",'utf8');
    var splitConfig = readConfig.split('\n');
    var presMethod = (splitConfig[1].split(',')[1]);
    if ($('#inputTest :selected').text() == "Yes"){
      fs.writeFileSync("../Experiments/" + expName + "/" + userName + "/" + userName + ".test", ["Test"], 'utf8');
      swal.fire({
        title: 'Starting training, get ready!',
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
        onClose: startTrialPres,
        confirmButtonText: 'OK!'
      })
      function startTrialPres(){
        mainW.presWindow(presMethod);
        win.close();
      }
    }
    else {
      swal.fire({
        title: 'Info saved, get ready!',
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
        onClose: startPres,
        confirmButtonText: 'OK!'
      })
    }
    function startPres(){
      mainW.presWindow(presMethod);
      win.close(); 
    }
  }
})


//Disable enter key press to submit//
document.getElementById("inputName").onkeypress = function(e) {
  var key = e.charCode || e.keyCode || 0;     
  if (key == 13) {
    e.preventDefault();
  }
}

document.getElementById("inputAge").onkeypress = function(e) {
  var key = e.charCode || e.keyCode || 0;     
  if (key == 13) {
    e.preventDefault();
  }
}

//Only number chars allowed in Age Form//
var number = document.getElementById("inputAge");

// Listen for input event on numInput.
number.onkeydown = function(e) {
  if(e.keyCode == 109 || e.keyCode == 189 || e.keyCode == 107 || e.keyCode == 187 || e.keyCode == 190 || e.keyCode == 69) {
    return false;
  }
}
