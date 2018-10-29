var express = require('express');
var mongoose = require("mongoose");

mongoose.connect("mongodb://inspiration:inspiration999@ds121593.mlab.com:21593/inspiration", { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
	username: {type: String, require: true},
	email: {type: String, require: true},
	password: {type: String, require: true}
});

var UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;