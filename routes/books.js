var express = require('express');
var router = express.Router();
var db = require('../db/connections.js');

router.get('/', function(req, res, next) {
  db('books')
  .select('books.*', 'authors.first_name', 'authors.last_name', 'authors.id as aid')
  .innerJoin('book_author', 'books.id', 'book_author.book_id')
  .innerJoin('authors', 'book_author.author_id', 'authors.id')

  .then(results => {
    let reducedResults = []
    let authors = []
    results.forEach(el => {
      console.log("=============");
      console.log("el", el);
      console.log("=============");
      reducedResults.push({
        id: el.id,
        title: el.title,
        genre: el.genre,
        description: el.description,
        portrait_url: el.portrait_url
      })
      // if (1 === 1) {
      //   reducedResults[]
      // }
    })
    // console.log(results);
    // console.log(results.length);
    return results;
  })
  .then(results => {
    res.render('books/index', { title: 'Galvanize Reads', results});
  })
});

module.exports = router;
