/* Sliders --------------------------------------------  */
var clicked;
var elem = document.querySelector('input[name="range1"]');
//var text = document.querySelector("#gooce1");
var target = document.querySelector('.value');
var score;
var rangeValue = () => {
    var newValue = elem.value;
    score = newValue;
    target.innerHTML = newValue;
    clicked = true;
};

elem.addEventListener("input", rangeValue);

/* PLAYER */
var spawn = require('child_process').spawn;
var proc;
var os = require('os');
if (os.platform() == 'win32') {
    var cmd = 'mpv/mpv';
} else {
    var cmd = 'mpv';
}

/**
* Switch to ffplay (not recommended)
* var cmd = 'ffmpeg/bin/ffplay.exe';
*/

var readExp = fs.readFileSync("../Experiments/Experiment.last", 'utf8');
var readFiles = fs.readFileSync("../Experiments/" + readExp + "/" + readExp + '(config)' + ".csv", 'utf8');
var FileListwName = readFiles.split('\n');
var DistortedFileNames = FileListwName[2].split(',');
var DistortedTrainingFile = FileListwName[3].split(',');
var OriginalFileNames = FileListwName[4].split(',');
var OriginalTrainingFile = FileListwName[5].split(',');
var videoFormat = FileListwName[6].split(',');
videoFormat.splice(0,1);
DistortedFileNames.splice(0,1);
OriginalFileNames.splice(0,1);
DistortedTrainingFile.splice(0,1);
OriginalTrainingFile.splice(0,1);
var FileNames = DistortedFileNames.concat(OriginalFileNames);
var readUserName = fs.readFileSync("../Experiments/" + readExp + "/user.last", 'utf8');
var presMethod = (readFiles.split('\n'))[1].split(',')[1];
var trialRun = fs.existsSync("../Experiments/" + readExp + "/" + readUserName + "/" + readUserName + ".test");
var fileLength;
var x=0;
var vN;
var getOrigFileNames = [];
var getOrigTrainingFile = [];
var breakTime = 0;
var getScoresTitles = ["Video name", "Score"];
var allScores = [];
var noScore = 0;

/* try { -------------------------------------------------------- COMMENTED FOR DEBUGGING
    fs.unlinkSync("../Experiments/" + readExp + "/user.last")
    //file removed
} catch(err) {
    console.error(err)
} */

for (var i = 0; i < OriginalFileNames.length; i++) {  
    splitOrigFileNames = OriginalFileNames[i].split('_');
    getOrigFileNames.push(splitOrigFileNames[0]);
}

for (var i = 0; i < OriginalTrainingFile.length; i++) {  
    splitOrigTrainingFile = OriginalTrainingFile[i].split('_');
    getOrigTrainingFile.push(splitOrigTrainingFile[0]);
}


var totalVideoTime = 0;
var totalVideoTimeM = 0;
var breakNum;

function getBreakNum(distFileNames) {
    for (i=0;i<distFileNames.length;i++) {
        totalVideoTime = totalVideoTime + 10 + (2 * parseInt(distFileNames[i].split('_')[5])/parseInt(distFileNames[i].split('_')[2]));
    }
    Math.round(totalVideoTime);
    totalVideoTimeM = parseInt(totalVideoTime/60);
    breakNum = Math.round(totalVideoTimeM/30);
}

if (trialRun) {
    document.getElementById("text").textContent = "Training phase is starting now, get ready!";
} else {
    document.getElementById("text").textContent = "Testing phase is starting now, get ready!";
}

getBreakNum(DistortedFileNames);
shuffle(DistortedFileNames);
setTimeout(function() {
    play(trialRun);
}, 2000);

function play(testTrial) {
    vN = x+1;
    if (testTrial) {
        noScore = 1;
        fileLength = DistortedTrainingFile.length;
        DDistortedFileNames = DistortedTrainingFile[x].substring(0, DistortedTrainingFile[x].length - 4);
        getName = (DDistortedFileNames.split('_'))[0];
        var origIndex = getOrigTrainingFile.indexOf(getName);
        console.log(origIndex);
        OOriginalFileNames = OriginalTrainingFile[origIndex].substring(0, OriginalTrainingFile[origIndex].length - 4);
        var ppath = '../trainingSequences/' + OOriginalFileNames + videoFormat;
        var ppath2 = '../trainingSequences/' + DDistortedFileNames + videoFormat;        
    } else {
        noScore = 0;
        fileLength = DistortedFileNames.length;
        DDistortedFileNames = DistortedFileNames[x].substring(0, DistortedFileNames[x].length - 4);
        getName = (DDistortedFileNames.split('_'))[0];
        var origIndex = getOrigFileNames.indexOf(getName);
        OOriginalFileNames = OriginalFileNames[origIndex].substring(0, OriginalFileNames[origIndex].length - 4);
        var ppath = '../converted/' + OOriginalFileNames + videoFormat;
        var ppath2 = '../converted/' + DDistortedFileNames + videoFormat;
    }
    
    var args = [
        '-fs',
        '--ontop',
        '--osc=no',
        '--no-input-default-bindings',
        '--framedrop=no',
        '--hwdec=yes',
        ppath
    ];
    var args2 = [
        '-fs',
        '--ontop',
        '--osc=no',
        '--no-input-default-bindings',
        '--framedrop=no',
        '--hwdec=yes',
        ppath2
    ];
    

    /**
    * FOR USE WITH FFPLAY
    * var args = [
        '-autoexit',
        '-fs', 
        '-i', ppath
    ];
    * var args2 = [
        '-autoexit',
        '-fs', 
        '-i', ppath2
    ];
    */

    watchVideoPair();
    setTimeout(function() {
        watchVideo1();
        setTimeout(function() {
            proc = spawn(cmd, args);

            proc.stdout.on('data', function(data) {
                if (data.toString().includes('VO')) {
                    setTimeout(function(){
                        watchVideo2();
                    }, 3000);    
                }
            });
            proc.on('exit', function (code) { 
                proc = null;
                setTimeout(function() {
                    proc = spawn(cmd, args2);

                    proc.stdout.on('data', function(data) {
                        if (data.toString().includes('VO')) {
                            setTimeout(function(){
                                rateVideo();
                            }, 3000);    
                        }
                    });
                    
                    proc.on('exit', function (code) { 
                        proc = null;
                        $('input[name="range1"]').focus();
                    });
                }, 2000);
            });
        }, 2000);
    }, 2000);
}

