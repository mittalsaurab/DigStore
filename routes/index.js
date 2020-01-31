var express= require("express");
var passport=require("passport");
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

	console.log(req.body.newUser);

	var obj1={username:req.body.username};
	
	var obj2=req.body.newUser;

	let merged = {...obj1, ...obj2};

	var newUser=new User(merged);

	User.register(newUser,req.body.password,function(err,user){
		
		if(err){
			console.log("User registration error" + err);
			res.redirect('/register');
		}else{

			passport.authenticate("local")(req,res,function(){				
				
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
}),async function(req,res){
	console.log("Use of passed function in index.js post route");
});


router.get('/logout',function(req,res){
	req.logout();
	// req.flash("success","Successfully Logged Out ..");
	res.redirect('/');
})


// Profile part

router.get('/local/:id',async function(req,res){

	const users = await loadUsersCollection()
	res.send(users.find({}).toArray())
	
	// User.findById(req.params.id,function(err,foundUser){
	// 	if(err){
	// 		console.log(err);
	// 		res.redirect("back");
	// 	}
			
	// 	Thing.find().where('author.id').equals(foundUser._id).exec(function(err,camps){
	// 		if(err){
	// 			console.log("Error during fetching images for this user" + err);
	// 		}

	// 		res.render("user/show",{user:foundUser,thing:things});

	// 	})
	
	// })
})

async function loadUsersCollection(){
	const uri = "mongodb://Hemant:hmantv_83@cluster1-shard-00-00-t0nnl.mongodb.net:27017,cluster1-shard-00-01-t0nnl.mongodb.net:27017,cluster1-shard-00-02-t0nnl.mongodb.net:27017/test?ssl=true&replicaSet=Cluster1-shard-0&authSource=admin&retryWrites=true&w=majority"
	const client = await mongodb.MongoClient.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
	return client.db('digstore').collection('user')
}

module.exports = router;