const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
// const checkAuth = require('../middleweare/check-auth');

router.post('/', usersController.users_create);

router.put('/:id', usersController.users_change);

router.get('/', usersController.users_get_all);

router.get('/:id', usersController.users_get_one);

router.delete('/:id', usersController.users_delete);


router.post('/:id/friends/', usersController.users_friendReq);

router.post('/:id/friends/add', usersController.users_friendAdd);



module.exports = router;