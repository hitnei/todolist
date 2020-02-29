const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt');
const user_model = require('./../models/user_model')

mongoose = require('mongoose')

exports.login = (req, res) => {
    var { username, password } = req.body
    user_model.findOne({ username: username }, (err, user) => {
        if (err) res.status(400).json({ err: err })
        if (user) {
            if (user.password === password) {
                payload = {
                    _id: user.id,
                    username: user.username,
                    password: user.password,
                }
                var token = jwt.sign(payload, process.env.SECRET_TOKEN, {
                    expiresIn: '1d'
                })
                res.status(200).json({
                    token: token
                })
            }
        } else {
            res.status(401).json({
                err: "user not found"
            })
        }
    })
}

exports.getInfo = (req, res) => {
    jwt.verify(req.body.token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err)
            res.status(400).json({ "err": err })
        res.status(200).json({ "decoded": decoded })
    })
}