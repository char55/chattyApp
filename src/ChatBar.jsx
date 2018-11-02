import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();
    this.state = {content  : '', user: ''};
    // if(this.props.user !== undefined) {
    //   this.setState({user: this.props.user})
    // }
    this.changeInput = this.changeInput.bind(this);
    this.inputUser = this.inputUser.bind(this);
  }

  inputUser(e) {
    this.setState({inputUser: e.target.value})
    if(e.key === 'Enter') {
      if(e.target.value.trim() != '' ) {
        this.props.newUser(e.target.value)
      }
    }
  }

  changeInput(e) {
    if (e.key === 'Enter') {
      // console.log(this.state.inputUser)
      if(e.target.value.trim() != '' ) {
        this.props.addMessage(this.state.inputUser, e.target.value)
        this.setState({content: ''})
      }
    } else {
      this.setState({content: e.target.value})
    }
  }


  render() {
    return(
      <footer className="chatbar">
      <input className="chatbar-username"
      defaultValue={this.props.user}
      value={this.state.in}
      onChange={this.inputUser}
      onKeyPress={this.inputUser}
       />

      <input className="chatbar-message"
        value={this.state.content}
        placeholder="Type a message and hit ENTER"
        onChange={this.changeInput}
        onKeyPress={this.changeInput} />
      </footer>
    )
  }
}

export default ChatBar;