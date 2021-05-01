const express = require('express');
const router = express.Router();
const article = require('../controller/article')
const upload = require('../tools/upload')

//create article
router.post('/', upload.upload.single('img-article'), (req, res) => {

    req.body.avatar = req.file.filename
    req.body.author = req.session.user._id
    article.create(req.body, (error) => {
        if (error) { upload.deleteAvatar(req.file.filename); return res.status(500).send(error) }
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

//update Article
router.put('/:id', upload.upload.single('img-article'), (req, res) => {
    article.updateById(req.params.id, { title: req.body.title, text: req.body.text, avatar: (req.file) ? req.file.filename : '' }).then((oldArticle) => {
        if (req.file && oldArticle.avatar != 'no_photo.jpg') upload.deleteAvatar(oldArticle.avatar)
        res.send('ok')
    }).catch(() => {
        res.status(404).send('Not found!!!')
    })
})

//delete article
router.delete('/:id', (req, res) => {
    article.deleteById(req.params.id).then((oldArticle) => {
        if (oldArticle.avatar != 'no_photo.jpg') upload.deleteAvatar(oldArticle.avatar)
        res.send('ok!!!')
    }).catch(() => {
        res.status(404).send('Not found!!!')
    })
})

module.exports = router