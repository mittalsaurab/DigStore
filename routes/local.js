var express= require("express");
var User=require("../models/User");
var router=express.Router({mergeParams:true});
var fs = require("fs");
var multer = require("multer");
var Thing = require('../models/Thing');
var middleware = require('../middleware/index')

const upload = multer({dest: '/home/saurabh/Documents/Hackathon/DigStore/uploads/files'})

const author_id = "5cf7c6457051104dc20dd485"

router.get('/search',(req,res)=>{
	res.render('local/search');
})

router.post('/search',upload.single("file"),(req,res)=>{

	console.log(upload);

	if(req.file){
		//add code for api integration
		// var image_id = api_call();

		// Thing.findById(image_id,(err,foundImge)=>{
		// 		if(err){

		// 		}else{
		// 			res.render("local/show",{image_id:image_id,info:foundImge.info});
		// 		}
		// })

		res.json(req.file);
		// fs.unlink(req.filepath,err=>{
		// 	if(err){
		// 		console.log("Couldn't delete the file")
		// 	}else{
		// 		console.log("File deleted successfully");
		// 	}
		// })
	}else{
		console.log("No file uploaded");
	}

})

// POST API request to Python model for containing (image,userid) 
// it will return image_id with detail 
// that we will show to /local/things/id

router.get('/things',(req,res)=>{

	Thing.find({"author":{"id":author_id}},(err,foundThings)=>{
		if(err||foundThings.length == 0){
			console.log("Could not find the things attached with this user");
		}else{
			res.render("/local/profile",{things:foundThings});
		}
	})

	res.redirect('/');

})

router.get('/things/new',(req,res)=>{
		
	res.render("local/new");

})

router.get('/things/:thing_id',(req,res)=>{

		var foundUser = req.user; 
		var thing_id = req.params.thing_id;  

		var found = foundUser.things.includes(thing_id);
		
		if(found){
			res.render('local/show');
		}else{
			console.log("Error in finding this image ");
		}
			

})


router.post('/things',upload.single("file"),(req,res)=>{
	//Extract image from the req and add it to Thing model

	// console.log(req.body.info);

	var image_id = req.file.filename; 

	// console.log("Newly added image hash code " + image_id);

	var obj = { "image_id":image_id,"author":{"id":author_id}, textInfo : req.body.info} ;

	console.log(obj);

	Thing.create(obj,(err,new_thing)=>{
		if(err){
			console.log("Couldn't create the thing object" + err)
		}else{
			console.log("New thing created " + obj);
			res.redirect('/local/things');
		}
	})


})	

router.put('/things/:thing_id',(req,res)=>{
	//update the mongodb for this
	// redirect through ajax to /things
	var thing_id = req.params.thing_id;  

	Thing.findByIdAndUpdate(thing_id,req.params.thing,(updatedThing,err)=>{
		if(err){
			console.log(err);
		}else{

		}
	})

})

router.delete('/things/:thing_id',(req,res)=>{
	//delete 
	// redirect through ajax
})




router.get('/things/:thing_id/edit',(req,res)=>{	

	Thing.findById(thing_id,function(err,thing){
		if(err){
			console.log(err)
		}else{
			res.render("/local/edit",{thing:thing})
		}
	})
})
module.exports = router; 