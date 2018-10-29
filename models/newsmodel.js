var express = require('express');
var mongoose = require("mongoose");

mongoose.connect("mongodb://inspiration:inspiration999@ds121593.mlab.com:21593/inspiration", { useNewUrlParser: true });

var newsSchema = new mongoose.Schema({
	title: String,
	content: String,
	imgpath: String,
	author: String,
	category: String,
	date: String
});

var NewsModel = mongoose.model("NewsModel", newsSchema);

module.exports = NewsModel;