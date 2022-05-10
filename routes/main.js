const express = require('express')
const router = express.Router()
const { products, skills } = require('../data.json')
const nodemailer = require('nodemailer')
const config = require('../config.json')

router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Main page', products, skills, msgemail: req.flash('mail')[0] })
})

router.post('/', (req, res, next) => {
  // TODO: Реализовать функционал отправки письма.
  if (!req.body.name || !req.body.email || !req.body.message) {
    req.flash('mail', 'Необходимо заполнить все поля!');
    return res.redirect('/#mail')
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
      req.flash('mail', 'При отправке письма произошла ошибка!');
    }
    req.flash('msgemail', 'Письмо успешно отправлено!');
  })
})

module.exports = router;