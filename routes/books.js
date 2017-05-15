var express = require('express');
var router = express.Router();
var db = require('../db/connections.js');

router.get('/', (req, res, next) => {
  let books = db('books')
  let authors = db('books').select('books.id', 'authors.id as aid',  'authors.first_name', 'authors.last_name')
  .innerJoin('book_author', 'book_author.book_id', 'books.id')
  .innerJoin('authors', 'book_author.author_id', 'authors.id')
  Promise.all([books, authors])
  .then(results => {
    let books = results[0];
    let authors = results[1].map(el => {
      let results = {}
      results.id = el.id;
      results.aid = el.aid;
      results.name = `${el.first_name} ${el.last_name}`;
      return results
      }
    )

    books.forEach(el => {el.authors = []});

    books.forEach(book => {
      authors.forEach(auth => {
        if(book.id === auth.id){
          book.authors.push(auth)
        }
      })
    });

    return books;
  })
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

router.post('/', (req, res, next) => {
  let book = {
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    portait_URL: req.body.portait_URL
  }

  if(!book.title || !book.genre || !book.description || !book.portait_URL){
    res.render('books/new', {error: 'all fields are required', title: 'Galvanize Reads', subTitle: 'Add a new book'})
  }

  db('books').insert(book, '*')
  .then(results => {
    var id = results[0].id;
    res.redirect(`books/${id}`)
  })

})

router.delete('/:index', (req, res, next)=> {
  let id = req.params.index;
  db('books').del().where({id})
  .then(() => {
    res.redirect('/books')
  })
})

module.exports = router;
