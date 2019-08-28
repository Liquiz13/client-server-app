require('../../server.js').io;
const Messages = require('../models/chat');

module.exports = function (socket) {
	socket.emit('connected', "You are connected!");
	socket.join('all');
	socket.on('message', content => {
		console.log('message', content)
		const obj = new Messages({
			date: new Date(),
			message: content.message,
			username: socket.id
		})
		Messages.create(obj, err => {
			if (err) return console.log("MessageModel", err)
			socket.emit("message", obj)
			socket.to('all').emit("message", obj)
		})
	})
	socket.on('recieveHistory', () => {
		Messages.find({})
			.sort({ date: -1 })
			.limit(20)
			.sort({ date: 1 })
			.lean()
			.exec((err, messages) => {
				if (!err) {
					socket.emit("history", messages)
					socket.to('all').emit("history", messages)
				}
			})
	})
	console.log("Socket Id " + socket.id);
}

// const { USER_CONNECTED, USER_DISCONNECTED,
// 	LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
// 	TYPING } = require('../../../client/src/components/Chat/Events');

// const User = require('../models/user');


// let connectedUsers = {}
// let communityChat = Chat

	// let sendMessageToChatFromUser;

	// let sendTypingFromUser;

	// socket.on(USER_CONNECTED, (user) => {
	// 	connectedUsers = addUser(connectedUsers, user)
	// 	socket.user = user

	// 	sendMessageToChatFromUser = sendMessageToChat(user.name)
	// 	sendTypingFromUser = sendTypingToChat(user.name)

	// 	io.emit(USER_CONNECTED, connectedUsers)
	// 	console.log(connectedUsers);
	// })

	// socket.on('disconnect', () => {
	// 	if ("user" in socket) {
	// 		connectedUsers = removeUser(connectedUsers, socket.user.name)

	// 		io.emit(USER_DISCONNECTED, connectedUsers)
	// 		console.log("Disconnect", connectedUsers);
	// 	}
	// })

	// 	socket.on(COMMUNITY_CHAT, (callback) => {
	// 		callback(communityChat)
	// 	})

	// 	socket.on(MESSAGE_SENT, ({ chatId, message }) => {
	// 		sendMessageToChatFromUser(chatId, message)
	// 	})

	// 	socket.on(TYPING, ({ chatId, isTyping }) => {
	// 		sendTypingFromUser(chatId, isTyping)
	// 	})
	// }


	// function sendTypingToChat(user) {
	// 	return (chatId, isTyping) => {
	// 		io.emit(`${TYPING}-${chatId}`, { user, isTyping })
	// 	}
	// }

	// function sendMessageToChat(sender) {
	// 	return (chatId, message) => {
	// 		io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({ message, sender }))
	// 	}
	// }

	// function addUser(userList, user) {
	// 	let newList = Object.assign({}, userList)
	// 	newList[user.name] = user
	// 	return newList
	// }

	// function removeUser(userList, username) {
	// 	let newList = Object.assign({}, userList)
	// 	delete newList[username]
	// 	return newList

// function isUser(userList, username){
// 	return username in userList
// }