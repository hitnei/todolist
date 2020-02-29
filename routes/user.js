const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user_controller.js');

router.post('/createUser', user_controller.createUser);

module.exports = router; 