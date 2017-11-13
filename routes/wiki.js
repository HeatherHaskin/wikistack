'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
  Page.findAll()
  .then(function(pages){
    res.render('index', {
      pages: pages,
    })
  })
});

router.post('/', function(req, res, next){
  User.findOrCreate({where: {name: req.body.author_name, email: req.body.author_email}})
  .then(function(userReturnArr){
    var user = userReturnArr[0];
    var page = Page.build({
        title: req.body.title,
        content: req.body.page_content,
        status: req.body.status,
      });

      return page.save().then(function (page) {
        return page.setAuthor(user);
      });
  })
  .then(function(savedPage){
    res.redirect(savedPage.route);
  })
  .catch(next);
});

router.get('/add', function(req, res, next){
  res.render('addpage')
});

router.get('/:pageName', function(req, res, next){
  Page.findOne({
    where: {
      urlTitle: req.params.pageName
    }
  })
  .then(function(foundPage){
    res.render('wikipage', {
      page: foundPage,
      title: foundPage.title,
      content: foundPage.content
    });
  })
  .catch(next);
})

module.exports = {
  router: router
}
