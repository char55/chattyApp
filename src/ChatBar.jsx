import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();
    this.state = {value  : ''};
    this.changeInput = this.changeInput.bind(this);
  }


  changeInput(e) {
    if (e.key === 'Enter') {
      this.props.addMessage(e.target.value)
      this.setState({value: ''})
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