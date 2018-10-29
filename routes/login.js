var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET Login Route */
router.get('/', function(req, res, next) {
  res.render('login', {title: "Login - Inspiration"});
});

router.post("/", (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true }
  )(req, res, next)
});

module.exports = router;
