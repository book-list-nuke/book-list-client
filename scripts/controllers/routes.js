'use strict';

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', ctx => app.bookView.initAddForm(ctx));
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
page('/books/delete/:book_id', ctx => app.Book.deleteBook(ctx));
page('/books/update', ctx => app.bookView.initUpdateForm(ctx));
page('/books/update/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initUpdateForm));

page();
