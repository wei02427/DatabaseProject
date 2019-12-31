var express = require('express');
var router = express.Router();
var gamms = require('../../utils/AMMS');
const jwt = require('jsonwebtoken')
router.post('/', function (req, res, next) {
    const data = req.body
    gamms.login(data.email, data.password)
        .then(function (uid) {
            console.log(uid)
            const token = 'Bearer ' + jwt.sign(
                {
                    uid: uid,
                    admin: false
                },
                'secret12345',
                {
                    expiresIn: 3600 * 24 * 3
                }
            )

            res.json({ token: token})

        })
        .catch(function (err) {
            res.json({ erro: String(err) })
        })
});

module.exports = router;

// git push --force heroku HEAD:master