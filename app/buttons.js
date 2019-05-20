'use strict';
const $ = require('jquery');
const { remote } = require('electron');
const mainW = remote.require('./main.js');
const swal = require('sweetalert2')
var fs = require('fs');
var MaximiseFlag = { maximized: false };
var win = remote.getCurrentWindow();
var names1 = [];
var names2 = [];
var path1;
var path2;
var selectedM;
const app = remote.app;
var basepath = app.getAppPath();
var diskspace = require('diskspace');
var listOfLess = []
var length1;
var length2;
var fullcounter = 0;
var zeroTest = 0;
var titlen1 = document.getElementById("up1");
var titlen2 = document.getElementById("up2");
var emptyFile = document.createElement('input');
emptyFile.type = 'file';

//TitleBar buttons////////////////////////////
$('#minimise').click(function(){
  win.minimize();
});

$('#maximise').click(function() {
  if(MaximiseFlag.maximized == false){
    MaximiseFlag.maximized = true;
    win.maximize();
  }else{  
    MaximiseFlag.maximized = false;
    win.unmaximize();
  }
});

$('#close').click(function() {
  if (fs.existsSync("../Experiments/temporary.scale")){
    try {
      fs.unlinkSync("../Experiments/temporary.scale");
      //file removed
    } catch(err) {
      console.error(err)
    } 
  }
  
  if (win.getParentWindow() != null){
    win.getParentWindow().setAlwaysOnTop(false);
  }
  win.close();
});

$('#discrete').click(function() {
  var selM = fs.readFileSync("../Experiments/temporary.method",'utf8')
  fs.writeFileSync("../Experiments/" + "temporary.scale", selM+"(discrete)", 'utf8'); 
  try {
    fs.unlinkSync("../Experiments/temporary.method");
    //file removed
  } catch(err) {
    console.error(err)
  }
  if (win.getParentWindow() != null){
    win.getParentWindow().setAlwaysOnTop(false);
  }
  win.close();
});

$('#continuous').click(function() {
  var selM = fs.readFileSync("../Experiments/temporary.method",'utf8')
  fs.writeFileSync("../Experiments/" + "temporary.scale", selM+"(continuous)", 'utf8');
  try {
    fs.unlinkSync("../Experiments/temporary.method");
    //file removed
  } catch(err) {
    console.error(err)
  } 
  if (win.getParentWindow() != null){
    win.getParentWindow().setAlwaysOnTop(false);
  }
  win.close();
});

$('#back').click(function() {
  if (fs.existsSync("../Experiments/temporary.scale")){
    try {
      fs.unlinkSync("../Experiments/temporary.scale");
      //file removed
    } catch(err) {
      console.error(err)
    } 
  }
  mainW.mainWindow();
  win.close();
})

function toCsv(input) {
  return input.map(row => row.join(',')).join('\n')
}

///////////////////////////////////////

//Main menu Buttons///////////////////////
$('#createExp').click(function() {
  if (fs.existsSync("../Experiments/temporary.scale")){
    try {
      fs.unlinkSync("../Experiments/temporary.scale");
      //file removed
    } catch(err) {
      console.error(err)
    } 
  }
  diskspace.check(basepath[0], function (err, result)
  {
    if (result.free/1073741824 < 10){
      swal.fire({
        title: 'You are running out of space!',
        text: parseInt(result.free/1073741824) + 'GB Available' ,
        type: 'warning',
        showCancelButton: false,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        onClose: openWindow,
        confirmButtonText: 'OK!'
      })
    } else{
      openWindow();
    }
  });
  function openWindow(){
    mainW.openWindow('createExperiment');
    win.close();
  }
});

$('#startExp').click(function() {
  if (fs.existsSync("../Experiments/temporary.scale")){
    try {
      fs.unlinkSync("../Experiments/temporary.scale");
      //file removed
    } catch(err) {
      console.error(err)
    } 
  }
  mainW.popUp();
  win.close();
});

$('#viewRes').click(function() {
  if (fs.existsSync("../Experiments/temporary.scale")){
    try {
      fs.unlinkSync("../Experiments/temporary.scale");
      //file removed
    } catch(err) {
      console.error(err)
    } 
  }
  mainW.resWindow();
  win.close(); 
});

$('#exitB').click(function() {
  if (fs.existsSync("../Experiments/temporary.scale")){
    try {
      fs.unlinkSync("../Experiments/temporary.scale");
      //file removed
    } catch(err) {
      console.error(err)
    } 
  }
  win.close();
});
//////////////////////////////////////////

