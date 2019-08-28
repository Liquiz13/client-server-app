import React from 'react';
import io from 'socket.io-client';
import jwt from 'jsonwebtoken'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { recieveMessage } from '../../action/chatAction'
import TextInput from '../TextInput';
import './Chat.css'



class Chat extends React.Component {
  state = {
    socket: null,
    messages: [],
    message: ''
  }

  componentWillMount() {
    this.initSocket();
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  initSocket = () => {
    const socket = io("http://localhost:3001");
    socket.on('connected', function (message) {
      console.log(message)
      socket.emit('receiveHistory', message)
    });

    socket.on('message', (msg) => {
      this.props.recieveMessageAction(msg)
    })

    this.setState({ socket })
    // socket.on('message', function (msg) {
    //   dispatch({ type: 'RECIEVE_MESSAGE', payload: msg })
    // })
    // socket.on('history', messages => {
    //   for (let message of messages) {
    //     this.addMessage(message);
    //   }
    // })

  }

  onChange = (name, value) => {
    this.setState({ [name]: value })
  }

  onSend = (event) => {
    event.preventDefault();
    this.state.socket.emit('message', {
      message: this.state.message,
      date: new Date()
    });
  }

  render() {
    const { user, messages } = this.props;

    return (
      <div className="container clearfix">
        <div className="chat">
          <div className="chat-header clearfix">
            <div className="chat-about">
              <div className="chat-num-users">Hello, <span id="name">{user.email}</span></div>
            </div>
          </div>

          <div className="chat-history">
            <ul>
              {messages.map((message, index) => {
                return <li key={index}>{message.message}</li>;
              })}
            </ul>
          </div>

          <form className="chat-message clearfix">
            <TextInput
              name="message"
              placeholder="Type your message"
              rows="3"
              onChange={this.onChange}
              value={this.state.message}
            />
            <button type='submit' className='btn btn-primary blue' onClick={this.onSend}>Send</button>
          </form>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => (console.log(state), {
  user: jwt.decode(localStorage.jwt),
  messages: state.message
})

const mapDispatchToProps = (dispatch) => {
  return {
    recieveMessageAction: bindActionCreators(recieveMessage, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

// addChat = (chat, reset)=>{
//   const { socket } = this.props
//   const { chats } = this.state

//   const newChats = reset ? [chat] : [...chats, chat]
//   this.setState({chats:newChats, activeChat:reset ? chat : this.state.activeChat})

//   const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
//   const typingEvent = `${TYPING}-${chat.id}`

//   socket.on(typingEvent, this.updateTypingInChat(chat.id))
//   socket.on(messageEvent, this.addMessageToChat(chat.id))
//   }

//   addMessageToChat = (chatId)=>{
//     return message => {
//       const { chats } = this.state
//       let newChats = chats.map((chat)=>{
//         if(chat.id === chatId)
//           chat.messages.push(message)
//         return chat
//       })

//       this.setState({chats:newChats})
//     }
//   }

//   updateTypingInChat = (chatId) =>{
//     return ({isTyping, user})=>{
//       if(user !== this.props.user.name){

//         const { chats } = this.state

//         let newChats = chats.map((chat)=>{
//           if(chat.id === chatId){
//             if(isTyping && !chat.typingUsers.includes(user)){
//               chat.typingUsers.push(user)
//             }else if(!isTyping && chat.typingUsers.includes(user)){
//               chat.typingUsers = chat.typingUsers.filter(u => u !== user)
//             }
//           }
//           return chat
//         })
//         this.setState({chats:newChats})
//       }
//     }
//   }

//   sendMessage = (chatId, message)=>{
//     const { socket } = this.props
//     socket.emit(MESSAGE_SENT, {chatId, message} )
//   }

//   sendTyping = (chatId, isTyping)=>{
//     const { socket } = this.props
//     socket.emit(TYPING, {chatId, isTyping})
//   }

//   setActiveChat = (activeChat) => {
//       this.setState({activeChat})
//   }

// setUser = ({user=this.props}) => {
//     const {socket} = this.state;
//     socket.emit(USER_CONNECTED, {user});
//     this.setState({user})
// }


//   resetChat = (chat)=>{
//       return this.addChat(chat, true)
//   }