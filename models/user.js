const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    age: {
        type: Number,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true,
        enum: ['male', 'female']
    },
    createAt: {
        type: Date,
        trim: true,
        default: Date.now
    },
    avatar: {
        type: String,
        trim: true,
        default: "no_photo.jpg"
    },
    role: {
        type: String,
        enum: ['admin', 'blogger'],
        default: 'blogger'
    }
})

User.pre('save', function(next) {
    const user = this
    if (user.isNew || user.isModified('password')) {

        bcrypt.genSalt(10, function(err, salt) {

            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(error, hash) {
                if (error) return next(error);

                user.password = hash;
                return next();
            });
        });
    } else {
        return next();
    }
})

module.exports = mongoose.model("users", User);