import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Menu.css';

class MenuClosed extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="menu menu-title" onClick={this.props.onClick}>
        <i className="fas fa-bars fa-lg hamburger" />
      </div>
    )
  }
}

export default MenuClosed;
