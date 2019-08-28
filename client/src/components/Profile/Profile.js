import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, updateUser } from '../../action/userAction';
import TextInput from '../TextInput';
import jwt from 'jsonwebtoken';
import './Profile.css';


class Profile extends Component {
  state = {
    visiable: false,
    email: '',
    name: ''
  }

  onLogOut = (event) => {
    event.preventDefault();
    localStorage.removeItem('jwt');
    this.props.history.push('/')
  }

  onChange = (name, value) => {
    this.setState({ [name]: value })
  }

  onSave = () => {
    this.setState({ visiable: this.state.visiable })
    this.props.updateUser(this.props.user.userId, this.state);
  }

  onDelete = () => {
    this.props.deleteUser(this.props.user.userId);
    this.props.history.push('/users');
  }

  render() {
    const { user } = this.props
    const showChangeInput = this.state.visiable ? <form className='update'>
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

      <button type='submit' className='btn btn-change' onClick={this.onSave.bind(this, user.userId)}>
        Change
    </button>
    </form> : <button
      className="btn btn-primary left"
      onClick={this.onClick = () => {
        this.setState({ visiable: !this.state.visiable })
      }}>
        Change User Information
  </button>

    return (
      <div className='container'>
        <div className='user'>
          <h3 className='center'>Profile</h3>

          <Link to={'/friends'}>
            <h5>Friends</h5>
          </Link>

          <h6>Your email adress: {user.email}</h6>
          <p>Your user ID: {user.userId}</p>

          {showChangeInput}

          <div className='center' style={{ marginTop: 10 }}>
            <button
              className="btn btn-logout left"
              onClick={this.onLogOut}>
              Log Out
            </button>
            <button className='btn btn-danger right' onClick={this.onDelete.bind(this, user.userId)}>
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