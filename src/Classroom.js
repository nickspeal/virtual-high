import React, { Component } from 'react';
import chalkboard from './images/chalkboard.jpg';
import ChatDisplay from './chat/ChatDisplay';
import ChatInput from './chat/ChatInput';
import TeacherResponses from './chat/TeacherResponses';
import './Classroom.css';

class Classroom extends Component {
  state = {
    chats: [],
  }

  onChatSubmit = (body, name='student') => {
    const nextChat = {
      name,
      body
    };
    const nextChats = [...this.state.chats, nextChat];
    this.setState({ chats: nextChats });
  }

  render() {
    return (
      <div className="full-classroom">
        <img src={chalkboard} className="image"/>
        <ChatDisplay chats={this.state.chats} />
        <ChatInput onSubmit={this.onChatSubmit} />
        <TeacherResponses chats={this.state.chats} onSubmit={this.onChatSubmit} />
      </div>
    );
  }
}

export default Classroom;
