'use strict';

require('electron-reload')(__dirname);
var pyshell =  require('python-shell');
const {app, BrowserWindow} = require('electron');
const url = require('url');
var path = require('path');
var fs = require('fs');
var appIconDir = '/img/'; //-- directory for app icon

function boot(){
	console.log(process.type)
	let mainWin = new BrowserWindow({
		width: 500,
		height: 500,
		frame: false,
		resizable:false,
		transparent: true,
		webPreferences: { 			nodeIntegration: true 		  },
		icon: path.join(__dirname, appIconDir, 'icon.ico') // add app icon
	})
	mainWin.loadURL(url.format({
		pathname: 'main.html',
		slashes: true
	}))
	if (!fs.existsSync("../Experiments")){
		fs.mkdirSync("../Experiments");
	}
	if (!fs.existsSync("../Experiments/Saved")){
		fs.mkdirSync("../Experiments/Saved");
	}
	if (!fs.existsSync("../converted")){
		fs.mkdirSync("../converted");
	}
	if (!fs.existsSync("../trainingSequences")){
		fs.mkdirSync("../trainingSequences")
	}
	if (!fs.existsSync("../GazeData")){
		fs.mkdirSync("../GazeData")
	}
}

app.on('ready', boot);
app.on('window-all-closed', () => {
	app.quit();
});



exports.openWindow = (windowName) => {
	let win = new BrowserWindow({
		width:350,
		height:500,
		frame: false,
		resizable:false,
		transparent: true,
		webPreferences: { 			nodeIntegration: true 		  },
		icon: path.join(__dirname, appIconDir, 'icon.ico') 
	})
	win.setMaximizable(false);
	win.loadURL(url.format({
		pathname: windowName + `.html`,
		slashes: true
	}))
}

exports.mainWindow = () => {
	let win = new BrowserWindow({
		width: 500,
		height: 500,
		frame: false,
		resizable:false,
		transparent: true,
		webPreferences: { 			nodeIntegration: true 		  },
		icon: path.join(__dirname, appIconDir, 'icon.ico') 
	})
	win.setMaximizable(false);
	win.loadURL(url.format({
		pathname: 'main.html',
		slashes: true
	}))
}

exports.resWindow = () => {
	let win = new BrowserWindow({
		width: 350,
		height: 600,
		frame: false,
		resizable:false,
		fullscreen:false,
		transparent: true,
		webPreferences: { 			nodeIntegration: true 		  },
		icon: path.join(__dirname, appIconDir, 'icon.ico') 
	})
	win.setMaximizable(false);
	win.loadURL(url.format({
		pathname: 'viewResults.html',
		slashes: true
	}))
}

exports.popUp = () => {
	let win = new BrowserWindow({
		width: 350,
		height: 380,
		frame: false,
		resizable:false,
		transparent: true,
		webPreferences: { 			nodeIntegration: true 		  },
		icon: path.join(__dirname, appIconDir, 'icon.ico')
	})
	win.setMaximizable(false);
	win.loadURL(url.format({
		pathname: 'popUp.html',
		slashes: true
	}))
}

exports.presWindow = (presName) => {
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		//alwaysOnTop: true,
		frame: false,
		resizable:false,
		fullscreen:true,
		transparent: true,
		webPreferences: { 			nodeIntegration: true 		  },
		icon: path.join(__dirname, appIconDir, 'icon.ico') 
	})
	win.setMaximizable(false);
	win.loadURL(url.format({
		pathname: presName + `.html`,
		slashes: true
	}))
}