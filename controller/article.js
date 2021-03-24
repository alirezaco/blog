const Article = require("../models/article")
const validator = require('validator')


//get all article
async function getAll(cb) {
    Article.find({}).populate('author', { username: 1, name: 1, _id: 0 }).lean().exec((error, articles) => {
        cb(error, articles)
    });
}

//get a article by id
async function getById(id) {
    try {
        const article = await Article.findById(id).populate('author', { username: 1, name: 1, _id: 0 });
        return article
    } catch (error) {
        return 'id is not true'
    }
}

//get articles for a author 
async function getForAuthor(idAuthor) {
    try {
        const article = await Article.find({ author: idAuthor }).populate('author', { username: 1, name: 1, _id: 0 });
        return article
    } catch (error) {
        return 'id is not true'
    }
}

//create new article
function create(obj, cb) {
    if (obj.title && obj.title.length < 21 && obj.text && obj.author && validator.isMongoId(obj.author) && obj.avatar && obj.avatar.search(/img-article\-\d+\-\w+\.(png|jpg|jpeg)/gm) + 1) {
        new Article({
            title: obj.title,
            text: obj.text,
            author: obj.author,
            avatar: obj.avatar
        }).save(error => {
            if (error) return cb(error)
            cb("")
        })
    } else {
        return cb('error: obj not true')
    }
}

//delete a article
async function deleteById(id) {
    try {
        await Article.findByIdAndDelete(id)
        return 'delete is ok'
    } catch (error) {
        return 'error in server'
    }
}

module.exports = { getAll, getById, getForAuthor, create, deleteById }