import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';


class Profile extends Component {
  onClick = (event) => {
    event.preventDefault();
    localStorage.removeItem('jwt');
    this.props.history.push('/')
  }
  render() {
    const { user } = this.props
    return (
      <div className='container'>
        <div className='user'>
          <h3 className='center'>Profile</h3>
          <h6>Your email adress: {user.email}</h6>
          <p>Your user ID: {user.userId}</p>
          <button
            className="btn brown"
            onClick={this.onClick}>
            Log Out
                    </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ user: jwt.decode(localStorage.jwt) })

export default connect(mapStateToProps)(Profile)