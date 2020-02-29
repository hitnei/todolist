const categoryModel = require('../models/category_model');

mongoose = require('mongoose')

exports.getAllCategoryByUser = (req, res) => {
    var { idUser } = req
    categoryModel.find({ IDUser: idUser }, (err, categories) => {
        if (err) res.status(400).json({ err: err })
        res.status(200).json(categories)
    })
}

exports.createCategory = (req, res) => {
    categoryModel.create({
        IDUser: req.body.IDUser,
        categoryName: req.body.categoryName,
    }).then((category) => {
        res.status(200).json(category)
    }).catch((err) => {
        res.status(400).json({
            err: err
        })
    })
}

exports.editCategory = (req, res) => {
    var { idCategory, categoryName } = req.body
    categoryModel.findOneAndUpdate({ _id: idCategory }, { categoryName: categoryName }, (err, doc) => {
        if (err) res.status(400).json({ err: err })
        res.status(200).json(doc)
    })
}

exports.deleteCategory = (req, res) => {
    var { idCategory } = req.body
    categoryModel.findByIdAndDelete({ _id: idCategory }, (err, doc) => {
        if (err) res.status(400).json({ err: err })
        res.status(200).json(doc)
    })
}