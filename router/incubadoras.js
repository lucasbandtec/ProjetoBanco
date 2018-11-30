var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


//---------------------------------------------------------------------------
// verifica se o usuario esta logado
router.get('/', ensureLoggedIn('/login?fail=true'), function (req, res) {

  
    global.conn.request().query`select * from incubadora`
    .then(result => {
         res.render('incubadoras/lista', { incubadoras: result.recordset });    
     }).catch(err => {
         console.dir(err);
    })
  
  
  });

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
// GET obtem view de detalhe da incubadora selecionada

router.get('/details/:id', function (req, res, next) {

    let id = req.params.id;
  
    global.conn.request().query`select CONVERT (varchar(10), inter.dateInternacao, 103) as date, CONVERT (varchar(10), timeInternacao,108) as time, * from incubadora as inc full join internacao as inter  on inc.idIncubadora = inter.fkIncubadora full join recemNasc as r on r.idRecemNasc = inter.fkRecemNasc where idIncubadora = ${id};
    `
  
      .then(resultado => {
  
  
  
        res.render('incubadoras/details', { incubadora: resultado.recordset[0] });
  
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
  //Obtem view para alterar as informações da incubadora, no caso, a descrição.
router.post('/edit/:id', function (req, res, next) {

    let desc = req.body.descIncubadora;
    let idIncubadora = req.params.id;
  
  
  
    global.conn.request().query`update incubadora set descIncubadora = ${desc} where idIncubadora = ${idIncubadora}`
      .then(() => {
        global.conn.request().query`select descIncubadora from incubadora where idIncubadora = ${idIncubadora}`
          .then((resultado) => {
  
            res.json(resultado.recordset[0]);
          }).catch(err => {
  
            // Se der algum erro imprime no console
            console.log(err);
          })
  
  
      }).catch(err => {
        // Se der algum erro imprime no console
        console.log(err);
      })
  
  });
  
  

module.exports = router;



