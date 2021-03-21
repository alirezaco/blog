const express = require('express');
const router = express.Router();
//const controllerUser = require("../controller/user")

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

module.exports = router