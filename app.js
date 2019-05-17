/* eslint-disable import/no-absolute-path */
// Defining global consts for the webserver
const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
});
const path = require('path');

// require models
require('./models/Greenhouse');

// model instance
const Green = mongoose.model('green');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// connect to mongoose
mongoose
  .connect('mongodb://127.0.0.1/greenhouse-dev', {
    useNewUrlParser: true,
  })
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log(err));

mongoose.connection
  .once('open', () => {
    console.log('connected to greenhouse-dev');
  })
  .on('error', error => {
    console.log('connection error');
  });

const app = express();
app.engine('handlebars', handlebars.engine);

app.use(express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

// Home page routing
app.get('/', (req, res) => {
  res.render('login');
});

// Login routing
app.get('/home', (req, res) => {
  res.render('home');
  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };
  new Green(newUser).save().then(() => {
    res.redirect('/');
  });
});

// Register routing
app.get('/register', (req, res) => {
  res.render('register');
});

app.listen(app.get('port'), () => {
  console.log('-------------------------------------------');
  console.log('==> Node Webserver Started on Port 3000 <==');
  console.log('-------------------------------------------');
});
