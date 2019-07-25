import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../action/userAction';
// ПОКА ЧТО, ТЕСТОВОЯ СТРАНИЦА

// ПОКА ЧТО, ТЕСТОВОЯ СТРАНИЦА

// ПОКА ЧТО, ТЕСТОВОЯ СТРАНИЦА
class Friends extends React.Component {
  state = {
    friends: ''
  }

  componentDidMount() {
    this.props.getUser(this.props.currentUser.userId)
  };

  onAdd = () => {
    this.props.friendRequest(this.props.match.params.user_id, this.state);
    this.props.history.push('/users');
  }

  renderListItems = (requests) => {
    if (!requests) {
      return <p className="center">no requests</p>;
    }

    return requests.map((request, index) => {
      return (
        <div className="request card" key={index}>
          <div className="card-content">
            <span className="card-title">{request}</span>
            <div className='center'>
              <button className='btn green' onClick={this.onAdd.bind(this, this.props.user._id)}>
                Accept friend request
						</button>
            </div>
          </div>
        </div >
      )
    })
  }

  render() {
    const { user } = this.props;
    const { requests } = this.props;

    return (
      <div className='container'>
        <h4 className='center'> {user.name}</h4>
        <div className='user'>
          <h4 className='center'>{user.email}</h4>
          <h5>Your recieve this friend requests:</h5>
          {this.renderListItems(requests)}
        </div>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.user);
  return {
    user: state.user,
    requests: state.user.requests,
    currentUser: state.auth.user
  }
}


export default connect(mapStateToProps, { getUser })(Friends)