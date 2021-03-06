import React, {Component} from 'react';
import MessagesList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'
const uuidv4 = require('uuid/v4')

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser : '',
      messages : [],
      totalUsers: 0,
      id: uuidv4()
    };
    const IP_HOST = 'localhost';
    this.socket = new WebSocket(`ws://${IP_HOST}:3001`);
    this.addMessage = this.addMessage.bind(this);
    this.newUser = this.newUser.bind(this);
    this.navBar = this.navBar.bind(this);
  }

  navBar() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
        <i className="fas fa-feather-alt"></i>
         Chats-a-lot
        </a>
        <span>
        <i className="far fa-comments"></i>
         <div>{this.state.totalUsers} users online</div></span>
      </nav>
      )
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  newUser(user) {
    if (user !== this.state.currentUser) {
      const nameNotification = `User ${this.state.currentUser} has changed name to ${user}`;
      this.setState({currentUser: user})
      this.socket.send(JSON.stringify({
        id: uuidv4(),
        type: 'postNotification',
        content: nameNotification
      }))
    } else {
      // same name no change needed
    }
  }

  addMessage(user, content) {
    if ( this.state.currentUser !== user) {
      if (user === undefined) {
        user = 'Anonymous';
        this.setState({currentUser: 'Anonymous'})
      } else {
        this.newUser(user)
        this.setState({currentUser: user});
      }
    }

    const newMessage = {
      id: uuidv4(),
      username: user,
      content: content,
      type: 'postMessage',
      colour: '#000000',
      userID: this.state.id,
      timeStamp: Date()
    };
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.socket.send(JSON.stringify(newMessage))
  }

  componentDidMount() {
    this.socket.onmessage = (ev) => {
      const data = JSON.parse(ev.data);

      switch(data.type){
        case 'incomingMessage':
          const messages = this.state.messages.concat(data)
          this.setState({messages: messages})
        break;
        case 'incomingImage':
          const image = this.state.messages.concat(data)
          this.setState({messages: image})
        break;
        case 'incomingNotification':
          const notify = this.state.messages.concat(data)
          this.setState({messages: notify})
        break;
        case 'clientCount':
          this.setState({totalUsers: data.count});
        break;
      }
    }
    this.scrollToBottom();
  }

componentDidUpdate() {
  this.scrollToBottom();
}

  render()
  {
    return (
     <div>
      <this.navBar/>
      <MessagesList data={this.state.messages} currentID={this.state.id}/>
      <div  className="message system"
         ref={(el) => { this.messagesEnd = el; }}
       ></div>
      <ChatBar
      user={this.state.currentUser}
      newUser={this.newUser}
      addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;



