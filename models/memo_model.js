const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var memoModel = new Schema({
    IDCategory: { type: String, required: true },
    IDUser: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
    title: { type: String, required: true },
    content: { type: String, required: true },
    isClip: { type: Boolean, default: false },
    idDelete: { type: Boolean, default: false },
    dateDelete: { type: Date, default: null },
});

module.exports = mongoose.model('memos', memoModel);