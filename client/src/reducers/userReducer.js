import { GET_USER_SUCCESS, UPDATE_USER, FRIEND_REQUEST, FRIEND_ADD } from '../action/types';

export default function (state = {}, action) {
	switch (action.type) {
		case GET_USER_SUCCESS:
			return { ...action.payload }
		case UPDATE_USER:
			return { ...action.payload }
		case FRIEND_REQUEST:
			return { ...action.payload }
		case FRIEND_ADD:
			return { ...action.payload }
		default:
			return state;
	}
}


