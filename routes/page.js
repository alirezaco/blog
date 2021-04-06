const express = require('express');
const router = express.Router();
const controllerUser = require("../controller/user")
const controllerArticle = require("../controller/article")
const acc = require('../tools/acc')



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
    controllerArticle.getAll((err, articles) => {
        if (err) return res.status(500).send('Error !!!')
        if (req.params.page > articles.length / 30) req.params.page = 1;
        res.render('explore', { articles: articles.slice(articles.length - (30 * (req.params.page)), articles.length - (30 * (req.params.page - 1))), author: req.session.user.username })
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
        let a = 2;
    }).catch((err) => {
        res.status(500).send(err)
    })
})


//profile article
router.get("/:id", (req, res) => {
    controllerArticle.getById(req.params.id).then((article) => {
        if (req.session.user.username === article.author.username) {

            res.render('article', { article, isViewer: false })

        } else {

            res.render('article', { article, isViewer: true })

        }
    }).catch((error) => {
        res.status(500).send(error)
    })
})




module.exports = router