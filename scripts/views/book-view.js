'use strict';

var app = app || {};
(function(module) {
  const bookView = {};

  //This resets the state of the page every time one of these init funtions is
  function reset() {
    $('.container').hide();
    // $('.navigation').slideDown(350);
  }

  //I have commented out the reset only so I can be sure things are or are not displaying -- we will need to comment it back in later.
  bookView.initIndexPage = function() {
    console.log('in initindex')
    reset();
    $('.book-view').show();
    $('#book-list').empty();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
  }

  // This function SHOULD be triggered through the page.js routing for /add, making the form visible and passing the form's data to a new Book object. That Book object is then passed to a createBook method on books.js. Clicking the relevant menu item DOES show the form correctly, but it's currently disabled until you comment all of the reset functions back in.
  bookView.initAddForm = function() {
    reset();
    $('.add-view').show();
    $('#add-form').on('submit', function(event) {
      event.preventDefault();
      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      };
      console.log('book', book);
      module.Book.createBook(book);
    })
  }

  bookView.initDetailPage = function (ctx) {
    console.log('insite initdetailpage');
    reset();
    $('.detail-view').show();
    $('#book-detail').empty();
    let template = Handlebars.compile($('#book-detail-template').text());
    $('#book-detail').append(template(ctx));
  }

  module.bookView = bookView;
})(app)
