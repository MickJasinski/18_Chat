import React, { Component } from 'react';

import styles from './css/MessageForm.css';

class MessageForm extends Component {
	// This sets an initial state of form.
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  // This sends a message to the server.
  handleSubmit(e) {
  	// This prevents a default form behavior.
    e.preventDefault();
    // This holds a message and user name.
    const message = {
      from : this.props.name,
      text : this.state.text
    };
    // This submits the message.
    this.props.onMessageSubmit(message);
    // This clears the state.
    this.setState({ text: '' });
  }

  // This a state of 'text'.
  changeHandler(e) {
    this.setState({ text : e.target.value });
  }

  // This renders a MessageForm.
  render() {
    return(
      <form className={styles.MessageForm} onSubmit={e => this.handleSubmit(e)}>
        <input
          className={styles.MessageInput}
          onChange={e => this.changeHandler(e)}
          value={this.state.text}
          placeholder='Message'
        />
      </form>
    );
  }
}

export default MessageForm;