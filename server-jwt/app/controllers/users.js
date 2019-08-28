const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

exports.users_create = function (req, res, next) {
	bcrypt.hash(req.body.password, 10, function (err, hash) {
		if (err) {
			return res.status(500).json({
				error: (err)
			})
		} else {
			const user = new User({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				email: req.body.email,
				password: hash
			})
			user.save()
				.then(result => {
					res.status(200).json(result);
				})
				.catch(err => {
					res.status(500).json({ error: err })
				});
		}
	})
};

exports.users_change = function (req, res) {
	const requestId = req.params.id;
	User.update({ _id: requestId }, {
		$set: {
			name: req.body.name,
			email: req.body.email
		},

	})
		.exec()
		.then(res => {
			request.status(200).json({ message: 'User changed' });
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};

exports.users_get_all = function (req, res) {

	console.log("HERE MUST BE USER", req.userData);

	User.find().exec().then(docs => {
		if (docs) {
			res.status(200).json(docs);
		} else {
			res.status(404).json({ message: 'No valid id' })
		}
	})
		.catch(err => {
			res.status(500).json({ error: err })
		});
};

exports.users_get_one = (req, res) => {
	const requestId = req.params.id;
	User.findById({ _id: requestId })
		.populate({
			path: 'requests',
			select: 'name email'
		})
		.populate({
			path: 'friends',
			select: 'name email'
		})
		.exec()
		.then(doc => {
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({ message: 'No valid id' })
			}
		})
		.catch(err => {
			res.status(500).json({ error: err })
		});
};

exports.users_delete = function (req, res) {
	const requestId = req.params.id;
	User.findByIdAndDelete({ _id: requestId })
		.exec()
		.then(res.send('User deleted'))
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};

exports.users_friendReq = function (req, res) {
	const requestId = req.params.id;
	User.findByIdAndUpdate(requestId, {
		$push: {
			requests: req.body.requests
		}
	})
		.exec()
		.then(request => {
			res.status(200).json(request);
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
};

exports.users_friendAdd = function (req, res) {
	const userId = req.body.id;
	const friendId = req.params.id;

	Promise.all([
		moveFriendFromRequest(userId, friendId),
		moveFriendFromRequest(friendId, userId)
	])
		.then(() => {
			res.status(200).json({ message: 'СУКЕС БЛЯДЬ' });
		})
		.catch((error) => {
			res.status(500).json({ message: 'НЕ СУКЕС БЛЯДЬ', error });
		});
};


const moveFriendFromRequest = (userId, friendId) => {
	User.findByIdAndUpdate(userId, {
		$push: {
			friends: friendId,
		}
	})
		.exec()
		.then((user) => {
			if (user.request.find(id => id === friendId)) {
				user.requests = user.requests.filter((id) => id !== friendId);
				user.save();
			}
		});
}