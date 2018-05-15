import React, { Component } from 'react';
import chalkboard from './images/chalkboard.jpg';
import ChatDisplay from './chat/ChatDisplay';
import ChatInput from './chat/ChatInput';
import TeacherResponses from './chat/TeacherResponses';
import './Classroom.css';

class Classroom extends Component {
  state = {
    chats: [],
    progress: "0",
    currentMessage: undefined,
    isTeacherTyping: false,
    isStudentTyping: false,
  }

  onChatSubmit = (body, name='student') => {
    const nextChat = {
      name,
      body
    };
    const nextChats = [...this.state.chats, nextChat];
    this.setState({ chats: nextChats });
  }

  // Called after a new teacher message is read from file/api
  onRead = (currentMessage) => {
    this.onChatSubmit(currentMessage.message, 'teacher');
    this.setState({ currentMessage })

    if(currentMessage.responseType === 'delay') {
      this.prepNextDelayedMessage(currentMessage);
    }
  }

  onProgressChange = (progress) => {
    this.setState({ progress });
  }

  // If current message response type is delay,
  // show typing indicator and then look up next message
  prepNextDelayedMessage = (currentMessage) => {
    const TYPING_START_DELAY = 1000
    const TYPING_COMPLETE_DELAY = 5000
    if(currentMessage.responseType === 'delay' && currentMessage.next) {
      setTimeout(
        () => this.setState({ isTeacherTyping: true }),
        TYPING_START_DELAY,
      );
      setTimeout(
        () => this.setState({ progress: currentMessage.next, isTeacherTyping: false }),
        TYPING_COMPLETE_DELAY,
      );
    }
  }

  render() {
    return (
      <div className="full-classroom">
        <img src={chalkboard} className="image"/>
        <ChatDisplay
          chats={this.state.chats}
          isTeacherTyping={this.state.isTeacherTyping}
          isStudentTyping={this.state.isStudentTyping}
        />
        <ChatInput
          currentMessage={this.state.currentMessage}
          onSubmit={this.onChatSubmit}
          onProgressChange={this.onProgressChange}
          onTypingChange={isStudentTyping => this.setState({ isStudentTyping })}
        />
        <TeacherResponses
          progress={this.state.progress}
          onRead={this.onRead}
        />
      </div>
    );
  }
}

export default Classroom;
