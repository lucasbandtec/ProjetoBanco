var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var sql = require('mssql');
var config = require('./config');

//Aqui incializa o express e salva na variável app
var app = express();

//criando variavel global de conexao com banco
sql.connect(config)
    .then(conn => global.conn = conn)
    .catch(err => console.log(err));

//Define o ejs como view engine, e define a pasta VIEWS como a principal para html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Permite passar dados no corpo do fomulário html
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static ('./public'));

// Faz o arquivo routes ficar disponível
var indexRouter = require('./router/index');
app.use('/',indexRouter);

var incubadorasRouter= require('./router/incubadoras');
app.use('/incubadoras', incubadorasRouter);

//Define que o servidor vai rodar no localhost:3000

module.exports = app;