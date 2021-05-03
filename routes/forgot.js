const express = require('express');
const router = express.Router();
const User = require('../controller/user')
const email = require('../tools/email')

//forgot password page
router.get('/', (req, res) => {
    res.render('forgotPass')
})

// send email
router.post('/', (req, res) => {
    User.findByUsername(req.body.username, (error, user) => {
        if (error) return res.status(500).send('Please try again later!')

        if (!user) return res.status(404).send('User not found!')

        req.session.number = Math.floor((Math.random() * 100000) + 1000000);

        console.log(req.session.number);

        email.sendEmail('number : ' + req.session.number, user.email).then(() => {

            req.session.username = user.username;

            return res.send('ok');

        }).catch((err) => {

            console.log(err);

            req.session.number = null;

            return res.status(500).send('Please try again later!')

        })
    })
})


//check Submission number
router.post('/check', (req, res) => {
    if (!req.session.number || !req.session.username) return res.status(403).send('First enter the username and then click the send button');

    if (req.session.number == req.body.number) {

        req.session.number = 200;

        req.session.username = req.session.username

        return res.send('ok!')

    } else
        return res.status(404).send('The number entered is not equal to the number sent!')
})

//page change password
router.get('/newPass', (req, res) => {
    if (req.session.number != 200) return res.redirect('/forgot/')

    req.session.change = req.session.username;

    res.render('newPassword')
})

//change password
router.put('/', (req, res) => {
    if (!req.session.change) return res.status(404).send('please enter send number!')

    User.updatePasswordBuyUsername(req.session.change, req.body.password).then(() => {
        res.send('ok!')
    }).catch(err => {
        res.status(400).send(err)
    })
})


module.exports = router