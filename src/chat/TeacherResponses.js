import React, { Component } from 'react';
import PropTypes from 'prop-types';
import teacherContent from './TeacherContent.json';

class ChatInput extends Component {
  static propTypes = {
      progress: PropTypes.string.isRequired,
      onRead: PropTypes.func.isRequired,
      lesson: PropTypes.string.isRequired,
  }

  // TODO improve error handling on object read. Error boundary?
  sendMessage = (idx) => {
    const DELAY = 200; // 1000 millis
    const lessonData = teacherContent[this.props.lesson];
    const currentMessage = lessonData[idx];
    if (currentMessage) {
      setTimeout(() => this.props.onRead(currentMessage), DELAY);
    } else {
      console.error('TeacherResponses Error: currentMessage is not defined.');
    }
  }

  componentDidMount = () => {
    this.sendMessage(this.props.progress);
  }

  componentDidUpdate = (prevProps, nextState) => {
    if(Number(prevProps.progress) < Number(this.props.progress)) {
      this.sendMessage(this.props.progress);
    } else if (prevProps.lesson !== this.props.lesson) {
      // TODO hack. This "0" should come from a central place.
      this.sendMessage("0");
    }
  }

  render() {
    return null;
  }
}

export default ChatInput;
