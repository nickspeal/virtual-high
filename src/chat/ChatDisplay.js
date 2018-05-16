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
  constructor(props) {
    super(props);
    this.scrollableDiv = React.createRef();
  }
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

  componentDidMount() {
    // This worries me as a performance issue, but actually seems fine in practice!
    this.scrollableDiv.current.addEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(prevProps) {
    // If a new student chat came in, scroll to the bottom
    // This handles the case of clicking an MC input and wanting to see it!
    if(prevProps.chats !== this.props.chats && this.props.chats.length > 0 && this.props.chats[this.props.chats.length -1].name === 'student') {
      this.scrollIncrement();
    }
  }

  onScroll = () => this.forceUpdate();

  // Scroll down by the specified amount:
  scroll = () => {
    const limit = this.scrollableDiv.current.scrollTop + this.scrollableDiv.current.clientHeight - 50;
    this.scrollIncrement(limit);
  }

  // Calls itself recursively
  scrollIncrement = (maxScrollLimit) => {
    const VERTICAL_INCREMENT = 2; //px
    const TIME_INCREMENT = 10; //ms

    const prevScrollTop = this.scrollableDiv.current.scrollTop;
    this.scrollableDiv.current.scrollTop = this.scrollableDiv.current.scrollTop + VERTICAL_INCREMENT;

    // Recursion End Conditions:
    // Limit is not exceeded if it's not defined, or if the value is less than the limit
    const scrollLimitExceeded = maxScrollLimit !== undefined && this.scrollableDiv.current.scrollTop > maxScrollLimit;
    // scrollTop value will stop increasing if the content end has been reached:
    const isStillScrolling = this.scrollableDiv.current.scrollTop > prevScrollTop

    // While still OK to scroll, recursively keep going!
    if (!scrollLimitExceeded && isStillScrolling) {
      setTimeout(() => this.scrollIncrement(maxScrollLimit), TIME_INCREMENT);
    } else {
      // After loop, call render method to make the scroll button go away.
      this.forceUpdate()
    }
  }

  shouldRenderScrollButton = () => {
    if (this.scrollableDiv.current) {
        return this.scrollableDiv.current.scrollHeight > this.scrollableDiv.current.clientHeight + this.scrollableDiv.current.scrollTop;
    }
    return false;
  }

  render() {
    return (
      <div className="chat-display-outer">
        <div className="chat-display-inner" ref={this.scrollableDiv}>
          {this.props.chats.map(chat => <ChatBubble chat={chat} key={chat.body} />)}
          {this.props.isTeacherTyping && <ChatBubble chat={teacherTypingChat} />}
          {this.props.isStudentTyping && <ChatBubble chat={studentTypingChat} />}
        </div>
        {this.shouldRenderScrollButton() && (
          <button onClick={this.scroll} className="chat-display-scroll-button">
            See More...
          </button>
        )}

      </div>
    );
  }
}

export default ChatDisplay;
