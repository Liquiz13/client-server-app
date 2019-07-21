import React, { Component } from 'react';
import TextInput from './TextInput';
import { connect } from 'react-redux';
import { signUpUser } from '../action/authAction';

class SignUp extends Component {
	state = {
		email: '',
		name: '',
		password: ''
	}

	onChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({ [name]: value })
	}

	onSave = (event) => {
		event.preventDefault();
		this.props.signUpUser(this.state);
	}
	render() {
		return (
			<div className='container'>
				<h4>Registation</h4>
				<TextInput
					name='name'
					label='name'
					value={this.state.name}
					onChange={this.onChange}
				/>
				<TextInput
					name='email'
					label='email'
					value={this.state.email}
					onChange={this.onChange}
				/>
				<TextInput
					name='password'
					label='password'
					type='password'
					value={this.state.password}
					onChange={this.onChange}
				/>
				<div className='center'>
					<button
						type='submit'
						className='btn btn-primary'
						onClick={this.onSave}>
						Sign Up
						</button>
				</div>
			</div>
		);
	}
};

export default connect(null, { signUpUser })(SignUp)