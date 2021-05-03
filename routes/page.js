const express = require('express');
const router = express.Router();
const controllerUser = require("../controller/user")
const controllerArticle = require("../controller/article")
const acc = require('../tools/acc')
const controllerComment = require('../controller/comment')


router.get("/changePassword", (req, res) => {
    res.render('changePassword')
})

router.get("/home", (req, res) => {
    res.render('home', { user: req.session.user })
})

router.get("/update", (req, res) => {
    res.render('update', { user: req.session.user })
})

router.get("/avatar", (req, res) => {
    res.render('avatar', { user: req.session.user })
})

router.get("/newArticle", (req, res) => {
    res.render('newArticle', { article: { title: '', text: '' }, btn: 'save-newArticle' })
})

router.get("/yourArticle", (req, res) => {
    controllerArticle.getForAuthor(req.session.user._id, (err, articles) => {
        if (err) return res.status(500).send('Error !!!')
        res.render('yourArticle', { articles })
    })
})

router.get("/explore/:page", (req, res) => {

    if (req.params.page > 9) req.params.page = 1;

    controllerArticle.getAllWithPage(req.params.page, 12, req.session.user._id).then((articles) => {

        res.render('explore', { articles });

    }).catch(error => {
        res.status(500).send(error)
    })
})


//page for update article
router.get('/updateArticle/:id', (req, res) => {
    controllerArticle.getById(req.params.id).then((article) => {
        if (req.session.user.username === article.author.username) {

            res.render('newArticle', { article, btn: 'btn-update' })

        } else {

            res.status(404).send("error")

        }
    }).catch((error) => {
        res.status(500).send(error)
    })
})

//table for user
router.get('/users', acc.checkAdmin, (req, res) => {
    controllerUser.getAllUsers().then((users) => {
        res.render('tableUsers', { users })
    }).catch((err) => {
        res.status(500).send(err)
    })
})


//profile article
router.get("/:id", (req, res) => {
    controllerArticle.getById(req.params.id).then((article) => {

        controllerComment.findForArticle(req.params.id).then((comments) => {

            if (req.session.user.username === article.author.username) {

                if (req.session.user.role === 'admin') {
                    res.render('article', { article, isViewer: false, admin: true, comments })
                } else {
                    res.render('article', { article, isViewer: false, admin: false, comments })
                }

            } else if (req.session.user.role === 'admin') {
                res.render('article', { article, isViewer: true, admin: true, comments })

            } else {
                res.render('article', { article, isViewer: true, admin: false, comments })
            }

        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch((error) => {
        res.status(500).send(error)
    })
})

module.exports = router