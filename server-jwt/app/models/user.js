const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Requests' }],
  friends: Array,
})


module.exports = mongoose.model('User', userSchema)