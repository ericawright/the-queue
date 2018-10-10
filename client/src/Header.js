import './Header.css';
import React, {Component} from 'react';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img alt="" id="logo" />
        <h1 id="title">Welcome to the Queue</h1>
      </div>
    );
  }
}

export default Header;