var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//Aqui incializa o express e salva na variável app
var app = express();

//Define o ejs como view engine, e define a pasta VIEWS como a principal para html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Permite passar dados no corpo do fomulário html
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Faz o arquivo index na pasta routes ficar disponível
var indexRouter = require('./router/index');
app.use('/',indexRouter);

// Faz o arquivo incubadoras na pasta routes ficar disponível
var incubadorasRouter= require('./router/incubadoras');
app.use('/incubadoras', incubadorasRouter);

//Define que o servidor vai rodar no localhost:3000

module.exports = app;