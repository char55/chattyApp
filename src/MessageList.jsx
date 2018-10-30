import React, {Component} from 'react';
import Messages from './Messages.jsx'

class MessagesList extends Component {
  render() {
    const data = this.props.data
    const allMessages = data.map((singleMessage) =>
        <Messages key={singleMessage.id} singleMessage={singleMessage}/>
      );

    return(
      <main>
        {allMessages}
      {/*for loop for messages*/}
      </main>
      )
  }
}

export default MessagesList;