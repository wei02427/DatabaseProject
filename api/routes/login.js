var express = require('express');
var router = express.Router();
var gamms = require('../../utils/AMMS');
const jwt = require('jsonwebtoken')
router.post('/', function (req, res, next) {
    const data = req.body
    gamms.login(data.email, data.password)
        .then(function (info) {
            console.log(info)
            const token = 'Bearer ' + jwt.sign(
                {
                    uid: info.ID,
                    admin: info.Class==2
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