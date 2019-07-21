import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, deleteUser } from '../action/userAction';
import { selectUserById } from '../selectors/selectors';

class User extends Component {
	onDelete = () => {
		this.props.deleteUser(this.props.match.params.user_id);
		this.props.history.push('/users');
	}

	render() {
		console.log(this.props)
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
						<button className='btn grey' onClick={this.onDelete.bind(this, user._id)}>
							Delete User
								</button>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.user_id
	return {
		user: selectUserById(state, id)
	}
};

export default connect(mapStateToProps, { getUser, deleteUser })(User)