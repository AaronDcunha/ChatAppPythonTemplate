import eel
import socket
import pickle
import threading
import sys
import singleton


#Socket Variables
MAXBYTES = 2097152
SERVER = "192.168.1.247"  #SERVER IP
PORT = 5050               #Server PORT
ADDR = (SERVER,PORT)
connectedServer = False



#Public chat room upon connected to the server
currentRoom = "room_0000"

username  = ""

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.bind((socket.gethostbyname(socket.gethostname()),0))


def getMessageType(message):
    
    typ = message[0]
    
    return typ


#Message function to send to the server
def sendMessage(typ,message = ""):
    
    msg = [typ,message]
    
    msg = pickle.dumps(msg)
    
    client.send(msg)
    
    

#Message sent from client/user via texting.
@eel.expose
def sendTextMessage(message):
    
    print(message)
    
    sendMessage("MESSAGE",message)


@eel.expose
def sendImageMessage(image64):
    
    
    try:
            
        sendMessage("MESSAGE",["IMAGE",image64])
        
    except Exception as e:
        print("Couldn't upload image")
        print(e)

    
@eel.expose
def connect(userName):
    
    try:
    
        client.connect(ADDR)
        
        threadListen = threading.Thread(target=receive_message, args=())
        threadListen.start()
        
        print("LISTENING TO MESSAGES!")
        
        msgType = "CONNECT"
        
        global username
        
        username = userName
        
        sendMessage(msgType,username)
        
    except Exception as e:
        
        print(e)
        
        client.close()
        
        eel.closeWindow()
        
        sys.exit(-1)
    
    
@eel.expose
def createNewRoom(room):
    
    message = room
    
    print("Requesting server to create room")
    
    sendMessage("CREATE_ROOM",message)
    
    
@eel.expose
def joinRoom(room):
    
    message = room
    
    print("Requesting server to join room...")
    
    sendMessage("JOIN_ROOM",message)
    
    
@eel.expose
def leaveRoom(room):
    
    print("Attempting to leave current room!")
    
    sendMessage("LEAVE_ROOM",room)
    
    
@eel.expose
def checkRunning():

    if connectedServer:
        
        Disconnect()
        
    
def handle_Message_From_Console(message):
    
    global currentRoom
    global connectedServer
    
    if message[1] == "CONNECTED!":
        
        print("User has connected to the main server!")
        eel.authorizeLogin()
        connectedServer = True
        
    if message[1] == "NEWROOM":
        
        print("User changing room!")
        
        newRoom = message[2]
        
        currentRoom = newRoom
        
        eel.changeRoom(newRoom)
        
        print("Changed room in client")
    
    
def handle_message(messageObject):
    
    print(messageObject)
    
    message = ""
    
    if messageObject["Message"][0] == "IMAGE":
        
        message = f'<strong>{messageObject["Author"]} :</strong> <br> <img src="{messageObject["Message"][1]}" width="20%">'
    
    else:
 
        message = f"<strong>{messageObject['Author']} :</strong> {messageObject['Message']}"
    
    print("SendingMESSAGE")
    eel.addMessage(message)
    print("messageSent")
    
    
def receive_message():

    global connectedServer
    
    while True:
        
        try:
        
            msg = client.recv(MAXBYTES)
            msg = pickle.loads(msg)
            
            print(msg)
            
            typ = getMessageType(msg)
            
            if typ == "CONSOLE":
                
                handle_Message_From_Console(msg)
                
            elif typ == "MESSAGE":
                
                handle_message(msg[1])
                
        except ConnectionResetError as e:
            
            print(e)
            
            connectedServer = False
            
            eel.closeWindow()
            
            sys.exit(-1)
                


def Disconnect():
    
    global connectedServer
    
    if connectedServer:
        
        sendMessage("DISCONNECT")
    
        client.close()
    
    connectedServer = False
    
    eel.closeWindow()
    
    sys.exit()
        

def onClose(pagePath, sockets):
    
    Disconnect()

#Checks if another instance is running
try:

    me = singleton.SingleInstance()

except singleton.SingleInstanceException:
    
    sys.exit(-1)
    

eel.init('www')


#Attempt to start via Chrome or Edge

try:
        
    eel.start(
        'GUI.html', 
        mode='chrome',
        size=(1000,600),
        block=True,
        close_callback = onClose
        )

    
except EnvironmentError:
    
    eel.start(
        'GUI.html', 
        mode='edge',
        size=(1000,600),
        block=True,
        close_callback = onClose
        )


