import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YoutubeEmbedVideo from 'youtube-embed-video';

const YOUTUBE_URL_PREFIX = 'https://www.youtube.com/watch?v=';

class ChatBubble extends Component {
  static propTypes = {
    chat: PropTypes.shape({
      name: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  }

  pickClassName = () => this.props.chat.name === 'student' ? 'chat-right' : 'chat-left';

  pickColor = () => this.props.chat.name === 'student' ? 'chat-me' : 'chat-them';

  isVideo = message => message.startsWith(YOUTUBE_URL_PREFIX);

  render() {
    return (
      <div className={`chat-bubble-container ${this.pickClassName()}`}>
        <div className={`chat-bubble ${this.pickColor()}`}>
          {this.isVideo(this.props.chat.body) ? (
            <YoutubeEmbedVideo
              videoId={this.props.chat.body.replace(YOUTUBE_URL_PREFIX, '')}
              autoplay
              suggestions={false}
              showInfo={false}
              enhancedPrivacy
            />
          ) : (
            this.props.chat.body
          )}
        </div>
      </div>
    );
  }
}

export default ChatBubble;
