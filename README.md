# Chat App Python Template
This project serves as the most basic foundation for a simple Chat App built using Python, and designed using HTML, CSS with the help of [EEL.](https://github.com/ChrisKnott/Eel)
But this can also be used as a complete App amongst you and your group!

### Features
- Easy to use Chat App!
- Create and Join different Rooms!
- Images/Gif upload upto 2mb! (Can be changed)
- Host servers privately so only you and your friends can join!

<details>

<summary>Table Of Content</summary>

- [Project Info](#chat-app-python-template)
- [Features](#features)
- [Server Setup](#server-setup)
- [Client Setup](#client-setup)
- [How To Compile](#how-to-compile-client-folder)
- [Themes](#custom-themes)
- [Features in Progress](#features-yet-to-be-added)
- [Contribute](#how-to-contribute)
- [License](#license)

</details>

![Demonstration](https://cdn.discordapp.com/attachments/733409916567421028/1005679326345310299/unknown.png)



### Server Setup
The Server folder has only one script: ```server.py```
The ```server.py``` file has a few important variables to configure.
```python
HOST = "" #Server IP Address
PORT = 0 #Server PORT
MaxBytes = 0 #Maximum Bytes to read
```
Once set, this script can be run from your VPS / Computer using the command: ```py Server.py``` . From then on, Clients can connect to the server!

### Client Setup

Refer to [Compiling](#how-to-compile-client-folder) if you do not know how to compile the Client Folder to a standalone executable.

The Client user requires to either have [Google Chrome](https://www.google.com/chrome/dr/download/?brand=JJTC&gclid=Cj0KCQjwxb2XBhDBARIsAOjDZ34dzmYMx3ghi6HoxKZGdfoR90WmrVqehyRPLHx0cqnT1bmALyohpm0aAs8lEALw_wcB&gclsrc=aw.ds) or [Microsoft Edge](https://www.microsoft.com/en-us/edge?r=1) downloaded. To create more modes, refer to [Eel's documentation](https://github.com/ChrisKnott/Eel) and accordingly set the desired mode in ```Client.py```

The Client may modify the theme by modifying the ```styles.css``` inside the ```www``` folder. Refer to [Modifying Themes](#custom-themes)

### How to Compile Client Folder
The Client folder has the following files:

- www (folder)
- ```Client.py``` 
- requirements.txt
- ```singleton.py```

The ```www``` folder contains the HTML and CSS files through which the display of the App can be modified. Keep in mind the JAVASCRIPT file that communicates with ```Client.py``` script to talk to the server. 

The ```Client.py``` file is where the main client backend is coded. This file also contains a few important variables to configure.
```python
MAXBYTES = 0
SERVER = ""  #SERVER IP
PORT = 0     #Server PORT
```
These values need to be the same as the one in the ```Server.py``` script.

The ```requirements.txt``` file is the file through which you can import all dependencies using the command: ```pip install -r /path/to/requirements.txt```

The ```singleton.py``` file is part of the [tendo](https://github.com/pycontribs/tendo) library. It was taken out separetely since trying to import the entire library caused issues when using PyInstaller. This file ensures that only ONE instance of the ```Client.py``` script is being run.

Finally, to compile the folder into a standalone exe, ensure you have the ```PyInstaller``` module.
If not, run the command ```pip install PyInstaller```

In the Terminal/CMD run the command ```py -m eel [PATH_TO_CLIENT.py] [PATH_TO_www]``` (for example: ```py -m eel Client.py www```)
Optionally you can add PyInstaller's flags which you can refer [PyInstaller's Documentation.](https://pyinstaller.org/en/stable/)

### Custom Themes

The looks of the app can be edited in the ```styles.css``` files located under the ```www``` folder.
The overall colors can be modified by changing the variables located at the top of the css file.
```css
:root {
  --loginBG: #2A2A32;
  --loginBox: #515155;
  --dark-bg: #181823;
  --light-bg: #2A2A32;
  --header-Side : #35353D;
  --header-Main : #24242E;
  --chat-Input: #2A2A32;
  --join-Button: #95E77A;
  --create-Button: #E7877A;
  --chat-Item : #515155;
}
```
You can experiment with other changes as well to suit your liking.

### Features yet to be added
- Rooms with permissions [Owner, Blocked Users, etc.]
- Temporarily save chat history
- Server IP Blocks

### How to contribute
Feel free to fork/clone , create a new branch and submit a pull request.

### License
This project is under GNU General Public License v3.0
Feel free to contribute / use this project as you want as long as the license use is respected.

