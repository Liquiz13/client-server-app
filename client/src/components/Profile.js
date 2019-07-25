import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, updateUser } from '../action/userAction';
import TextInput from '../components/TextInput';
import jwt from 'jsonwebtoken';


class Profile extends Component {
  state = {
    visiable: false,
    change: {
      email: '',
      name: ''
    }
  }

  onClick = (event) => {
    event.preventDefault();
    localStorage.removeItem('jwt');
    this.props.history.push('/')
  }

  onChange = (name, value) => {
    this.setState({ [name]: value })
  }

  onSave = () => {
    this.props.updateUser(this.props.user.userId, this.state.change);
  }

  onDelete = () => {
    this.props.deleteUser(this.props.user.userId);
    this.props.history.push('/users');
  }

  render() {
    const { user } = this.props

    return (
      <div className='container'>
        <div className='user'>
          <h3 className='center'>Profile</h3>
          <Link to={'/friends'}>
            <h5>Friends</h5>
          </Link>
          <h6>Your email adress: {user.email}</h6>
          <p>Your user ID: {user.userId}</p>
          {this.state.visiable ? <form className='update'>
            <h5> Change your user Information:</h5>
            <TextInput
              name='name'
              label='name'
              onChange={this.onChange}
              value={this.state.name} />
            <TextInput
              name='email'
              label='email'
              onChange={this.onChange}
              value={this.state.email} />
            <button type='submit' style={{ marginTop: 10 }} className='btn btn-primary orange' onClick={this.onSave.bind(this, user.userId)}>
              Change
						</button>
          </form> : <div></div>}
          <div className='center' style={{ marginTop: 10 }}>
            <button
              className="btn left brown"
              onClick={this.onClick}>
              Log Out
            </button>
            <button className='btn right red' onClick={this.onDelete.bind(this, user.userId)}>
              Delete User
						</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ user: jwt.decode(localStorage.jwt) })

export default connect(mapStateToProps, { deleteUser, updateUser })(Profile)