const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userModel = new Schema({
    username: {type: String, required: true, max: 100, },
    password: {type: String, required: true, },
    email: String,
    createDate: {type: Date, default: Date.now},
});

module.exports = mongoose.model('users', userModel);