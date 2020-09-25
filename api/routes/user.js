const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/signup', userController.userSignup);  

router.post('/login', userController.login);

router.delete('/:userId', userController.deleteUser);

module.exports = router;