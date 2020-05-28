/* Slider --------------------------------------------  */
var clicked;
var elem = document.querySelector('input[name="range1"]');
var target = document.querySelector('.value');
var score;
var rangeValue = function() {
    var newValue = elem.value;
    score = newValue;
    target.innerHTML = newValue;
    clicked = true;
};

elem.addEventListener("input", rangeValue);


var spawn = require('child_process').spawn;
var proc;
var os = require('os');
if (os.platform() == 'win32'){
    var cmd = 'mpv/mpv';
} else {
    var cmd = 'mpv';
}

/**
* Switch to ffplay (not recommended)
* var cmd = 'ffmpeg/bin/ffplay.exe';
*/

var score;
var readExp = fs.readFileSync("../Experiments/Experiment.last", 'utf8');
var readFiles = fs.readFileSync(`../Experiments/${readExp}/${readExp}(config).csv`, 'utf8');
var readUserName = fs.readFileSync(`../Experiments/${readExp}/user.last`, 'utf8');
var presMethod = (readFiles.split('\n'))[1].split(',')[1];
var trialRun = fs.existsSync(`../Experiments/${readExp}/${readUserName}/${readUserName}.test`);
var fileLength;
var breakTime = 0;
var noScore = 0;

/* try { -------------------------------------------------------- COMMENTED FOR DEBUGGING
    fs.unlinkSync(`../Experiments/${readExp}/user.last`)
    //file removed
} catch(err) {
    console.error(err)
} */

var FileListwName = readFiles.split('\n');
var DistortedFileNames = FileListwName[2].split(',');
var DistortedTrainingFile = FileListwName[3].split(',');
var OriginalFileNames = FileListwName[4].split(',');
var OriginalTrainingFile = FileListwName[5].split(',');
var videoFormat = FileListwName[6].split(',');
videoFormat.splice(0,1);
DistortedFileNames.splice(0,1);
DistortedTrainingFile.splice(0,1);
OriginalTrainingFile.splice(0,1);
OriginalFileNames.splice(0,1);
var FileNames = DistortedFileNames.concat(OriginalFileNames);
var TrainingFileNames = DistortedTrainingFile.concat(OriginalTrainingFile);
var x=0;
var vN;
var getScoresTitles = ["Original video", "Score", "Distorted Video", "Score", "Differential score"];
var allScores = [];
var presOrderTitles = ["Video name", "Score"];


var totalVideoTime = 0;
var totalVideoTimeM = 0;
var breakNum;

function getBreakNum(FileNames) {
    for (i=0;i<FileNames.length;i++) {
        totalVideoTime = totalVideoTime + 8 + parseInt(FileNames[i].split('_')[5])/parseInt(FileNames[i].split('_')[2]);
    }
    Math.round(totalVideoTime);
    totalVideoTimeM = parseInt(totalVideoTime/60);
    breakNum = Math.round(totalVideoTimeM/30)-1;
}

if (trialRun) {
    document.getElementById("text").textContent = "Training phase is starting now, get ready!";
} else {
    document.getElementById("text").textContent = "Testing phase is starting now, get ready!";
}

getBreakNum(FileNames);
shuffle(FileNames);
setTimeout(function() {
    play(trialRun);
}, 2000);