$('#acr').click(function() {
  setScale("ACR");
  remote.getCurrentWindow().setAlwaysOnTop(true);
  $('#container').addClass('blurEffect');
});

$('#acr-hr').click(function() {
  setScale("ACR-HR");
  remote.getCurrentWindow().setAlwaysOnTop(true);
  $('#container').addClass('blurEffect');
});

$('#acr').change(function(){
  if(this.checked){
    $('.form-control').attr("value","");
    names2 = [];
    names1 = [];
    titlen1.title = "No file chosen";
    titlen2.title = "No file chosen";
    document.getElementById("up1").files = emptyFile.files;
    document.getElementById("up2").files = emptyFile.files;
    document.getElementById("browseDistorted").style.visibility = "visible";
    document.getElementById("browseOriginal").style.visibility = "hidden";
    document.getElementById("vName").style.visibility = "visible";
    document.getElementById("dName").style.visibility = "hidden";
  }
});

$('#acr-hr').change(function(){
  if(this.checked){
    $('.form-control').attr("value","");
    names2 = [];
    names1 = [];
    titlen1.title = "No file chosen";
    titlen2.title = "No file chosen";
    document.getElementById("up1").files = emptyFile.files;
    document.getElementById("up2").files = emptyFile.files;
    document.getElementById("browseDistorted").style.visibility = "visible";
    document.getElementById("browseOriginal").style.visibility = "visible";
    document.getElementById("vName").style.visibility = "visible";
    document.getElementById("dName").style.visibility = "visible";
  }
});

$('#samviq').change(function(){
  if(this.checked){
    if (fs.existsSync("../Experiments/temporary.scale")){
      try {
        fs.unlinkSync("../Experiments/temporary.scale");
        //file removed
      } catch(err) {
        console.error(err)
      } 
    }
    $('.form-control').attr("value","");
    names2 = [];
    names1 = [];
    titlen1.title = "No file chosen";
    titlen2.title = "No file chosen";
    document.getElementById("up1").files = emptyFile.files;
    document.getElementById("up2").files = emptyFile.files;
    document.getElementById("browseDistorted").style.visibility = "visible";
    document.getElementById("browseOriginal").style.visibility = "visible";
    document.getElementById("vName").style.visibility = "visible";
    document.getElementById("dName").style.visibility = "visible";
  }
});

$('#dscqs').change(function(){
  if(this.checked){
    if (fs.existsSync("../Experiments/temporary.scale")){
      try {
        fs.unlinkSync("../Experiments/temporary.scale");
        //file removed
      } catch(err) {
        console.error(err)
      } 
    }
    $('.form-control').attr("value","");
    names2 = [];
    names1 = [];
    titlen1.title = "No file chosen";
    titlen2.title = "No file chosen";
    document.getElementById("up1").files = emptyFile.files;
    document.getElementById("up2").files = emptyFile.files;
    document.getElementById("browseDistorted").style.visibility = "visible";
    document.getElementById("browseOriginal").style.visibility = "visible";
    document.getElementById("vName").style.visibility = "visible";
    document.getElementById("dName").style.visibility = "visible";
  }
});

$('#dsis').change(function(){
  if(this.checked){
    if (fs.existsSync("../Experiments/temporary.scale")){
      try {
        fs.unlinkSync("../Experiments/temporary.scale");
        //file removed
      } catch(err) {
        console.error(err)
      } 
    }
    $('.form-control').attr("value","");
    names2 = [];
    names1 = [];
    titlen1.title = "No file chosen";
    titlen2.title = "No file chosen";
    document.getElementById("up1").files = emptyFile.files;
    document.getElementById("up2").files = emptyFile.files;
    document.getElementById("browseDistorted").style.visibility = "visible";
    document.getElementById("browseOriginal").style.visibility = "visible";
    document.getElementById("vName").style.visibility = "visible";
    document.getElementById("dName").style.visibility = "visible";
  }
});

