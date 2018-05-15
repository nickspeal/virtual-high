import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBubble from './ChatBubble';
import '../Classroom.css';

const teacherTypingChat = {
  name: 'teacher',
  body: '...',
}

const studentTypingChat = {
  name: 'student',
  body: '...',
}

class ChatDisplay extends Component {
  static propTypes = {
      chats: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          body: PropTypes.string.isRequired,
        })
      ),
      isTeacherTyping: PropTypes.bool.isRequired,
      isStudentTyping: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div className="chat-display-outer">
        <div className="chat-display-inner">
          {this.props.chats.map(chat => <ChatBubble chat={chat} key={chat.body} />)}
          {this.props.isTeacherTyping && <ChatBubble chat={teacherTypingChat} />}
          {this.props.isStudentTyping && <ChatBubble chat={studentTypingChat} />}
        </div>
      </div>
    );
  }
}

export default ChatDisplay;
