import React, {Component} from 'react';


class Messages extends Component {
  render() {
    let bubble;
    let side;
    let display;
    const userColor = this.props.colour;
    if(this.props.currentID === this.props.messageID) {
      bubble = '#488EDA'; // if user typed it
      side = 'block'
    } else {
      bubble = '#D986CF' // if others wrote it
      side = 'flex'
    }
    console.log(side)
      switch(this.props.type) {
        case 'incomingMessage':
          display = (
              <div style={{display:side}} >
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
              <div style={{display:side}} >
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



