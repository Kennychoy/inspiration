var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET Logout Route */
router.get('/', function(req, res, next) {
    req.logout();
    res.redirect("/");
});

router.post("/", (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true }
  )(req, res, next)
});

module.exports = router;
