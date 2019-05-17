// Defining global vars for the webserver
var express = require('express');
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main'});
var app = express();
app.engine('handlebars', handlebars.engine);
var path = require('path');
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

// Home page routing
app.get('/', function(req, res){
    res.render('home');
});

// Login routing
app.get('/login', function(req, res){
    res.render('login')
});

// Register routing
app.get('/register', function(req, res){
    res.render('register')
});

app.listen(app.get('port'), function(){
    console.log('-------------------------------------------')
    console.log('==> Node Webserver Started on Port 3000 <==')
    console.log('-------------------------------------------')
});