const mongoose = require('mongoose');


const requestsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userReq: [{ ref: 'User', require: true }]
})


module.exports = mongoose.model('Requests', requestsSchema)