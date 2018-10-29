var express = require('express');
var router = express.Router();
var NewsModel = require("../models/newsmodel");

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

/* GET blog page. */
router.get('/', function(req, res, next) {
  var queryString;
  if(!isEmpty(req.query) && req.query.category){
    var cats = /html|css|javascript|php|python/;
    var validCat = cats.test(req.query.category.toLowerCase());
    validCat ? queryString = {category : req.query.category.toUpperCase()} : queryString = {};
  }

  let blogsPerPage = 5;
  let page;
  !req.query.page ? page = 1 : page = req.query.page;

  NewsModel.find(queryString, (err, result) => {
    if (err) throw err;
    let noOfPages = Math.ceil(result.length / 5); // for pagination
    result = result.reverse();
    result = result.slice(blogsPerPage * (page-1), blogsPerPage * page);
    // count how many blogs for pagination
    req.query.category ? req.session.category = req.query.category : req.session.category = null;
    console.log("req.session.query: " + req.session.category);
    let outputCat = ()=>{
      if(req.session.category){
        return "&category=" + req.session.category;
      } else {
        return "";
      }
    }
    let previousPage = () => {
      if(!req.query.page || req.query.page == 1){
        return "?page=1";
      } else {
        return "?page=" + (req.query.page - 1);
      }
    }
    let nextPage = () => {
      if(!req.query.page){
        return "?page=2";
      }
      if(req.query.page == noOfPages){
        return "?page=" + noOfPages;
      }
      return "?page=" + (Number(req.query.page) + 1);
    }
    res.render('blog', { 
      title: 'Blog - Inspiration', 
      blogs: result, 
      noOfPages: noOfPages, 
      cat: outputCat(), 
      previousPage : previousPage(),
      nextPage : nextPage()
    });
  });
});

module.exports = router;
