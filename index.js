const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', (req, res) => {
  const data_nascimento = 'req.query.nasci';
  const idade = moment().diff(moment(data_nascimento,
  "DD/MM/YYYY"), 'years');
  idade >= 18 ? res.redirect('/major') : res.redirect('/minor');
});

app.get('/major', (req, res) => {
  res.render('major');
});

app.get('/minor', (req, res) => {
    res.render('minor');
});

app.listen(3000);
