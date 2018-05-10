import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Classroom.css';

class ChatInput extends Component {
  static propTypes = {
      onSubmit: PropTypes.func.isRequired,
  }

  state = {
    text: '',
  }

  onTextInput = (e) => {
    this.setState({ text: e.target.value });
  }

  onSubmit = () => {
    if (this.okToSubmit()) {
      this.props.onSubmit(this.state.text);
      this.setState({ text: '' });
    }
  }

  onKeyUp = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  okToSubmit = () => {
    // Validate input to make sure it's OK to submit
    // For now, just make sure it's not empty.
    return this.state.text !== '';
  }

  render() {
    return (
      <div className="chat-input-container">
        <input
          value={this.state.text}
          onChange={this.onTextInput}
          onKeyUp={this.onKeyUp}
          placeholder="Type a message to the teacher..."
          className="chat-input"
        />
        <button onClick={this.onSubmit} disabled={!this.okToSubmit()}>
          Send
        </button>
      </div>
    );
  }
}

export default ChatInput;
