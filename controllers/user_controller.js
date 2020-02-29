const userModel = require('./../models/user_model')

mongoose = require('mongoose')

exports.createUser = (req, res) => {
    var {username, password} = req.body
    userModel.create(req.body)
    .then((doc) => {
        res.json(doc)
    })
}