import React, { Component } from 'react';
import PropTypes from 'prop-types';
import teacherContent from './TeacherContent.json';

class ChatInput extends Component {
  static propTypes = {
      chats: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          body: PropTypes.string.isRequired,
        }),
      ),
      onSubmit: PropTypes.func.isRequired,
  }

  state = {
    introProgress: 0,
  }

  sendIntro = () => {
    const i = this.state.introProgress;
    if (i < teacherContent.intro.length) {
      const message = teacherContent.intro[i];
      console.log(message);
      this.setState({ introProgress: this.state.introProgress + 1 });
      setTimeout(() => this.props.onSubmit(message, 'teacher'), 1000);
    } else {
      console.log("sendIntro called but no more content to share");
    }

  }

  latestStudentMessage = (props) => {
    return props.chats.filter(chat => chat.name === 'student').pop();
  }

  componentDidMount = () => {
    this.sendIntro();
  }

  componentDidUpdate = (prevProps, nextState) => {
      // Step through the intro whenever a new chat from the student comes in
      if (this.latestStudentMessage(prevProps) !== this.latestStudentMessage(this.props)) {
        console.log("new student message: ", this.latestStudentMessage(prevProps));
        this.sendIntro();
      }
  }

  render() {
    return null;
  }
}

export default ChatInput;
