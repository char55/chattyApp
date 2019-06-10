Chatty App
=====================

ChattyApp AKA 'Chats-a-lot' enables users from various locations to chat together, on one server, with picture/gif sharing capabilities.
It is a client-side single page app built with ReactJS, utilizing babel and webpack.

## Demo

![users can chat and change their name](https://github.com/char55/chattyApp/blob/master/build/users%20can%20chat%20and%20change%20their%20name.png?raw=true)

![users can send pictures](https://github.com/char55/chattyApp/blob/master/build/users%20can%20send%20pictures.png?raw=true)

![users can send gifs with texts together](https://github.com/char55/chattyApp/blob/master/build/users%20can%20send%20gifs%20with%20texts%20together.png?raw=true)

### Usage

# Set-Up

* Clone this repo
* install the dependencies for ChattyApp
* to go the ```chatty_server``` folder and install dependencies for the server
  - chatty_server will be hosting the ChattyApp

For ChattyApp to properly reference the chatty_server, you must adjust the 'IP_HOST'

# Changing the host

In ChattyApp
      -> src -> App.jsx
          go to line 16 and change the value of ```IP_HOST ``` to your current IP

# Running the code
* from chatty_server, run the server
  ``` node server.js ```
* as it's running, in a different terminal, go to ChattyApp and start the app up by typing ```npm start```
 * app will be on local host
 * app can be shared for chatting using the

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* uuid

### Features

* Chat log visible to all connected users
  * display: text, and images of type: '.png', '.gif', '.jpg'
  * displays the date and time at which the message was sent
  * messages sent from the user are coloured blue, those that the user receives are coloured light purple
  * messages can be sent from input field in the bottom left
  * blank spaces will not be accepted as a valid messages

* Users are displayed as "Anonymous" unless offer a name
  * a notification is put in the chat log anytime a user changes their name
  * each user is given a colour, set as the colour of their username
    * the colour is randomly assigned
    * the colour will not alter if the user changes usernames
  * to change username edit the bottom left input field
    * username will change when user hits Enter within the username input field
    * username will change when user hits Enter within the message input field, if there is a new message to send and if the username has been altered

* The total number of connected users is displayed in the top right corner
  * increases when a connection is made
  * decreased when a connection is ended

