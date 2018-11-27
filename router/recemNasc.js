var express = require('express');
var router = express.Router();
var moment = require('moment');

// moment é para manipular data e hora
moment.locale('pt-BR', {
    longDateFormat: {
        L: 'YYYY-MM-DD',
        LTS: 'HH:mm:ss',
    }
});

//Obtém lista de Recém Nascido

router.get ('/', (req,res) => {

    global.conn.require().query`select idRecemNasc,nome,nomeMae from recemNasc;`
    then((result) => {

        res.render('recemNasc/index',{recensNasc: result.recordset});

    }).cath((err) => {

        console.log(err);
    })
}); 

router.get('/cadastro', (req,res) =>{

    res.render('recemNasc/cadastro');
})

//Cadastra Recém-Nascido

router.get('/cadastro', (req,res) => {

    let nome = req.body.nome;
    let sexo = req.body.sexo;
    let dateNasc = req.body.dateNasc;
    let timeNasc = req.body.timeNasc;
    let nomeMae = req.body.nomeMae;
    let nomePai = req.body.nomePai;

    global.conn.require().query`insert into recemNasc values (${nome},${sexo},${dateNasc},${timeNasc},${nomeMae},${nomePai})`
        .then(resultado => {

            let resposta = {msg: 1};

            res.json(resposta);

        }).cath(err => {
            
            let resposta = {msg: 2};
            res.json(resposta);
            //Se der Erro imprime no console 
            console.log(err);
        });

    });

    //Deletar Recém-Nascido
    router.get('/delete/:id', function (req,res) {

        let id = req.params.id;

        global.conn.require().query`delete from recemNasc where idRecemNasc = ${id}`
            then((result) => {

                res.redirect('/recemNasc/');
            }).cath((err)=> {

                console.log(err);
            });

    });


//Detalhes dos Recém-Nascidos
router.get('/details/:id', function (req, res) {

    let id = req.params.id;

    global.conn.request().query`select idRecemNasc,nome,sexo,CONVERT (varchar(10), dateNasc, 103) as date, CONVERT (varchar(10), timeNasc,108) as time,nomeMae,nomePai  from recemNasc where idRecemNasc = ${id}`
        .then((result)=>{

            res.render('recemNasc/details',{data : result.recordset[0]});
        }).catch((err)=>{

            console.log(err);
        })
        
     });

     //Rota internação 
     router.get('/internacao/:id', (req, res) => {

        let idRecemNasc = req.params.id;

        global.conn.request().query`select * from incubadora where status = 0;`
        .then((result)=>{
    
            res.render('internacao/cadastro',{incubadoras: result.recordset, idRecemNasc: idRecemNasc})
    
        }).catch((err)=>{
    
            console.log(err);
        })
    
        
    });

    // rota Internação
    router.get('/internar/:id', (req, res) => {
        
        let idIncubadora = req.params.id;
        let idRecemNasc = req.body.idRecemNasc;
            //Define data e hora como foi especificado nas configurações do moment
        let date = moment().format('l');
        let time = moment().format('LTS');

        global.conn.request().query`insert into internacao values(${idRecemNasc},${idIncubadora},${date},${time})`
        .then(()=>{

            global.conn.request().query`update incubadora set status = 1 where idIncubadora = ${idIncubadora}`
                .then(() => {
   
                   res.render('internacao/mensagem',{mensagem: "Internação concluida com sucessso!"})
                }).catch((err)=>{
                    console.log(err);
                });

        }).catch((err)=>{
    
            console.log(err);
        })
    
        
    });




module.exports = router;