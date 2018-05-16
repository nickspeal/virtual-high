import React, { Component } from 'react';
import MenuOpen from './MenuOpen';
import MenuClosed from './MenuClosed';

class Menu extends Component {
  state = {
    isOpen: false,
  }

  openMenu = () => this.setState({ isOpen: true });

  closeMenu = () => this.setState({ isOpen: false });

  render() {
    return this.state.isOpen ? (
      <MenuOpen onClick={this.closeMenu}/>
    ) : (
      <MenuClosed onClick={this.openMenu}/>
    )
  }
}

export default Menu;
