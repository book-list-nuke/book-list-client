'use strict';

var app = app || {};

(function(module) {
  const bookView = {};

  function reset() {
    $('.container').hide();
    $('.navigation').slideDown(350);
  }

  bookView.initIndexPage = function() {
    reset();
    $('.book-view').show();
    // $('#book-list').empty();
    app.Book.all.map(book => $('#book-list-template').append(book.toHtml()));
  }

  bookView.initAddForm = function() {
    reset();
    $('.add-view').show();
    $('#add-form').on('submit', function(event) {
      event.preventDefault();

      let book = {
        title: event.target.title.value,
        description: event.target.author.value,
        category: event.target.isbn.value,
        contact: event.target.image_url.value,
        status: event.target.description.value,
      };
      console.log('book', book);

      module.Book.createBook(book);
    })
  }

  module.bookView = bookView;
})(app)

$(function() {
  app.Book.fetchAll(app.bookView.initIndexPage);
})
