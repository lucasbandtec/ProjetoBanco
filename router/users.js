var express = require('express');
var router = express.Router();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('2012');

// Exibe a lista de usuários

router.get('/', function (req, res) {

    global.conn.request().query`select idUsuario, nome, email from usuario`
    .then((result)=>{

        res.render('usuarios/index',{usuarios : result.recordset});

    })
    .catch((err)=>{

        console.log(err);
    })
    
})



// Obtem a view do formulário de cadastro de usuário
router.get('/cadastro', function (req, res) {

       res.render('usuarios/cadastro');
    
});

//Cadastra o usuário
router.post('/cadastro', function (req, res, next) {
  
     let email = req.body.email;
   
    global.conn.request().query`select * from usuario where email = ${email}`
      .then(resultado => {
           
            let resposta = {msg: 2};

             if(resultado.recordset.length > 0)
                res.json(resposta);
             else
                next();

        }).catch(err => {
            // Se der algum erro imprime no console
            console.log(err);
        })
        }, (req, res)=> {
           
            
            let nome = req.body.nome;
            
            let email = req.body.email;

            //Criptografa a senha
            let senha = cryptr.encrypt(req.body.senha);

            global.conn.request().query`insert into usuario values(${nome}, ${email}, ${senha})`
                .then(() => {
                    res.json({msg: 1});

                }).catch((err) => {
                    console.log(err);

                })
            
        });

//deletar usuario
router.get('/delete/:id', function (req, res) {

    let id = req.params.id;

    global.conn.request().query`delete from usuario where idUsuario = ${id}`
        .then((result)=>{

            res.redirect('/users/');
        }).catch((err)=>{

            console.log(err);
        })
        
     });



module.exports = router;
