import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return(
      <footer className="chatbar">
      <input className="chatbar-username" defaultValue={this.props.user} />
      <input className="chatbar-message"
        name="content"
        placeholder="Type a message and hit ENTER"
        onKeyPress={(e) =>{
          e.key === 'Enter' ?
          this.props.addMessage(e.target.value) : null}} />
      </footer>
    )
  }
}

export default ChatBar;