function play(testTrial) {
    vN = x+1;
    if (testTrial) {
        noScore = 1;
        fileLength = TrainingFileNames.length;
        FFileNames = TrainingFileNames[x].substring(0, TrainingFileNames[x].length - 4);
        console.log(FFileNames);
        var ppath = `../trainingSequences/${FFileNames}${videoFormat}`;
    } else {
        noScore = 0;
        fileLength = FileNames.length;
        FFileNames = FileNames[x].substring(0, FileNames[x].length - 4);
        console.log(FFileNames);
        var ppath = `../converted/${FFileNames}${videoFormat}`;
    }
    
    setTimeout(function(){
        enableButton();
    }, 500);
    
    var args = [
        '-fs',
        '--ontop',
        '--osc=no',
        '--no-input-default-bindings',
        '--framedrop=no',
        '--hwdec=yes',
        ppath
    ];
    
    /**
    * FOR USE WITH FFPLAY
    * var args = [
        '-autoexit',
        '-fs', 
        '-i', ppath
    ];
    */
    
    watchVideo();
    setTimeout(function() {
        proc = spawn(cmd, args);
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
}

$('#continueB').click(function() {
    if (breakNum > 0 && breakTime == Math.floor(fileLength/breakNum)-1 && !trialRun && x < (fileLength-2)) {
        breakTimeF();
        breakTime = 0;
    } else {
        if (x < fileLength-1) {
            if (clicked == true) {
                if (noScore == 0) {
                    allScores.push([FFileNames,score]);
                }
                $('#replayB').prop('disabled', true);
                $('#continueB').prop('disabled', true);
                x = x + 1;
                breakTime = breakTime + 1;
                clicked = false;
                setTimeout(function() {
                    document.querySelector('input[name="range1"]').value = 50;
                    target.innerHTML = "";
                    enableButton();
                }, 1000);
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
                    allScores.push([FFileNames,score]);
                }
                $('#replayB').prop('disabled', true);
                $('#continueB').prop('disabled', true);
                finish();
                setTimeout(function() {
                    enableButton();
                    $('#continueB').focus();
                }, 250);
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
                    fs.unlinkSync(`../Experiments/${readExp}/${readUserName}/${readUserName}.test`);
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

$('#replayB').click(function() {
    $('#replayB').prop('disabled', true);
    $('#continueB').prop('disabled', true);
    play(trialRun);
});

function enableButton() {
    if ($("#continueB").is(":disabled")) {
        $('#continueB').prop('disabled', false);     
    }
    if ($("#replayB").is(":disabled")) {
        $('#replayB').prop('disabled', false);
    }
}

function rateVideo() {
    if (x < fileLength) {   
        setTimeout(function() {
            $('#buttons').removeClass('transitionEffect');
            document.getElementById("text").style.visibility = "visible";
            document.getElementById("text").textContent = `Please rate video ${vN} of ${fileLength}`;
            document.getElementById("slider").style.visibility = "visible";
            document.getElementById("continueB").style.visibility = "visible";
            document.getElementById("replayB").style.visibility = "visible";
        }, 1000);
    }
}

function watchVideo() {
    document.getElementById("text").style.visibility = "visible";
    document.getElementById("text").textContent = `Starting video ${vN}`;
    document.getElementById("slider").style.visibility = "hidden";
    document.getElementById("continueB").style.visibility = "hidden";
    document.getElementById("replayB").style.visibility = "hidden";
}

function breakTimeF() {
    $('#buttons').addClass('transitionEffect');
    setTimeout(function() {
        document.getElementById("slider").style.visibility = "hidden";
        document.getElementById("text").textContent = "Time for a break!\r\n Press continue when ready to start with the second half!";
        document.getElementById("text").style.visibility = "visible";
        document.getElementById("replayB").style.visibility = "hidden";
    }, 200);
}

function finish() {
    $('#buttons').addClass('transitionEffect');
    if (noScore == 0) {
        splitScores(allScores);
        var finalS = [];
        for (i=0;i<distortedV.length;i++) {
            for (j=0;j<originalV.length;j++) {
                if (distortedV[i][0].split('_')[0] == originalV[j][0].split('_')[0]) {
                    var temp = [originalV[j][0],originalV[j][1],distortedV[i][0], distortedV[i][1],distortedV[i][1]-originalV[j][1]+100];
                    finalS.push(temp);
                }
            }
        }
        var unsorted = allScores.slice();
        unsorted.unshift(presOrderTitles);
        const csvStringu = toCsv(unsorted);
        fs.writeFileSync(`../Experiments/${readExp}/${readUserName}/score(presentationOrder).csv`, csvStringu, 'utf8');
        finalS.sort(comparator);
        finalS.unshift(getScoresTitles);
        const csvString = toCsv(finalS);
        fs.writeFileSync(`../Experiments/${readExp}/${readUserName}/score.csv`, csvString, 'utf8');
    }
    setTimeout(function() {
        document.getElementById("slider").style.visibility = "hidden";
        document.getElementById("text").style.visibility = "visible";
        $('#replayB').remove();
        $('.button-container').addClass('center-end');
        if (!trialRun) {
            document.getElementById("text").textContent = "End of experiment, please press continue to finish!";
        } else {
            document.getElementById("text").textContent = "End of training, please press continue to proceed to testing!";
        }
    }, 200);
}

$('#myRange1').keyup(function(event){
    if (event.keyCode === 13) {
        //event.preventDefault();
        $("#continueB").click();
    }
});

$('#myRange1').keyup(function(event){
    if (event.keyCode === 8) {
        //event.preventDefault();
        $("#replayB").click();
    }
});