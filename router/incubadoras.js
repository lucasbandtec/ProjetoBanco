var express = require('express');
var router = express.Router();
var sql = require('mssql');
var config = require('../config');

//--------------------------------------------------------------------------------

// Exibe uma lista de Incubadoras
router.get('/', function (req, res) {
    
    // Faz a conexão com o banco passando a configuração
    sql.connect(config).then(() => {
        //Faz a consulta na tabela incubadora om o comando sql que quiser
        return sql.query(`select * from incubadora`)
    }).then(resultado => {
        //Aqui temos o resultado da consulta e mandamos pra view lista
        sql.close()
        res.render('incubadoras/lista', { incubadoras: resultado.recordset });

    }).catch(err => {
        // Se der algum erro imprime no console
        sql.close()
        console.log(err);
    })
});
//-----------------------------------------------------------------------------------


//Aqui é GET pois exibe o formulário de cadastro de incubadoras para o cliente
router.get('/cadastro', function (req, res) {

    res.render('incubadoras/cadastro');
});

//-----------------------------------------------------------------------------------

//Aqui é POST pois Recebe o formulário de cadastro para ser salvo no banco
router.post('/cadastro', function (req, res) {

    //Aqui estamos pegando o valor contido no formulário no campo input com name codigo
    let codigo = req.body.codigo;
    let status = 0;  

    // Faz a conexão com o banco passando a configuração 
    //esse THEN quer dizer que se caso a  conexao der certo ele roda o código seguinte.
    sql.connect(config).then(() => {

        // Se a conexão der certo ele roda aqui
        //Faz a consulta na tabela incubadora. Esses campos assim ${ } são pra concatenar as variaveis.
        return sql.query`insert into incubadora values(${codigo},${status})`

    }).then(resultado => {
        //Aqui temos o resultado da query e redirecionamos para a view de lista
        sql.close()
        res.redirect('/incubadoras');

    }).catch(err => {
        // Se der algum erro imprime no console
        sql.close()
        console.log(err);
    })

});
//-----------------------------------------------------------------------------------------------------

module.exports = router;



