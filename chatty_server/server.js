// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
const uuidv4 = require('uuid/v4')

const  clientsOnline = [];

colourOptions = ['#065186', '#0E861C', '#933C90', '97520D' ]

function randomColorGenerator() {
  const code = "1234567890ABCDEF";
  let colourPick = "#"
  for (let i = 0; i < 6; i++) {
    colourPick += code[Math.floor(Math.random()*16)]
  }
  return colourPick;
}


wss.on('connection', (client) => {
  console.log('Client connected');

  const clientCount = {
    type: 'clientCount',
    count: wss.clients.size
  }

  wss.clients.forEach(function(eachClient) {
    eachClient.send(JSON.stringify(clientCount));
    // const clientColour = checkClient(eachClient);

  })

    // sends message to all clients on server
  client.on('message', broadcastBack);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    console.log('Client disconnected')
    wss.clients.forEach(function(eachClient) {
      eachClient.send(JSON.stringify(clientCount))
    })
  }
    );

});


wss.broadcast = function(data) {
  wss.clients.forEach(function(eachClient) {
    eachClient.send(data)
  })
}
// passes message to each client on the server
function broadcastBack(message) {
  const returnData = typeMod(message)
  wss.broadcast(returnData);
}

function typeMod(message) {
  let mess = JSON.parse(message);
  if(!mess.type) {
    mess = clientCount
  }
  switch(mess.type){
    case 'postMessage':
      mess.type = 'incomingMessage';
      if( mess.content.includes("jpg") || mess.content.includes("png") || mess.content.includes("gif")) {
        mess = imageType(mess)
      }
    break;
    case 'postNotification':
      mess.type = 'incomingNotification';
    break;
    case 'postImage':
      mess.type = 'incomingImage';
    break;
  }
  mess = checkClient(mess)
  return JSON.stringify(mess)
}


function checkClient(mess) {
  let numb = clientsOnline.findIndex((eachClient) => eachClient.id===mess.userID)
  if (numb < 0) {
    // client doesn't exist yet
    addClient(mess)
    numb = clientsOnline.findIndex((eachClient) => eachClient.id===mess.userID)
  }
  mess.colour = clientsOnline[numb].colour;
  return mess
}

function addClient(mess) {
  clientsOnline.push({
    id: mess.userID,
    colour: randomColorGenerator()
  })
}

function imageType(mess) {
  mess.type = 'incomingImage'
    let preStr = "";
    let image = "";
    let poststr = "";
    let imageStart = mess.content.indexOf('http');
    let imageEnd = 0;

  if( mess.content.includes("jpg") ) {
    imageEnd = mess.content.indexOf('jpg')+3;
  } else  if( mess.content.includes("png") ) {
    imageEnd = mess.content.indexOf('png')+3;
  } else  if( mess.content.includes("gif") ) {
    imageEnd = mess.content.indexOf('gif')+3;
  }
  preStr = mess.content.substring(0,imageStart);
  // preStr = preStr + '\n';
  image = mess.content.substring(imageStart, imageEnd);
  poststr = mess.content.substring(imageEnd);
  mess.content = [preStr, image, poststr];
    // ASSUMES no more than one image per mess
    // varies dep on # of images???? recursive
    // SIZE OF IMAGE
    //Ensure images cannot be larger than 60% of the width of the page (resize images on the fly accordingly
  return mess;
}