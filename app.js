var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var passport = require("passport")
var localStrategy = require("passport-local")
var cors = require("cors")
var request = require("request")

var Thing = require('./models/Thing.js')
var User = require('./models/User.js')

var authRoutes = require("./routes/index");


var app = express()
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.use(cors())

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(()=>{console.log("MongoDB connected.")})
  .catch((err)=>{console.log(err)})

app.use(require("express-session")({
  secret:"Bonsoir Elliot",
  resave: false,
  saveUninitialized: false
}))

var Thing = require("./models/Thing")
var User = require("./models/User")

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req,res,next){
  res.locals.currentUser = req.user
  next()
})

//Insert routes here

app.use(authRoutes);




port = process.env.PORT || 8080
app.listen(port,()=>{
  console.log(`App started at port ${port}`)
})