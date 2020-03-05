const memoModel = require('../models/memo_model');
const categoryModel = require('../models/category_model');

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
    var { idUser } = req
    var newMemo = new memoModel({
        IDUser: idUser,
        IDCategory: IDCategory,
        title: title,
        content: content,
    })
    newMemo.save((err, doc) => {
        if (err) return res.status(400).json({ err: err })
        categoryModel.findOne({ _id: doc.IDCategory })
            .then(category => {
                category.categoryAmount++
                category.save((err) => {
                    if (err) res.status(400).json({ err: err })
                })
            })
        return res.status(200).json({ memo: doc })
    })
}

exports.editMemo = (req, res) => {
    var { memo, oldIdCategory } = req.body
    memo.createDate = Date.now()
    var { idUser } = req
    memoModel.findOneAndUpdate({ _id: memo._id, IDUser: idUser }, { title: memo.title, content: memo.content, isDelete: memo.isDelete, createDate: memo.createDate, IDCategory: memo.IDCategory })
        .then(newMemo => {
            var newIdCategory = memo.IDCategory
            if (oldIdCategory !== newIdCategory) {
                categoryModel.findOne({ _id: oldIdCategory })
                    .then(category => {
                        category.categoryAmount = --category.categoryAmount
                        category.save(err => {
                            if (err) res.status(402).json({ err: err })
                        })
                    })
                categoryModel.findOne({ _id: newIdCategory })
                    .then(category => {
                        category.categoryAmount = ++category.categoryAmount
                        category.save(err => {
                            if (err) res.status(403).json({ err: err })
                        })
                    })
            }
            res.status(200).json({ memo: memo, oldIdCategory: oldIdCategory, newIdCategory: newIdCategory })
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