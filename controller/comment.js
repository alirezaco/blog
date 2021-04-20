const Comment = require("../models/comment")


function findForArticle(articleId) {

    return new Promise(async(resolve, reject) => {
        try {
            const comments = await Comment.find({ article: articleId }).populate('author').lean();
            resolve(comments)
        } catch (error) {
            reject(error);
        }
    })

}

function create(obj) {
    return new Promise(async(resolve, reject) => {

        if (!obj.title || !obj.text || !obj.author || !obj.article) {
            reject("Error : argument not true");
        }

        try {

            await new Comment(obj).save();

            resolve()

        } catch (error) {

            reject(error)

        }

    })
}

function remove(id) {
    return new Promise(async(resolve, reject) => {
        try {

            await Comment.deleteOne({ _id: id });

            resolve();

        } catch (error) {

            reject(error)

        }
    })
}

module.exports = { findForArticle, create, remove }