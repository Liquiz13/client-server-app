import { LOGIN, LOGIN_FAIL, SIGNUP, SIGNUP_FAIL } from './types'
import setAuthorizationToken from '../utils/setAuthorizationToken';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export function setCurrentUser(user) {
	return {
		type: LOGIN,
		user
	}
}

export const logInUser = (state) => (dispatch) => {
	return axios.post('/api/login', state).then(res => {
		const token = res.data.token
		localStorage.setItem('jwt', token);
		setAuthorizationToken(token);
		dispatch(setCurrentUser(jwt.decode(token)));
	}).catch(err => {
		dispatch({ type: LOGIN_FAIL, err });
	});
}

export const signUpUser = (state) => (dispatch) => {
	return axios.post('/api/registration', state).then(res => {
		dispatch({ type: SIGNUP });
	}).catch(err => {
		dispatch({ type: SIGNUP_FAIL, err })
	})
}
