import axios from 'axios';
import {
	GET_USER, GET_USER_FAIL, GET_USER_SUCCESS,
	DELETE_USER, DELETE_USER_FAIL,
	UPDATE_USER, UPDATE_USER_FAIL
} from './types';


export const getUser = () => (dispatch) => {
	dispatch({ type: GET_USER })
	axios.get('/api/users/:id').then(res => {
		dispatch({ type: GET_USER_SUCCESS, payload: res.data })
	}).catch(err => {
		dispatch({ type: GET_USER_FAIL, err });
	});
}

export const updateUser = id => (dispatch) => {
	axios.put(`/api/users/${id}`).then(res => {
		dispatch({ type: UPDATE_USER, payload: id })
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
