'use strict';

require('electron-reload')(__dirname);
const {app, BrowserWindow, ipcMain, shell} = require('electron');
var path = require('path');
var fs = require('fs');
const nativeImage = require('electron').nativeImage;
const { spawn, spawnSync } = require('child_process');
const Alert = require("electron-alert");
const swal = require('sweetalert2');

let alert = new Alert();
let swalOptions = {
	html: '<span style="font-family:BlinkMacSystemFont,Roboto,Arial,sans-serif!important">The Software will now close.</span>',
	type: 'error',
	confirmButtonColor: '#3085d6',
	confirmButtonText: 'OK!'
};

let pythonVar = null;
let image = null;
var appIconDir = 'img/'; //-- directory for app icon and other imgs
var stopClose = false;
const debug = true;
const date = new Date();
const day = 24 * 60 * 60 * 1000; //-- one day in miliseconds

if (process.platform == 'win32') {
	image = nativeImage.createFromPath(path.join(__dirname, appIconDir, 'icon_white.ico'));
} else {
	image = nativeImage.createFromPath(path.join(__dirname, appIconDir, 'icon_white.png'));
}


/* Make vmafossexec executable */
const child_linux = spawn('chmod', ['+x','./vmaf/vmafossexec_linux']);
const child_mac = spawn('chmod', ['+x','./vmaf/vmafossexec_mac']);
/* --------------------------- */

/* ------- The main window ------- */
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
		if (fs.existsSync('../last_requirements_check')) {
			const readDateFile = fs.readFileSync('../last_requirements_check', 'utf8');
			const lastCheckDate = new Date(`${readDateFile.split('-')[1]}/${readDateFile.split('-')[0]}/${readDateFile.split('-')[2]}`)
			const today = new Date();
			if (Math.round(Math.abs((lastCheckDate - today) / day)) > 30) {
				check_all_requirements(win);
			} else win.show();
		} else {
			check_all_requirements(win);
		}
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

/* ----------- Windows ----------- */

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
			BrowserWindow.getAllWindows()[0].webContents.send('alert');
			shell.beep();
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
/* ------------------------------- */


/* Requirements checking functions */
const test_vmaf = () => {
	if (process.platform == 'win32') {
		return	fs.existsSync("./vmaf/vmafossexec.exe");
	} else if (process.platform == 'darwin') {
		const vmaf_mac = spawnSync('./vmaf/vmafossexec_mac');
		if (String(vmaf_mac.stderr) === 'null') {
			return false;
		}
		return true;
	} else {
		const vmaf = spawnSync('./vmaf/vmafossexec_linux');
		if (String(vmaf.stderr) === 'null') {
			return false;
		}
		return true;
	}
}

const test_mpv = () => {
	if (process.platform == 'win32') {
		return fs.existsSync("./mpv/mpv.exe");
	} else {
		const mpv = spawnSync('mpv', ['--version']);
		if (String(mpv.stderr)) {
			return false;
		}
		return true;
	}
}

const test_ffmpeg = () => {
	if (process.platform == 'win32') {
		return fs.existsSync("./ffmpeg/bin/ffmpeg.exe");
	} else {
		const ffmpeg = spawnSync('ffmpeg', ['-version']);
		if (String(ffmpeg.stderr)) {
			return false;
		}
		return true;
	}
}

const test_python = () => {
		 const python = spawnSync('python', ['--version']);
		 pythonVar = 'python';
		 if (String(python.stderr)) {
			const python3 = spawnSync('python3', ['--version']);
			if (String(python3.stderr)) {
				return false;
			}
			pythonVar = 'python3';	 
		}
		return true;
}

const test_python_requirements = () => {
	if (test_python() == true) {
		const numpy = spawnSync(pythonVar, ['-c', 'import numpy']);
		if (String(numpy.stderr)) {
			return false;
		}

		const matplotlib = spawnSync(pythonVar, ['-c', 'import matplotlib']);
		if (String(matplotlib.stderr)) {
			return false;
		}

		const scipy = spawnSync(pythonVar, ['-c', 'import scipy']);
		if (String(scipy.stderr)) {
			return false;
		}
	return true;
	} else {
		console.log('PYTHON NOT INSTALLED!');
	}
}

const check_all_requirements = (win) => {
	if (!test_python_requirements()) {
		swalOptions.title = `<h3 style="font-family:BlinkMacSystemFont,Roboto,Arial,sans-serif!important;margin:0;">Python requirements have not been properly installed!</h3>`;
		alert.fireFrameless(swalOptions,null,true,true).then(result => {
			if (result.value) {
				app.quit();
			}
		});
	} else if (!test_vmaf()) {
		swalOptions.title = `<h3 style="font-family:BlinkMacSystemFont,Roboto,Arial,sans-serif!important;margin:0;">VMAF cannot be found or has not been properly built!</h3>`;
		alert.fireFrameless(swalOptions,null,true,true).then(result => {
			if (result.value) {
				app.quit();
			}
		});
	} else if (!test_mpv()) {
		swalOptions.title = `<h3 style="font-family:BlinkMacSystemFont,Roboto,Arial,sans-serif!important;margin:0;">MPV cannot be found or has not been properly installed!</h3>`;
		alert.fireFrameless(swalOptions,null,true,true).then(result => {
			if (result.value) {
				app.quit();
			}
		});
	} else if (!test_ffmpeg()) {
		swalOptions.title = `<h3 style="font-family:BlinkMacSystemFont,Roboto,Arial,sans-serif!important;margin:0;">FFMPEG cannot be found or has not been properly installed!</h3>`;
		alert.fireFrameless(swalOptions,null,true,true).then(result => {
			if (result.value) {
				app.quit();
			}
		});
	} else {
		win.show();
		fs.writeFileSync('../last_requirements_check', `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`, 'utf8');
	}
}
/* --------------------------- */
