import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.scss';

class NavBar extends Component {
  state = {  }
  render() { 
    return (
      <nav className="navbar">
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
      </nav>
    );
  }
}
 
export default NavBar;