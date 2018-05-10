import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatBubble extends Component {
  static propTypes = {
    chat: PropTypes.shape({
      name: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  }

  pickClassName = () => this.props.chat.name === 'student' ? 'chat-right' : 'chat-left';

  pickColor = () => this.props.chat.name === 'student' ? 'chat-me' : 'chat-them';


  render() {
    return (
      <div className={`chat-bubble-container ${this.pickClassName()}`}>
        <div className={`chat-bubble ${this.pickColor()}`}>
          {this.props.chat.body}
        </div>
      </div>
    );
  }
}

export default ChatBubble;
