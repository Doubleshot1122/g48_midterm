var express = require('express');
var router = express.Router();
var db = require('../db/connections.js');

router.get('/', (req, res, next) => {
  db('books')
  .then(results => {
    res.render('books/index', { title: 'Galvanize Reads', results});
  })
});

router.get('/:index/edit', (req, res, next) => {
  db('books').where('id', req.params.index).first()
  .then(result => {
      res.render('books/edit', { title: 'Galvanize Reads', subTitle: 'Edit book', result});
  })
});

router.get('/new', (req, res, next) => {
  res.render('books/new', { title: 'Galvanize Reads', subTitle: 'Add a new book'});
})

module.exports = router;
