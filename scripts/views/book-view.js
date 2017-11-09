'use strict';

var app = app || {};

(function(module) {
  const bookView = {};

  //This resets the state of the page every time one of these init funtions is called.
  // function reset() {
  //   $('.container').hide();
  //   $('.navigation').slideDown(350);
  // }

  //I have commented out the reset only so I can be sure things are or are not displaying -- we will need to comment it back in later.
  bookView.initIndexPage = function() {
    // reset();
    // $('.book-view').show();
    // $('#book-list').show();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
  }

  // This function SHOULD be triggered through the page.js routing for /add, making the form visible and passing the form's data to a new Book object. That Book object is then passed to a createBook method on books.js.
  bookView.initAddForm = function() {
    // reset();
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
