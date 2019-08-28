import { ADD_MESSAGE, RECIEVE_MESSAGE } from '../action/types'


export default function (state = [], action) {
    switch (action.type) {
        case ADD_MESSAGE:
            // console.log(123123, action);
            return [...state, ...action.payload]
        case RECIEVE_MESSAGE:
            return action.payload
        default:
            return state;
    }
}