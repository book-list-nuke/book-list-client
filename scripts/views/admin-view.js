'use strict';
var app = app || {};
var __API_URL__ = 'http://localhost:3000';

(function(module) {
  const adminView = {};

  //Initializes the admin view. Hides the password form and shows the update/delete links once the correct password is entered.
  adminView.initAdminPage = function() {
    $('.admin-view').show();
    $('#admin-form').off('submit');
    $('#admin-form').on('submit', function(event) {
      event.preventDefault();
      let token = event.target.passcode.value;
      $.get(`${__API_URL__}/api/v1/admin`, {token})
        .then(res => {
          localStorage.setItem('token', res);
          $('.admin-view').hide();
          $('#admin-controls').show();
        })
        .catch(() => page('/'));
    })
    adminView.verify();
  }
  //Verifies the presense of a token.
  adminView.verify = function() {
    if(!localStorage.token) {
      console.log('No token.')
    } else {
      console.log('Token found.')
    }
  }
  module.adminView = adminView;
})(app)
