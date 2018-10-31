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


wss.on('connection', (client) => {
  console.log('Client connected');
  //addClient(ws, generateColor());


  const clientCount = {
    type: 'clientCount',
    count: wss.clients.size
  }

  wss.clients.forEach(function(eachClient) {
    eachClient.send(JSON.stringify(clientCount))
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
    const mess = JSON.parse(message);
    if(!mess.type) {
      mess = clientCount
    }
    switch(mess.type){
      case 'postMessage':
        mess.type = 'incomingMessage';
      break;
      case 'postNotification':
        mess.type = 'incomingNotification';
      break;
    }
    return JSON.stringify(mess)
  }
