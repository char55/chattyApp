import React, {Component} from 'react';

class Messages extends Component {
  render() {
    const user = this.props.singleMessage.username;
    const content = this.props.singleMessage.content;
    return(
      <div>
        <div className="message">
          <span className="message-username">{user}</span>
          <span className="message-content">{content}</span>
        </div>
        <div className="message system">
        </div>
      </div>
      )
  }
}

export default Messages;

