var express = require('express');
var router = express.Router();
var moment = require('moment');
moment.updateLocale('pt-BR', {
    longDateFormat: {
        L: 'YYYY-MM-DD',
        LTS: 'HH:mm:ss',
    }
});


router.get('/:id', (req, res) => {
    let idRecemNasc = req.params.id;

    global.conn.request().query`select * from incubadora where status = 0;`
        .then((result) => {

            res.render('internacao/cadastro', { incubadoras: result.recordset, idRecemNasc: idRecemNasc })

        }).catch((err) => {

            console.log(err);
        })


});

router.post('/cadastro/:id', (req, res) => {

    let idIncubadora = req.params.id;
    let idRecemNasc = req.body.idRecemNasc;
    let date = moment().format('l');
    let time = moment().format('LTS');

    global.conn.request().query`insert into internacao values(${idRecemNasc},${idIncubadora},${date},${time})`
        .then(() => {

            global.conn.request().query`update incubadora set status = 1 where idIncubadora = ${idIncubadora}`
                .then(() => {

                    res.redirect('/incubadoras?success=true')
                }).catch((err) => {
                    console.log(err);
                });

        }).catch((err) => {

            console.log(err);
        })


});

router.get('/alta/:id', (req, res) => {

    let idIncubadora = req.params.id;


    global.conn.request().query`delete from internacao where fkIncubadora = ${idIncubadora}`
        .then(() => {

            global.conn.request().query`update incubadora set status = 0 where idIncubadora = ${idIncubadora}`
                .then(() => {

                    res.redirect('/incubadoras');
                }).catch((err) => {
                    console.log(err);
                });

        }).catch((err) => {

            console.log(err);
        })


});

module.exports = router;