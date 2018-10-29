var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://inspiration:inspiration999@ds121593.mlab.com:21593/inspiration", { useNewUrlParser: true });
var NewsModel = require("../models/newsmodel");
var multer = require("multer");
var path = require("path");

router.get("/:id", (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash("danger", "Plz login to add news");
        res.redirect("/login");
      };
    NewsModel.find({_id: req.params.id}, (err, result) => {
        if (err) throw err;
        res.render("news_edit", {
            title: "Edit News", 
            id: req.params.id,
            headline: result[0].title,
            content: result[0].content,
            img: result[0].imgpath,
            category: result[0].category
        });
    });
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

router.post("/", (req, res, next) => {
    upload(req, res, (err) => {
        if(err){throw err};

        NewsModel.find({_id: req.body.id}, (err, result) => {
            let originalImg = result[0].imgpath;
            
            let img = req.file == undefined ? originalImg : "/uploads/" + req.file.filename;
            console.log("req.file ", req.file);
            console.log("img: " + img);
            let newsObj = {
                title: req.body.title,
                content: req.body.content,
                imgpath: img,
                category: req.body.category
            };
            NewsModel.findByIdAndUpdate(req.body.id, {$set: newsObj}, {new: true}, (err, doc) => {
                if(err){ throw err};
                req.flash("success", "News updated");
                res.redirect("/news_list");
            });
        });
    });
});

module.exports = router;