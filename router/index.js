var express = require('express');
var router = express.Router();
var passport = require('passport');
var ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;


/* GET users listing. */
router.get('/',ensureLoggedOut('/users'), function (req, res, next) {
  res.render('login', { message: null });
});


router.get('/login',ensureLoggedOut('/users'), function (req, res) {
  if (req.query.fail)
    res.render('login', { message: 'Usuário e/ou senha incorretos!' });
  else
    res.render('login', { message: null });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/incubadoras');
  });

  


module.exports = router;
