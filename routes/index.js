var express= require("express");
var passport=require("passport");
var User=require("../models/User");
var router=express.Router({mergeParams:true});
var Thing = require('../models/Thing');


router.get('/',function(req,res){
	res.render('home')
})

router.get('/register',function(req,res){
	res.render("register");
})


router.post('/register',function(req,res){

	console.log(req.body.newUser);

	var obj1={username:req.body.username};
	
	var obj2=req.body.newUser;

	let merged = {...obj1, ...obj2};

	var newUser=new User(merged);
	
	// eval(require('locus'));

	User.register(newUser,req.body.password,function(err,user){
		
		if(err){
			console.log("User registration error" + err);
			res.redirect('/register');
		}else{

			passport.authenticate("local")(req,res,function(){				
			
				// req.flash("success","Welcome to YelpCamp "+req.user.username);
				
				res.redirect('/');
			})
		}
	})
})

router.get('/login',function(req,res){
	res.render("login");
})

router.post('/login',passport.authenticate("local",{
	successRedirect:"/",
	failureRedirect:"/login",
}),function(req,res){
	alert("Use of passed function in index.js post route");
});


router.get('/logout',function(req,res){
	req.logout();
	// req.flash("success","Successfully Logged Out ..");
	res.redirect('/');
})


// Profile part

router.get('/local/:id',function(req,res){

	User.findById(req.params.id,function(err,foundUser){
		if(err){
			console.log(err);
			res.redirect("back");
		}
			
		Thing.find().where('author.id').equals(foundUser._id).exec(function(err,camps){
			if(err){
				console.log("Error during fetching images for this user" + err);
			}

			res.render("users/show",{user:foundUser,thing:things});

		})
	
	})
})


module.exports=router;