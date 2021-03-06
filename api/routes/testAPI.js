var express = require('express');
var router = express.Router();
var gms = require('../../utils/GMS');

router.post('/', function (req, res, next) {
    const data = req.body
    console.log(data.type,data.state)
    gms.gamelist(data.type,data.state)
        .then(function (result) {
            console.log(result)
            var data = []
            result.forEach(function (element) {
                data.push({
                    price: element.price,
                    gameID: element.Game_ID,
                    description:element.description,
                    photo:element.photo,
                    state:element.release_state,
                    Gname:element.Gname,
                    Aname:element.Aname,
                    type:element.type
                });
            });
            res.json(data);
        })
        .catch(function (err) {
            console.log(err)
        })

});

module.exports = router;

// git push --force heroku HEAD:master