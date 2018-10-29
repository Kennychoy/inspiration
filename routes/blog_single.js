var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var NewsModel = require("../models/newsmodel");


/* GET Blog Single page. */
router.get('/:newsid', function(req, res, next) {
	var newsid = req.params.newsid;
	/*NewsModel.find({"_id": newsid}, (err, data) => {
		if(err) throw err;
		res.render("blog_single", {
			title: data[0].title, 
			data: data[0]
		});
	});*/
	NewsModel.findById(newsid, (err, data) => {
		if (err) throw err;
		res.render("blog_single", {
			title: data.title.toUpperCase(),
			data: data
		});
	});
	
});

module.exports = router;
