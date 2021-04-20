const express = require('express');
const router = express.Router();
const Comment = require('../controller/comment');


router.get("/:articleId", (req, res) => {
    Comment.findForArticle(req.params.articleId).then((comments) => {
        res.send(comments);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

router.post("/", (req, res) => {

    req.body.author = req.session.user._id;

    Comment.create(req.body).then(() => {
        res.send("ok!!!")
    }).catch((error) => {
        res.status(500).send(error);
    })
})

router.delete("/:id", (req, res) => {
    Comment.remove(req.params.id).then(() => {
        res.send("ok!!!")
    }).catch((error) => {
        res.status(500).send(error);
    })
})

module.exports = router;