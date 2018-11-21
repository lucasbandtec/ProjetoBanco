var express = require('express');
var router = express.Router();

//GET obtem medicao da incubadora

router.get('/', (req, res, next) => {

    global.conn.request().query`select Top(1) temperatura, umidade from medicao order by idMedicao desc;`
    
    .then(resultado => {
        
      res.json(resultado.recordset[0]);
  
    }).catch(err => {
      // Se der algum erro imprime no console
      console.log(err);
    })
  
  });
  
//GET obtem medicao da incubadora e faz estatistica

router.get('/estatistica', (req, res, next) => {

    global.conn.request().query`select top(1) * from estatistica order by idEstatistica desc;`
    
    .then(resultado => {
         
     res.json(resultado.recordset[0]);
  
    }).catch(err => {
      // Se der algum erro imprime no console
      console.log(err);
    })
  
  });
  
    module.exports = router;