const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const Comment = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    article: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'articles'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("comment", Comment)