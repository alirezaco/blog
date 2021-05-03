const express = require('express');
const router = express.Router();
const sessionChecker = require("../tools/sessionChecker")

const login = require("./login")
const userRouter = require("./users")
const page = require("./page")
const article = require('./article')
const comment = require('./comment')
const home = require('./home.service')
const forgot = require('./forgot')

/* GET home page. */
router.get('/', home.home);

//forgot password
router.use('/forgot', sessionChecker.userChecker, forgot)

// Get login page
router.get('/login', sessionChecker.userChecker, function(req, res) {
    res.render('login');
});
// Get sign up page
router.get('/singUp', sessionChecker.userChecker, function(req, res) {
    res.render('singUp');
});

router.use("/page", sessionChecker.loginChecker, page)

router.use("/login", sessionChecker.userChecker, login)

router.use("/user", userRouter)

router.use("/article", sessionChecker.loginChecker, article)

router.use("/comment", sessionChecker.loginChecker, comment)

module.exports = router;