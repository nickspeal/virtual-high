import React, { Component } from 'react';
import PropTypes from 'prop-types';
import teacherContent from '../chat/TeacherContent.json';
import { withRouter } from 'react-router-dom';
import './Menu.css';

class MenuOpen extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  onItemClick = (title) => {
    this.props.history.push(title);
  }

  render() {
    return (
      <div className="menu menu-open" onClick={this.props.onClick}>
        <div className="menu-title">
          <i className="fas fa-bars fa-lg hamburger" />
          Curriculum
        </div>
        <hr />
        {Object.keys(teacherContent).map(title => (
          <div
            className="menu-item"
            key={title}
            onClick={()=>this.onItemClick(title)}
          >
            {title}
          </div>
        ))}
      </div>
    )
  }
}

export default withRouter(MenuOpen);
