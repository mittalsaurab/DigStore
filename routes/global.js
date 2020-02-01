var express= require("express");
var User=require("../models/User");
var fs = require("fs");
var router=express.Router({mergeParams:true});
var Thing = require('../models/Thing');
var middleware = require('../middleware/index')
var multer = require("multer")

const upload = multer({dest: 'home/saurabh/Documents/Hackathon/DigStore/uploads/files'})
const author_id = "123456"

router.get('/search',(req,res)=>{
	res.render('global/search');
})

router.post('/search',upload.single("file"),(req,res)=>{
	if(req.file){
		//add code for api integration
		var image_id = api_call();

		// Thing.findById(image_id,(err,foundImge)=>{
		// 		if(err){

		// 		}else{
		// 			res.render("global/show",{image_id:image_id,info:foundImge.info});
		// 		}
		// })

		res.json(req.file);
		fs.unlink(req.filepath,err=>{
			if(err){
				console.log("Couldn't delete the file")
			}else{
				console.log("File deleted successfully");
			}
		})
	}else{
		console.log("No file uploaded");
	}
})

// POST API request to Python model for containing (image,location) 
// it will return images with detail 

// that we will show to /global/things/id

module.exports = router; 