const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categoryModel = new Schema({
    IDUser: {type: String, required: true},
    categoryName: {type: String, required: true},
    categoryAmount: {type: Number, default: 0},
});

module.exports = mongoose.model('categories', categoryModel);