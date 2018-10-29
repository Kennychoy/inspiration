var express = require('express');
var router = express.Router();
var usermodel = require("../models/usermodel");

/* GET users listing. */
router.get('/', function(req, res, next) {
    usermodel.findOne({_id: req.user._id}, (err, result) => {
        if(err) throw err;
        res.render('showuser', {
            title: "Show User - Inspiration",
            user: result.email
          });
    });
});

module.exports = router;
