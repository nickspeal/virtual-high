import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Classroom.css';

class ChatTextInput extends Component {
  static propTypes = {
      currentMessage: PropTypes.shape(),
      onSubmit: PropTypes.func.isRequired,
      onProgressChange: PropTypes.func.isRequired,
      onTypingChange: PropTypes.func.isRequired,
  }

  state = {
    text: '',
  }

  onTextInput = (e) => {
    this.setState(
      { text: e.target.value },
      () => this.props.onTypingChange(this.state.text.length > 0),
    );
  }

  onSubmit = () => {
    if (this.okToSubmit()) {
      this.props.onSubmit(this.state.text);
      if(this.props.currentMessage && this.props.currentMessage.next) {
        this.props.onProgressChange(this.props.currentMessage.next);
      }
      this.setState({ text: '' });
      this.props.onTypingChange(false);
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
          autoFocus={true}
        />
        <button onClick={this.onSubmit} disabled={!this.okToSubmit()}>
          Send
        </button>
      </div>
    );
  }
}

export default ChatTextInput;
