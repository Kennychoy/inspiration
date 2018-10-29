var express = require('express');
var router = express.Router();
var path = require("path");
var multer = require("multer");
var mongoose = require("mongoose");
var session = require("express-session");

mongoose.connect("mongodb://inspiration:inspiration999@ds121593.mlab.com:21593/inspiration", { useNewUrlParser: true });

var NewsModel = require("../models/newsmodel");

/* GET add_news page. */
router.get('/', function(req, res, next) {
  if(!req.isAuthenticated()){
    req.flash("danger", "Plz login to add news");
    res.redirect("/login");
  }
  console.log(req.user);
  res.render('add_news', { title: 'Add News - Inspiration' });
});

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  	cb(null, "./public/uploads/")
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname);
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
  	checkFileType(file, cb);
  }
}).single("news_img");

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|bmp|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb("Images only");
  }
}

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('add_news', {
        msg: err,
        title: "Add News"
      });
    } else {
      if(req.file == undefined){
        res.render('add_news', {
          msg: 'Error: No File Selected!',
          title: "Add News"
        });
      } else {
		console.log(req.file);
		var d = new Date();
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var addNews = NewsModel({
			title: req.body.title,
			content: req.body.content,
			imgpath: "/uploads/" + req.file.filenamez,
			author: req.user.username,
			category: req.body.category,
			date: months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
		}).save( (err, result) => {
			if(err){throw err};
			req.session.newsid = result._id;
			req.flash("success", "news added");
			res.redirect("./blog_single/"+result._id);
		});
      }
    }
  });
});

module.exports = router;
