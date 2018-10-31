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
      totalUsers: 0
    };
    const ip_LH = '10.110.111.116';
    this.socket = new WebSocket(`ws://${ip_LH}:3001`);
    this.addMessage = this.addMessage.bind(this);
    this.newUser = this.newUser.bind(this);
    this.navBar = this.navBar.bind(this);
  }

  navBar() {
    // const ppl = ''+this.state.totalUsers;
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span>{this.state.totalUsers} users online</span>
      </nav>
      )
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
      type: 'postMessage'
    };
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.socket.send(JSON.stringify(newMessage))
  }

  componentDidMount() {
    console.log('Connected to server');
 ;

    this.socket.onmessage = (ev) => {
      const data = JSON.parse(ev.data);
      console.log(data)

      switch(data.type){
        case 'incomingMessage':
          const messages = this.state.messages.concat(data)
          this.setState({messages: messages})
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
  }

  render()
  {
    return (
     <div>
      <this.navBar/>
      <MessagesList data={this.state.messages}/>
      <ChatBar
      user={this.state.currentUser}
      newUser={this.newUser}
      addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;



