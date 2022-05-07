const express = require('express');
const router = express.Router()
const db = require('../db')


router.get('/', (req, res, next) => {
  res.render('pages/login', { title: 'SigIn page' })
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функцию входа в админ панель по email и паролю
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
   console.log(db.getState().users);
  res.send('Реализовать функцию входа по email и паролю')
})

module.exports = router
