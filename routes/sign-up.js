var express = require('express');
var router = express.Router();
var UserModel = require("../models/usermodel");
var bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");
var dotenv = require("dotenv").config();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('sign-up', { 
		title: 'Sign-up | Inspiration', 
		success: false,
		errors: req.session.errors
	});
	req.session.errors = null;
});

router.post('/', function(req, res, next) {

	UserModel.find({email: req.body.email}, (err, result) => {
		if(result.length !== 0){
			req.flash("danger", "Existing email in database");
			res.redirect("/sign-up");
		} else {
			req.check("email", "Invalid email").isEmail();
			req.check("password", "Password should be at least 6 characters").isLength({min: 6});
			req.check("password").equals(req.body.confirmpassword).withMessage("Password doesn't match");
			var errors = req.validationErrors();
			if(errors){
				req.session.errors = errors;
				console.log("err: " + req.session.errors);
				res.render('sign-up', { 
					title: 'Sign Up | Inspiration',
					success: false,
					errors: errors
					});
			}

			var newUser = new UserModel({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if(err){throw err};
					newUser.password = hash;
					newUser.save((err, result) => {
						if(err){ throw err};
						
						// sending a confirmation email to the new user
						let transporter = nodemailer.createTransport({
							host: 'smtp.live.com',
							port: 587,
							secure: false, // true for 465, false for other ports
							auth: {
								user: "lfchoy@live.com", // generated ethereal user
								pass: process.env.EMAILPWD // generated ethereal password
							},
							tls: {
								rejectUnauthorized: false
							}
						});
		
						let mailOptions = {
							from: '"Inspiration" <lfchoy@live.com>', // sender address
							to: newUser.email, // list of receivers
							subject: 'Hello from INSIRATION', // Subject line
							text: 'Thanks for registering on INSPIRATION', // plain text body
							html: 'Dear '+ newUser.username +',<br><b>Thanks for registering on INSPIRATION</b>' // html body
						};
					
						// send mail with defined transport object
						transporter.sendMail(mailOptions, (error, info) => {
							if (error) {
								return console.log(error);
							}
							console.log('Message sent: %s', info.messageId);
							// Preview only available when sending through an Ethereal account
							console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
							res.redirect("/");
							// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
							// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
						});
		
					});
				});
			}); // end of bcrypt.genSalt()

		}
	});
});

module.exports = router;
