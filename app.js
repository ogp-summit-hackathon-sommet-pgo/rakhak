// Defining global consts for the webserver
const express = require('express');
const handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
});

const app = express();
app.engine('handlebars', handlebars.engine);
const path = require('path');

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
