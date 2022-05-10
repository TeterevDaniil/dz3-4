const express = require('express')
const db = require('../db')
const router = express.Router()
const form = require ('formidable')
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')

router.get('/', (req, res, next) => {
     
  if (!req.session.isAdmin) {
    res.redirect('/login');
  }
 // TODO: Реализовать, подстановку в поля ввода формы 'Счетчики'
  // актуальных значений из сохраненых (по желанию)
 // res.render('pages/index', { title: 'Main page', products, skills, msgemail: req.flash('mail')[0] })
  res.render('pages/admin', { title: 'Admin page', msgskill: req.flash('msgskill')[0],msgfile: req.flash('msgfile')})
})

router.post('/skills', (req, res, next) => {
  /*
  TODO: Реализовать сохранение нового объекта со значениями блока скиллов

    в переменной age - Возраст начала занятий на скрипке
    в переменной concerts - Концертов отыграл
    в переменной cities - Максимальное число городов в туре
    в переменной years - Лет на сцене в качестве скрипача
  */
   const {age, concerts, cities, years} = req.body;
   db.set('skills[0]', {number: age, text:'Возраст начала занятий на скрипке'}).write();
   db.set('skills[1]', {number: concerts, text:'Концертов отыграл'}).write();
   db.set('skills[2]', {number: cities, text:'Максимальное число городов в туре'}).write();
   db.set('skills[3]', {number: years, text:'Лет на сцене в качестве скрипача'}).write();
 //  req.flash('status', 'Данные обновленны');
  // res.redirect('/admin');
   req.flash('msgskill', 'Данные обновленны');
   return res.redirect('/admin')
})

router.post('/upload', (req, res, next) => {
  /* TODO:
   Реализовать сохранения объекта товара на стороне сервера с картинкой товара и описанием
    в переменной photo - Картинка товара
    в переменной name - Название товара
    в переменной price - Цена товара
    На текущий момент эта информация хранится в файле data.json  в массиве products
  */
    const form = new formidable.IncomingForm();
    const uploadDir = path.join(__dirname,'../public/assets/img/products');
    
      form.parse(req, (err, fields, files) => {
        if (err) {
         req.flash('msgfile',err);
         res.redirect('/admin');
        }

     
        const {name, price} = fields;
        const {originalFilename, size} = files.photo;
        const fileName = path.join(uploadDir,files.photo.originalFilename);
     
        const dirPhoto = path.join('./assets/img/products/',files.photo.originalFilename);
        console.log(dirPhoto);

          fs.renameSync(files.photo.filepath, fileName);
          db.defaults({products:[]})
          .get('products')
          .push({src: dirPhoto, name: name, price: Number(price) })
          .write();   
          req.flash('msgfile',"Данные успешно добавленны");
          res.redirect('/admin');

      });
 
})

module.exports = router
