'use strict';
var express = require('express');
var router = express.Router();
var userRouter = require('./user');
var wikiRouter = require('./wiki')

router.use('/wiki', wikiRouter.router);
router.use('/user', userRouter.router);


module.exports = {
  router: router
}

