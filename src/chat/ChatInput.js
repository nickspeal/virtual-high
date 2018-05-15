import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatTextInput from './ChatTextInput';
import ChatMCInput from './ChatMCInput';

class ChatInput extends Component {
  static propTypes = {
      currentMessage: PropTypes.shape(),
      onSubmit: PropTypes.func.isRequired,
      onProgressChange: PropTypes.func.isRequired,
      onTypingChange: PropTypes.func.isRequired,
  }

  render() {
    const type = this.props.currentMessage && this.props.currentMessage.responseType;
    switch (type) {
      case "text":
        return <ChatTextInput currentMessage={this.props.currentMessage} onSubmit={this.props.onSubmit} onProgressChange={this.props.onProgressChange} onTypingChange={this.props.onTypingChange}/>;
      case "mc":
        return <ChatMCInput currentMessage={this.props.currentMessage} onSubmit={this.props.onSubmit} onProgressChange={this.props.onProgressChange} />;
      case "delay":
      default:
        return null;
    }
  }
}

export default ChatInput;
