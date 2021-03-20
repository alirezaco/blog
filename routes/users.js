//including headers
// modules
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const upload = require("../tools/upload") //upload file

//include controller of models
const controllerUser = require("../controller/user")
const sessionChecker = require("../tools/sessionChecker")

router.get("/username/:username", (req, res) => {
    controllerUser.findByUsername(req.params.username, (error, user) => {
        if (error) return res.status(500).send("Error server!!!")
        if (!user) return res.status(404).send("Not found")
        res.send(user._id)
    })
})

router.post("/create", (req, res) => {
    controllerUser.createUser(req.body, error => {
        if (error) return res.status(400).send(error)
        res.send("saved !!!")
    })
})

router.use(sessionChecker.loginChecker)

// send profile user
router.get("/profile", (req, res) => {
    res.render('profile', { user: req.session.user })
})


//logout user
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send("server Error")
    })
    res.clearCookie("userId")
    res.redirect('//127.0.0.1:5000/')
})

//delete user
router.delete("/", (req, res) => {
    controllerUser.deleteById(req.session.user._id, (err) => {
        if (err) return res.status(500).send("server Error!!!")
        res.send("ok!!!")
    })
})

//update user (without password)
router.put("/update", (req, res) => {
    controllerUser.updateById(req.session.user._id, req.body, (err, user) => {
        if (err) return res.status(400).send("bad!!!")
        req.session.user = user;
        res.send("ok!!!");
    })
})

//change password
router.put("/password", (req, res) => {
    bcrypt.compare(req.body.oldPassword, req.session.user.password, (err, isMatch) => {
        if (err) return res.status(500).send('Error !!!')
        if (isMatch) {
            const newUser = {
                username: req.session.user.username,
                password: req.body.newPassword
            }

            bcrypt.genSalt(10, function(error2, salt) {
                if (error2) return res.status(500).send('Error !!!');

                bcrypt.hash(newUser.password, salt, function(error3, hash) {
                    if (error3) return res.status(500).send('Error !!!')
                    if ((newUser.password && newUser.password.search(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gmi) + 1)) {
                        newUser.password = hash;
                        controllerUser.updateById(req.session.user._id, newUser, (error, user) => {
                            if (error) return res.status(500).send('Error !!!')
                            req.session.destroy();
                            res.send('ok!!!')
                        })
                    } else {
                        return res.status(400).send('password not true!!!')
                    }
                });
            });

        }
    })
})

//upload avatar
router.post('/avatar', upload.single('avatar'), (req, res) => {
    controllerUser.uploadAvatar(req.session.user._id, req.file.filename, (err, user) => {
        if (err) return res.status(400).send(err)
        req.session.user = user;
        res.redirect('//127.0.0.1:5000')
    })
})

module.exports = router;