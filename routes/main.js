const express = require('express')
const router = express.Router()
const { products, skills } = require('../data.json')
const nodemailer = require('nodemailer')
var flash = require('connect-flash');
const config = require('../config.json')

var app = express();
app.use(flash());

router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Main page', products, skills })
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функционал отправки письма.
  if (!req.body.name || !req.body.email || !req.body.message) {
    res.flash('msgemail', 'Необходимо заполнить все поля!');
  }
  const transporter = nodemailer.createTransport(config.mail.smtp)
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text: req.body.message.trim().slice(0, 500) +
      `\n Отправлено с: <${req.body.email}>`
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.flash('msgemail', 'При отправке письма произошла ошибка!');
    }
    res.flash('msgemail', 'Письмо успешно отправлено!');
  })
})

module.exports = router