$('#continue').click(function () {
    if (breakNum > 0 && breakTime == Math.floor(fileLength/breakNum)-1 && !trialRun && x < (fileLength-2)) {
        breakTimeF();
        breakTime = 0;
    } else {
        if (x < fileLength-1) {
            if (clicked == true) {
                if (noScore == 0) {
                    allScores.push([DDistortedFileNames,score]);
                }
                $('#continue').prop('disabled', true);
                x = x + 1;
                breakTime = breakTime + 1;
                clicked = false;
                setTimeout(function() {
                    document.querySelector('input[name="range1"]').value = 50;
                    target.innerHTML = "";
                    enableButton();
                }, 2000);
                play(trialRun);
            } else {
                swal.fire({
                    text: 'You have not selected a score, please select one to continue!' ,
                    icon:'error'
                });
            }
        } else if (x == fileLength-1) {
            if (clicked == true) {
                if (noScore == 0) {
                    allScores.push([DDistortedFileNames,score]);
                }
                $('#continue').prop('disabled', true);
                finish();
                setTimeout(function() {
                    enableButton();
                },500);
                x = x + 1;
            } else {
                swal.fire({
                    text: 'You have not selected a score, please select one to continue!' ,
                    icon:'error'
                }); 
            }
        } else {
            if (!trialRun) {
                mainW.mainWindow();
                win.close();
            } else {
                try {
                    fs.unlinkSync("../Experiments/" + readExp + "/" + readUserName + "/" + readUserName + ".test");
                    //file removed
                } catch(err) {
                    console.error(err);
                }
                
                swal.fire({
                    title: 'Well done, you finished with the training. Are you ready for the testing phase?',
                    text: "If you click cancel your personal information will be deleted!",
                    icon: 'info',
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Start!'
                }).then((result) => {
                    if (result.value) {
                        swal.fire({
                            title: 'Starting the testing phase, get ready!',
                            icon: 'info',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            allowOutsideClick: false,
                            onClose: function() {
                                mainW.presWindow(presMethod);
                                win.close();
                            },
                            confirmButtonText: 'OK!'
                        });
                    } else {
                        // UNLINK PERSONAL INFORMATION!
                        mainW.mainWindow();
                        win.close();
                    }
                });
            }
        }
    }
});

function enableButton() {
    if($("#continue").is(":disabled")) {
        $('#continue').prop('disabled', false);     
    }
    $('#continue').focus();
}

function watchVideo1() {
    document.getElementById("text").textContent = "Starting video A";
    document.getElementById("slider").style.visibility = "hidden";
    document.getElementById("buttons").style.visibility = "hidden";
}

function watchVideo2() {
    document.getElementById("text").textContent = "Starting video B";
    document.getElementById("slider").style.visibility = "hidden";
    document.getElementById("buttons").style.visibility = "hidden";
}

function watchVideoPair() {
    document.getElementById("text").textContent = "Starting pair of videos " + vN + " of " + fileLength;
    document.getElementById("slider").style.visibility = "hidden";
    document.getElementById("buttons").style.visibility = "hidden";
}

function rateVideo() {
    if (x < fileLength) {   
            document.getElementById("text").textContent = "Please rate video B";
            document.getElementById("slider").style.visibility = "visible";
            document.getElementById("buttons").style.visibility = "visible";
    }
}

function breakTimeF() {
    setTimeout(function() {
        document.getElementById("slider").style.visibility = "hidden";
        document.getElementById("text").textContent = "Time for a break!\r\n Press continue when ready to start with the second half!";
        document.getElementById("text").style.visibility = "visible";
    }, 200);
}

function finish() {
    if (noScore == 0) {
        var unsorted = allScores.slice();
        unsorted.unshift(getScoresTitles);
        const csvStringu = toCsv(unsorted);
        fs.writeFileSync("../Experiments/" + readExp + "/" + readUserName + "/"  + "score(presentationOrder).csv", csvStringu, 'utf8');
        allScores.sort();
        allScores.unshift(getScoresTitles);
        const csvString = toCsv(allScores);
        fs.writeFileSync("../Experiments/" + readExp + "/" + readUserName + "/" + "score.csv", csvString, 'utf8');
    }
    setTimeout(function() {
        $("#slider").css("visibility", "hidden");
        $(".button-container").addClass('center-end');
        if(!trialRun) {
            document.getElementById("text").textContent = "End of experiment, please press continue to finish!";
        } else{
            document.getElementById("text").textContent = "End of training, please press continue to proceed to testing!";
        }
        document.getElementById("text").style.visibility = "visible";
    }, 200);
}

$('#myRange1').keyup(function(event) {
    if (event.keyCode === 13) {
        //event.preventDefault();
        $("#continue").click();
    }
});