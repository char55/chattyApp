import React, {Component} from 'react';


class Messages extends Component {
  render() {
    let bubble;
    let display;
    const userColor = this.props.colour;
    console.log("Current",this.props.currentID,"\nmessage",this.props.messageID)
    if(this.props.currentID === this.props.messageID) {
      bubble = '#488EDA'; // if user typed it
    } else {
      bubble = '#D986CF' // if others wrote it
    }
      switch(this.props.type) {
        case 'incomingMessage':
          display = (
              <div>
                <div className="message">
                  <span className="message-username"  style={{color:userColor}}>{this.props.user}</span>
                  <span className="message-content" style={{backgroundColor:bubble}}>{this.props.content}</span>
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
  console.log("IMG",image)
          display = (
              <div>
                <div className="message">
                  <span className="message-username"  style={{color:userColor}}>{this.props.user}</span>
                  <span className="message-content" style={{backgroundColor:bubble}}>
                  <p>
                  {this.props.content[0]}
                  </p><p>
                  <img src={image} width="60%" alt="from user"/>
                  </p><p>
                  {this.props.content[2]}
                  </p>
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



