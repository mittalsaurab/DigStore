var express= require("express");
var User=require("../models/User");
var router=express.Router({mergeParams:true});
var Thing = require('../models/Thing');
var mongodb = require("mongodb");

router.get('/',function(req,res){
	res.render('home')
})

router.get('/register',function(req,res){
	res.render("user/register");
})

router.post('/register',async function(req,res){

	const users = await loadUsersCollection()
	await users.insertOne({
		username: req.body.username,
		password: req.body.password,
		things: []
	})
	res.status(201).send("Done.")
})

router.get('/login',function(req,res){
	res.render("user/login");
})

router.post('/login',async function(req,res){
});


router.get('/logout',function(req,res){
	req.logout();
	// req.flash("success","Successfully Logged Out ..");
	res.redirect('/');
})


// Profile part

router.get('/local/:id',async function(req,res){
	
	User.findById(req.params.id,function(err,foundUser){
		if(err){
			console.log(err);
			res.redirect("back");
		}
			
		Thing.find().where('author.id').equals(foundUser._id).exec(function(err,camps){
			if(err){
				console.log("Error during fetching images for this user" + err);
			}

			res.render("user/show",{user:foundUser,thing:things});

		})
	
	})
})

module.exports = router;