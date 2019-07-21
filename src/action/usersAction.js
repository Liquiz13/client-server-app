import axios from 'axios';
import { GET_USERS, GET_USERS_FAIL, GET_USERS_SUCCESS } from './types';

export const axiosUsers = () => dispatch => {
    dispatch({ type: GET_USERS })
    axios.get('/api/users').then(res => {
        dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
    }).catch(err => {
        dispatch({ type: GET_USERS_FAIL, err });
    });
}