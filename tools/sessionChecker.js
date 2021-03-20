function userChecker(req, res, next) {
    if (req.session.user && req.cookies) {
        return res.redirect('//127.0.0.1:5000/user/profile')
    }
    next()
}

function loginChecker(req, res, next) {
    if (!req.cookies.userId || !req.session.user) {
        res.location('//127.0.0.1:5000/')
        return res.redirect('//127.0.0.1:5000/')
    }
    next()
}

module.exports = { userChecker, loginChecker }