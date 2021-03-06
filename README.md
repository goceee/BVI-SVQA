# BVI-SVQA - Bristol Vision Institute Subjective Video Quality Assessment Software

<p align="center">
  <img src="/doc/animation.gif">
</p>

BVI-SVQA is a software that allows people to prepare and perform experiments for **S**ubjective **V**ideo **Q**uality **A**ssessment. BVI-SVQA was developed at the University of Bristol as part of a final year project of Mr G. Dimitrov under the supervision of Dr A. Katsenou and Prof. D. R. Bull.

# Requirements

* Operating system: Windows, Linux or macOS
* Python 3.5 (for use with Tobii Eye Tracker, otherwise any python3 version works)
    - Windows: you can download the Python 3.5 distribution from the official [website.](https://www.python.org/downloads/release/python-354rc1/) 
    - Linux: `sudo add-apt-repository ppa:deadsnakes/ppa` `sudo apt-get update` `sudo apt-get install python3.5`
    - macOS: `https://www.python.org/downloads/mac-osx/`
    - Run the following command from the folder where requirements.txt is located to install the necessary python libraries - `pip install -r requirements.txt` or `pip3 install -r requirements.txt`
* NodeJS
    - It can be downloaded and installed from `https://nodejs.org/en/` for all platforms
* FFMPEG
    - Windows: provided with the application repository and no extra steps are required.
    - Linux: you can install it using the following three commands:
       - `sudo add-apt-repository universe`
       - `sudo apt update`
       - `sudo apt install ffmpeg`
    - macOS: The simplest way to install ffmpeg on Mac OS X is with [Homebrew](http://mxcl.github.com/homebrew/). Once you have Homebrew                installed install ffmpeg from the Terminal with the following: `brew install ffmpeg`.
 * MPV player
    - Windows: provided with the application repository and no extra steps are required.
    - Linux: install it via `sudo apt-get install mpv`
    - macOS: install it by using [Homebrew]: `brew install mpv`
 * VMAF
    - A prebuilt version for each of the major three Operating Systems is provided in the vmaf folder.
    - If you need to update to the latest vmaf version, make sure to follow the instructions for installation of **vmafossexec** available on the Netflix vmaf [repository.](https://github.com/Netflix/vmaf/blob/master/resource/doc/vmafossexec.md)
     - Final step necessary for updating VMAF. 
        - After completing the instructions given in the link above, depending on what OS vmaf has been build, for Linux or Mac, rename the vmafossexec file to vmafossexec_linux or mac and move it into into the vmaf folder in the BVI-SVQA software, for Windows just move the exe files into the previously mentioned folder. (IMPORTANT: make sure the new filenames match exactly the same as the old ones) 
        

    
# Steps to start the software

1. Clone the repository
2. Install all the requirements
3. Open the repository folder
4. Run `npm install` from a command line in that folder (this install electron and all its necessary dependencies to run the software)
5. Start the software by opening `Subjective Video Quality Assessment (windows).vbs` for Windows and `npm start` from the terminal in Linux or Mac.

# Tutorials (available in tutorials folder)
  * Creating an Experiment
  * Starting an Experiment
  
# How to reference BVI-SVQA
This software is free and anyone is freely licensed to use, copy, study, and change the software in any way, and the source code is openly shared so that people are encouraged to voluntarily improve the design of it.
We would be grateful if the following works are cited in case of any publication that has used this software.

[1] Dimitrov, G., "Subjective Video Quality Assessment Software", M.Eng. Thesis, University of Bristol, 2019.

[2] Katsenou, A., Dimitrov, G., Ma, D., and Bull, D. R., "BVI-SynTex: A Synthetic Video Texture Dataset forVideo Compression and Quality Assessment", submitted in IEEE Transactions on Multimedia.

# Acknowledgements
We acknowledge that part of this work was partly funded by the Leverhulme Trust, via an Early Career Fellowship ECF-2017-413 that was awarded to Dr. Angeliki Katsenou, and by the Engineering and  Physical  Sciences  Research  Council  (EPSRC), grant No. EP/M000885/1.
