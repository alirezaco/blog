const Article = require('../controller/article')
const User = require('../controller/user')

function home(req, res) {

    let isLogin = false;

    if (req.session.user)
        isLogin = true;

    Article.getAllWithPage(1, 8).then((articles) => {

        User.getAllUsers().then((users) => {

            res.render('homePage', { isLogin, articles, users });

        }).catch((err) => {

            res.status(500).send(err);

        })
    }).catch((err) => {

        res.status(500).send(err);

    })
}

module.exports = { home }