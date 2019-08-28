// import io from 'socket.io-client';
import { ADD_MESSAGE, RECIEVE_MESSAGE } from './types'
import axios from 'axios'


export const recieveMessage = (msg) => {
    return (dispatch) => {
        // console.log(msg)
        dispatch({ type: ADD_MESSAGE, payload: [msg] });
    }
}

// export const getMessages = () => dispatch => {
//     dispatch({ type: GET_MESSAGES })
//     axios.get("api/chat").then(res => {
//         dispatch({ type: GET_MESSAGES_SUCCESS, payload: res.data });
//     }).catch(err => {
//         dispatch({ type: GET_MESSAGES_FAIL, err });
//     });
// }

// export const historyMessages = (socket) => {
//     return (dispatch) => {
//         socket.on('history', messages => {
//             for (let message of messages) {
//                 this.addMessage(message);
//             }
//         })
//         socket.emit('history');
//         dispatch({ type: RECIEVE_MESSAGES })
//     }
// }