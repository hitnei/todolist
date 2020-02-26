const memoModel = require('../models/memo_model');

mongoose = require('mongoose')

exports.getAllMemoByUser = (req, res) => {
    var {idUser} = req
    memoModel.find({IDUser: idUser})
    .exec()
    .then((memos) => {
        return res.status(200).json({memos: memos})
    })
    .catch(err => res.status(400).json({err: err}))
}

exports.createMemo = (req, res) => {
    var {IDCategory, title, content} = req.body
    memoModel.create({
        IDCategory: IDCategory,
        title: title,
        content: content,
    }).then((memo) => {
        res.status(200).json(memo)
    }).catch((err) => {
        res.status(400).json({
            err: err
        })
    })
}

exports.editMemo = (req, res) => {
    var {idCategory, categoryName} = req.body
    memoModel.findOneAndUpdate({_id: idCategory}, {categoryName: categoryName}, (err, doc) => {
        if (err) res.status(400).json({err: err})
        res.status(200).json(doc)
    })
}

exports.deleteMemo = (req, res) => {
    var {idCategory} = req.body
    memoModel.findByIdAndDelete({_id: idCategory}, (err, doc) => {
        if (err) res.status(400).json({err: err})
        res.status(200).json(doc)
    })
}