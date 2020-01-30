var express= require("express");
var User=require("../models/User");
var router=express.Router({mergeParams:true});
var Thing = require('../models/Thing');
var middleware = require('../middleware/index')

router.get('/search',(req,res)=>{
	res.render('global/search');
})

// POST API request to Python model for containing (image,location) 
// it will return images with detail 

// that we will show to /global/things/id
export 