var currentValue = {
    progress : null,
    text : 'Please wait...',
    detail : null
};

var settings = {
    indeterminate : null,
    maxValue : null
}

var elements = {
    text : document.querySelector("#text"),
    detail : document.querySelector("#detail"),
    progressBarContainer : document.querySelector("#progressBarContainer"),
    progressBar : null // set by createProgressBar()
};

function createProgressBar(settings){
    if(settings.indeterminate){
        var progressBar = document.createElement("div");
        progressBar.setAttribute("id", "progressBar");
        progressBar.setAttribute("indeterminate", "t");
        
        var progressBarValue = document.createElement("div");
        progressBarValue.setAttribute("id", "progressBarValue");
        progressBar.appendChild(progressBarValue);
        
        elements.progressBar = progressBar;
        elements.progressBarContainer.appendChild(elements.progressBar);
    }else{
        var progressBar = document.createElement("progress");
        progressBar.setAttribute("id", "progressBar");
        progressBar.max = settings.maxValue;
        
        elements.progressBar = progressBar;
        elements.progressBarContainer.appendChild(elements.progressBar);
    }
    window.requestAnimationFrame(synchronizeUi);
}

function synchronizeUi() {
    elements.detail.innerHTML = currentValue.detail;
    elements.progressBar.value = currentValue.progress;
    window.requestAnimationFrame(synchronizeUi);
}