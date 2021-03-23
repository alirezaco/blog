const express = require('express');
const router = express.Router();
const article = require('../controller/article')


//create article
router.post('/', (req, res) => {
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