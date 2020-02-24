const express = require('express');
const router = express.Router();

const login_controller = require('../controllers/login_controller.js');

router.post('/', login_controller.login);

router.post('/getInfo', login_controller.getInfo);

module.exports = router;