var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var cors = require("cors")
var request = require("request")
var multer = require("multer")
var fs = require("fs")
var path = require("path");
var app = express()
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.use(cors())

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(()=>{console.log("MongoDB connected.")})
  .catch((err)=>{console.log(err)})

var Thing = require("./models/Thing")
var User = require("./models/User")

var authRoutes = require("./routes/index");
var localRoutes = require("./routes/local");
var globalRoutes = require("./routes/global")

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({dest: __dirname + '/uploads/files'});

app.post("/local/upload", upload.single("file"), (req, res) => {
    
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);

app.use('/local',localRoutes)
app.use('/global',globalRoutes)
app.use(authRoutes);

port = process.env.PORT || 8080
app.listen(port,()=>{
  console.log(`App started at port ${port}`)
})