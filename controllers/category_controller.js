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
    var { idUser } = req
    var { categoryName } = req.body
    categoryModel.findOne({ categoryName: categoryName, IDUser: idUser })
        .then(category => {
            if (!category) {
                // create category
                var newCategory = new categoryModel({
                    IDUser: idUser,
                    categoryName: categoryName,
                    categoryAmount: 1,
                })
                newCategory.save((err, doc) => {
                    if (err) res.status(400).json({ err: err })
                    return res.status(200).json({ category: doc })
                })
            } else {
                // had category
                return res.status(201).json({ category: category })
            }
        })
        .catch(err => res.status(401).json({ err: err }))

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