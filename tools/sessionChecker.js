function userChecker(req, res, next) {
    if (req.session.user && req.cookies) {
        return res.redirect('//127.0.0.1:5000/user/profile')
    }
    next()
}

function loginChecker(req, res, next) {
    if (!req.cookies.userId || !req.session.user) {
        res.location('//127.0.0.1:5000/login')
        return res.redirect('//127.0.0.1:5000/login')
    }
    next()
}

module.exports = { userChecker, loginChecker }