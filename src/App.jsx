import React, {Component} from 'react';
import MessagesList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

const dummyData = {
  currentUser: {name: "Char"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

const uuidv4 = require('uuid/v4')

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser : dummyData.currentUser.name,
      messages : dummyData.messages
    }
    this.socket = new WebSocket('ws://localhost:3001')
  }

  navBar() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      )
  }

  addMessage = (content) => {
    const newMessage = {id: uuidv4(), username: this.state.currentUser, content: content};
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.

    this.socket.send(JSON.stringify(newMessage))

    this.socket.onmessage = (ev) => {
      const messages = this.state.messages.concat(JSON.parse(ev.data))
      this.setState({messages: messages})
    }

  }

  componentDidMount() {
    console.log('Connected to server');


  }

  render() {
    return (
     <div>
      <this.navBar/>
      <MessagesList data={this.state.messages}/>
      <ChatBar user={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;



