//check for admin
function checkAdmin(req, res, next) {
    if (req.session.user.role === 'admin') return next();
    res.status(403).send();
}

module.exports = { checkAdmin };