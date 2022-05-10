const express = require('express');
const router = express.Router()
const db = require('../db')


router.get('/', (req, res, next) => {
  if (req.session.isAdmin) {
    res.redirect('/admin');
  }
  res.render('pages/login', { title: 'SigIn page',msglogin: req.flash('msglogin') })
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функцию входа в админ панель по email и паролю
  const email = req.body.email;
  const password = req.body.password;
  const userPass = db.get('users[0]._password').value()
  const userEmail = db.get('users[0]._email').value()

  if (userEmail === email && userPass === password) {
    req.session.isAdmin = true;
    res.redirect('/admin');
  }
  else {
    req.flash('msglogin', 'Неправильный логин или пароль');
    res.redirect('/login');
  }

})

module.exports = router
