var express= require("express");
var User=require("../models/User");
var router=express.Router({mergeParams:true});
var Thing = require('../models/Thing');
var middleware = require('../middleware/index')


router.get('/search',(req,res)=>{
	res.render('local/search');
})

// POST API request to Python model for containing (image,userid) 
// it will return image_id with detail 
// that we will show to /local/things/id

router.get('/things',(req,res)=>{
	res.send('local/show');
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


router.post('/things',(req,res)=>{
	//Extract image from the req and add it to Thing model

	// redirect through ajax to /things

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

	res.render('/local/edit',{thing:thing});

})

async function loadThingsCollection(){
	
}

module.exports = router; 