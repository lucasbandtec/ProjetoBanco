var express = require('express');
var router = express.Router();

//Exibe a index na pasta views quando abrir a rota: localhost:3000
router.get('/',function (req, res) {

    //Aqui
    res.render('index')

});

module.exports = router;