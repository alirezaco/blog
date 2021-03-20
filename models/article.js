const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const Article = new Schema({
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
    },
    avatar: {
        type: String,
        required: true,
        default: 'no_photo.jpg'
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("article", Article)