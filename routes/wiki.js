'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
  res.redirect('/')
});

router.post('/', function(req, res, next){
  var page = Page.build({
    title: req.body.title,
    content: req.body.page_content,
    status: req.body.status,
  });
  var user = User.build({
    name: req.body.author_name,
    email: req.body.author_email,
  })
  page.save()
  .then(function(result){
    return user.save();
  })
  .then(function(result){
    res.json(page);
  })
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
