import React, {Component} from 'react';


class Messages extends Component {
  render() {
  let display;
      const user = this.props.user;
      const content = this.props.content
      switch(this.props.type) {
        case 'incomingMessage':
          display = (
              <div>
                <div className="message">
                  <span className="message-username">{user}</span>
                  <span className="message-content">{content}</span>
                </div>
                <div className="message system">
                </div>
              </div>
            )
        break;

        case 'incomingNotification':
          display = (
            <div className="notification">
              <span className="notification-content">{content}</span>
            </div>
            )
        break;
      }

    return (
        <div>{display}</div>
      )
  }
}


export default Messages;
