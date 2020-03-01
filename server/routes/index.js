var express = require('express');
var router = express.Router();
var todoRouter = require('./todos')

/* GET home page. */

router.use('/todoLists', todoRouter);
router.use('/', function(req, res, next) {
  res.send('Hello Denis!!!');
});

module.exports = router;