$(document).on('change','#up1', function(){
  zeroTest = 0;
  var files1 = document.getElementById("up1").files;
  console.log(files1);
  if(files1.length != 0){
    names1 = [];
  }
  if(files1.length > 0){
    path1 = files1[0].path.substr(0, files1[0].path.lastIndexOf('\\'));
    length1 = files1.length;
    for (var i = 0; i < length1; ++i) {
      names1.push(files1[i].name);
      
      if( !((files1[i].name).includes('.yuv')) ){
        document.getElementById("browseBut").innerHTML = document.getElementById("browseBut").innerHTML;
        titlen1.title = "No file chosen";
        swal.fire({
          text: 'Please use raw video format yuv!',
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
        names1.length = 0;
        document.getElementById("browseBut").innerHTML = document.getElementById("browseBut").innerHTML;
        break;
      } else if ( (((files1[i].name).split('_'))[6]).split('.')[0] == "R0" ) {
        titlen1.title = "No file chosen";
        swal.fire({
          text: 'You have a original video in the distorted, please select accordingly!',
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
        names1.length = 0;
        document.getElementById("browseBut").innerHTML = document.getElementById("browseBut").innerHTML;
        break;
      } else if ( ((files1[i].name).split('_')).length < 8 ){
        titlen1.title = "No file chosen";
        swal.fire({
          html: "<h4>Please have your files prepared in the following way:</h5>" + "<small>filename_resolution_fps_bitdepth_chroma_frames_ratepoint(0=original, >0=distorted)_codec_ratio.yuv</small>" + "<br>" + "<small>(e.g.)S11AirAcrobatic_1920x1080_60fps_10bit_420_300_R2_AV1_ratio2.yuv</small>",
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
        names1.length = 0;
        document.getElementById("browseBut").innerHTML = document.getElementById("browseBut").innerHTML;
        break;
      }
    }
  }
  console.log(names1.length) // FIX NO FILE CHOSEN!!!!!!!!!
  if(names1.length != 0){
    console.log(names1.join('\r\n'))
    titlen1.title = names1.join('\r\n')
    if(length1>2){
      $(this).closest('.form-group').find('.form-control').attr("value",length1+" files selected");
    }
    else{
      $(this).closest('.form-group').find('.form-control').attr("value",names1);
    } 
  } else{
    $('#browseT1').attr("value","");
  }
  
  if(names1.length != 0 && names2.length != 0){
    var counter1 = 0;
    var counter2 = 0;
    var videoss = [];
    var videoss2 = [];
    var counnter = 0;
    fullcounter = 0;
    listOfLess = [];
    var codec1 = names1[0].split('_')[7];
    for(var i=0;i<names2.length;i++){
      for(var j=0;j<names1.length;j++){
        if ( names1[j].includes(names2[i].split('_')[0]) && (!names1[j].includes('train') && !names2[i].includes('train')) ){
          if(names1[j].split('_')[7] != codec1){
            counter1 = counter1 + 1;
            fullcounter = fullcounter + 1;
          }
          else{
            counter2 = counter2 + 1;
            fullcounter = fullcounter + 1;
          }   
        }
      }
      if ( counter1 < 4 && counter1 > 0 && !names2[i].includes('train')){
        videoss.push(names2[i])
        videoss.push(counter1)
        listOfLess.push(videoss)
      }
      if ( counter2 < 4 && counter2 > 0 && !names2[i].includes('train')){
        videoss2.push(names2[i])
        videoss2.push(counter2)
        listOfLess.push(videoss2)
      }
      videoss = []
      videoss2 = []
      counter1 = 0;
      counter2 = 0;
    }
    console.log(listOfLess)
    for(var i=0;i<listOfLess.length;i++){
      if(listOfLess[i][1] < 4){
        counnter = counnter + 1;
      }
      if(listOfLess[i][1] == 0){
        zeroTest = 1;
      }
    }
    console.log(counnter)
    if(counnter > 0){
      var alertText = 'You have ' + counnter + ' distortions with less than 4 quality rates';
      swal.fire({
        text: alertText,
        type: 'info',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
        confirmButtonText: 'OK!'
      })
    }
  }
});



$(document).on('change','#up2', function(){
  zeroTest = 0;
  var files2 = document.getElementById("up2").files;
  if(files2.length != 0){
    names2 = [];
  }
  if(files2.length > 0){
    path2 = files2[0].path.substr(0, files2[0].path.lastIndexOf('\\'));
    length2 = files2.length;
    for (var i = 0; i < length2; ++i) {
      names2.push(files2[i].name);
      if ( !((files2[i].name).includes('.yuv')) ){
        titlen2.title = "No file chosen";
        swal.fire({
          text: 'Please use raw video format yuv!',
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
        document.getElementById("browse2").innerHTML = document.getElementById("browse2").innerHTML;
        names2.length = 0;
        break;
      } else if ( (((files2[i].name).split('.')[0]).split('_'))[6] != "R0" ) { //RECHECK THISSSSS
        titlen2.title = "No file chosen";
        swal.fire({
          text: 'You have a distorted video in the original, please select accordingly!',
          type: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
        names2.length = 0;
        document.getElementById("browse2").innerHTML = document.getElementById("browse2").innerHTML;
        break;
      } else if (((files2[i].name).split('_')).length < 7 ){
        titlen2.title = "No file chosen";
        swal.fire({
          html: "<h4>Please have your files prepared in the following way:</h5>" + "<small>filename_resolution_fps_bitdepth_chroma_frames_ratepoint(0=original, >0=distorted).yuv</small>" + "<br>" + "<small>(e.g.)S11AirAcrobatic_1920x1080_60fps_10bit_420_300_R0.yuv</small>",
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          confirmButtonText: 'OK!'
        })
        names2.length = 0;
        document.getElementById("browse2").innerHTML = document.getElementById("browse2").innerHTML;
        break;
      }
    }
  }
  
  if(names2.length != 0){
    titlen2.title = names2.join('\r\n')
    if(length2>2){
      $(this).closest('.form-group').find('.form-control').attr("value",length2+" files selected");
    }
    else{
      $(this).closest('.form-group').find('.form-control').attr("value",names2);
    }
  } else {
    $('#browseT2').attr("value","");
  }
  if(names1.length != 0 && names2.length != 0){
    var counter1 = 0;
    var counter2 = 0;
    var videoss = [];
    var videoss2 = [];
    var counnter = 0;
    fullcounter = 0;
    listOfLess = [];
    var codec1 = names1[0].split('_')[7];
    for(var i=0;i<names2.length;i++){
      for(var j=0;j<names1.length;j++){
        if ( names1[j].includes(names2[i].split('_')[0]) && (!names1[j].includes('train') && !names2[i].includes('train')) ){
          if(names1[j].split('_')[7] != codec1){
            counter1 = counter1 + 1;
            fullcounter = fullcounter + 1;
          }
          else{
            counter2 = counter2 + 1;
            fullcounter = fullcounter + 1;
          }   
        }
      }
      if ( counter1 < 4 && counter1 > 0 && !names2[i].includes('train')){
        videoss.push(names2[i])
        videoss.push(counter1)
        listOfLess.push(videoss)
      }
      if ( counter2 < 4 && counter2 > 0 && !names2[i].includes('train')){
        videoss2.push(names2[i])
        videoss2.push(counter2)
        listOfLess.push(videoss2)
      }
      videoss = []
      videoss2 = []
      counter1 = 0;
      counter2 = 0;
    }
    console.log(listOfLess)
    for(var i=0;i<listOfLess.length;i++){
      if(listOfLess[i][1] < 4){
        counnter = counnter + 1;
      }
      if(listOfLess[i][1] == 0){
        zeroTest = 1;
      }
    }
    console.log(counnter)
    if(counnter > 0){
      var alertText = 'You have ' + counnter + ' distortions with less than 4 quality rates';
      swal.fire({
        text: alertText,
        type: 'info',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
        confirmButtonText: 'OK!'
      })
    }
  }
});
/////////////////////////////////////////////////
/* SHUFFLE FUNCTION */
function shuffle ( myArray ) {
  var i = myArray.length;
  if ( i == 0 ) return false;
  while ( --i ) {
    var j = Math.floor( Math.random() * ( i + 1 ) );
    var tempi = myArray[i];
    var tempj = myArray[j];
    myArray[i] = tempj;
    myArray[j] = tempi;
  }
}

function setScale(method){
  selectedM = method;
  fs.writeFileSync("../Experiments/" + "temporary.method", selectedM, 'utf8'); 
  var position = win.getPosition();
  let settings = new remote.BrowserWindow({
    parent: win,
    modal: true,
    frame: false,
    resizable: false,
    transparent: true,
    x: position[0],
    y: position[1]+135,
    height: 220,
    width: 345,
  })
  
  settings.loadURL(url.format({
    pathname: 'setScale.html',
    slashes: true
  }))
}

var distortedV;
var originalV;
function splitScores(getScores){
  distortedV = getScores.slice()
  originalV = [];
  for (var i=0;i<getScores.length;i++){
    var index = (getScores[i])[0].indexOf("R0")
    if (index > 0){
      var element = getScores.slice(i,i+1)
      removeA(distortedV, element[0]);
      var result = [].concat.apply([], element);
      originalV.push(result)}
      // console.log(originalV)
    }
  }
  
  function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax= arr.indexOf(what)) !== -1) {
        arr.splice(ax, 1);
      }
    }
    return arr;
  }
  
  function Comparator(a, b) {
    if (a[2] <= b[2]) return -1;
    if (a[2] > b[2]) return 1;
    return 0;
  }