var express = require('express');
var router = express.Router();
var gamms = require('../../utils/AMMS');
const jwt = require('jsonwebtoken')
router.post('/', function (req, res, next) {
    const data = req.body
    gamms.register(data.fname, data.lname,data.sex, data.email, data.phone, data.password, data.credit, data.birthday, data.address, data.account)
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
            res.json({token:token,err:null})
        })
        .catch(function (err) {
            res.json({err:String(err)})
        })
});

module.exports = router;

// git push --force heroku HEAD:master