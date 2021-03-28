const express = require('express');
const router = express.Router();
//const controllerUser = require("../controller/user")
const controllerArticle = require("../controller/article")

router.get("/changePassword", (req, res) => {
    res.status(202).render('changePassword')
})

router.get("/home", (req, res) => {
    res.status(202).render('home', { user: req.session.user })
})

router.get("/update", (req, res) => {
    res.status(202).render('update', { user: req.session.user })
})

router.get("/avatar", (req, res) => {
    res.status(202).render('avatar', { user: req.session.user })
})

router.get("/newArticle", (req, res) => {
    res.status(202).render('newArticle', { user: req.session.user })
})

router.get("/yourArticle", (req, res) => {
    controllerArticle.getForAuthor(req.session.user._id, (err, articles) => {
        if (err) return res.status(500).send('Error !!!')
        res.status(202).render('yourArticle', { articles })
    })
})

router.get("/explore/:page", (req, res) => {
    controllerArticle.getAll((err, articles) => {
        if (err) return res.status(500).send('Error !!!')
        if (req.params.page > articles.length / 30) req.params.page = 1;
        res.status(202).render('explore', { articles: articles.slice(articles.length - (30 * (req.params.page)), articles.length - (30 * (req.params.page - 1))), author: req.session.user.username })
    })
})

router.get("/:id", (req, res) => {
    controllerArticle.getById(req.params.id).then((article) => {
        if (req.session.user.username === article.author.username) {

            res.status(202).render('article', { article, isViewer: false })

        } else {

            res.status(202).render('article', { article, isViewer: true })

        }
    }).catch((error) => {
        res.status(500).send(error)
    })
})

module.exports = router