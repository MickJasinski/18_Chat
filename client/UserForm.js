import React, { Component } from 'react';

import styles from './css/UserForm.css';

// Create component.
class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  handleSubmit(e) {
    e.preventDefault();
    // This prevents a default form behavior.
    this.props.onUserSubmit(this.state.name);
    // This modifies a state of an App component by sending an imput's value to 'UserForm'.
  }

  handleChange(e) {
    this.setState({ name : e.target.value });
    // This takes a value of input and modifies its state.
  }

  render() {
    return(
      <form className={styles.UserForm} onSubmit={e => this.handleSubmit(e)}>
        <input
          className={styles.UserInput}
          placeholder='Write your nickname and press enter'
          onChange={e => this.handleChange(e)}
          value={this.state.name}
        />
      </form>
    );
  }
}

export default UserForm;