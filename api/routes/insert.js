var express = require('express');
var router = express.Router();
var gamms = require('../../utils/GMS');
const jwt = require('jsonwebtoken')
router.post('/', function (req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '')

    const data = req.body
    try {
        const decoded = jwt.verify(token, 'secret12345')
        if (decoded.admin) {
            gamms.addGame(data.aid, data.name, data.type, data.price, data.photo, data.description, data.state, data.time)
                .then(function (result) {
                    console.log(result)
                    res.json({ staus: "insert suscess" })
                })
                .catch(function (err) {
                    res.json({ err: String(err) })
                })
        }

    } catch (err) {
        // err
    }


});

module.exports = router;