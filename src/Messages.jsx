import React, {Component} from 'react';


class Messages extends Component {
  render() {
  let display;
  const colouring = this.props.colour;
  console.log("Colouring",colouring)
      switch(this.props.type) {
        case 'incomingMessage':
          display = (
              <div>
                <div className="message">
                  <span className="message-username"  style={{color:colouring}}>{this.props.user}</span>
                  <span className="message-content">{this.props.content}</span>
                </div>
                <div className="message system">
                </div>
              </div>
            )
        break;

        case 'incomingNotification':
          display = (
            <div className="notification">
              <span className="notification-content">{this.props.content}</span>
            </div>
            )
        break;

        case 'incomingImage':
        const image = this.props.content[1]
          display = (
              <div>
                <div className="message">
                  <span className="message-username"  style={{color:colouring}}>{this.props.user}</span>
                  <span className="message-content">
                  {this.props.content[0]}
                  <img src={image} alt="from user"/>
                  {this.props.content[2]}
                  </span>
                </div>
                <div className="message system">
                </div>
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



