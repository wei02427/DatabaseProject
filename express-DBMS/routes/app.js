// use express method
var express = require('express');
var path = require('path');
var app = express();
app.set('views', path.join(__dirname, '../views'));
// create ejs
var engine = require('ejs-locals');
app.engine('ejs', engine);
app.set('files', './files');
app.set('view engine', 'ejs');


// modify router use file name
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/search', function (req, res) {
    res.render('search');
});



// check running enviroment
let port = process.env.PORT || 3000;

// create
app.listen(port);

// only print hint link for local enviroment 
if (port === 3000) {
    console.log('RUN http://localhost:3000/')
}

module.exports = app;
