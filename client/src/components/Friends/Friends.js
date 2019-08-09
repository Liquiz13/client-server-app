import React from 'react';
import { connect } from 'react-redux';
import { getUser, friendAdd } from '../../action/userAction';
import { getUsers } from '../../action/usersAction';
// import { selectUserById } from '../selectors/selectors'

class Friends extends React.Component {
  state = {
    visiable: true
  }

  componentDidMount() {
    this.props.getUser(this.props.currentUser.userId);
    this.props.getUsers()
  };

  onAdd = () => {
    this.props.friendAdd(this.props.user._id, this.props.currentUser.userId);
    this.props.history.push('/users');
  }

  renderListRequests = (requests) => {
    if (!requests) {
      return <p className="center">no requests</p>;
    }

    return requests.map((request, index) => {

      return (
        <div className="request card" key={index}>
          <div className="card-content">
            <span className="card-title">{request}</span>
            <p>{index}</p>
            {console.log(request)}
            {/* {this.selectUserById(request)} */}
            {/* <p>{userReq.name}</p> */}
            <div className='center'>
              <button className='btn green' onClick={this.onAdd.bind(this, { request })}>
                Accept friend request
						</button>
            </div>
          </div>
        </div >
      )
    })
  }
  renderListFriends = (friends) => {
    if (!friends) {
      return <p className="center">no friends</p>;
    }

    return friends.map((friend, index) => {

      return (
        <div className="request card" key={index}>
          <div className="card-content">
            <span className="card-title">{friend}</span>
          </div>
        </div >
      )
    })
  }

  render() {
    const { user } = this.props;
    const { requests } = this.props;
    console.log(this.props)
    return (
      <div className='container'>
        <h4 className='center'> {user.name}</h4>
        <div className='user'>
          <h4 className='center'>{user.email}</h4>
          <button
            className="btn left grey"
            onClick={this.onClick = () => {
              this.setState({ visiable: true })
            }}>
            Requests List
          </button>
          <button
            className="btn green"
            onClick={this.onClick = () => {
              this.setState({ visiable: false })
            }}>
            Friends List
          </button>
          {this.state.visiable ?
            <div>
              <h5>Your recieve this friend requests:</h5>
              {this.renderListRequests(requests)} </div> : <div>
              <h5>Your recieve this friend requests:</h5>
              {this.renderListFriends(user.friends)} </div>}
        </div>
      </div >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    requests: state.user.requests,
    currentUser: state.auth.user,
    users: state.users
  }
}


export default connect(mapStateToProps, { getUser, friendAdd, getUsers })(Friends)