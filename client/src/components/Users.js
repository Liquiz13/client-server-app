import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers } from '../action/usersAction';

class Users extends Component {
  componentWillMount() {
    this.props.getUsers()
  };
  render() {
    const { users } = this.props
    const userList = users.length ? (users.map(user => {
      return (
        <div className="user card" key={user._id}>
          <div className="card-content">
            <Link to={'/' + user._id}>
              <span className="card-title">{user.name}</span>
            </Link>
            <p>{user.email}</p>
          </div>
        </div>
      )
    })) : (<p className="center">no users</p>)

    return (
      <div className='container'>
        <h4 className='center'>Users page</h4>
        {userList}
      </div>
    )
  }
}

const mapStateToProps = state => ({ users: state.users })

export default connect(mapStateToProps, { getUsers })(Users)