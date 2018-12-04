/**
 * Header is the visible component on top of the application.
 *
 * Lars Bärtschi, 27.11.2018
 */

import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="background">
        <div className="header" />
      </div>
    );
  }
}

export default Header;
