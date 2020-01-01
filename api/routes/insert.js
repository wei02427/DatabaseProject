var express = require('express');
var router = express.Router();
var gamms = require('../../utils/GMS');
const jwt = require('jsonwebtoken')
router.post('/', function (req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '')
    console.log(token)
    const decoded = jwt.verify(token, SECRET)
});

module.exports = router;