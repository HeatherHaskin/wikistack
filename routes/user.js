'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
  User.findAll()
  .then(function(users){
    res.render('users', {
      users: users,
    })
  })
})

router.get('/users/:id', function(req, res, next){

})

module.exports = {
  router: router
}
