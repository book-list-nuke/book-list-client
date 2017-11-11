'use strict';

var app = app || {};
(function(module) {
  const bookView = {};

  //This resets the state of the page every time one of these init funtions is called.
  function reset() {
    $('.container').hide();
    $('#login').hide();
  }

  //This inititalizes the homepage.
  bookView.initIndexPage = function() {
    reset();
    $('.book-view').show();
    $('#book-list').empty();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
  }

  // Initializes and handles the form for adding a new book
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
      module.Book.createBook(book);
    })
  }

  //Form for updating a book. Should display current book info and create a new book from any changes made, passed to the updateBook function.
  bookView.initUpdateForm = function (ctx) {
    reset();
    $('.update-view').show();
    $('#updateTitle').val(ctx.title);
    $('#updateAuthor').val(ctx.author);
    $('#updateISBN').val(ctx.isbn);
    $('#updateImage_url').val(ctx.image_url);
    $('#updateDescription').val(ctx.description);
    $('#update-form').on('submit', function(event) {
      console.log('inside updateForm listener');
      event.preventDefault();
      let book = {
        book_id: ctx.book_id,
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      };
      module.Book.updateBook(ctx, book);
    })
  }

  //Initilizes and appends data for the detailed view of a single book. Makes the admin login menu item visible. Includes event handler for the book delete.
  bookView.initDetailPage = function (ctx) {
    reset();
    $('#login').show();
    $('.detail-view').show();
    $('#book-detail').empty();
    let template = Handlebars.compile($('#book-detail-template').text());
    $('#book-detail').append(template(ctx));
    $('#admin-controls').hide();
    $('#delete-book').on('click', () => {
      app.Book.deleteBook(ctx);
    });
  }

  module.bookView = bookView;
})(app)
