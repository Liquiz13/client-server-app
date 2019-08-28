import { combineReducers } from 'redux';
import users from './usersReducer';
import user from './userReducer';
import auth from './authReducer';
import message from './chatReducer'

export default combineReducers({
    users,
    user,
    auth,
    message
})