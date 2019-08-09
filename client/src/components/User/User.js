import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, friendRequest } from '../../action/userAction';
import jwt from 'jsonwebtoken';

class User extends Component {
	state = {
		requests: this.props.currentUser.userId
	}

	componentWillMount() {
		this.props.getUser(this.props.match.params.user_id)
	};

	onRequest = () => {
		this.props.friendRequest(this.props.match.params.user_id, this.state);
		this.props.history.push('/users');
	}

	render() {
		const { user } = this.props;
		if (!user) {
			return <div className='center'>Loading user...</div>;
		}

		return (
			<div className='container'>
				<div className='user'>
					<h4 className='center'>{user.name}</h4>
					<p>{user.email}</p>
					<div className='center'>
						<button className='btn green' onClick={this.onRequest.bind(this, user._id)}>
							Send friend request
						</button>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		currentUser: jwt.decode(localStorage.jwt)
	}
};


export default connect(mapStateToProps, { getUser, friendRequest })(User)