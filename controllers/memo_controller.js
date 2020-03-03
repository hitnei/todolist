const memoModel = require('../models/memo_model');

mongoose = require('mongoose')

exports.getAllMemoByUser = (req, res) => {
    var { idUser } = req
    memoModel.find({ IDUser: idUser })
        .exec()
        .then((memos) => {
            return res.status(200).json({ memos: memos })
        })
        .catch(err => res.status(400).json({ err: err }))
}

exports.createMemo = (req, res) => {
    var { IDCategory, title, content } = req.body
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
    var { memo } = req.body
    var { idUser } = req
    memoModel.findOneAndUpdate({ _id: memo._id, IDUser: idUser }, {title: memo.title, content: memo.content})
        .then(newMemo => {
            res.status(200).json({ memo: memo })
        })
        .catch(err => res.status(401).json({ err: err }))
}

exports.deleteMemo = (req, res) => {
    var { idCategory } = req.body
    memoModel.findByIdAndDelete({ _id: idCategory }, (err, doc) => {
        if (err) res.status(400).json({ err: err })
        res.status(200).json(doc)
    })
}

exports.changeMemoClipByIdMemo = (req, res) => {
    var { id } = req.body
    var { idUser } = req
    memoModel.findOne({ _id: id, IDUser: idUser })
        .then(memo => {
            memo.isClip = !memo.isClip
            memo.save()
                .then(() => {
                    res.status(200).json({ mess: 'success' })
                })
                .catch((err) => {
                    res.status(400).json({ err: err })
                })
        })
        .catch(err => res.status(401).json({ err: err }))
}