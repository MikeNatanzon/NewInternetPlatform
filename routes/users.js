const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

//Registration route
router.post('/signup', (req,res,next) => {
	let newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		password_retype: req.body.password
	});

	User.addUser(newUser, (err, user) =>{
		if(err){
			console.log(err);
			if(err.name == 'MongoError' && err.code == 11000)
			{
				return res.status(500).json({success:false, msg: 'Email already in use'});
			}
			return res.status(500).json({success:false,msg: 'Failed to register user'});
		}else
		{
			return res.status(200).json({success: true, msg:'Registration successful'})
		}
	});
});


//Authentication route
router.post('/login', (req,res,next) => {
	const email = req.body.email;
	const password = req.body.password;

	User.getUserByEmail(email, (err, user) => {
		if(err) throw err;
		if(!user){
			return res.status(400).json({success: false, msg: 'User not found'});
		}
		User.comparePassword(password, user.password, (err, isMatch) => {
			if(err) throw err;
			if(isMatch){
				const token = jwt.sign({user},config.secret,{expiresIn:6048000});

				return res.status(200).json({
					success: true,
					token: 'JWT ' + token,
					user: {
						id: user._id,
						firstName: user.firstName,
						lastName: user.lastName,
						username: user.username,
						email: user.email,
						password: user.password,
						password_retype: user.password_retype
					}
				});
			}else
			{
				return res.status(400).json({success: false, msg: 'Wrong password'});
			}
		});
	});
});


//Profile route
router.get('/profile',passport.authenticate('jwt',{session: false}),(req,res,next) => {
	res.json({user: req.user});
});


module.exports = router;