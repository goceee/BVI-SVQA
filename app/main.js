'use strict';

require('electron-reload')(__dirname);
const {app, BrowserWindow, ipcMain, dialog} = require('electron');
var path = require('path');
var fs = require('fs');
const nativeImage = require('electron').nativeImage;
const { spawn } = require('child_process')

let image = null;
var appIconDir = 'img/'; //-- directory for app icon and other imgs
var stopClose = false;
const debug = false;

if (process.platform == 'win32') {
	image = nativeImage.createFromPath(path.join(__dirname, appIconDir, 'icon_white.ico'));
} else {
	image = nativeImage.createFromPath(path.join(__dirname, appIconDir, 'icon_white.png'));
}

/* Make vmafossexec executable */
const child_linux = spawn('chmod', ['+x','./vmaf/vmafossexec_linux']);
const child_mac = spawn('chmod', ['+x','./vmaf/vmafossexec_mac']);
/* --------------------------- */

const mainWindow = () => {
	let win = new BrowserWindow({
		width: 500,
		height: 500,
		frame: false,
		resizable:false,
		maximizable: false,
		transparent: true,
		show: false,
		webPreferences: { 			nodeIntegration: true, devTools: debug		  },
		icon: image
	});
	win.on('close', function() {win = null;});
	win.loadURL(`file://${__dirname}/main.html`);
	win.once('ready-to-show', () => {
		win.show();  
	});
};

app.whenReady().then(function() {
	setTimeout(function(){
		mainWindow();	
	},500);
	
	if (!fs.existsSync("../Experiments")) {
		fs.mkdirSync("../Experiments");
	}
	if (!fs.existsSync("../Experiments/Saved")) {
		fs.mkdirSync("../Experiments/Saved");
	}
	if (!fs.existsSync("../converted")) {
		fs.mkdirSync("../converted");
	}
	if (!fs.existsSync("../trainingSequences")) {
		fs.mkdirSync("../trainingSequences");
	}
	if (!fs.existsSync("../GazeData")) {
		fs.mkdirSync("../GazeData");
	}
	
	app.on('activate', function() {
		if (BrowserWindow.getAllWindows().length === 0) mainWindow();
	});
});

// Quit when all windows are closed.
app.on('window-all-closed', function(e) {
	// On macOS applications stay active 
	// until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('info', (event,args) => {
	if (args == 'stop-closing') {
		stopClose = true;
	} else {
		stopClose = false;
	}
});

exports.openWindow = (windowName) => {
	let win = new BrowserWindow({
		width:350,
		height:500,
		frame: false,
		resizable:false,
		maximizable: false,
		transparent: true,
		show: false,
		webPreferences: { 			nodeIntegration: true, devTools: debug 		  },
		icon: image 
	});
	win.on('close', function(e) {
		if (stopClose) {

			e.preventDefault();
			let options = {
				type: 'warning',
				title: 'Subjective Video Quality Assessment',
				message: 'Please wait until the process has finished!',
				buttons: ['OK']
			}
			dialog.showMessageBox(win,options);
			win.flashFrame(true);
		} 
	});
	win.loadURL(`file://${__dirname}/${windowName}.html`);
	win.once('ready-to-show', () => {
		win.show();    
	});   
};

exports.mainWindow = () => {
	let win = new BrowserWindow({
		width: 500,
		height: 500,
		frame: false,
		resizable:false,
		maximizable: false,
		transparent: true,
		show: false,
		webPreferences: { 			nodeIntegration: true, devTools: debug 		  },
		icon: image
	});
	win.on('close', function() {win = null});
	win.loadURL(`file://${__dirname}/main.html`);
	win.once('ready-to-show', () => {
		win.show();    
	});  
};

exports.resWindow = () => {
	let win = new BrowserWindow({
		width: 350,
		height: 600,
		frame: false,
		resizable:false,
		maximizable: false,
		fullscreen:false,
		transparent: true,
		show: false,
		webPreferences: { 			nodeIntegration: true, devTools: debug 		  },
		icon: image 
	});
	win.on('close', function() {win = null});
	win.loadURL(`file://${__dirname}/viewResults.html`);
	win.once('ready-to-show', () => {
		win.show();    
	}); 
};

exports.popUp = () => {
	let win = new BrowserWindow({
		width: 350,
		height: 380,
		frame: false,
		resizable:false,
		maximizable: false,
		transparent: true,
		show: false,
		webPreferences: { 			nodeIntegration: true, devTools: debug 		  },
		icon: image
	});
	win.on('close', function() {win = null});
	win.loadURL(`file://${__dirname}/popUp.html`);
	win.once('ready-to-show', () => {
		win.show();    
	});   
};

exports.presWindow = (presName) => {
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		fullscreen:true,
		simpleFullscreen: true,
		transparent: true,
		show: false,
		webPreferences: { 			nodeIntegration: true, devTools: debug 		  },
		icon: image
	});
	win.on('close', function() {win = null});
	win.loadURL(`file://${__dirname}/${presName}.html`);
	win.once('ready-to-show', () => {
		win.setAlwaysOnTop(true,'screen-saver','1');
		win.show();    
	});
};
