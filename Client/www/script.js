var username = ""
var currentRoom = "room_0000" //Same public room name as in client.py 

console.log("ChatRoom Client")

window.onload = function()
{

	console.log("Checking if Client was refreshed or not")
	let login = document.getElementById("login")
	login.style.display = "flex"
	eel.checkRunning()

}	

eel.expose(closeWindow)
function closeWindow()
{
	
	close()
	
}

eel.expose(warn)
function warn(message)
{
	
	alert(message)
	
}



function login()
{
	
	let userInput = document.getElementById("loginUsername")
	
	username = userInput.value
	
	console.log("Logging in as " + username + " ...")
	console.log("Attempting to connect...")
	
	eel.connect(username)
	
}

eel.expose(authorizeLogin)
function authorizeLogin()
{
	
	let login = document.getElementById("login")
	
	login.style.display = "none"
	
	console.log("Login has been authorized by the server!")
	
}

eel.expose(addMessage)
function addMessage(message)
{
	console.log("1")
	let div = document.getElementById('chatSpace');
	console.log("2")
    let p = document.createElement("p");
	console.log("3")
    p.innerHTML = message + " </br>";
	console.log("4")
    div.appendChild(p);
	console.log("5")
	
}

//Function called by python
eel.expose(changeRoom)
function changeRoom(room)
{
	console.log("CHANGING ROOM")
	
	let div = document.getElementById('chatSpace')
	div.innerHTML = ""
	
	let roomName = document.getElementById('chatRoomName')
	
	let roomSelect = document.getElementById(room)
	
	if (roomSelect == null)
	{
		
		let newRoom = document.getElementById("room_0000").cloneNode(true)
		newRoom.id = room
		
		let children = newRoom.childNodes;
		
		children.forEach(function (item,index){
			
			if(item.className == 'nameRoom')
			{
				
				item.value = room
				
			}
			else if (item.className == 'exitRoom')
			{
				
				//Unique ID so that we can call individual exit buttons
				//item.id = "exitRoom_" + room
				
				item.style.display = "block"
				
			}
			
		});
		
		
		
		let chatList = document.getElementById("chatList")
		chatList.appendChild(newRoom)
		
	}
	
	if (room == "room_0000")
	{
		
		roomName.innerHTML = "Public Chat Room"
		
	}
	else
	{
		
		roomName.innerHTML = room
		
	}
	
	console.log(room)
	
	currentRoom = room
	
}

function joinRoom()
{
	
	let roomID = document.getElementById("joinCreateInput")
	console.log("Attempting to join " + roomID.value)
	eel.joinRoom(roomID.value)
	
}

function createRoom()
{
	
	let roomID = document.getElementById("joinCreateInput")
	console.log("Attempting to create " + roomID.value)
	eel.createNewRoom(roomID.value)
	
}


//Function called by user
function changeRoomClick(roomButtonObject)
{
	
	let room = roomButtonObject.id
	
	if (room != currentRoom)
	{
		console.log("Attempt to change room to " + room)
	
	eel.joinRoom(room)
		
	}
	
	
	
}


function leaveRoom(roomButtonObject)
{
	
	console.log("Leaving current room!")
	
	roomButtonObject.remove()
	
	eel.leaveRoom(roomButtonObject.id)
	
}


var chatTextInput = document.getElementById("chatInputText");

// Execute a function when the user presses a key on the keyboard
chatTextInput.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("chatInputSubmit").click();
  }
});


document.getElementById("chatInputFileInsertButton").onchange = function(e){
	
	let img = document.getElementById("chatInputFileInsertButton").files[0];
	
	if(img.size > 2097152){
       alert("File is too big!");
       this.value = "";
    }
	else{
		
		const reader = new FileReader();
	
	reader.addEventListener("load", () => {
    // convert image file to base64 string
    eel.sendImageMessage(reader.result);
	
  }, false);
	
	reader.readAsDataURL(img)
	}
	
	
	
}


const byteSize = str => new Blob([str]).size;

function sendMessage()
{
	
	let chatTextInput = document.getElementById("chatInputText");
	
	message = chatTextInput.value;
	
	eel.sendTextMessage(message)
	
	chatTextInput.value = ""
	
	
}


//Below code to prevent spaces/certain characters in certain input fields

function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

document.getElementById("joinCreateInput").onkeypress = function(e) {
    var chr = String.fromCharCode(e.which);
    if (!isAlphaNumeric(chr)){
		return false;
	}
        
};

document.getElementById("loginUsername").onkeypress = function(e) {
    var chr = String.fromCharCode(e.which);
    if (!isAlphaNumeric(chr)){
		return false;
	}
        
};