// Import required modules.
import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io('/');


// Class 'App' is a main component of app.
class App extends Component {
	// Constructor sets initial state of app.
  constructor(props) {
    super(props);
    this.state = {
    	users: [],
    	messages: [],
    	text: '',
    	name: ''
    };
  }
};

// Function 'render()' uses ternary (conditional) operator that checks if 'this.state.name' is empty or not and applies a different method basing on acctual condition.

// [...] !=='' ? [...] : [...] is equal to:
// if [...] !=='' {...} else {...}

// In this case if the condition is 'true', function renders loyout of the chat and on 'false', it renders a user form.
render() {
    return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
}

// The chat layout.
renderLayout() {
  return (
    <div className={styles.App}>
      <div className={styles.AppHeader}>
        <div className={styles.AppTitle}>
          ChatApp
        </div>
        <div className={styles.AppRoom}>
          App room
        </div>
        </div>
        <div className={styles.AppBody}>
          <UsersList users={this.state.users} />
          <div className={styles.MessageWrapper}>
            <MessageList messages={this.state.messages} />
            <MessageForm onMessageSubmit={message => this.handleMessageSubmit(message)} name={this.state.name} />
          </div>
        </div>
      </div>
   );
}

// The user form layout.
renderUserForm() {
  return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)} />)
}

export default App;u