import { combineReducers } from 'redux';
import users from './usersReducer';
import user from './userReducer';
import auth from './authReducer';

export default combineReducers({
    users,
    user,
    auth
})