var express = require('express');
var router = express.Router();


//--------------------------------------------------------------------------------

// Exibe uma lista de Incubadoras
router.get('/', function (req, res) {
    
    // Faz a conexão com o banco passando a configuração
    global.conn.request().query`select * from incubadora`
    .then(resultado => {
        //Aqui temos o resultado da consulta e mandamos pra view lista
        
        res.render('incubadoras/lista', { incubadoras: resultado.recordset });

    }).catch(err => {
        // Se der algum erro imprime no console
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
    global.conn.request().query`insert into incubadora values(${codigo},${status})`

    .then(resultado => {
        //Aqui temos o resultado da query e redirecionamos para a view de lista
        
        res.redirect('/incubadoras');

    }).catch(err => {
        // Se der algum erro imprime no console
        
        console.log(err);
    })

});
//-----------------------------------------------------------------------------------
router.get('/details/:id', function (req, res, next) {

    let id = req.params.id;

    //faz a conexao global com o banco
    global.conn.request().query`select * from incubadora where idIncubadora = ${id}`
  
    .then(resultado => {

        //Manda pra view details 
      res.render('incubadoras/details', { incubadora: resultado.recordset[0]});
      console.log( resultado.recordset[0])
  
    }).catch(err => {
      // Se der algum erro imprime no console
      console.log(err);
    })
  
   
  });
//-----------------------------------------------------------------------------------------------------
router.get('/delete/:id', (req,res) =>{

    let id = req.params.id;
  
    global.conn.request().query`delete from incubadora where idIncubadora = ${id}`
  
    .then(resultado => {
  
      res.redirect('/incubadoras/');
      
  
    }).catch(err => {
      // Se der algum erro imprime no console
      console.log(err);
    })
  
    });
  
  
  
  //-----------------------------------------------------------------------------------
  
  

module.exports = router;



