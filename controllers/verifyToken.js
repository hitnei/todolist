const jwt = require('jsonwebtoken')
const userModel = require('./../models/user_model')

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization
    
    if (typeof bearerHeader && bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, process.env.SECRET_TOKEN, (err, user) => {
            if (err) return res.status(400).json({err: err})
            if (!user) return res.status(401).json({err: "user not found"})
            userModel.findOne({username: user.username, password: user.password}, (err, doc) => {
                if (err) res.status(402).json({err: err})
                res.status(200).json({mess: "seccess"})
            })
        })
    } else {
        res.status(403).json({mess: "no authorization"})
    }
}