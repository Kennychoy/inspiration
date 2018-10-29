var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/service', function(req, res, next) {
  res.render('service', {title: "Service - Inspiration"});
});

module.exports = router;
