import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Classroom.css';

class ChatMCInput extends Component {
  static propTypes = {
      currentMessage: PropTypes.shape(),
      onSubmit: PropTypes.func.isRequired,
      onProgressChange: PropTypes.func.isRequired,
  }

  onButtonClick = (message, id) => {
    this.props.onSubmit(message);
    this.props.onProgressChange(id);
  }

  render() {
    return (
      <div className="chat-input-container">
        {this.props.currentMessage.responses.map((response) => (
          <button
            onClick={() => this.onButtonClick(response.choice, response.id)}
            className="chat-mc-button"
            key={response.choice}
          >
            {response.choice}
          </button>
        ))}
      </div>
    );
  }
}

export default ChatMCInput;
