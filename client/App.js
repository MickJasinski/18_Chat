// Import required modules.
import React, { Component } from "react";
import io from "socket.io-client";

// Import styles.
import styles from "./css/App.css";

//Import components.
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import UsersList from "./UsersList";
import UserForm from "./UserForm";

// 'Socket' for server.
const socket = io("/");

// Class 'App' is a main component of app.
class App extends Component {
  // Constructor sets initial state of app.
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages: [],
      text: "",
      name: ""
    };
  }

  // This listens for events of 'message' and 'update' and applies correct methods.
  componentDidMount() {
    socket.on("message", message => this.messageReceive(message));
    socket.on("update", ({ users }) => this.chatUpdate(users));
  }

  // This receives a message and updates its state.
  messageReceive(message) {
    const messages = [message, ...this.state.messages];
    this.setState({ messages });
  }

  // Same as above but without data modification.
  chatUpdate(users) {
    this.setState({ users });
  }

  // This updates a state of app and sends a message to the server, so can be displayed to the other users.
  handleMessageSubmit(message) {
    const messages = [message, ...this.state.messages];
    this.setState({ messages });
    socket.emit("message", message);
  }

  // This creates a new user and sends information about it to the server, so other users are notified.
  handleUserSubmit(name) {
    this.setState({ name });
    socket.emit("join", name);
  }
  // Function 'render()' uses ternary (conditional) operator that checks if 'this.state.name' is empty or not and applies a different method basing on acctual condition.

  // [...] !=='' ? [...] : [...] is equal to:
  // if [...] !=='' {...} else {...}

  // In this case if the condition is 'true', function renders loyout of the chat and on 'false', it renders a user form.
  render() {
    return this.state.name !== "" ? this.renderLayout() : this.renderUserForm();
  }

  renderLayout() {
    return (
      <div className={styles.App}>
        <div className={styles.AppHeader}>
          <div className={styles.AppTitle}>ChatApp</div>
          <div className={styles.AppRoom}>App room</div>
        </div>
        <div className={styles.AppBody}>
          <UsersList users={this.state.users} />
          <div className={styles.MessageWrapper}>
            <MessageList messages={this.state.messages} />
            <MessageForm
              onMessageSubmit={message => this.handleMessageSubmit(message)}
              name={this.state.name}
            />
          </div>
        </div>
      </div>
    );
  }

  renderUserForm() {
    return <UserForm onUserSubmit={name => this.handleUserSubmit(name)} />;
  }
}

export default App;
