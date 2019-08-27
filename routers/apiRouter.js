var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dogs', function(req, res, next) {
  res.render('index', { title: 'Asana Adopt' });
});

module.exports = router;
