const express = require('express');
const router = express.Router();
const controllerUser = require("../controller/user")
const bcrypt = require("bcrypt")

router.post("/", (req, res) => {
    controllerUser.findByUsername(req.body.username.trim(), (error, user) => {
        if (error) return res.status(500).send("Error server!!!")
        if (!user) return res.status(404).send("Not found")

        bcrypt.compare(req.body.password, user.password.trim(), function(err, isMatch) {
            if (err) return res.status(500).send("Error server!!!")
            if (isMatch) {
                req.session.user = user
                return res.redirect("//127.0.0.1:5000/user/profile")
            }
            return res.status(404).send("Not Found!!!")
        })
    })
})


module.exports = router