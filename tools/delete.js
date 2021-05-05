const Article = require("../controller/article")
const Comment = require('../controller/comment')
const upload = require('./upload')


function deleteAllArticleByUserId(userId) {

    return new Promise((resolve, reject) => {

        Article.getForAuthor(userId, (err, articles) => {

            if (err) return reject(err);

            for (const article of articles) {

                if (oldArticle.avatar != 'no_photo.jpg') upload.deleteAvatar(article.avatar);

                deleteCommentByArticleId(article._id)

                Article.deleteById(article._id)

                return resolve();
            }
        })
    })

}

function deleteCommentByUserId(userId) {

    return new Promise((resolve, reject) => {
        Comment.findForArticle(userId).then((comments) => {

            for (const comment of comments) {

                Comment.deleteById(comment._id)

                resolve();

            }

        }).catch((err) => {
            reject(err);
        })
    })

}

function deleteCommentByArticleId(articleId) {

    return new Promise((resolve, reject) => {

        Comment.findForArticle(articleId).then((comments) => {

            for (const comment of comments) {

                Comment.deleteById(comment._id)

                resolve();

            }
        }).catch((err) => {
            reject(err);
        })
    })
}


module.exports = { deleteAllArticleByUserId, deleteCommentByUserId, deleteCommentByArticleId }