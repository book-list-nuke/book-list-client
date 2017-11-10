'use strict';

var app = app || {};
(function(module) {
  const bookView = {};

  //This resets the state of the page every time one of these init funtions is
  function reset() {
    console.log('inside reset');
    $('.container').hide();
  }

  bookView.initIndexPage = function() {
    console.log('in initindex')
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
    console.log('inside initUpdateForm');
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
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      };
      module.Book.updateBook(book);
    })
  }

  //Initilizes and appends data for the detailed view of a single book
  bookView.initDetailPage = function (ctx) {
    reset();
    $('.detail-view').show();
    $('#book-detail').empty();
    let template = Handlebars.compile($('#book-detail-template').text());
    $('#book-detail').append(template(ctx));
    $('#delete-book').on('click', () => {
      app.Book.deleteBook(ctx);
    });
  }

  module.bookView = bookView;
})(app)
