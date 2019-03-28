var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect(`mongodb://{process.env.DB_NAME}:{process.env.DB_PWD}@ds121593.mlab.com:21593/inspiration`, { useNewUrlParser: true });
var NewsModel = require("../models/newsmodel");

router.get("/", (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash("danger", "Plz login to add news");
        res.redirect("/login");
      }
    NewsModel.find({}, (err, result) => {
        if(err){throw err};
        res.render("news_list", {title: "News List", result: result})
    });
});

module.exports = router;
