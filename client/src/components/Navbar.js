import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Navbar.css';

class Header extends React.Component {
  render() {
    const { session } = this.props.auth

    const userLinks = (
      <ul className="nav navbar-nav right">
        <li><NavLink to="/chat">Chat</NavLink></li>
        <li><NavLink to="/friends">Friends</NavLink></li>
        <li><NavLink to="/users">Users</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
      </ul>
    )

    const guestLinks = (
      <ul className="nav navbar-nav right">
        <li><NavLink to="/signup">signUp</NavLink></li>
        <li><NavLink to="/signin">SignIn</NavLink></li>
      </ul>
    )

    return (
      <nav className="nav-wrapper red draken-3">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand left">Social Web</Link>
          </div>
          <div className="colapse colapse-navbar">
            {session ? userLinks : guestLinks}
          </div>
        </div>
      </nav>
    )
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired
}

function MapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(MapStateToProps)(Header)