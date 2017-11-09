'use strict';

var app = app || {};
// var __API_URL__ = 'https://ng-kc-booklist.herokuapp.com';
var __API_URL__ = 'http://localhost:3000';

(function(module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(bookObject) {
    Object.keys(bookObject).forEach(key => this[key] = bookObject[key]);
  }

  //This is the function to render all of the books via the template at the top of index.html
  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-template').text());
    return template(this);
  }

  Book.all = [];

  Book.loadAll = rows => {
    Book.all = rows.map(book => new Book(book));
  }

  Book.fetchAll = callback =>
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

  Book.fetchOne = (ctx, callback) => {
    console.log(ctx);
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.book_id}`)
      .then(results => ctx.book = results[0])
      .then(callback)
      .catch(errorCallback);
  }

  //This receives the book object from the function on book-view.js.
  Book.createBook = book =>
    $.post(`${__API_URL__}/api/v1/books`, book)
      .then(() => page('/'))
      .catch(errorCallback);

  module.Book = Book;
})(app)
