var express = require('express');
var router = express.Router();

/* GET add page. */
router.get('/', function(req, res, next) {
  res.render('2_add', { title: 'Add' });
});

module.exports = router;
