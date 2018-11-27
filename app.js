var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var passport = require('passport')
var session = require('express-session');
var cors = require('cors');

//----------------------------------------------------------
//passport é a dependencia que faz autenticacao
require('./router/auth')(passport);

//----------------------------------------------------------

// Faz o arquivo routes ficar disponível
var indexRouter = require('./router/index');
var usersRouter = require('./router/users');
var incubadorasRouter = require('./router/incubadoras');
var medicaoRouter = require('./router/medicao');
var recemNascRouter = require('./router/recemNasc');
var internacaoRouter = require('./router/internacao');


//----------------------------------------------------------

//Aqui incializa o express e salva na variável app
const app = express();
//deixa as dependencias mais rapidas
app.use(cors());
//----------------------------------------------------------

app.use(session({
    secret: '123',//configure um segredo seu aqui
    resave: false,
    saveUninitialized: false
}));

//----------------------------------------------------------

app.use(passport.initialize());
app.use(passport.session());

//----------------------------------------------------------

//Define o ejs como view engine, e define a pasta VIEWS como a principal para html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//----------------------------------------------------------
//Permite passar dados no corpo do fomulário html
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//----------------------------------------------------------


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//----------------------------------------------------------
//Ativa as rotas para que possa ser acessadas com '/xxx'
app.use('/',indexRouter);
app.use('/users', usersRouter);
app.use('/incubadoras', incubadorasRouter);
app.use('/medicao', medicaoRouter);
app.use('/recemNasc', recemNascRouter);
app.use('/internacao', internacaoRouter);
//----------------------------------------------------------
// Para caso der erro
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
//----------------------------------------------------------
//Define que o servidor vai rodar no localhost:3000
module.exports = app;