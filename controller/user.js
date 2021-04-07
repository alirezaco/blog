const Users = require("../models/user")
const validator = require('validator')



//get all users 
function getAllUsers() {
    return new Promise(async(resolve, reject) => {
        try {
            const users = await Users.find({ role: { $nin: 'admin' } }, { __v: 0, password: 0, role: 0 }).lean()
            resolve(users);
        } catch (error) {
            reject(error)
        }
    })
}


function findByUsername(username, cl) {
    Users.findOne({ username }, (error, user) => {
        cl(error, user)
    })
}


//create user 
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
        if ((!obj.email || validator.isEmail(obj.email)) && (!obj.age || !isNaN(+obj.age)) && (!obj.phoneNumber || obj.phoneNumber.search(/\d{11}/gm) + 1) && (!obj.name || isNaN(+obj.name)) && (!obj.gender || obj.gender == 'male' || obj.gender == 'female')) {
            Users.findOneAndUpdate({ _id: id }, obj, { new: true }, (error, newUser) => {
                return cl(error, newUser)
            })
        } else {
            cl("Bad request!!!")
        }
    })
}

//upload avatar for user
function uploadAvatar(id, fileName, cb) {
    Users.findOneAndUpdate({ _id: id }, { avatar: fileName }, { new: true }, (err, user) => {
        cb(err, user)
    })
}

//update password by admin
function updateByAdmin(id) {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await Users.findById(id).lean();
            Users.findByIdAndUpdate(id, { password: user.username }, { new: true }).then((users) => {
                users.save();
            }).catch((err) => {
                throw err
            })
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { findByUsername, createUser, deleteById, updateById, uploadAvatar, getAllUsers, updateByAdmin }