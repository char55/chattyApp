import React, {Component} from 'react';
import Messages from './Messages.jsx'

class MessagesList extends Component {
  render() {
    const data = this.props.data
    const allMessages = data.map((singleMessage) =>
        <Messages key={singleMessage.id} type={singleMessage.type} user={singleMessage.username} content={singleMessage.content}/>
      );

    return(
      <main>
        {allMessages}
      </main>
      )
  }
}

export default MessagesList;