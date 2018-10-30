import React, {Component} from 'react';

const Messages = ({user, content}) => (
    <div>
      <div className="message">
        <span className="message-username">{user}</span>
        <span className="message-content">{content}</span>
      </div>
      <div className="message system">
      </div>
    </div>
)

export default Messages;

