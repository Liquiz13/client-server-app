import axios from 'axios';
import {
	GET_USER, GET_USER_FAIL, GET_USER_SUCCESS,
	DELETE_USER, DELETE_USER_FAIL,
	UPDATE_USER, UPDATE_USER_FAIL,
	FRIEND_REQUEST, FRIEND_REQUEST_FAIL,
	FRIEND_ADD, FRIEND_ADD_FAIL
} from './types';


export const getUser = (id) => (dispatch) => {
	dispatch({ type: GET_USER })
	axios.get(`/api/users/${id}`).then(res => {
		dispatch({ type: GET_USER_SUCCESS, payload: res.data })
	}).catch(err => {
		dispatch({ type: GET_USER_FAIL, err });
	});
}

export const updateUser = (id, state) => (dispatch) => {
	axios.put(`/api/users/${id}`, state).then(res => {
		dispatch({ type: UPDATE_USER })
	}).catch(err => {
		dispatch({ type: UPDATE_USER_FAIL, err })
	})
}

export const deleteUser = id => (dispatch) => {
	axios.delete(`/api/users/${id}`).then(res => {
		dispatch({ type: DELETE_USER, payload: id })
	}).catch(err => {
		dispatch({ type: DELETE_USER_FAIL, err })
	})
}

export const friendRequest = (id, state) => (dispatch) => {
	axios.post(`/api/users/${id}/friends`, state).then(res => {
		dispatch({ type: FRIEND_REQUEST })
	}).catch(err => {
		dispatch({ type: FRIEND_REQUEST_FAIL, err })
	})
}

export const friendAdd = (id, state) => (dispatch) => {
	axios.put(`/api/users/${id}/friends`, state).then(res => {
		dispatch({ type: FRIEND_ADD })
	}).catch(err => {
		dispatch({ type: FRIEND_ADD_FAIL, err })
	})
}
