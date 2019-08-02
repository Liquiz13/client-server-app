import React from 'react';
import { connect } from 'react-redux';
// import Rainbow from '../hoc/Rainbow';
import TextInput from '../TextInput';
import { logInUser } from '../../action/authAction';
import { Redirect } from 'react-router-dom';

class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
  };

  onChange = (name, value) => {
    this.setState({ [name]: value })
  }

  onSave = (event) => {
    event.preventDefault();
    this.props.logInUser(this.state);
  }


  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (!!localStorage.jwt) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <h4 className='center'>Login</h4>
        <form className="login">
          <TextInput
            name="email"
            label="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <TextInput
            name="password"
            type="password"
            label="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <div className='left'>
            <button type="submit"
              className="btn btn-primary"
              onClick={this.onSave}>
              Log In
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, { logInUser })(SignIn);