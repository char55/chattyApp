import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();
    this.state = {value  : ''};
    this.messageHit = this.messageHit.bind(this);
    this.changeInput = this.changeInput.bind(this);
  }

  messageHit(data) {
    this.props.addMessage(data);
    this.setState({value: ''})
  }

  changeInput(e) {
    if (e.key === 'Enter') {
      this.messageHit(e.target.value)
    } else {
      this.setState({value: e.target.value})
    }
  }

  render() {
    return(
      <footer className="chatbar">
      <input className="chatbar-username" defaultValue={this.props.user} />
      <input className="chatbar-message"
        value={this.state.value}
        placeholder="Type a message and hit ENTER"
        onChange={this.changeInput}
        onKeyPress={(e) =>{
          this.changeInput(e);
        }} />
      </footer>
    )
  }
}

export default ChatBar;