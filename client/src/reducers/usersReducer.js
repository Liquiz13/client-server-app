import { GET_USERS_SUCCESS, DELETE_USER, UPDATE_USER } from '../action/types';


export default function (state = [], action) {
	switch (action.type) {
		case GET_USERS_SUCCESS:
			return [...action.payload];
		case DELETE_USER:
			return state.filter(user => user._id !== action.payload)
		case UPDATE_USER:
			return state.find(user => user._id === action.payload)
		default:
			return state
	}

}

