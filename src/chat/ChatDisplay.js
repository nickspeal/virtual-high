import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBubble from './ChatBubble';
import '../Classroom.css';

class ChatDisplay extends Component {
  static propTypes = {
      chats: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          body: PropTypes.string.isRequired,
        })
      )
  }

  render() {
    return (
      <div className="chat-display">
        {this.props.chats.map(chat => <ChatBubble chat={chat} key={chat.body} />)}
      </div>
    );
  }
}

export default ChatDisplay;
