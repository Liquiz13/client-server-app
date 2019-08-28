const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.post('/', authController.auth_reg);


module.exports = router;