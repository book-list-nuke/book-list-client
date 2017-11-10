'use strict';
var app = app || {};
var __API_URL__ = 'http://localhost:3000';

(function(module) {

  const adminView = {};

  adminView.initAdminPage = function () {
    $('#admin-form').on('submit', function (event) {
      event.preventDefault();
      let token = event.target.password.value;
      $.get(`${__API_URL__}/admin`, {token})
        .then(() => {
          localStorage.token = true;
          $('#admin-login').hide();
          $('#admin-controls').show();
        })
        .catch (()=> page('/'));
    })

  }

  adminView.verify = function () {
    if(!localStorage.token) console.log('You have no token!')
    else console.log('token');
    next();
  }

  module.adminView = adminView;
})(app)
