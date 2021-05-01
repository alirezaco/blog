const Article = require("../models/article")
const validator = require('validator')


//get all article
async function getAllWithPage(page, count, author) {
    return new Promise(async(resolve, reject) => {
        try {

            const articles = await (await Article.find({ author: { $ne: author } }).populate('author', { username: 1, name: 1, _id: 0 }).limit(+count).skip((+page - 1) * (+count)).lean().sort({ updateAt: -1 }))

            resolve(articles);

        } catch (error) {

            reject(error);

        }
    })
}

//get a article by id
function getById(id) {
    return new Promise(async(resolve, reject) => {
        try {
            const article = await Article.findById(id).populate('author', { username: 1, name: 1, _id: 0 });
            resolve(article)
        } catch (error) {
            reject('id is not true')
        }
    })
}

//get articles for a author 
function getForAuthor(idAuthor, cb) {
    Article.find({ author: idAuthor }).populate('author', { username: 1, name: 1, _id: 0 }).exec((err, articles) => {
        cb(err, articles)
    });
}

//create new article
function create(obj, cb) {
    if (obj.title && obj.title.length < 21 && obj.text && obj.author && validator.isMongoId(obj.author) && obj.avatar && obj.avatar.search(/img-article\-\d+\-(\w+|\-|\!|\\|\||\@|\#|\$|\%|\^|\&|\*|\(|\))+\.(png|jpg|jpeg)/gm) + 1) {
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
function deleteById(id) {
    return new Promise(async(resolve, reject) => {
        try {
            const article = await Article.findByIdAndDelete(id)
            resolve(article)
        } catch (error) {
            reject('error in server')
        }
    })
}

//update article
function updateById(id, obj) {
    return new Promise(async(resolve, reject) => {
        try {
            if (obj.author || !obj.title || !obj.text) throw 'error'
            if (!obj.avatar) delete obj.avatar
            obj.updateAt = Date.now()
            const article = await Article.findByIdAndUpdate(id, obj)
            resolve(article)
        } catch (error) {
            reject('error')
        }
    })
}

module.exports = { getAllWithPage, getById, getForAuthor, create, deleteById, updateById }