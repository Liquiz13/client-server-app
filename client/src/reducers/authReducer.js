import { LOGIN, SIGNUP } from '../action/types';


const initialState = {
  session: !!localStorage.jwt,
  user: {}
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        session: !!localStorage.jwt,
        user: action.user
      }
    case SIGNUP:
    default:
      return state;

  }
}