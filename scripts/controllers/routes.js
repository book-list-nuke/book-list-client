'use strict';

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', ctx => app.bookView.initAddForm(ctx));
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
page('/books/update', ctx => app.bookView.initUpdateForm(ctx));
page('/books/:book_id/update', ctx => app.Book.fetchOne(ctx, app.bookView.initUpdateFormPage));

page();
