import { GET_USER_SUCCESS } from '../action/types';

export default function (state = {}, action) {
	switch (action.type) {
		case GET_USER_SUCCESS:
			return { ...action.payload }
		default:
			return state;
	}
}


