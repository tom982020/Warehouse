const express = require('express');
var app = express();
var bodyParser = require('body-parser');

var userRouters = require('./router/user.route');

app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/', express.static('public'));
app.set('view engine', 'ejs');
require('./db');
app.use('/users', userRouters);
app.get('/', function(request, response) {
    response.render('index', {});
});
app.listen(3000, function() {
    console.log('ok');
});