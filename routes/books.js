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

router.put('/:index', (req, res, next) => {
  let id = req.params.index;
  let book = {
    genre: req.body.genre,
    description: req.body.description,
    portait_URL: req.body.portait_URL
  }
  db('books').update(book, '*').where({id})
  .then(updatedBook => {
    res.redirect('/books')
  })
})

router.get('/:index', (req, res, next) => {
  db('books').where('id', req.params.index).first()
  .then(result => {
      res.render('books/show', { title: 'Galvanize Reads', result});
  })
});

router.delete('/:index', (req, res, next)=> {
  let id = req.params.index;
  db('books').del().where({id})
  .then(() => {
    res.redirect('/books')
  })
})

module.exports = router;
