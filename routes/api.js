const express = require('express');
const router = express.Router();
const sessionChecker = require("../tools/sessionChecker")

const login = require("./login")
const userRouter = require("./users")
const page = require("./page")
const article = require('./article')

/* GET home page. */
router.get('/', sessionChecker.userChecker, function(req, res) {
    res.render('login');
});

router.get('/singUp', sessionChecker.userChecker, function(req, res) {
    res.render('singUp');
});

router.use("/page", sessionChecker.loginChecker, page)

router.use("/login", sessionChecker.userChecker, login)

router.use("/user", userRouter)

router.use("/article", sessionChecker.loginChecker, article)

module.exports = router;