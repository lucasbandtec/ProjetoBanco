var express = require('express');
var router = express.Router();

router.post('/cadastro/:id', (req, res) => {
    let idRecemNasc = req.params.id
    global.conn.request().query`select * from incubadora where status = 0;`
    .then((result)=>{

        res.render('internacao/cadastro',{incubadoras: result.recordset, idRecemNasc: idRecemNasc})

    }).catch((err)=>{

        console.log(err);
    })

    
});



module.exports = router;