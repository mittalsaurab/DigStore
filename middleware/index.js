var User=require("../models/User");
var Thing=require("../models/Thing");

var middleware={}

middleware.foundUser = function(req,res,next){
	 var user_id = req.params.user_id; 
	 User.findById(user_id,(foundUser,err)=>{
	 	if(err){
	 		console.log("Could not find the user");
	 		res.redirect("back");
	 	}else{
	 		return next();
	 	}
	 })
}



middleware.isLoggedIn=function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}else{
			console.log("Please login first")
			// req.flash("error","Please Login First ..!");
			res.redirect('/login');
		}
}

module.exports=middleware;