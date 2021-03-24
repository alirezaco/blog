const express = require('express');
const router = express.Router();
const article = require('../controller/article')
const upload = require('../tools/upload')

//create article
router.post('/', upload.upload.single('img-article'), (req, res) => {

    req.body.avatar = req.file.filename
    req.body.author = req.session.user._id
    article.create(req.body, (error) => {
        if (error) return res.status(400).send(error)
        res.send('ok')
    })
})

//get all article
router.get('/all', (req, res) => {
    article.getAll((error, articles) => {
        if (!articles || error) return res.status(404).send('Not found!!!')
        res.json(articles)
    })
})


module.exports = router