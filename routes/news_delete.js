var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://inspiration:inspiration999@ds121593.mlab.com:21593/inspiration", { useNewUrlParser: true });
var NewsModel = require("../models/newsmodel");

router.get("/:id", (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash("danger", "Plz login to add news");
        res.redirect("/login");
      }
      NewsModel.findByIdAndRemove(req.params.id, (err, result) => {
          if(err){throw err};
          req.flash("danger", "News removed");
          res.redirect("/news_list");
      })
});

module.exports = router;