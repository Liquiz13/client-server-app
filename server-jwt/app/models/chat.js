const User = require('./user');
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    date: { type: Date },
    message: { type: String },
    username: { type: String }
})

// const chatSchema = mongoose.Schema({
//     name: { type: String },
//     messages: { type: Array },
//     users: { type: Array }
// })



module.exports = mongoose.model('Messages', messageSchema)
// module.exports = mongoose.model('Chat', chatSchema)

// const createMessage = ({ message = "", sender = "" } = {}) => (
//     {
//         id: uuidv4(),
//         time: getTime(new Date(Date.now())),
//         message,
//         sender
//     }
// );

// const createChat = ({ messages = [], name = "Community", users = [] } = {}) => (
//     {
//         id: uuidv4(),
//         name,
//         messages,
//         users,
//         typingUsers: []
//     }
// )

// const getTime = (date) => {
//     return `${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`
// }


// module.exports = {
//     createMessage,
//     createChat
// }