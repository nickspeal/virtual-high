import React, { Component } from 'react';
import PropTypes from 'prop-types';
import teacherContent from './TeacherContent.json';

class ChatInput extends Component {
  static propTypes = {
      progress: PropTypes.string.isRequired,
      onRead: PropTypes.func.isRequired,
  }

  sendMessage = (idx) => {
    const DELAY = 200; // 1000 millis
    setTimeout(
      () => this.props.onRead(teacherContent.intro[idx]),
      DELAY,
    );
  }

  componentDidMount = () => {
    this.sendMessage(this.props.progress);
  }

  componentDidUpdate = (prevProps, nextState) => {
    if(prevProps.progress !== this.props.progress) {
      this.sendMessage(this.props.progress);
    }
  }

  render() {
    return null;
  }
}

export default ChatInput;
