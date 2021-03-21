const Users = require("../models/user")
const validator = require('validator')


function findByUsername(username, cl) {
    Users.findOne({ username }, (error, user) => {
        cl(error, user)
    })
}

function createUser(obj, cl) {
    if (!isNaN(+obj.name) || !obj.name || !(obj.password.search(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gmi) + 1) || !obj.email || !(validator.isEmail(obj.email))) {
        return cl("name or password or email not true !!!")
    }
    Users.findOne({ $or: [{ username: obj.username }, { email: obj.email }] }, (error, user) => {
        if (error) return cl(error)
        if (user) return cl("username or email Exist !!!")
        new Users(obj).save(err => {
            if (err) return cl(err)
            cl("")
        })
    })
}

function deleteById(id, cl) {
    Users.findOneAndDelete({ _id: id }, (err) => {
        cl(err)
    })
}

//update by id
function updateById(id, obj, cl) {
    Users.findOne({ username: obj.username }, (err, user) => {
        if (err) return cl(err)
        if (user && user._id != id) return cl("username Exist!!!")
        if ((!obj.email || validator.isEmail(obj.email)) && (!obj.age || !isNaN(+obj.age)) && (!obj.phoneNumber || obj.phoneNumber.search(/\d{11}/gm) + 1)) {
            Users.findOneAndUpdate({ _id: id }, obj, { new: true }, (error, newUser) => {
                return cl(error, newUser)
            })
        } else {
            cl("Bad request!!!")
        }
    })
}

function uploadAvatar(id, fileName, cb) {
    Users.findOneAndUpdate({ _id: id }, { avatar: fileName }, { new: true }, (err, user) => {
        cb(err, user)
    })
}

module.exports = { findByUsername, createUser, deleteById, updateById, uploadAvatar }